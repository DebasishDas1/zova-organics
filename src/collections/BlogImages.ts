// src/collections/BlogImages.ts
import type { Access, CollectionConfig } from 'payload'

const isAdmin: Access = ({ req: { user } }) => user?.role === 'admin'

export const BlogImages: CollectionConfig = {
  slug: 'blog-images',
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  upload: {
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 225, position: 'center' },
      { name: 'hero', width: 1200, height: 675, position: 'center' },
      { name: 'og', width: 1200, height: 630, position: 'center' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text' },
  ],
}
