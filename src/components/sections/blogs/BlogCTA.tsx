import Link from 'next/link'

import { ArrowRight, Leaf, Globe } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

import { Button } from '@/components/ui/button'

export function BlogCTA() {
  return (
    <section className="container mx-auto max-w-6xl px-6 py-32">
      <Card
        className="
          overflow-hidden
          rounded-[40px]
          border-0
          bg-primary
          text-primary-foreground
        "
      >
        <CardContent className="p-12 lg:p-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex justify-center gap-3">
              <Leaf className="h-5 w-5" />

              <Globe className="h-5 w-5" />
            </div>

            <h2
              className="
                text-4xl
                font-semibold
                tracking-tight
                lg:text-5xl
              "
            >
              Looking for a trusted manufacturing partner?
            </h2>

            <p
              className="
                mx-auto
                mt-8
                max-w-2xl
                text-lg
                leading-8
                opacity-90
              "
            >
              From organic cotton to private-label production, our team helps brands source
              certified products with complete export support.
            </p>

            <div className="mt-12">
              <Button asChild size="lg" variant="secondary" className="rounded-full px-8">
                <Link href="/contact">
                  Request a Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
