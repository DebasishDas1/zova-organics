import type { Metadata } from 'next'
import React from 'react'
import { Navbar } from '@/components/layout/Navbar'

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
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Zova Organics',
    description: 'Premium sustainable textile and lifestyle products sourced from India.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={geist.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Navbar />
        <main className="pt-24">{children}</main>
      </body>
    </html>
  )
}
