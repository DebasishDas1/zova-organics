const steps = ['Discovery', 'Sampling', 'Production', 'Quality Check', 'Global Delivery']

export function Process() {
  return (
    <section className="section-padding">
      <div className="container-zova">
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Process</span>

        <h2 className="mt-4 mb-16">A simple path from inquiry to delivery.</h2>

        <div className="grid gap-6 md:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step} className="rounded-3xl border p-8">
              <span className="text-sm text-muted-foreground">
                {String(index + 1).padStart(2, '0')}
              </span>

              <h3 className="mt-4 text-xl">{step}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
