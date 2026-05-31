const beliefs = [
  {
    title: 'Transparency',
    description: 'Clear communication and complete visibility throughout the sourcing journey.',
  },
  {
    title: 'Quality',
    description: 'Products crafted to meet global standards without compromise.',
  },
  {
    title: 'Sustainability',
    description: 'Responsible sourcing practices designed for long-term impact.',
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
          {beliefs.map((belief) => (
            <div key={belief.title} className="rounded-3xl bg-background p-8">
              <h3>{belief.title}</h3>

              <p className="mt-4">{belief.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
