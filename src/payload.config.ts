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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Safe env helper — returns fallback instead of throwing at build time
const env = (key: string, fallback = '') => process.env[key] ?? fallback

const isProduction = process.env.NODE_ENV === 'production'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' | Zova Organics CMS',
      icons: [
        { rel: 'icon', type: 'image/png', url: '/favicon.png' },
        { rel: 'apple-touch-icon', type: 'image/png', url: '/apple-touch-icon.png' },
      ],
    },
  },

  collections: [Users, Media, Products, Leads, Certifications, Posts],

  editor: lexicalEditor(),

  secret: env('PAYLOAD_SECRET', 'build-time-placeholder-secret'),

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: env(
        'DATABASE_URL',
        'postgres://placeholder:placeholder@localhost/placeholder',
      ),
    },
    // Don't auto-push schema in production — use migrations
    push: !isProduction,
  }),

  sharp,

  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
          disableLocalStorage: true,
          generateFileURL: ({ filename, prefix }) => {
            const base = env('R2_PUBLIC_URL', 'https://media.zovaorganics.com')
            return `${base}/${prefix}/${filename}`
          },
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

  serverURL: env('NEXT_PUBLIC_SERVER_URL', 'http://localhost:3000'),
})
