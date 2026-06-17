import { ArrowRight, FileText, Package } from 'lucide-react'

import { Button } from '@/components/ui/button'

import type { Product } from '@/payload-types'

type ProductSampleCTAProps = {
  product: Product
}

export function ProductSampleCTA({ product }: ProductSampleCTAProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] bg-primary text-primary-foreground">
      <div className="grid gap-10 p-8 md:p-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.25em] opacity-80">Request Samples</p>

          <h2 className="max-w-xl text-3xl font-medium md:text-5xl">
            Evaluate quality before placing a bulk order for {product.title}.
          </h2>

          <p className="mt-6 max-w-lg text-primary-foreground/80">
            Receive product samples, certifications, GSM details, customization options and export
            documentation.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" variant="secondary" className="rounded-full">
              Request Sample
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              Download Specs
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
            <Package className="mb-4 h-6 w-6" />

            <h3 className="font-medium">Product Samples</h3>

            <p className="mt-2 text-sm text-primary-foreground/80">
              Inspect material quality, stitching and finishing.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
            <FileText className="mb-4 h-6 w-6" />

            <h3 className="font-medium">Technical Sheets</h3>

            <p className="mt-2 text-sm text-primary-foreground/80">
              GSM, certifications, dimensions and export specs.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
