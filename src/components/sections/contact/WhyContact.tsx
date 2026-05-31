const reasons = [
  {
    title: 'Private Label Manufacturing',
    description: 'Launch products under your own brand with trusted manufacturing partners.',
  },
  {
    title: 'Custom Product Development',
    description: 'Develop tailored products designed around your business needs.',
  },
  {
    title: 'Sustainable Sourcing',
    description: 'Access ethically sourced textiles and lifestyle products from India.',
  },
  {
    title: 'Global Export Support',
    description: 'From documentation to logistics, we help simplify international trade.',
  },
]

import { Section, SectionHeader } from '@/components/ui/section'

export function WhyContact() {
  return (
    <Section className="bg-secondary/30">
      <div className="container-zova">
        <div className="max-w-4xl">
          <SectionHeader
            label="How We Can Help"
            title="More than a supplier. A sourcing partner."
            className="mb-0"
          />
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {reasons.map((reason) => (
            <div key={reason.title} className="rounded-3xl bg-background p-8">
              <h3 className="text-xl font-medium">{reason.title}</h3>

              <p className="mt-4 text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
