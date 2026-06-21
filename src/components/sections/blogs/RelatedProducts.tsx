import Link from 'next/link'
import Image from 'next/image'

import { ArrowRight } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'

import type { Product, Media } from '@/payload-types'

interface Props {
  products: Product[]
}

export function RelatedProducts({ products }: Props) {
  if (!products.length) return null

  return (
    <section className="container mx-auto max-w-7xl px-6 py-24">
      <div className="mb-14">
        <Badge variant="outline">Featured Collection</Badge>

        <h2 className="mt-4 text-4xl font-semibold tracking-tight">Products Mentioned</h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => {
          const image =
            typeof product.featuredImage === 'object' ? (product.featuredImage as Media) : null

          return (
            <Card
              key={product.id}
              className="
                group
                overflow-hidden
                rounded-[32px]
                border-0
                bg-muted/30
                transition-all
                hover:shadow-xl
              "
            >
              {image?.url && (
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={image.url}
                    alt={product.title}
                    fill
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />
                </div>
              )}

              <CardContent className="p-8">
                <h3 className="text-xl font-semibold">{product.title}</h3>

                {product.shortDescription && (
                  <p className="mt-3 line-clamp-3 text-muted-foreground">
                    {product.shortDescription}
                  </p>
                )}

                <Link
                  href={`/products/${product.slug}`}
                  className="
                    mt-8
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                  "
                >
                  View Product
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
