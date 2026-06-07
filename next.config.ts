import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  // ← Required for Docker / Railway standalone deployment
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
        // R2 direct bucket URLs
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
      // Removed: process.env.R2_PUBLIC_HOSTNAME — was crashing build with empty string.
      // All R2 hostnames are already covered by the wildcards above.
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
