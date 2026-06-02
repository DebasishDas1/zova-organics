import { ShoppingBag, Gift, Building2, Flower2, Hotel, Store } from 'lucide-react'

const applications = [
  {
    title: 'Retail Brands',
    description: 'Organic textile collections and sustainable product lines.',
    icon: Store,
  },
  {
    title: 'Corporate Gifting',
    description: 'Custom branded bags, pouches and accessories.',
    icon: Gift,
  },
  {
    title: 'Hotels & Resorts',
    description: 'Eco-friendly guest amenities and textile solutions.',
    icon: Hotel,
  },
  {
    title: 'Promotional Merchandise',
    description: 'Trade shows, events and marketing campaigns.',
    icon: ShoppingBag,
  },
  {
    title: 'Yoga & Wellness',
    description: 'Yoga bags, meditation accessories and wellness products.',
    icon: Flower2,
  },
  {
    title: 'Private Label',
    description: 'OEM manufacturing with custom branding options.',
    icon: Building2,
  },
]

export function ProductApplications() {
  return (
    <section>
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Applications</p>

        <h2 className="mt-3 text-3xl font-medium md:text-4xl">
          Built for modern sustainable brands.
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {applications.map((item) => (
          <div
            key={item.title}
            className="group rounded-3xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <item.icon className="mb-5 h-6 w-6 text-primary" />

            <h3 className="mb-2 text-lg font-medium">{item.title}</h3>

            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
