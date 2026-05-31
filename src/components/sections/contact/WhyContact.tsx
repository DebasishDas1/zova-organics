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

export function WhyContact() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-zova">
        <div className="max-w-4xl">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            How We Can Help
          </span>

          <h2 className="mt-4">
            More than a supplier.
            <br />A sourcing partner.
          </h2>
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
    </section>
  )
}
