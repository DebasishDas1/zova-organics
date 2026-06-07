import type { Metadata } from 'next'
import { Hero } from '@/components/sections/home/Hero'
import { Manifesto } from '@/components/sections/home/Manifesto'
import { Collections } from '@/components/sections/home/Collections'
import { WhyZova } from '@/components/sections/home/WhyZova'
import { SectionHero } from '@/components/sections/sheared/SectionHero'
import { FeatureList } from '@/components/sections/sheared/FeatureList'
import { Search, Package, Globe2, Factory, ShieldCheck } from 'lucide-react'
import dynamic from 'next/dynamic'
import { JsonLd } from '@/components/sections/sheared/JsonLd'

const GlobalReach = dynamic(() =>
  import('@/components/sections/home/GlobalReach').then((mod) => mod.GlobalReach),
)
const CTA = dynamic(() => import('@/components/sections/home/CTA').then((mod) => mod.CTA))

export const metadata: Metadata = {
  title: 'Zova Organics | Sustainable Textiles & Private Label Manufacturing',
  description:
    'Zova Organics supplies premium organic textiles, sustainable bags, and ethical private-label manufacturing from India to global brands.',
  keywords: [
    'organic textile exporter',
    'organic cotton bags manufacturer',
    'private label textile manufacturing',
    'sustainable textile supplier india',
    'organic fabric exporter',
    'eco friendly bags manufacturer',
    'ethical sourcing india',
    'custom textile manufacturing',
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
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zova Organics',
    description: 'Premium sustainable textiles and private label manufacturing from India.',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://zovaorganics.com/#business',
  name: 'Zova Organics',
  url: 'https://zovaorganics.com',
  telephone: '+91-XXXXXXXXXX',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
    addressRegion: 'Your State',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
}

const items = [
  {
    title: 'Sourcing',
    description: 'Carefully selected manufacturing partners and materials.',
    icon: Search,
  },
  {
    title: 'Production',
    description: 'Scalable manufacturing with rigorous quality standards.',
    icon: Package,
  },
  {
    title: 'Export Logistics',
    description: 'Reliable delivery and documentation for global markets.',
    icon: Globe2,
  },
]

const steps = [
  { title: 'Discovery', icon: Search },
  { title: 'Sampling', icon: Package },
  { title: 'Production', icon: Factory },
  { title: 'Quality Check', icon: ShieldCheck },
  { title: 'Global Delivery', icon: Globe2 },
]

export default async function HomePage() {
  return (
    <>
      <JsonLd schema={localBusinessSchema} />
      <Hero />
      <Manifesto />
      <Collections />

      <div className="container-zova">
        <SectionHero
          eyebrow="Capabilities"
          title="Everything needed to move from concept to delivery."
          description="From sourcing to production and export, we provide end-to-end solutions for your manufacturing needs."
        />

        <FeatureList items={items} />
      </div>

      <WhyZova />
      <GlobalReach />
      <div className="container-zova section-padding">
        <SectionHero
          eyebrow="Process"
          title="A simple path from inquiry to delivery."
          description="Our streamlined process ensures a seamless experience from your initial inquiry to the delivery of your products, with clear communication and dedicated support at every step."
        />

        <FeatureList items={steps} />
      </div>
      <CTA />
    </>
  )
}
