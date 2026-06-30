import { Building2, Flower2, Gift, Hotel, ShoppingBag, Store } from 'lucide-react'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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
    <section className="space-y-12">
      <SectionHeader
        label="Applications"
        title="Built for modern sustainable brands."
        description="Designed for a wide range of industries, retail programs and private-label manufacturing partnerships."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {applications.map(({ title, description, icon: Icon }) => (
          <Card
            key={title}
            className="group h-full rounded-3xl border border-border/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl"
          >
            <CardHeader className="flex h-full flex-col items-center p-6 text-center sm:items-start sm:text-left">
              <div className="flex size-14 items-center justify-center rounded-full border border-border bg-primary/5 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/10">
                <Icon className="size-6 text-primary" />
              </div>

              <CardTitle className="mt-6 text-xl font-semibold tracking-tight">{title}</CardTitle>

              <CardDescription className="mt-3 text-base leading-7 text-muted-foreground">
                {description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}
