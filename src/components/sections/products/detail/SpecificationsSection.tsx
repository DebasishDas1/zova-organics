import { Layers3, Package, Ruler } from 'lucide-react'

import type { Product } from '@/payload-types'

import { SectionHeader } from '@/components/ui/section'
import { DataCard } from './DataCard'

type SpecificationsSectionProps = {
  product: Product
}

export function SpecificationsSection({ product }: SpecificationsSectionProps) {
  return (
    <section className="space-y-6">
      <SectionHeader
        icon={Package}
        title="Specifications"
        description="Technical details and product characteristics."
      />

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
        <DataCard icon={Package} label="Material" value={product.specifications?.material} />

        <DataCard icon={Layers3} label="GSM" value={product.specifications?.gsm} />

        <DataCard icon={Ruler} label="Dimensions" value={product.specifications?.dimensions} />
      </div>
    </section>
  )
}
