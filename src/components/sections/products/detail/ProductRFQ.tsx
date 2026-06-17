import Link from 'next/link'
import { ArrowRight, Mail, Package } from 'lucide-react'
import type { Product } from '@/payload-types'

type Props = { product: Product }

export function ProductRFQ({ product }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl bg-secondary">
      <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">

        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Ready to order?
          </span>
          <h2 className="mt-3 text-2xl font-medium leading-snug">
            Request a quote or sample for {product.title}
          </h2>
          <p className="mt-3 text-muted-foreground">
            Fill in your requirements and we&apos;ll get back to you within 24 hours with pricing, lead times, and next steps.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <Link
            href={`/contact?product=${product.slug}&type=rfq`}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            <Mail className="h-4 w-4" />
            Request a quote
            <ArrowRight className="h-4 w-4" />
          </Link>
          {product.ordering?.sampleAvailable && (
            <Link
              href={`/contact?product=${product.slug}&type=sample`}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-medium transition-colors hover:bg-background/80"
            >
              <Package className="h-4 w-4" />
              Request a sample
            </Link>
          )}
        </div>

      </div>
    </div>
  )
}
