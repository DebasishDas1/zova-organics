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
import { MarketFlags } from '@/components/sections/home/MarketFlags'

const GlobalReach = dynamic(() =>
  import('@/components/sections/home/GlobalReach').then((mod) => mod.GlobalReach),
)
const CTA = dynamic(() => import('@/components/sections/home/CTA').then((mod) => mod.CTA))

export const metadata: Metadata = {
  title: 'Zova Organics | Wholesale Jute Bags & Eco Packaging Exporter from India',
  description:
    'Zova Organics is a Kolkata-based exporter of wholesale jute bags, juco bags, eco packaging, and private label sustainable products, serving brands and distributors in 30+ countries.',
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
    title: 'Zova Organics | Wholesale Jute Bags & Eco Packaging Exporter from India',
    description:
      'Zova Organics is a Kolkata-based exporter of wholesale jute bags, juco bags, eco packaging, and private label sustainable products, serving brands and distributors in 30+ countries.',
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
    title: 'Jute & Fabric Sourcing from Kolkata',
    description:
      'We source jute, cotton, and natural fibers from certified mills across West Bengal and India',
    icon: Search,
  },
  {
    title: 'Quality Production at Indian Factories',
    description:
      'Strict Quality-controlled production with factory audits and sample approval process.',
    icon: Package,
  },
  {
    title: 'Global Export Logistics from India',
    description: 'Reliable delivery and documentation for global markets',
    icon: Globe2,
  },
]

const steps = [
  {
    title: 'Discovery',
    description:
      'Share your product requirements — type, quantity, customization, timeline. Sampling',
    icon: Search,
  },
  {
    title: 'Sampling',
    description:
      'We send physical samples of jute bags, fabrics, or lifestyle products for approval.',
    icon: Package,
  },
  {
    title: 'Production',
    description: 'Bulk production begins at our vetted Indian manufacturing partners.',
    icon: Factory,
  },
  {
    title: 'Quality Check',
    description: 'Pre-shipment inspection and QC report before goods leave India.',
    icon: ShieldCheck,
  },
  {
    title: 'Global Delivery',
    description: 'FOB/CIF shipping from Indian Port to your country.',
    icon: Globe2,
  },
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
          title="Everything You Need to Source & Export Jute Bags from India"
          description="From sourcing to production and export, we provide end-to-end solutions for your manufacturing needs."
        />

        <FeatureList items={items} />
      </div>

      <WhyZova />
      <GlobalReach />
      <MarketFlags />
      <div className="container-zova section-padding">
        <SectionHero
          eyebrow="Process"
          title="How to Order Jute Bags from Zova Organics — Simple. Fast. Reliabl"
          description="From your first inquiry about wholesale jute bags to delivery at your warehouse : here's how we work with global buyers and brands."
        />

        <FeatureList items={steps} />
      </div>
      <CTA />
    </>
  )
}
