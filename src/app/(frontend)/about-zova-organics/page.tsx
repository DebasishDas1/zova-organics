import type { Metadata } from 'next'
import { JsonLd } from '@/components/sections/sheared/JsonLd'
import { PageCTA } from '@/components/sections/sheared/PageCTA'
import { SectionHero } from '@/components/sections/sheared/SectionHero'

export const metadata: Metadata = {
  title: 'About Zova Organics | Organic Cotton Bag Manufacturer & Exporter from India',
  description:
    'Zova Organics is an Indian manufacturer and exporter of organic cotton bags, canvas bags, tote bags, and sustainable textile products serving brands, wholesalers, and distributors worldwide.',
  keywords: [
    'organic cotton bag manufacturer',
    'organic cotton bag exporter india',
    'canvas bag manufacturer india',
    'tote bag supplier',
    'private label cotton bags',
    'sustainable textile exporter',
    'eco-friendly bags manufacturer',
    'OEM bag manufacturer',
  ],
  alternates: {
    canonical: 'https://zovaorganics.com/about-zova-organics',
  },
  openGraph: {
    title: 'About Zova Organics | Organic Cotton Bag Manufacturer & Exporter from India',
    description:
      'Manufacturer and exporter of sustainable textile products including organic cotton bags, canvas bags, tote bags, and custom private-label solutions.',
    url: 'https://zovaorganics.com/about-zova-organics',
    type: 'website',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Zova Organics',
  url: 'https://zovaorganics.com',
  logo: 'https://zovaorganics.com/logo.png',
  description: 'Manufacturer and exporter of sustainable textile products from India.',
  areaServed: ['United States', 'United Kingdom', 'Germany', 'France', 'Canada', 'Australia'],
  knowsAbout: [
    'Organic Cotton Bags',
    'Canvas Bags',
    'Tote Bags',
    'Private Label Manufacturing',
    'OEM Manufacturing',
    'Sustainable Packaging',
    'Textile Export',
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does Zova Organics manufacture?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zova Organics manufactures organic cotton bags, canvas bags, tote bags, drawstring bags, and sustainable textile products.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Zova Organics export internationally?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Zova Organics supplies products to brands, wholesalers, distributors, and retailers worldwide.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer private label manufacturing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We provide OEM, ODM, and private label manufacturing services.',
      },
    },
  ],
}

export default function AboutZovaOrganicsPage() {
  return (
    <>
      <JsonLd schema={organizationSchema} />
      <JsonLd schema={faqSchema} />

      <SectionHero
        eyebrow="About Zova Organics"
        title="Sustainable Textile Manufacturing from India"
        description="Zova Organics partners with global brands, wholesalers, and distributors to manufacture sustainable textile products with a focus on quality, reliability, and responsible sourcing."
      />

      <section className="container-zova py-20">
        <div className="mx-auto max-w-4xl space-y-12">
          <div>
            <h2 className="mb-4 text-3xl font-bold">Who We Are</h2>
            <p>
              Zova Organics is an Indian manufacturer and exporter of sustainable textile products.
              We specialize in organic cotton bags, canvas bags, tote bags, promotional bags, and
              custom private-label solutions for businesses worldwide.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold">Our Products</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Organic Cotton Tote Bags</li>
              <li>Canvas Tote Bags</li>
              <li>Drawstring Bags</li>
              <li>Promotional Bags</li>
              <li>Custom Printed Bags</li>
              <li>Private Label Bags</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold">Manufacturing Services</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>OEM Manufacturing</li>
              <li>ODM Manufacturing</li>
              <li>Private Label Production</li>
              <li>Custom Packaging Solutions</li>
              <li>Bulk Export Orders</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold">Export Markets</h2>
            <p>
              We serve brands, wholesalers, retailers, and distributors across North America,
              Europe, Australia, and other international markets.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>United States</li>
              <li>United Kingdom</li>
              <li>Germany</li>
              <li>France</li>
              <li>Canada</li>
              <li>Australia</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold">Why Businesses Choose Zova Organics</h2>

            <ul className="list-disc space-y-2 pl-6">
              <li>Sustainable and responsibly sourced materials</li>
              <li>Reliable manufacturing and quality control</li>
              <li>Private label and OEM capabilities</li>
              <li>Global export experience</li>
              <li>Flexible production support</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold">Frequently Asked Questions</h2>

            <h3 className="mb-2 text-xl font-semibold">
              What products does Zova Organics manufacture?
            </h3>

            <p>
              Organic cotton bags, canvas bags, tote bags, drawstring bags, and other sustainable
              textile products.
            </p>

            <h3 className="mb-2 mt-8 text-xl font-semibold">Do you export internationally?</h3>

            <p>Yes. We export to businesses and brands worldwide.</p>

            <h3 className="mb-2 mt-8 text-xl font-semibold">
              Do you offer private label manufacturing?
            </h3>

            <p>Yes. We support OEM, ODM, and private-label manufacturing projects.</p>
          </div>
        </div>
      </section>

      <PageCTA
        title="Looking for a reliable manufacturing partner?"
        description="Talk with our team about custom manufacturing, private labeling, and export opportunities."
        buttonText="Request a Quote"
        buttonHref="/contact"
      />
    </>
  )
}
