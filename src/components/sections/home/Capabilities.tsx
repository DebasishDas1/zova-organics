'use client'

const items = [
  {
    title: 'Sourcing',
    description: 'Carefully selected manufacturing partners and materials.',
  },
  {
    title: 'Production',
    description: 'Scalable manufacturing with rigorous quality standards.',
  },
  {
    title: 'Export Logistics',
    description: 'Reliable delivery and documentation for global markets.',
  },
]

export function Capabilities() {
  return (
    <section className="section-padding bg-secondary/40">
      <div className="container-zova">
        <div className="mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Capabilities
          </span>

          <h2 className="mt-4">Everything needed to move from concept to delivery.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-3xl bg-background p-8">
              <h3>{item.title}</h3>

              <p className="mt-4">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
