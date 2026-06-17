import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  output: 'standalone',

  compress: true,
  poweredByHeader: false,

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
        hostname: '*.r2.dev',
        pathname: '/**',
      },
    ],

    formats: ['image/avif', 'image/webp'],

    // Cache optimized images for 1 day
    minimumCacheTTL: 86400,

    dangerouslyAllowSVG: false,
  },

  async headers() {
    return [
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
  },

  webpack: (config) => {
    config.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return config
  },

  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, {
  devBundleServerPackages: false,
})
