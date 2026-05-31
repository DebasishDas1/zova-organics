export function Vision() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-zova">
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Looking Ahead
        </span>

        <h2 className="mt-4 max-w-5xl text-balance">
          Expanding opportunities through responsibly sourced products.
        </h2>

        <div className="mt-12 max-w-3xl">
          <p className="text-xl text-foreground">
            Today our focus is on textiles, bags, and sustainable lifestyle products.
          </p>

          <p className="mt-6 text-xl text-foreground">
            Tomorrow we envision a broader portfolio that showcases the best of India to global
            markets, from tea and spices to honey and thoughtfully crafted consumer goods.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap gap-4">
          {['Tea', 'Spices', 'Honey', 'Lifestyle Products'].map((item) => (
            <span key={item} className="rounded-full border px-6 py-3">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
