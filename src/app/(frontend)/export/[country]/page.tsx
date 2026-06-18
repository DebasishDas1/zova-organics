import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { exportMarkets } from '@/lib/export-markets'
import { JsonLd } from '@/components/sections/sheared/JsonLd'
import { PageCTA } from '@/components/sections/sheared/PageCTA'

type Props = {
  params: Promise<{
    country: keyof typeof exportMarkets
  }>
}

export async function generateStaticParams() {
  return Object.keys(exportMarkets).map((country) => ({
    country,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params
  const market = exportMarkets[country]

  if (!market) return {}

  const url = `https://zovaorganics.com/export/${country}`

  return {
    metadataBase: new URL('https://zovaorganics.com'),
    title: `${market.title} | Zova Organics`,
    description: market.description,
    keywords: [...market.keywords],
    alternates: { canonical: url },
    openGraph: {
      title: `${market.title} | Zova Organics`,
      description: market.description,
      url,
      siteName: 'Zova Organics',
      type: 'website',
      locale: 'en_US',
      images: [{ url: '/og/export.jpg', width: 1200, height: 630, alt: market.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${market.title} | Zova Organics`,
      description: market.description,
      images: ['/og/export.jpg'],
    },
    robots: { index: true, follow: true },
  }
}

export default async function ExportCountryPage({ params }: Props) {
  const { country } = await params
  const market = exportMarkets[country]

  if (!market) {
    notFound()
  }

  // Breadcrumb schema moved here so market and country are in scope
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zovaorganics.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Export Markets',
        item: 'https://zovaorganics.com/export',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: market.name,
        item: `https://zovaorganics.com/export/${country}`,
      },
    ],
  }

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: market.title,
    description: market.description,
    url: `https://zovaorganics.com/export/${country}`,
    about: { '@type': 'Organization', name: 'Zova Organics', url: 'https://zovaorganics.com' },
    audience: { '@type': 'BusinessAudience' },
    keywords: market.keywords.join(', '),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Do you export to ${market.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, Zova Organics supplies sustainable textile products to businesses in ${market.name}.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer private label manufacturing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We provide OEM, ODM, and private-label manufacturing services.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you handle bulk orders?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We support large-scale manufacturing and export orders for global buyers.',
        },
      },
    ],
  }

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={pageSchema} />
      <JsonLd schema={faqSchema} />

      <PageCTA
        title={`Looking for a supplier in ${market.name}?`}
        description="Connect with our export team to discuss your requirements."
        buttonText="Request a Quote"
        buttonHref="/contact"
      />
    </>
  )
}
