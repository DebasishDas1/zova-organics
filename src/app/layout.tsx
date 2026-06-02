import type { Metadata } from 'next'
import React from 'react'

import { Geist } from 'next/font/google'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Zova Organics',
  description:
    'Premium sustainable textile and lifestyle products sourced from India for global brands, retailers, and distributors.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={geist.variable}
      data-scroll-behavior="smooth"
    >
      <body>{children}</body>
    </html>
  )
}
