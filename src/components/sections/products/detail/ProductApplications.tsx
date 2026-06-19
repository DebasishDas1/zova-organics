import { Building2, Flower2, Gift, Hotel, ShoppingBag, Store } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

import { SectionHeader } from '@/components/ui/section'

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
    <section className="space-y-8">
      <SectionHeader
        label="Applications"
        title="Built for modern sustainable brands."
        description="Designed for a wide range of industries, retail programs and private-label manufacturing partnerships."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {applications.map((item) => {
          const Icon = item.icon

          return (
            <Card
              key={item.title}
              className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <Icon className="size-5 text-primary" />
                </div>

                <CardTitle>{item.title}</CardTitle>

                <CardDescription>{item.description}</CardDescription>
              </CardHeader>

              <CardContent />
            </Card>
          )
        })}
      </div>
    </section>
  )
}
