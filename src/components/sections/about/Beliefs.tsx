import { Eye, ShieldCheck, Leaf } from 'lucide-react'

const beliefs = [
  {
    title: 'Transparency',
    description: 'Clear communication and complete visibility throughout the sourcing journey.',
    icon: Eye,
  },
  {
    title: 'Quality',
    description: 'Products crafted to meet global standards without compromise.',
    icon: ShieldCheck,
  },
  {
    title: 'Sustainability',
    description: 'Responsible sourcing practices designed for long-term impact.',
    icon: Leaf,
  },
]

export function Beliefs() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-zova">
        <div className="mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            What We Believe
          </span>

          <h2 className="mt-4 max-w-4xl">The principles guiding every partnership.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {beliefs.map((belief) => {
            const Icon = belief.icon

            return (
              <div key={belief.title} className="rounded-3xl bg-background p-8">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/80">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                <h3>{belief.title}</h3>
                <p className="mt-4">{belief.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
