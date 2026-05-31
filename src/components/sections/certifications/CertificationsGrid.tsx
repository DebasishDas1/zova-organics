const certifications = [
  {
    name: 'GOTS',
    description: 'Global Organic Textile Standard for organic fibers and responsible processing.',
  },
  {
    name: 'OEKO-TEX',
    description: 'Independent testing for harmful substances in textile products.',
  },
  {
    name: 'ISO 9001',
    description: 'Quality management systems focused on consistency and continuous improvement.',
  },
]

import { Section, SectionHeader } from '@/components/ui/section'

export function CertificationsGrid() {
  return (
    <Section className="bg-secondary/30">
      <div className="container-zova">
        <SectionHeader
          label="Standards"
          title="Certifications we support and work with."
          className="mb-20"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {certifications.map((item) => (
            <div key={item.name} className="rounded-3xl bg-background p-8">
              <h3 className="text-2xl">{item.name}</h3>

              <p className="mt-4 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
