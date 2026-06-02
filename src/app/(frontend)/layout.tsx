import type { Metadata } from 'next'
import React from 'react'
import Script from 'next/script'
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
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Zova Organics',
    description: 'Premium sustainable textile and lifestyle products sourced from India.',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://zovaorganics.com/#organization',
  name: 'Zova Organics',
  url: 'https://zovaorganics.com',
  logo: 'https://zovaorganics.com/logo.png',
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
}

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Script id="organization-schema" type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </Script>
      <Script id="website-schema" type="application/ld+json">
        {JSON.stringify(webSiteSchema)}
      </Script>
      <Navbar />
      <main className="pt-24">{children}</main>
    </>
  )
}
