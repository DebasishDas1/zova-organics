import type { Metadata } from 'next'
import { Hero } from '@/components/sections/home/Hero'
import { Manifesto } from '@/components/sections/home/Manifesto'
import { Collections } from '@/components/sections/home/Collections'
import { Capabilities } from '@/components/sections/home/Capabilities'
import { WhyZova } from '@/components/sections/home/WhyZova'
import { GlobalReach } from '@/components/sections/home/GlobalReach'
import { Process } from '@/components/sections/home/Process'
import { CTA } from '@/components/sections/home/CTA'

export const metadata: Metadata = {
  title: 'Zova Organics | Sustainable Textiles & Private Label Manufacturing',
  description:
    'Zova Organics supplies premium organic textiles, sustainable bags, and ethical private-label manufacturing from India to global brands.',
  keywords: [
    'organic textiles',
    'sustainable bags supplier',
    'private label manufacturing',
    'ethical textile sourcing',
    'Indian textile exporter',
  ],
  openGraph: {
    title: 'Zova Organics | Sustainable Textiles & Private Label Manufacturing',
    description:
      'Zova Organics supplies premium organic textiles, sustainable bags, and ethical private-label manufacturing from India to global brands.',
    url: 'https://zovaorganics.com/',
    siteName: 'Zova Organics',
    type: 'website',
  },
  alternates: {
    canonical: 'https://zovaorganics.com/',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Collections />
      <Capabilities />
      <WhyZova />
      <GlobalReach />
      <Process />
      <CTA />
    </>
  )
}
