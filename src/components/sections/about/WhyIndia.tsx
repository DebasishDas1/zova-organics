import { Leaf, Users, Factory } from 'lucide-react'

const strengths = [
  { title: 'Organic Textiles', icon: Leaf },
  { title: 'Natural Fibers', icon: Leaf },
  { title: 'Skilled Artisans', icon: Users },
  { title: 'Scalable Manufacturing', icon: Factory },
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
              India offers one of the world&apos;s most diverse manufacturing ecosystems. From
              organic cotton farms to highly skilled textile artisans, it combines centuries of
              craftsmanship with modern production capabilities.
            </p>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {strengths.map((item) => {
                const Icon = item.icon

                return (
                  <div key={item.title} className="r p-6">
                    <Icon className="size-10 text-primary" />
                    <span className="text-xl font-semibold pt-4">{item.title}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
