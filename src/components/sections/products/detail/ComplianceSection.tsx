import { SectionHeader } from '@/components/ui/section'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Certification } from '@/payload-types'
import { ShieldCheck } from 'lucide-react'

type ComplianceSectionProps = {
  certs: Certification[]
}

export function ComplianceSection({ certs }: ComplianceSectionProps) {
  return (
    <section className="space-y-6 py-10">
      <SectionHeader icon={ShieldCheck} title="Compliance & Certifications" />

      <Card>
        <CardContent className="flex flex-wrap gap-3 p-6">
          {certs.map((cert) => (
            <Badge key={cert.id} variant="secondary" className="rounded-full px-4 py-1">
              {cert.shortCode}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}
