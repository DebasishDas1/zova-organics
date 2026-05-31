import { CertificationsCTA } from '@/components/sections/certifications/CertificationsCTA'
import { WhyCertifications } from '@/components/sections/certifications/WhyCertifications'
import { CertificationsGrid } from '@/components/sections/certifications/CertificationsGrid'
import { CertificationsHero } from '@/components/sections/certifications/CertificationsHero'
import { QualityCommitment } from '@/components/sections/certifications/QualityCommitment'

export const metadata = {
  title: 'Certifications - Zova Organics',
  description:
    'Explore the certifications and quality standards that support Zova Organics sustainable sourcing.',
}

export default async function CertificationsPage() {
  return (
    <>
      <CertificationsHero />
      <WhyCertifications />
      <CertificationsGrid />
      <QualityCommitment />
      <CertificationsCTA />
    </>
  )
}
