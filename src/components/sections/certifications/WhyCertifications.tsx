import { Section, SectionHeader } from '@/components/ui/section'

export function WhyCertifications() {
  return (
    <Section>
      <div className="container-zova">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionHeader
              label="Why It Matters"
              title="Certifications help ensure that products meet the expectations of modern consumers and global businesses."
              description="From sustainable sourcing to responsible production and product safety, certifications provide transparency and confidence across the supply chain."
              className="mb-0"
              titleClassName="max-w-4xl text-balance"
              descriptionClassName="mt-10 max-w-3xl text-xl text-foreground"
            />
          </div>
        </div>
      </div>
    </Section>
  )
}
