import { unstable_cache } from 'next/cache'
import { cache } from 'react'
import type { Where } from 'payload'
import type { Product } from '@/payload-types'
import { getPayloadClient } from './client'

/** Only products visible on the public storefront. */
export const activeProductWhere: Where = {
  stockStatus: { equals: 'active' },
}

const listSelect = {
  title: true,
  slug: true,
  shortDescription: true,
  category: true,
  stockStatus: true,
  featured: true,
  featuredImage: true,
  moq: true,
  moqUnit: true,
  sampleAvailable: true,
  certifications: true,
} as const

export const getProducts = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'products',
      where: activeProductWhere,
      depth: 1,
      limit: 500,
      select: listSelect,
    })
    return result.docs as Product[]
  },
  ['products-list'],
  { revalidate: 60, tags: ['products'] },
)

export const getProductBySlug = cache(async (slug: string) => {
  return getCachedProductBySlug(slug)
})

const getCachedProductBySlug = unstable_cache(
  async (slug: string) => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'products',
      where: {
        slug: { equals: slug },
        ...activeProductWhere,
      },
      depth: 2,
      limit: 1,
    })
    return result.docs[0] ?? null
  },
  ['product-by-slug'],
  { revalidate: 60, tags: ['products'] },
)

export const getRelatedProducts = unstable_cache(
  async (category: string, excludeSlug: string) => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'products',
      where: {
        category: { equals: category },
        slug: { not_equals: excludeSlug },
        ...activeProductWhere,
      },
      limit: 4,
      depth: 1,
      select: listSelect,
    })
    return result.docs as Product[]
  },
  ['related-products'],
  { revalidate: 60, tags: ['products'] },
)

export const getAllProductSlugs = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'products',
      where: activeProductWhere,
      select: { slug: true },
      limit: 1000,
    })
    return result.docs.map((p) => ({ slug: p.slug }))
  },
  ['product-slugs'],
  { revalidate: 3600, tags: ['products'] },
)
