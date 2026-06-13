import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ── Nonce ─────────────────────────────────────────────────────────────────────
function generateNonce(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return Buffer.from(array).toString('base64')
}

// add at top (just below imports)
const isProd = process.env.NODE_ENV === 'production'

// ── Rate limiter ──────────────────────────────────────────────────────────────
// In-memory per edge instance — good enough for Railway's single-container setup.
// Replace with Upstash Redis if you scale to multiple instances.
const rateLimitStore = new Map<string, { count: number; reset: number }>()

function isRateLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(key)

  if (!record || now > record.reset) {
    rateLimitStore.set(key, { count: 1, reset: now + windowMs })
    return false
  }

  if (record.count >= max) return true
  record.count++
  return false
}

// Prevent unbounded memory growth — prune expired entries periodically
let lastPrune = Date.now()
function pruneExpired() {
  const now = Date.now()
  if (now - lastPrune < 60_000) return
  lastPrune = now
  for (const [key, record] of rateLimitStore) {
    if (now > record.reset) rateLimitStore.delete(key)
  }
}

// ── Proxy ─────────────────────────────────────────────────────────────────────
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isDev = process.env.NODE_ENV === 'development'

  // Real IP — Railway sits behind a proxy so check x-forwarded-for first
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  pruneExpired()

  // Inside proxy(request) – before any rate‑limit checks
  if (isProd) {
    // ── Rate limiting ──────────────────────────────────────────────────────
    // Contact /api/contact … (keep existing logic)
    if (pathname.startsWith('/api/contact')) {
      if (isRateLimited(`contact:${ip}`, 20, 60_000)) {
        return new NextResponse('Too Many Requests', {
          status: 429,
          headers: { 'Retry-After': '60', 'Content-Type': 'text/plain' },
        })
      }
    }

    if (pathname.startsWith('/api/')) {
      if (isRateLimited(`api:${ip}`, 100, 60_000)) {
        return new NextResponse('Too Many Requests', {
          status: 429,
          headers: { 'Retry-After': '60', 'Content-Type': 'text/plain' },
        })
      }
    }
  }

  // ── CSP ────────────────────────────────────────────────────────────────────
  const nonce = generateNonce()

  const csp = [
    `default-src 'self'`,
    // unsafe-eval only in dev — Next.js React Refresh requires it
    `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com${isDev ? " 'unsafe-eval'" : ''}`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `img-src 'self' blob: data: https://media.zovaorganics.com https://*.r2.cloudflarestorage.com https://*.r2.dev`,
    `font-src 'self' https://fonts.gstatic.com`,
    // ws: needed for HMR in dev
    `connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com${isDev ? ' ws://localhost:3000' : ''}`,
    `frame-src 'none'`,
    `frame-ancestors 'none'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `upgrade-insecure-requests`,
  ].join('; ')

  // Pass nonce to server components via request header
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  const response = NextResponse.next({ request: { headers: requestHeaders } })

  // ── Security headers ───────────────────────────────────────────────────────
  response.headers.set('Content-Security-Policy', csp)
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  return response
}

export const config = {
  matcher: [
    // Run on all routes except static files, image optimisation, and Payload admin
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico)|api/payload|admin).*)',
  ],
}
