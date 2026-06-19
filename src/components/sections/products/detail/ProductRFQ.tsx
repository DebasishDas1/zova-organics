import Link from 'next/link'
import { ArrowRight, Mail, Package } from 'lucide-react'

import type { Product } from '@/payload-types'

import { Button } from '@/components/ui/button'

type Props = { product: Product }

export function ProductRFQ({ product }: Props) {
  return (
    <section className="relative overflow-hidden px-8 py-16 sm:px-12 lg:px-16">
      <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* LEFT */}
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Ready to order</p>

          <h2 className="mt-5 text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Request pricing or samples for {product.title}
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Share your requirements and receive detailed pricing, lead times, and production
            guidance within 24 hours.
          </p>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          {/* Primary */}
          <Button
            size="lg"
            className="h-12 rounded-full px-6 text-sm font-medium sm:flex-none sm:px-8"
            asChild
          >
            <Link href={`/contact?product=${product.slug}&type=rfq`}>
              <Mail className="size-4" />
              Request pricing
              <ArrowRight className="size-4 opacity-70" />
            </Link>
          </Button>

          {/* Secondary */}
          {product.ordering?.sampleAvailable && (
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full text-zova-green border border-zova-green px-4 sm:flex-none sm:px-8"
              asChild
            >
              <Link href={`/contact?product=${product.slug}&type=sample`}>
                <Package className="size-4" />
                Request sample
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
