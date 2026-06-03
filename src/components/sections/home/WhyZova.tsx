import { BadgeCheck, Leaf, Globe2, ShieldCheck, Package, Handshake } from 'lucide-react'

const features = [
  { title: 'Ethical Production', icon: Leaf },
  { title: 'Premium Materials', icon: ShieldCheck },
  { title: 'Reliable Manufacturing', icon: Package },
  { title: 'Global Export Expertise', icon: Globe2 },
  { title: 'Quality Assurance', icon: BadgeCheck },
  { title: 'Long-Term Partnerships', icon: Handshake },
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

            <h2 className="mt-4">Built around trust, quality and consistency.</h2>
          </div>

          <div className="space-y-6">
            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <div key={feature.title} className="flex items-center gap-4 border-b pb-6 text-2xl">
                  <Icon className="h-5 w-5 text-primary" />

                  <span>{feature.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
