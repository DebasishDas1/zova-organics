import Link from 'next/link'
import { ArrowRight, FileText, Package } from 'lucide-react'

import type { Product } from '@/payload-types'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

type ProductSampleCTAProps = {
  product: Product
}

export function ProductSampleCTA({ product }: ProductSampleCTAProps) {
  return (
    <Card className="overflow-hidden border-primary/10 bg-primary text-primary-foreground">
      <CardContent className="p-8 md:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary-foreground/70">
              Samples & Documentation
            </p>

            <h2 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              Evaluate <span className="text-zova-colour">{product.title}</span> before placing a
              production order.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-primary-foreground/80">
              Receive product samples, technical specifications, certifications, customization
              options, and export documentation to confidently approve your sourcing decision.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                asChild
                className="bg-zova-colour h-14 flex-1 rounded-full px-4 sm:flex-none sm:px-8"
              >
                <Link href={`/contact?product=${product.slug}&type=sample`}>
                  Request Sample Kit
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-black h-14 flex-1 rounded-full px-4 sm:flex-none sm:px-8"
                asChild
              >
                <Link href={`/contact?product=${product.slug}&type=quote`}>Request Quote</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            <Card className="border-primary-foreground/10 bg-primary-foreground/5 text-primary-foreground">
              <CardContent className="flex gap-4 p-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10">
                  <Package className="size-5" />
                </div>

                <div>
                  <h3 className="font-medium">Product Samples</h3>

                  <p className="mt-1 text-sm text-primary-foreground/70">
                    Evaluate material quality, stitching, durability and finishing.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary-foreground/10 bg-primary-foreground/5 text-primary-foreground">
              <CardContent className="flex gap-4 p-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10">
                  <FileText className="size-5" />
                </div>

                <div>
                  <h3 className="font-medium">Technical Documentation</h3>

                  <p className="mt-1 text-sm text-primary-foreground/70">
                    GSM details, dimensions, certifications, customization options and export
                    specifications.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
