import { Globe2, Leaf, Package, Sparkles } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/section'

const reasons = [
  {
    title: 'Private Label Manufacturing',
    description: 'Launch products under your own brand with trusted manufacturing partners.',
    icon: Package,
  },
  {
    title: 'Custom Product Development',
    description: 'Develop tailored products designed around your business needs.',
    icon: Sparkles,
  },
  {
    title: 'Sustainable Sourcing',
    description: 'Access ethically sourced textiles and lifestyle products from India.',
    icon: Leaf,
  },
  {
    title: 'Global Export Support',
    description: 'From documentation to logistics, we help simplify international trade.',
    icon: Globe2,
  },
]

export function WhyContact() {
  return (
    <Section className="bg-secondary">
      <div className="container-zova">
        <div className="max-w-4xl">
          <SectionHeader
            label="How We Can Help"
            title="More than a supplier. A sourcing partner."
            className="mb-0"
          />
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {reasons.map((reason) => {
            const Icon = reason.icon

            return (
              <div key={reason.title} className="rounded-3xl bg-white p-8">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/80">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                <h3 className="text-xl font-medium">{reason.title}</h3>
                <p className="mt-4 text-muted-foreground">{reason.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
