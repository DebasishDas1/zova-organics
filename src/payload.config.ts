import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { Leads } from './collections/Leads'
import { Certifications } from './collections/Certifications'
import { Posts } from './collections/Posts'
// import { userAgent } from 'next/server'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const env = <T extends string>(key: string): T => {
  const value = process.env[key]
  if (!value) throw new Error(`Missing required env: ${key}`)
  return value as T
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [Users, Media, Products, Leads, Certifications, Posts],

  editor: lexicalEditor(),

  secret: env('PAYLOAD_SECRET'),

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // ─── Supabase Postgres ─────────────────────────────────────────────────────
  db: postgresAdapter({
    pool: {
      connectionString: env('DATABASE_URL'),
    },
    migrationDir: path.resolve(dirname, 'migrations'),
  }),

  // ─── Sharp ─────────────────────────────────────────────────────────────────
  sharp,

  // ─── Cloudflare R2 ─────────────────────────────────────────────────────────
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
          disableLocalStorage: true,
          generateFileURL: ({ filename, prefix }) =>
            `${env('R2_PUBLIC_URL')}/${prefix}/${filename}`,
        },
        // add product-images and blog-images collections when you create them
      },
      bucket: env('R2_BUCKET'),
      config: {
        endpoint: env('R2_ENDPOINT'),
        region: 'auto',
        credentials: {
          accessKeyId: env('R2_ACCESS_KEY_ID'),
          secretAccessKey: env('R2_SECRET_ACCESS_KEY'),
        },
        forcePathStyle: true,
      },
    }),
  ],

  serverURL: process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000',
})
