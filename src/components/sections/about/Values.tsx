const values = ['Reliability', 'Responsibility', 'Consistency', 'Partnership']

export function Values() {
  return (
    <section className="section-padding">
      <div className="container-zova">
        <div className="max-w-5xl">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Values</span>

          <h2 className="mt-4 text-balance">
            We choose long-term relationships over short-term transactions.
          </h2>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {values.map((value) => (
            <div key={value} className="rounded-3xl border p-8 text-2xl">
              {value}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
