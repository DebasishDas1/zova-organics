import { SectionHero } from '@/components/sections/sheared/SectionHero'
import { Metadata } from 'next'
import { BlogsGrid } from '@/components/sections/blogs/BlogsGrid'
import { getPosts } from '@/lib/payload/posts'

export const metadata: Metadata = {
  title: 'Sustainable Sourcing & Organic Textile Insights | Zova Organics',

  description:
    'Expert insights on organic textiles, sustainable sourcing, GOTS certification, private label manufacturing, and global export best practices.',

  keywords: [
    'organic textile exporter',
    'organic cotton fabrics',
    'GOTS certification',
    'private label textiles',
    'sustainable sourcing',
    'organic fabric manufacturer',
    'textile export India',
    'organic cotton bags',
    'sustainable supply chain',
    'textile industry insights',
  ],

  alternates: {
    canonical: 'https://zovaorganics.com/blogs',
  },

  openGraph: {
    title: 'Sustainable Sourcing & Organic Textile Insights | Zova Organics',
    description: 'Industry insights for importers, distributors, and sustainable brands.',
    url: 'https://zovaorganics.com/blogs',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Sustainable Sourcing & Organic Textile Insights',
    description: 'Industry insights for importers, distributors, and sustainable brands.',
  },
}

export default async function BlogsPage() {
  const postsResult = await getPosts({
    limit: 100,
  })

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',

    name: 'Zova Organics Insights',

    description:
      'Insights on sustainable sourcing, organic textiles, certifications, and global exports.',

    url: 'https://zovaorganics.com/blogs',

    publisher: {
      '@type': 'Organization',
      name: 'Zova Organics',
      url: 'https://zovaorganics.com',
    },

    blogPost: postsResult.docs.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `https://zovaorganics.com/blogs/${post.slug}`,
      datePublished: post.publishedAt,
      description: post.excerpt,
    })),
  }

  const itemListSchema = {
    '@context': 'https://schema.org',

    '@type': 'ItemList',

    itemListElement: postsResult.docs.map((post, index) => ({
      '@type': 'ListItem',

      position: index + 1,

      url: `https://zovaorganics.com/blogs/${post.slug}`,

      name: post.title,
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://zovaorganics.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Insights',
        item: 'https://zovaorganics.com/blogs',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />
      <SectionHero
        eyebrow="Insights"
        title="Perspectives on sustainable sourcing."
        description="Export guidance, organic textile trends, certification expertise, and supply chain insights for global buyers."
      />
      <BlogsGrid posts={postsResult.docs} />
    </>
  )
}
