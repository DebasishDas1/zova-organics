// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function generateNonce(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return Buffer.from(array).toString('base64')
}

export function middleware(request: NextRequest) {
  const nonce = generateNonce()
  const isDev = process.env.NODE_ENV === 'development'

  const csp = [
    `default-src 'self'`,
    // unsafe-eval only in dev — Next.js React Refresh requires it
    `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com${isDev ? " 'unsafe-eval'" : ''}`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' blob: data: https://media.zovaorganics.com https://*.r2.cloudflarestorage.com https://*.r2.dev`,
    `font-src 'self' https://fonts.gstatic.com`,
    `connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com${isDev ? ' ws://localhost:3000' : ''}`,
    `frame-src 'none'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `upgrade-insecure-requests`,
  ].join('; ')

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('x-csp', csp)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set('Content-Security-Policy', csp)

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon|api/payload|admin).*)'],
}
