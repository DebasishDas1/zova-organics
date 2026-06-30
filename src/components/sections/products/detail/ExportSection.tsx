import { Globe2, Package } from 'lucide-react'

import type { Product } from '@/payload-types'
import { SectionHeader } from '@/components/ui/section'
import { DataCard } from './DataCard'

type ExportSectionProps = {
  product: Product
}

export function ExportSection({ product }: ExportSectionProps) {
  const export_info = [
    {
      icon: Globe2,
      label: 'Export Markets',
      value: 'Worldwide',
    },
    {
      icon: Package,
      label: 'Minimum Order Quantity',
      value: product.ordering?.moq
        ? `${product.ordering.moq.toLocaleString()} ${product.ordering.moqUnit ?? ''}`
        : '-',
    },
  ]

  return (
    <section className="space-y-6">
      <SectionHeader
        icon={Globe2}
        title="Export Information"
        description="Logistics and ordering information for international buyers."
      />

      <div className="grid gap-4 grid-cols-2">
        {export_info.map((item) => {
          return <DataCard key={item.label} {...item} />
        })}
      </div>
    </section>
  )
}
