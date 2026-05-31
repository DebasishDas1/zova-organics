import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Products, Leads, Certifications, Posts],
  editor: lexicalEditor(),
  secret: (() => {
    const s = process.env.PAYLOAD_SECRET
    if (!s) throw new Error('Missing required env: PAYLOAD_SECRET')
    return s
  })(),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: (() => {
        const u = process.env.DATABASE_URL
        if (!u) throw new Error('Missing required env: DATABASE_URL')
        return u
      })(),
    },
    push: false,
  }),
  sharp,
  plugins: [],
})
