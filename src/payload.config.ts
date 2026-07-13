import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { Leads } from './collections/Leads'
import { Certifications } from './collections/Certifications'
import { Posts } from './collections/Posts'
import { getServerURL, getTrustedOrigins } from './lib/server-url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const env = (key: string, fallback = '') => process.env[key] ?? fallback
const isProduction = process.env.NODE_ENV === 'production'
const serverURL = getServerURL()
const trustedOrigins = getTrustedOrigins(serverURL)

const payloadSecret = env('PAYLOAD_SECRET', 'build-time-placeholder-secret')
const isBuildTime =
  process.env.NEXT_PHASE === 'phase-production-build' || process.env.npm_lifecycle_event === 'build'

if (
  isProduction &&
  !isBuildTime &&
  (!process.env.PAYLOAD_SECRET || payloadSecret.toLowerCase().includes('placeholder'))
) {
  throw new Error('PAYLOAD_SECRET must be set to a secure value in production')
}

// Single R2 folder for all media now that there's one Media collection.
const r2Base = env('R2_PUBLIC_URL', 'https://media.zovaorganics.com')
const makeFileURL =
  (prefix: string) =>
  ({ filename }: { filename: string }) =>
    `${r2Base}/${prefix}/${filename}`

export default buildConfig({
  // Multi-language buyer-facing content for an export business.
  // Only fields marked `localized: true` (product/post copy, SEO) get a
  // row per locale — internal fields like SKU, HS code, and CRM notes
  // stay single-row since they're never translated.
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'French', code: 'fr' },
      { label: 'German', code: 'de' },
      { label: 'Spanish', code: 'es' },
      { label: 'Italian', code: 'it' },
      { label: 'Arabic', code: 'ar' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },

  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: ' | Zova Organics CMS',
      icons: [
        { rel: 'icon', type: 'image/png', url: '/favicon.png' },
        { rel: 'apple-touch-icon', type: 'image/png', url: '/apple-touch-icon.png' },
      ],
    },
  },

  // 5 collections instead of 7 — Media replaces Media/ProductImages/BlogImages.
  collections: [Users, Media, Products, Leads, Certifications, Posts],

  editor: lexicalEditor(),

  secret: payloadSecret,

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: env(
        'DATABASE_URL',
        'postgres://placeholder:placeholder@localhost/placeholder',
      ),
      ssl: isProduction ? { rejectUnauthorized: false } : false,
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    },
    // This database holds real production data (Supabase), not disposable
    // local dev data. `push` mode auto-applies schema changes on every
    // server start with no review and no migration history — that's how
    // we nearly lost data here. Always false; use `payload migrate` instead.
    push: false,
  }),

  sharp,

  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
          disableLocalStorage: true,
          generateFileURL: makeFileURL('media'),
        },
      },
      bucket: env('R2_BUCKET', 'placeholder-bucket'),
      config: {
        endpoint: env('R2_ENDPOINT', 'https://placeholder.r2.cloudflarestorage.com'),
        region: 'auto',
        credentials: {
          accessKeyId: env('R2_ACCESS_KEY_ID', 'placeholder'),
          secretAccessKey: env('R2_SECRET_ACCESS_KEY', 'placeholder'),
        },
        forcePathStyle: true,
      },
    }),
  ],

  serverURL,
  csrf: trustedOrigins,
  cors: trustedOrigins,
})
