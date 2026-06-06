import { Story } from '@/components/sections/about/Story'
import { Beliefs } from '@/components/sections/about/Beliefs'
import { WhyIndia } from '@/components/sections/about/WhyIndia'
import { Values } from '@/components/sections/about/Values'
import { Vision } from '@/components/sections/about/Vision'
import { SectionHero } from '@/components/sections/sheared/SectionHero'
import { FeatureList } from '@/components/sections/sheared/FeatureList'
import { PageCTA } from '@/components/sections/sheared/PageCTA'
import { Compass, Package, Factory, CheckCircle, Globe2 } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Zova Organics | Sustainable Textile Exporter from India',
  description:
    'Zova Organics is a GOTS-certified organic textile exporter based in India, supplying sustainable bags and fabric products to brands in 25+ countries.',
  alternates: { canonical: 'https://zovaorganics.com/about-us' },
  openGraph: {
    title: 'About Us - Zova Organics | Sustainable Textile Exporter from India',
    description:
      'Zova Organics is a GOTS-certified organic textile exporter based in India, supplying sustainable bags and fabric products to brands in 25+ countries.',
    url: 'https://zovaorganics.com/about-us',
    type: 'website',
  },
}

const steps = [
  { title: 'Discover', icon: Compass },
  { title: 'Source', icon: Package },
  { title: 'Produce', icon: Factory },
  { title: 'Inspect', icon: CheckCircle },
  { title: 'Deliver', icon: Globe2 },
]

export default function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Zova Organics',
    url: 'https://zovaorganics.com/about-us',
    description: 'Zova Organics is a GOTS-certified organic textile exporter...',
    mainEntity: {
      '@type': 'Organization',
      '@id': 'https://zovaorganics.com/#organization', // references your root org
      foundingDate: '2024',
      numberOfEmployees: { '@type': 'QuantitativeValue', value: 10 },
      knowsAbout: [
        'organic textiles',
        'GOTS certification',
        'textile export',
        'sustainable fashion',
      ],
    },
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <SectionHero
        eyebrow="About Zova Organics"
        title="Built on trust. Driven by craftsmanship."
        description="We connect global brands with responsibly sourced products from India, combining heritage craftsmanship with modern quality standards."
      />
      <Story />
      <Beliefs />
      <WhyIndia />
      <SectionHero
        eyebrow="How We Work"
        title="A streamlined process designed around reliability."
        description="A streamlined process designed around reliability."
      />
      <div className="container-zova">
        <FeatureList items={steps} />
      </div>
      <Values />
      <Vision />
      <PageCTA
        title="Ready to start your next project?"
        description="Discover how Zova Organics can bring your brand vision to life with premium, sustainable materials."
        buttonText="Contact Us"
        buttonHref="/contact"
      />
    </>
  )
}
