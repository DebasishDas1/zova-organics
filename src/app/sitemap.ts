import type { MetadataRoute } from 'next'
import { unstable_cache } from 'next/cache'
import { exportMarkets } from '@/lib/export-markets'
import { getAllProductSlugs } from '@/lib/payload/products'
import { getAllPostSlugs } from '@/lib/payload/posts'

export const revalidate = 3600

const BASE_URL = 'https://zovaorganics.com'

const getSitemapEntries = unstable_cache(
  async (): Promise<MetadataRoute.Sitemap> => {
    let productSlugs: Array<{ slug: string }> = []
    let postSlugs: Array<{ slug: string }> = []

    try {
      ;[productSlugs, postSlugs] = await Promise.all([getAllProductSlugs(), getAllPostSlugs()])
    } catch {
      // During build, a DB connection may be unavailable. Generate a minimal sitemap instead.
      productSlugs = []
      postSlugs = []
    }

    const exportUrls = Object.keys(exportMarkets).map((country) => ({
      url: `${BASE_URL}/export/${country}`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    }))

    const staticPages: MetadataRoute.Sitemap = [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: `${BASE_URL}/products`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/blogs`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/certifications`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/about-us`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/export`,
        lastModified: new Date(),
        priority: 0.8,
        changeFrequency: 'weekly',
      },
    ]

    const productPages: MetadataRoute.Sitemap = productSlugs.map(({ slug }) => ({
      url: `${BASE_URL}/products/${slug}`,
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

    const blogPages: MetadataRoute.Sitemap = postSlugs.map(({ slug }) => ({
      url: `${BASE_URL}/blogs/${slug}`,
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
