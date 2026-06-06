// lib/payload/posts.ts
import { unstable_cache } from 'next/cache'
import { getPayloadClient } from './client'
import type { Where } from 'payload'

// Wrap each query — Next.js deduplicates and caches across requests
export const getPostBySlug = unstable_cache(
  async (slug: string) => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'posts',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
      depth: 2,
      limit: 1,
    })
    return result.docs[0] ?? null
  },
  ['post-by-slug'], // cache key prefix
  {
    revalidate: 60, // revalidate every 60s
    tags: ['posts'], // lets you revalidate on-demand
  },
)

export const getPosts = unstable_cache(
  async ({
    limit = 12,
    page = 1,
    category,
    featured,
  }: {
    limit?: number
    page?: number
    category?: string
    featured?: boolean
  } = {}) => {
    const payload = await getPayloadClient()

    const where: Where = {
      status: { equals: 'published' },
      ...(category && { category: { equals: category } }),
      ...(featured !== undefined && { featured: { equals: featured } }),
    }

    return payload.find({
      collection: 'posts',
      where,
      sort: '-publishedAt',
      limit,
      page,
      depth: 1,
      select: {
        title: true,
        slug: true,
        excerpt: true,
        category: true,
        featuredImage: true,
        featuredImageAlt: true,
        publishedAt: true,
        readingTime: true,
        featured: true,
        tags: true,
      },
    })
  },
  ['posts-list'],
  { revalidate: 60, tags: ['posts'] },
)

export const getAllPostSlugs = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      select: { slug: true },
      limit: 1000,
    })
    return result.docs.map((p) => ({ slug: p.slug }))
  },
  ['post-slugs'],
  { revalidate: 3600, tags: ['posts'] }, // slugs change rarely
)
