import { SectionHeader } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Product } from '@/payload-types'
import { DollarSign } from 'lucide-react'

type PricingSectionProps = {
  product: Product
}

export function PricingSection({ product }: PricingSectionProps) {
  const tiers = product.pricing?.tiers ?? []

  return (
    <section className="space-y-6">
      <SectionHeader
        icon={DollarSign}
        title="Pricing"
        description="Indicative export pricing based on volume."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {tiers.map((tier) => (
          <Card key={`${tier.minQty}-${tier.maxQty}`} className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardDescription>Quantity Range</CardDescription>

              <CardTitle>
                {tier.minQty.toLocaleString()}
                {tier.maxQty ? ` - ${tier.maxQty.toLocaleString()}` : '+'}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-4xl font-bold">${tier.pricePerUnit.toFixed(2)}</p>

              <p className="text-sm text-muted-foreground">per {tier.unit ?? 'unit'}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
