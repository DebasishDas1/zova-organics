import type { Metadata } from 'next'
import { SectionHero } from '@/components/sections/sheared/SectionHero'
import { BlogsGrid } from '@/components/sections/blogs/BlogsGrid'
import { getPosts } from '@/lib/payload/posts'
import { JsonLd } from '@/components/sections/sheared/JsonLd'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://zovaorganics.com'

export const metadata: Metadata = {
  title: 'Sustainable Sourcing & Organic Textile Insights | Zova Organics',
  description:
    'Expert insights on organic textiles, sustainable sourcing, GOTS certification, private label manufacturing, and global export best practices.',
  alternates: { canonical: `${BASE_URL}/blogs` },
  openGraph: {
    title: 'Sustainable Sourcing & Organic Textile Insights | Zova Organics',
    description: 'Industry insights for importers, distributors, and sustainable brands.',
    url: `${BASE_URL}/blogs`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sustainable Sourcing & Organic Textile Insights',
    description: 'Industry insights for importers, distributors, and sustainable brands.',
  },
}

export default async function BlogsPage() {
  // Guard: DB may be unavailable during Docker build
  const postsResult = await getPosts({ limit: 24 }).catch(() => ({ docs: [] }))
  const posts = postsResult.docs

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Zova Organics Insights',
    description:
      'Insights on sustainable sourcing, organic textiles, certifications, and global exports.',
    url: `${BASE_URL}/blogs`,
    publisher: {
      '@type': 'Organization',
      name: 'Zova Organics',
      url: BASE_URL,
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${BASE_URL}/blogs/${post.slug}`,
      datePublished: post.publishedAt,
      description: post.excerpt,
    })),
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${BASE_URL}/blogs/${post.slug}`,
      name: post.title,
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: `${BASE_URL}/blogs` },
    ],
  }

  return (
    <>
      <JsonLd schema={blogSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={itemListSchema} />
      <SectionHero
        eyebrow="Insights"
        title="Perspectives on sustainable sourcing."
        description="Export guidance, organic textile trends, certification expertise, and supply chain insights for global buyers."
      />
      <BlogsGrid posts={posts} />
    </>
  )
}
