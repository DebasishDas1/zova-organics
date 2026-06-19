import { Clock3, Globe2, Package, Ship } from 'lucide-react'

import type { Product } from '@/payload-types'
import { SectionHeader } from '@/components/ui/section'
import { DataCard } from './DataCard'
import { Card, CardContent } from '@/components/ui/card'

type ExportSectionProps = {
  product: Product
}

export function ExportSection({ product }: ExportSectionProps) {
  return (
    <section className="space-y-6">
      <SectionHeader
        icon={Globe2}
        title="Export Information"
        description="Logistics and ordering information for international buyers."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <DataCard
          icon={Package}
          label="Minimum Order Quantity"
          value={
            product.ordering?.moq
              ? `${product.ordering.moq.toLocaleString()} ${product.ordering.moqUnit ?? ''}`
              : '-'
          }
        />

        <DataCard
          icon={Clock3}
          label="Lead Time"
          value={product.ordering?.leadTimeDays ? `${product.ordering.leadTimeDays} Days` : '-'}
        />

        <DataCard icon={Ship} label="Incoterm" value={product.pricing?.incoterm} />

        <DataCard icon={Globe2} label="Export Markets" value="Worldwide" />
      </div>

      {(product.pricing?.port || product.ordering?.sampleAvailable) && (
        <Card>
          <CardContent className="flex flex-wrap gap-3 p-6">
            {product.pricing?.port && (
              <span className="rounded-full border px-3 py-1 text-sm">
                Port: {product.pricing.port}
              </span>
            )}

            {product.ordering?.sampleAvailable && (
              <span className="rounded-full border px-3 py-1 text-sm">Samples Available</span>
            )}
          </CardContent>
        </Card>
      )}
    </section>
  )
}
