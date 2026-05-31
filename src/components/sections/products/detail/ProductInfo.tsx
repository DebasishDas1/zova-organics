import Link from 'next/link'
import { Package, Clock, ArrowRight } from 'lucide-react'

import type { Product, Certification } from '@/payload-types'

type Props = {
  product: Product
  certs:   Certification[]
}

const INCOTERM_LABEL: Record<string, string> = {
  FOB: 'FOB – Free on Board',
  CIF: 'CIF – Cost, Insurance & Freight',
  DDP: 'DDP – Delivered Duty Paid',
  EXW: 'EXW – Ex Works',
}

export function ProductInfo({ product, certs }: Props) {
  const pricing  = product.pricing
  const ordering = product.ordering
  const tiers    = pricing?.tiers ?? []

  return (
    <div className="flex flex-col gap-6">

      {/* Category + SKU */}
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {product.category.replace(/-/g, ' ')}
        </span>
        <span className="text-xs text-muted-foreground">SKU: {product.sku}</span>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-3xl font-medium leading-tight">{product.title}</h1>
        {product.shortDescription && (
          <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
            {product.shortDescription}
          </p>
        )}
      </div>

      {/* Cert badges */}
      {certs.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {certs.map((cert) => (
            <span
              key={cert.id}
              className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
            >
              {cert.shortCode}
            </span>
          ))}
        </div>
      )}

      {/* Price tiers */}
      {tiers.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Price tiers ({pricing?.currency ?? 'USD'} · {pricing?.incoterm ?? 'FOB'} {pricing?.port})
          </p>
          <div className="grid grid-cols-3 gap-2">
            {tiers.map((tier, i) => {
              const isHighlighted = i === 1 || (tiers.length === 1)
              return (
                <div
                  key={i}
                  className={[
                    'rounded-xl border p-3 text-center transition-colors',
                    isHighlighted
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border bg-background',
                  ].join(' ')}
                >
                  <p className={[
                    'text-[10px] font-medium',
                    isHighlighted ? 'text-background/70' : 'text-muted-foreground',
                  ].join(' ')}>
                    {tier.minQty.toLocaleString()}
                    {tier.maxQty ? `–${tier.maxQty.toLocaleString()}` : '+'}
                    {' '}{tier.unit ?? 'units'}
                  </p>
                  <p className="mt-1 text-base font-semibold">
                    ${tier.pricePerUnit.toFixed(2)}
                  </p>
                </div>
              )
            })}
          </div>
          {pricing?.incoterm && (
            <p className="mt-2 text-xs text-muted-foreground">
              {INCOTERM_LABEL[pricing.incoterm] ?? pricing.incoterm}
            </p>
          )}
        </div>
      )}

      {/* MOQ + lead time */}
      <div className="flex gap-6">
        {ordering?.moq && (
          <div className="flex items-start gap-2">
            <Package className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Min. order</p>
              <p className="text-sm font-medium">
                {ordering.moq.toLocaleString()} {ordering.moqUnit ?? 'units'}
              </p>
            </div>
          </div>
        )}
        {ordering?.leadTimeDays && (
          <div className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Lead time</p>
              <p className="text-sm font-medium">{ordering.leadTimeDays}</p>
            </div>
          </div>
        )}
        {ordering?.sampleAvailable && (
          <div>
            <p className="text-xs text-muted-foreground">Sample</p>
            <p className="text-sm font-medium">
              Available · {ordering.sampleLeadTime ?? 'enquire'}
            </p>
          </div>
        )}
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <Link
          href={`/contact?product=${product.slug}&type=rfq`}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
        >
          Request a quote
          <ArrowRight className="h-4 w-4" />
        </Link>
        {ordering?.sampleAvailable && (
          <Link
            href={`/contact?product=${product.slug}&type=sample`}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary"
          >
            Request a sample
          </Link>
        )}
      </div>

    </div>
  )
}
