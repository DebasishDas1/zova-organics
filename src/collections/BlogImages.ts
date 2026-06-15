// src/collections/BlogImages.ts
import type { CollectionConfig } from 'payload'

export const BlogImages: CollectionConfig = {
  slug: 'blog-images',
  access: { read: () => true },
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
