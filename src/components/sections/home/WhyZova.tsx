import { BadgeCheck, Leaf, Globe2, ShieldCheck, Package, Handshake } from 'lucide-react'

const features = [
  {
    title: 'Ethical Production',
    description: 'Socially responsible manufacturing from audited Indian suppliers.',
    icon: Leaf,
  },
  {
    title: 'Premium Jute & Organic Materials ',
    description: '00% natural, biodegradable jute and organic cotton — export quality.',
    icon: ShieldCheck,
  },
  {
    title: 'Reliable Manufacturing Partners',
    description: "Long-term relationships with Kolkata's top jute mills.",
    icon: Package,
  },
  {
    title: 'Global Export Expertise',
    description: 'Experienced in shipping to USA, UK, EU, Middle East & Asia Pacific.',
    icon: Globe2,
  },
  {
    title: 'Quality Assurance',
    description: 'Pre-shipment inspection, sample approval, and QC at every stage',
    icon: BadgeCheck,
  },
  {
    title: 'Long-Term Partnerships',
    description: 'We grow with your brand — from first sample to repeat container orders.',
    icon: Handshake,
  },
]

export function WhyZova() {
  return (
    <section className="section-padding">
      <div className="container-zova">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Why Zova
            </span>

            <h2 className="mt-4">Why Global Buyers Choose Zova Organics for Jute Bag Sourcing</h2>
          </div>

          <div className="space-y-6">
            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <div key={feature.title} className="space-y-4 border-b pb-6 text-2xl">
                  <div className="flex items-center gap-4">
                    <Icon className="h-5 w-5 text-primary" />

                    <span className="text-2xl font-semibold">{feature.title}</span>
                  </div>
                  <p>{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
