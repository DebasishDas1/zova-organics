'use client'

import { useState, useMemo } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'

import type { Product } from '@/payload-types'
import { ProductCard } from './ProductCard'

type ProductsGridProps = {
  products: Product[]
}

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Organic fabrics', value: 'organic-fabrics' },
  { label: 'Bags', value: 'bags' },
  { label: 'Pouches', value: 'pouches' },
  { label: 'Home textiles', value: 'home-textiles' },
  { label: 'Yoga & wellness', value: 'yoga-wellness' },
  { label: 'Custom / OEM', value: 'custom-oem' },
]

const SORT_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Price: low', value: 'price-asc' },
  { label: 'Price: high', value: 'price-desc' },
  { label: 'MOQ: low', value: 'moq-asc' },
]

const CERTS = ['GOTS', 'OEKO-TEX', 'USDA', 'India Organic']

function getLowestPrice(product: Product): number {
  const tiers = product.pricing?.tiers ?? []
  if (!tiers.length) return Infinity
  return Math.min(...tiers.map((t) => t.pricePerUnit))
}

export function ProductsGrid({ products }: ProductsGridProps) {
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('default')
  const [certFilter, setCertFilter] = useState<string[]>([])
  const [sampleOnly, setSampleOnly] = useState(false)

  const filtered = useMemo(() => {
    let list = [...products]

    // Category
    if (category !== 'all') {
      list = list.filter((p) => p.category === category)
    }

    // Cert filter
    if (certFilter.length > 0) {
      list = list.filter((p) => {
        const codes = (p.certifications ?? []).map((c) =>
          typeof c === 'object' ? c.shortCode : '',
        )
        return certFilter.every((f) => codes.includes(f))
      })
    }

    // Sample only
    if (sampleOnly) {
      list = list.filter((p) => p.ordering?.sampleAvailable)
    }

    // Sort
    if (sort === 'price-asc') list.sort((a, b) => getLowestPrice(a) - getLowestPrice(b))
    if (sort === 'price-desc') list.sort((a, b) => getLowestPrice(b) - getLowestPrice(a))
    if (sort === 'moq-asc') list.sort((a, b) => (a.ordering?.moq ?? 0) - (b.ordering?.moq ?? 0))

    return list
  }, [products, category, sort, certFilter, sampleOnly])

  const toggleCert = (c: string) =>
    setCertFilter((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))

  const hasFilters = category !== 'all' || certFilter.length > 0 || sampleOnly
  const clearAll = () => {
    setCategory('all')
    setCertFilter([])
    setSampleOnly(false)
  }

  return (
    <section className="pb-24">
      <div className="container-zova">
        {/* ── Filter bar ── */}
        <div className="mb-10 space-y-4">
          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={[
                  'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                  category === c.value
                    ? 'bg-foreground text-background'
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/70',
                ].join(' ')}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Second row: cert filters + sample toggle + sort + clear */}
          <div className="flex flex-wrap items-center gap-3">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" />

            {/* Cert toggles */}
            {CERTS.map((c) => (
              <button
                key={c}
                onClick={() => toggleCert(c)}
                className={[
                  'rounded-md border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors',
                  certFilter.includes(c)
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border text-muted-foreground hover:border-foreground/40',
                ].join(' ')}
              >
                {c}
              </button>
            ))}

            {/* Sample available toggle */}
            <button
              onClick={() => setSampleOnly((v) => !v)}
              className={[
                'rounded-md border px-3 py-1 text-xs font-medium transition-colors',
                sampleOnly
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border text-muted-foreground hover:border-foreground/40',
              ].join(' ')}
            >
              Sample available
            </button>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="ml-auto rounded-md border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground focus:outline-none"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            {/* Clear */}
            {hasFilters && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" /> Clear
              </button>
            )}
          </div>
        </div>

        {/* ── Result count ── */}
        <p className="mb-6 text-sm text-muted-foreground">
          {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          {hasFilters ? ' match your filters' : ''}
        </p>

        {/* ── Grid ── */}
        {filtered.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-24 text-center">
            <p className="text-lg font-medium">No products match your filters</p>
            <p className="text-sm text-muted-foreground">
              Try removing a filter or browse all categories
            </p>
            <button
              onClick={clearAll}
              className="mt-2 rounded-full bg-foreground px-6 py-2 text-sm text-background"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
