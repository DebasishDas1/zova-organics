import { BadgeCheck, Leaf, ShieldCheck } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/section'

const certifications = [
  {
    name: 'GOTS',
    description: 'Global Organic Textile Standard for organic fibers and responsible processing.',
    icon: Leaf,
  },
  {
    name: 'OEKO-TEX',
    description: 'Independent testing for harmful substances in textile products.',
    icon: ShieldCheck,
  },
  {
    name: 'ISO 9001',
    description: 'Quality management systems focused on consistency and continuous improvement.',
    icon: BadgeCheck,
  },
]

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
          {certifications.map((item) => {
            const Icon = item.icon

            return (
              <div key={item.name} className="rounded-3xl bg-white p-8">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/80">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                <h3 className="text-2xl">{item.name}</h3>

                <p className="mt-4 text-muted-foreground">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
