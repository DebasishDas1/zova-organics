// src/app/(frontend)/layout.tsx
import type { Metadata } from 'next'
import React from 'react'
import { headers } from 'next/headers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './styles.css'
import { Geist } from 'next/font/google'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

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
    url: 'https://zovaorganics.com',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
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
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://zovaorganics.com/#organization',
  name: 'Zova Organics',
  url: 'https://zovaorganics.com',
  logo: {
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
  publisher: { '@id': 'https://zovaorganics.com/#organization' },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://zovaorganics.com/products?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

export default async function FrontendLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Read nonce injected by middleware
  const headersList = await headers()
  const nonce = headersList.get('x-nonce') ?? ''

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={geist.variable}
      data-scroll-behavior="smooth"
    >
      <body suppressHydrationWarning>
        {/* nonce= required on every inline script to satisfy CSP */}
        <script
          nonce={nonce}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          suppressHydrationWarning // ← make sure this is here
        />
        <script
          nonce={nonce}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
          suppressHydrationWarning // ← and here
        />
        <Navbar />
        <main className="pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
