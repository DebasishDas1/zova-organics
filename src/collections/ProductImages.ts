// src/collections/ProductImages.ts
import type { CollectionConfig } from 'payload'

export const ProductImages: CollectionConfig = {
  slug: 'product-images',
  access: { read: () => true },
  upload: {
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 400, position: 'centre' },
      { name: 'card', width: 800, height: 800, position: 'centre' },
      { name: 'zoom', width: 1600, height: 1600, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text' },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      hasMany: false,
    },
  ],
}
