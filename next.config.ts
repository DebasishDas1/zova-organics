import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  output: 'standalone',

  images: {
    localPatterns: [{ pathname: '/api/media/file/**' }, { pathname: '/**' }],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.zovaorganics.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.r2.cloudflarestorage.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.r2.dev',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    // Limit image optimization concurrency on Railway's smaller containers
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
  },

  // Compress responses — reduces bandwidth on Railway
  compress: true,

  // Disable x-powered-by header — minor security improvement
  poweredByHeader: false,

  // Security headers applied to all routes via next.config
  // (CSP is handled by proxy.ts for nonce support — not here)
  async headers() {
    const isProd = process.env.NODE_ENV === 'production'

    const headers = [
      {
        source: '/((?!admin|api/payload).*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]

    if (isProd) {
      headers.push(
        {
          source: '/_next/static/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          source: '/_next/image',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=86400, stale-while-revalidate=3600',
            },
          ],
        },
      )
    }

    return headers
  },

  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },

  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
