const steps = ['Discover', 'Source', 'Produce', 'Inspect', 'Deliver']

export function HowWeWork() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-zova">
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          How We Work
        </span>

        <h2 className="mt-4 mb-16">A streamlined process designed around reliability.</h2>

        <div className="grid gap-6 md:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step} className="rounded-3xl bg-background p-8">
              <div className="text-sm text-muted-foreground">
                {String(index + 1).padStart(2, '0')}
              </div>

              <h3 className="mt-4 text-2xl">{step}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
