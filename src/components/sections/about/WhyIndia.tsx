const strengths = [
  'Organic Textiles',
  'Natural Fibers',
  'Skilled Artisans',
  'Scalable Manufacturing',
]

export function WhyIndia() {
  return (
    <section className="section-padding">
      <div className="container-zova">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Why India
            </span>

            <h2 className="mt-4">Heritage, innovation, and manufacturing excellence.</h2>
          </div>

          <div>
            <p className="text-xl text-foreground">
              India offers one of the world's most diverse manufacturing ecosystems. From organic
              cotton farms to highly skilled textile artisans, it combines centuries of
              craftsmanship with modern production capabilities.
            </p>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {strengths.map((item) => (
                <div key={item} className="rounded-2xl border p-6">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
