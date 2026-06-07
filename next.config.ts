import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  images: {
    localPatterns: [{ pathname: '/api/media/file/**' }, { pathname: '/**' }],
    remotePatterns: [
      {
        // production custom domain
        protocol: 'https',
        hostname: 'media.zovaorganics.com',
        pathname: '/**',
      },
      {
        // R2 direct bucket URLs (dev / staging)
        protocol: 'https',
        hostname: '*.r2.cloudflarestorage.com',
        pathname: '/**',
      },
      {
        // R2 public dev URLs
        protocol: 'https',
        hostname: '*.r2.dev',
        pathname: '/**',
      },
      // ← removed the process.env entry — it was the crash source
      // All R2 URLs are already covered by the wildcards above.
      // If you add a non-R2 CDN later, add it here as a static string.
    ],
    formats: ['image/avif', 'image/webp'],
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
