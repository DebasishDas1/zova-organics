import type { MetadataRoute } from 'next'
import { unstable_cache } from 'next/cache'
import { exportMarkets } from '@/lib/export-markets'
import { getAllProductSlugs } from '@/lib/payload/products'
import { getAllPostSlugs } from '@/lib/payload/posts'

export const revalidate = 3600

const BASE_URL = 'https://zovaorganics.com'
// Fixed static date anchor instead of new Date() on every revalidate
const SITE_LAST_UPDATED = new Date('2026-01-01T00:00:00.000Z')

type SlugWithUpdatedAt = {
  slug: string
  updatedAt?: string | Date
}

const getSitemapEntries = unstable_cache(
  async (): Promise<MetadataRoute.Sitemap> => {
    let productSlugs: SlugWithUpdatedAt[] = []
    let postSlugs: SlugWithUpdatedAt[] = []

    try {
      ;[productSlugs, postSlugs] = await Promise.all([getAllProductSlugs(), getAllPostSlugs()])
    } catch {
      productSlugs = []
      postSlugs = []
    }

    const exportUrls = Object.keys(exportMarkets).map((country) => ({
      url: `${BASE_URL}/export/${country}`,
      lastModified: SITE_LAST_UPDATED,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    }))

    const staticPages: MetadataRoute.Sitemap = [
      {
        url: BASE_URL,
        lastModified: SITE_LAST_UPDATED,
        changeFrequency: 'weekly',
        priority: 1.0,
      },
      {
        url: `${BASE_URL}/products`,
        lastModified: SITE_LAST_UPDATED,
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/blogs`,
        lastModified: SITE_LAST_UPDATED,
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/certifications`,
        lastModified: SITE_LAST_UPDATED,
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/about-us`,
        lastModified: SITE_LAST_UPDATED,
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/contact`,
        lastModified: SITE_LAST_UPDATED,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/export`,
        lastModified: SITE_LAST_UPDATED,
        priority: 0.8,
        changeFrequency: 'weekly',
      },
    ]

    const productPages: MetadataRoute.Sitemap = productSlugs.map((item) => ({
      url: `${BASE_URL}/products/${item.slug}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

    const blogPages: MetadataRoute.Sitemap = postSlugs.map((item) => ({
      url: `${BASE_URL}/blogs/${item.slug}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : SITE_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

    return [...staticPages, ...productPages, ...blogPages, ...exportUrls]
  },
  ['sitemap-entries'],
  { revalidate: 3600, tags: ['products', 'posts'] },
)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return getSitemapEntries()
}
