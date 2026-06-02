import { CertificationsCTA } from '@/components/sections/certifications/CertificationsCTA'
import { WhyCertifications } from '@/components/sections/certifications/WhyCertifications'
import { CertificationsGrid } from '@/components/sections/certifications/CertificationsGrid'
import { QualityCommitment } from '@/components/sections/certifications/QualityCommitment'
import { SectionHero } from '@/components/sections/sheared/SectionHero'

export const metadata = {
  title: 'Certifications - Zova Organics',
  description:
    'Explore the certifications and quality standards that support Zova Organics sustainable sourcing.',
}

export default async function CertificationsPage() {
  return (
    <>
      <SectionHero
        eyebrow="Certifications"
        title="Built around quality, sustainability, and trust."
        description="Every product we source is guided by internationally recognized standards and a commitment to responsible manufacturing."
      />
      <WhyCertifications />
      <CertificationsGrid />
      <QualityCommitment />
      <CertificationsCTA />
    </>
  )
}
