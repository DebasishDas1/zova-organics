// src/app/layout.tsx
import type { Metadata } from 'next'
import './(frontend)/styles.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://zovaorganics.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
