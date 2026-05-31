const features = [
  'Ethical Production',
  'Premium Materials',
  'Reliable Manufacturing',
  'Global Export Expertise',
  'Quality Assurance',
  'Long-Term Partnerships',
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
            {features.map((feature) => (
              <div key={feature} className="border-b pb-6 text-xl">
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
