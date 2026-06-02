'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import type { Product, Certification } from '@/payload-types'

type ProductTabsProps = {
  product: Product
  certs: Certification[]
}

export function ProductTabs({ product, certs }: ProductTabsProps) {
  return (
    <section>
      <Tabs defaultValue="specifications" className="w-full">
        <TabsList className="mb-8 flex h-auto w-full flex-wrap justify-start gap-2 rounded-2xl bg-secondary p-2">
          <TabsTrigger value="specifications">Specifications</TabsTrigger>

          <TabsTrigger value="pricing">Pricing</TabsTrigger>

          <TabsTrigger value="customisation">Customisation</TabsTrigger>

          <TabsTrigger value="certifications">Certifications</TabsTrigger>

          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>

        <TabsContent value="specifications">
          <div className="rounded-3xl border p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <InfoRow label="Material" value={product.specifications?.material} />

              <InfoRow label="GSM" value={product.specifications?.gsm} />

              <InfoRow label="Dimensions" value={product.specifications?.dimensions} />

              <InfoRow label="Color" value={product.specifications?.colours} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pricing">
          <div className="grid gap-4 md:grid-cols-3">
            {product.pricing?.tiers?.map((tier, index) => (
              <div
                key={index}
                className="rounded-3xl border p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-sm text-muted-foreground">
                  {tier.minQty}
                  {tier.maxQty ? ` - ${tier.maxQty}` : '+'}
                </p>

                <h3 className="mt-2 text-3xl font-semibold">${tier.pricePerUnit}</h3>

                <p className="mt-2 text-xs text-muted-foreground">per {tier.unit}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="customisation">
          <div className="rounded-3xl border p-8">
            <ul className="space-y-3 text-muted-foreground">
              <li>✓ Custom logo printing</li>
              <li>✓ Custom sizing</li>
              <li>✓ Private label packaging</li>
              <li>✓ Hang tags & inserts</li>
              <li>✓ Color customization</li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="certifications">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {certs.map((cert) => (
              <div key={cert.id} className="rounded-3xl border p-6">
                <h3 className="font-medium">{cert.name}</h3>

                <p className="mt-2 text-sm text-muted-foreground">{cert.shortCode}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shipping">
          <div className="rounded-3xl border p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <InfoRow
                label="MOQ"
                value={`${product.ordering?.moq ?? '-'} ${product.ordering?.moqUnit ?? ''}`}
              />

              <InfoRow label="Lead Time" value={product.ordering?.leadTimeDays} />

              <InfoRow label="Incoterm" value={product.pricing?.incoterm} />

              <InfoRow label="Export" value="Worldwide" />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}

function InfoRow({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="border-b pb-4">
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="mt-1 font-medium">{value || '-'}</p>
    </div>
  )
}
