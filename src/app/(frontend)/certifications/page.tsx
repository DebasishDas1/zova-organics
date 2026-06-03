import { CertificationsCTA } from '@/components/sections/certifications/CertificationsCTA'
import { CertificationsGrid } from '@/components/sections/certifications/CertificationsGrid'
import { QualityCommitment } from '@/components/sections/certifications/QualityCommitment'
import { SupplierVerification } from '@/components/sections/certifications/SupplierVerification'

import { SectionHero } from '@/components/sections/sheared/SectionHero'
import { Section, SectionHeader } from '@/components/ui/section'

export const metadata = {
  title: 'Certifications | Zova Organics',
  description:
    'International certifications, responsible sourcing standards, and quality assurance practices behind every Zova Organics product.',
}

export default function CertificationsPage() {
  return (
    <>
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

      <CertificationsCTA />
    </>
  )
}
