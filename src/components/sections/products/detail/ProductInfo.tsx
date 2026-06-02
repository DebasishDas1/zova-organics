import Link from 'next/link'
import { ArrowRight, Package, Clock3, BadgeCheck, Leaf, Globe } from 'lucide-react'

import type { Product, Certification } from '@/payload-types'

type Props = {
  product: Product
  certs: Certification[]
}

const CATEGORY_LABELS: Record<string, string> = {
  'organic-fabrics': 'Organic Fabrics',
  bags: 'Bags',
  pouches: 'Pouches',
  'home-textiles': 'Home Textiles',
  'yoga-wellness': 'Yoga & Wellness',
  'custom-oem': 'Custom OEM',
}

export function ProductInfo({ product, certs }: Props) {
  const pricing = product.pricing
  const ordering = product.ordering
  const tiers = pricing?.tiers ?? []

  const lowestPrice = tiers.length > 0 ? Math.min(...tiers.map((t) => t.pricePerUnit)) : null

  return (
    <div className="flex flex-col">
      {/* Category */}
      <p className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
        {CATEGORY_LABELS[product.category] ?? product.category}
      </p>

      {/* Title */}
      <h1 className="mt-4 text-4xl font-medium leading-[1.05] md:text-5xl">{product.title}</h1>

      {/* Description */}
      {product.shortDescription && (
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>
      )}

      {/* Trust badges */}
      <div className="mt-8 flex flex-wrap gap-2">
        {certs.map((cert) => (
          <span
            key={cert.id}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium"
          >
            <BadgeCheck className="h-3.5 w-3.5" />
            {cert.shortCode}
          </span>
        ))}
      </div>

      {/* Highlights */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {ordering?.moq && (
          <div className="rounded-2xl border bg-card p-4">
            <Package className="mb-3 h-5 w-5 text-muted-foreground" />

            <p className="text-xs uppercase tracking-wider text-muted-foreground">MOQ</p>

            <p className="mt-1 text-lg font-medium">{ordering.moq.toLocaleString()}</p>
          </div>
        )}

        {ordering?.leadTimeDays && (
          <div className="rounded-2xl border bg-card p-4">
            <Clock3 className="mb-3 h-5 w-5 text-muted-foreground" />

            <p className="text-xs uppercase tracking-wider text-muted-foreground">Lead Time</p>

            <p className="mt-1 text-lg font-medium">{ordering.leadTimeDays} days</p>
          </div>
        )}

        <div className="rounded-2xl border bg-card p-4">
          <Globe className="mb-3 h-5 w-5 text-muted-foreground" />

          <p className="text-xs uppercase tracking-wider text-muted-foreground">Shipping</p>

          <p className="mt-1 text-lg font-medium">Worldwide</p>
        </div>
      </div>

      {/* Pricing */}
      {lowestPrice && (
        <div className="mt-10 border-t pt-8">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Starting from</p>

          <div className="mt-2 flex items-end gap-3">
            <span className="text-5xl font-medium">${lowestPrice.toFixed(2)}</span>

            <span className="pb-2 text-muted-foreground">/ unit</span>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            FOB India • Bulk export pricing • Volume discounts available
          </p>
        </div>
      )}

      {/* Sustainability */}
      <div className="mt-10 rounded-3xl border bg-secondary/40 p-6">
        <div className="flex items-start gap-4">
          <Leaf className="mt-1 h-5 w-5 shrink-0" />

          <div>
            <h3 className="font-medium">Sustainably sourced</h3>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Manufactured in India using certified organic materials and ethical production
              practices. Ideal for brands seeking sustainable supply chains and private label
              partnerships.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href={`/contact?product=${product.slug}&type=rfq`}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Request Pricing
          <ArrowRight className="h-4 w-4" />
        </Link>

        {ordering?.sampleAvailable && (
          <Link
            href={`/contact?product=${product.slug}&type=sample`}
            className="inline-flex flex-1 items-center justify-center rounded-full border px-8 py-4 text-sm font-medium transition-colors hover:bg-secondary"
          >
            Order Sample
          </Link>
        )}
      </div>

      {/* Meta */}
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
        {product.sku && <span>SKU: {product.sku}</span>}
        {pricing?.incoterm && <span>{pricing.incoterm}</span>}
        {pricing?.port && <span>{pricing.port}</span>}
      </div>
    </div>
  )
}
