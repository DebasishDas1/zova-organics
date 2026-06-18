import type { MetadataRoute } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { exportMarkets } from '@/lib/export-markets'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://zovaorganics.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({
    config: configPromise,
  })

  const exportUrls = Object.keys(exportMarkets).map((country) => ({
    url: `${BASE_URL}/export/${country}`,
    priority: 0.9,
    changeFrequency: 'weekly' as const,
  }))

  const [products, blogs] = await Promise.all([
    payload.find({
      collection: 'products',
      limit: 1000,
      draft: false,
    }),
    payload.find({
      collection: 'posts',
      limit: 1000,
      draft: false,
    }),
  ])

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
      priority: 1,
      changeFrequency: 'weekly',
    },
    {
      url: `${BASE_URL}/about-zova-organics`,
      priority: 1,
      changeFrequency: 'weekly',
    },
  ]

  const productPages: MetadataRoute.Sitemap = products.docs.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const blogPages: MetadataRoute.Sitemap = blogs.docs.map((blog) => ({
    url: `${BASE_URL}/blogs/${blog.slug}`,
    lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...productPages, ...blogPages, ...exportUrls]
}
