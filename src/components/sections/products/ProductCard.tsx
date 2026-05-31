import Link from 'next/link'
import Image from 'next/image'
import { Package, Clock, ArrowUpRight } from 'lucide-react'

import type { Product, Media, Certification } from '@/payload-types'

type ProductCardProps = {
  product: Product
}

const CATEGORY_LABELS: Record<string, string> = {
  'organic-fabrics': 'Organic Fabrics',
  bags: 'Bags',
  pouches: 'Pouches',
  'home-textiles': 'Home Textiles',
  'yoga-wellness': 'Yoga & Wellness',
  'custom-oem': 'Custom / OEM',
}

export function ProductCard({ product }: ProductCardProps) {
  const image = typeof product.featuredImage === 'object' ? (product.featuredImage as Media) : null

  const certs = (product.certifications ?? [])
    .map((c) => (typeof c === 'object' ? (c as Certification) : null))
    .filter(Boolean) as Certification[]

  const tiers = product.pricing?.tiers ?? []
  const lowestTier = tiers.reduce<(typeof tiers)[number] | null>(
    (min, t) => (min === null || t.pricePerUnit < min.pricePerUnit ? t : min),
    null,
  )

  const moq = product.ordering?.moq
  const moqUnit = product.ordering?.moqUnit ?? 'units'
  const lead = product.ordering?.leadTimeDays
  const incoterm = product.pricing?.incoterm ?? 'FOB'

  const isActive = product.status === 'active'
  const isOutOfStock = product.status === 'out-of-stock'

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      {/* Image */}
      <div className="relative overflow-hidden rounded-2xl bg-secondary">
        <Image
          src={image?.url ?? '/placeholder.jpg'}
          alt={image?.alt || product.title}
          width={800}
          height={800}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="aspect-square object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Status badge */}
        {isOutOfStock && (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            Out of stock
          </span>
        )}

        {/* Cert badges — top right */}
        {certs.length > 0 && (
          <div className="absolute right-3 top-3 flex flex-col gap-1">
            {certs.slice(0, 2).map((cert) => (
              <span
                key={cert.id}
                className="rounded-full bg-background/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground backdrop-blur-sm"
              >
                {cert.shortCode}
              </span>
            ))}
            {certs.length > 2 && (
              <span className="rounded-full bg-background/90 px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground backdrop-blur-sm">
                +{certs.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Arrow hover */}
        <div className="absolute bottom-3 right-3 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full bg-background/90 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      {/* Body */}
      <div className="mt-4 space-y-3">
        {/* Category + title */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {CATEGORY_LABELS[product.category] ?? product.category}
          </p>
          <h3 className="mt-1 text-lg font-medium leading-snug">{product.title}</h3>
          {product.shortDescription && (
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {product.shortDescription}
            </p>
          )}
        </div>

        {/* Specs row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          {product.specifications?.material && <span>{product.specifications.material}</span>}
          {product.specifications?.gsm && (
            <span className="border-l pl-4">{product.specifications.gsm}</span>
          )}
        </div>

        {/* MOQ + lead time */}
        {(moq || lead) && (
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            {moq && (
              <span className="flex items-center gap-1">
                <Package className="h-3 w-3" />
                MOQ&nbsp;{moq.toLocaleString()}&nbsp;{moqUnit}
              </span>
            )}
            {lead && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {lead}
              </span>
            )}
          </div>
        )}

        {/* Price + incoterm */}
        {lowestTier && (
          <div className="flex items-baseline justify-between border-t pt-3">
            <div>
              <span className="text-base font-semibold">
                from&nbsp;${lowestTier.pricePerUnit.toFixed(2)}
              </span>
              <span className="ml-1 text-xs text-muted-foreground">
                / {lowestTier.unit ?? 'unit'}
              </span>
            </div>
            <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              {incoterm}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
