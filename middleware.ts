import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Security headers
  res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')

  res.headers.set('X-Frame-Options', 'DENY')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  // Basic Content Security Policy — adjust to your external CDNs and analytics vendors
  res.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' https://www.googletagmanager.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; frame-ancestors 'none';",
  )

  return res
}

export const config = {
  matcher: '/:path*',
}
