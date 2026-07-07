// src/app/(frontend)/layout.tsx
import type { Metadata } from 'next'
import Script from 'next/script'
import { headers } from 'next/headers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Providers } from '@/components/Providers'
import { getLocaleFromCookie, getLocaleFromHeader, isRtl } from '@/i18n/i18n'
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
    'organic cotton supplier',
    'jute',
    'organic cotton',
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
        url: '/logo.png',
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
    images: ['/logo.png'],
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
  const cookieLocale = getLocaleFromCookie(headersList.get('cookie'))
  const headerLocale = getLocaleFromHeader(headersList.get('accept-language'))
  const locale = cookieLocale ?? headerLocale

  return (
    <html
      lang={locale}
      dir={isRtl(locale) ? 'rtl' : 'ltr'}
      suppressHydrationWarning
      className={geist.variable}
      data-scroll-behavior="smooth"
    >
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive" nonce={nonce}>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-N75K7XZ2');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N75K7XZ2"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {/* nonce= required on every inline script to satisfy CSP */}
        <script
          nonce={nonce}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          suppressHydrationWarning
        />
        <script
          nonce={nonce}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
          suppressHydrationWarning
        />
        <Providers defaultLocale={locale}>
          <Navbar />
          <main className="pt-14 md:pt-24">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
