import { CertificationsGrid } from '@/components/sections/certifications/CertificationsGrid'
import { QualityCommitment } from '@/components/sections/certifications/QualityCommitment'
import { SupplierVerification } from '@/components/sections/certifications/SupplierVerification'
import { PageCTA } from '@/components/sections/sheared/PageCTA'

import { SectionHero } from '@/components/sections/sheared/SectionHero'
import { Section, SectionHeader } from '@/components/ui/section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Certifications — GOTS, OEKO-TEX, Zova Organic',
  description:
    'Zova Organics holds GOTS 6.0, OEKO-TEX Standard 100, and India Organic (NPOP) certifications. Download our certification documents.',
  alternates: { canonical: 'https://zovaorganics.com/certifications' },
  openGraph: {
    title: 'Our Certifications — GOTS, OEKO-TEX, Zova Organic',
    description:
      'Zova Organics holds GOTS 6.0, OEKO-TEX Standard 100, and India Organic (NPOP) certifications. Download our certification documents.',
    url: 'https://zovaorganics.com/certifications',
    type: 'website',
  },
}

const certificationsSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Zova Organics Certifications',
  specialty: 'Organic textile certifications',
  mainEntity: {
    '@type': 'Organization',
    '@id': 'https://zovaorganics.com/#organization',
    hasCertification: [
      {
        '@type': 'Certification',
        name: 'GOTS — Global Organic Textile Standard',
        url: 'https://www.global-standard.org',
        validFrom: '2024-01-01',
        validThrough: '2025-12-31',
      },
      {
        '@type': 'Certification',
        name: 'OEKO-TEX Standard 100',
        url: 'https://www.oeko-tex.com',
      },
    ],
  },
}

// Also add FAQPage schema here — huge for AI visibility
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Zova Organics GOTS certified?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Zova Organics holds a valid GOTS 6.0 certification covering organic cotton fabric products including tote bags, pouches, and fabric rolls.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I download Zova Organics certification documents?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All certification PDFs are available for download on this page, including GOTS and OEKO-TEX certificates.',
      },
    },
  ],
}

export default function CertificationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(certificationsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SectionHero
        eyebrow="Certifications & Standards"
        title="Trust is built through transparency."
        description="We work with manufacturers and partners who meet globally recognized standards for sustainability, safety, quality, and ethical production."
      />

      <Section className="container-zova section-padding">
        <SectionHeader
          label="Why It Matters"
          title="Every certification represents a commitment to doing things the right way."
          description="Today’s consumers expect more than quality. They expect transparency, responsible sourcing, environmental stewardship, and ethical production. Certifications help verify those commitments across every stage of the supply chain."
          className="mb-0"
          titleClassName="max-w-4xl text-balance"
          descriptionClassName="mt-8 max-w-3xl"
        />
      </Section>

      <CertificationsGrid />

      <QualityCommitment />

      <SupplierVerification />

      <PageCTA
        title="Ready to work with certified partners?"
        description="Explore our range of GOTS-certified products and custom manufacturing solutions."
        buttonText="View Products"
        buttonHref="/products"
      />
    </>
  )
}
