import { Handshake, ShieldCheck, Repeat, Users } from 'lucide-react'

const values = [
  { title: 'Reliability', icon: ShieldCheck },
  { title: 'Responsibility', icon: Repeat },
  { title: 'Consistency', icon: Handshake },
  { title: 'Partnership', icon: Users },
]

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
          {values.map((value) => {
            const Icon = value.icon

            return (
              <div key={value.title} className="rounded-3xl border p-8 text-2xl">
                <div className="flex items-center gap-4">
                  <Icon className="h-6 w-6 text-primary" />
                  <span>{value.title}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
