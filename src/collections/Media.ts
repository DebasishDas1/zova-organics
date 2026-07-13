// src/collections/Media.ts
//
// Replaces the old Media / ProductImages / BlogImages collections.
// One upload collection for everything = 1 table instead of 3, and
// one place for the admin to manage images instead of three.
import type { Access, CollectionConfig } from 'payload'

const isAdmin: Access = ({ req: { user } }) => user?.role === 'admin'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    description: 'All site images — product photos, blog images, and general media.',
  },
  upload: {
    // One set of sizes sized to cover product zoom, blog hero, and social sharing.
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 400, position: 'center' },
      { name: 'card', width: 800, height: 800, position: 'center' },
      { name: 'hero', width: 1200, height: 675, position: 'center' },
      { name: 'zoom', width: 1600, height: 1600, position: 'center' },
      { name: 'og', width: 1200, height: 630, position: 'center' },
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text' },
  ],
}
