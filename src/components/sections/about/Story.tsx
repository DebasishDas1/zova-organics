export function Story() {
  return (
    <section className="section-padding">
      <div className="container-zova">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Our Story
            </span>
          </div>

          <div className="lg:col-span-9">
            <h2 className="max-w-5xl text-balance">
              Global sourcing should feel transparent, human, and dependable.
            </h2>

            <p className="mt-10 max-w-3xl text-xl text-foreground">
              Zova Organics was founded with a simple belief: exceptional products begin with
              exceptional relationships.
            </p>

            <p className="mt-6 max-w-3xl text-xl text-foreground">
              We work closely with trusted manufacturing partners across India to deliver
              sustainable textile and lifestyle products that meet international expectations while
              preserving the craftsmanship behind every product.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
