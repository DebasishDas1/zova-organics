import type { Metadata } from 'next'
import React from 'react'
import { Navbar } from '@/components/layout/Navbar'
import './styles.css'

export const metadata: Metadata = {
  title: {
    default: 'Zova Organics',
    template: '%s | Zova Organics',
  },
  description:
    'Premium sustainable textile and lifestyle products sourced from India for global brands, retailers, and distributors.',
  keywords: [
    'organic textile exporter',
    'sustainable bags manufacturer',
    'organic cotton supplier',
    'textile sourcing partner india',
    'eco friendly products exporter',
    'zova organics',
  ],
  metadataBase: new URL('https://zovaorganics.com'),
  openGraph: {
    title: 'Zova Organics',
    description: 'Premium sustainable textile and lifestyle products sourced from India.',
    siteName: 'Zova Organics',
    url: 'https://zovaorganics.com', // ← add this
    type: 'website',
    images: [
      // ← add OG image
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zova Organics — sustainable textiles from India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zova Organics',
    description: 'Premium sustainable textile and lifestyle products sourced from India.',
    images: ['/og-image.jpg'], // ← add this
  },
  robots: {
    // ← add this
    index: true,
    follow: true,
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://zovaorganics.com/#organization',
  name: 'Zova Organics',
  url: 'https://zovaorganics.com',
  logo: {
    // ← use ImageObject, not a bare string
    '@type': 'ImageObject',
    url: 'https://zovaorganics.com/logo.png',
  },
  sameAs: [
    'https://www.facebook.com/zovaorganics',
    'https://www.linkedin.com/company/zovaorganics',
  ],
}

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: 'https://zovaorganics.com',
  name: 'Zova Organics',
  publisher: {
    '@id': 'https://zovaorganics.com/#organization',
  },
  potentialAction: {
    // ← sitelinks searchbox (optional but useful)
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://zovaorganics.com/products?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function FrontendLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <Navbar />
      <main className="pt-24">{children}</main>
    </>
  )
}
