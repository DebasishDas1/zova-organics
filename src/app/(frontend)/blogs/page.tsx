import { SectionHero } from '@/components/sections/sheared/SectionHero'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insights - Zova Organics | Sustainable Textile Exporter from India',
  description:
    'Read the latest insights on sustainable sourcing, textile trends, and responsible manufacturing.',
  alternates: { canonical: 'https://zovaorganics.com/blogs' },
  openGraph: {
    title: 'Insights - Zova Organics | Sustainable Textile Exporter from India',
    description:
      'Read the latest insights on sustainable sourcing, textile trends, and responsible manufacturing.',
    url: 'https://zovaorganics.com/blogs',
    type: 'website',
  },
}

export default async function BlogsPage() {
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    headline: 'Insights - Zova Organics',
    description:
      'Read the latest insights on sustainable sourcing, textile trends, and responsible manufacturing.',
    url: 'https://zovaorganics.com/blogs',
    author: {
      '@type': 'Organization',
      name: 'Zova Organics',
      url: 'https://zovaorganics.com',
      sameAs: [
        'https://www.facebook.com/zovaorganics',
        'https://www.linkedin.com/company/zovaorganics',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Zova Organics',
      logo: {
        '@type': 'ImageObject',
        url: 'https://zovaorganics.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://zovaorganics.com/blogs',
    },
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
      <SectionHero
        eyebrow="Insights"
        title="Latest updates from Zova Organics"
        description="Explore news, sourcing advice, and industry insights to support sustainable supply chains."
      />
    </>
  )
}
