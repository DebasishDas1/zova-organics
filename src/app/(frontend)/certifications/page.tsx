import { CertificationsCTA } from '@/components/sections/certifications/CertificationsCTA'
import { WhyCertifications } from '@/components/sections/certifications/WhyCertifications'
import { CertificationsGrid } from '@/components/sections/certifications/CertificationsGrid'
import { CertificationsHero } from '@/components/sections/certifications/CertificationsHero'
import { QualityCommitment } from '@/components/sections/certifications/QualityCommitment'

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
