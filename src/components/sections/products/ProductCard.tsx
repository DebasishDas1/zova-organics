import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import type { Product, Media } from '@/payload-types'
import { getImageUrl } from '@/lib/payload/image-url'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const image = typeof product.featuredImage === 'object' ? (product.featuredImage as Media) : null

  const moq = product.ordering?.moq

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <article className="overflow-hidden">
        {/* Image */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[32px]
            bg-secondary
          "
        >
          <Image
            src={getImageUrl(image, 'card') ?? '/placeholder.jpg'}
            alt={image?.alt || product.title}
            width={800}
            height={800}
            sizes="(max-width: 768px) 50vw, 33vw"
            className="
              aspect-square
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-[1.03]
            "
          />
        </div>

        {/* Content */}
        <div className="px-4 py-10 text-center">
          <h3
            className="
              text-3xl
              font-medium
              tracking-tight
              text-foreground
            "
          >
            {product.title}
          </h3>

          {product.shortDescription && (
            <p
              className="
                mx-auto
                mt-5
                max-w-md
                text-lg
                leading-relaxed
                text-muted-foreground
              "
            >
              {product.shortDescription}
            </p>
          )}

          {moq && (
            <p
              className="
                mt-8
                text-lg
                font-medium
              "
            >
              MOQ from {moq.toLocaleString()} units
            </p>
          )}

          <div
            className="
              mt-10
              flex
              items-center
              justify-center
              gap-8
            "
          >
            <span
              className="
                inline-flex
                items-center
                gap-2
                font-medium
                transition-all
                group-hover:gap-3
                text-[#0066CC]
              "
            >
              View Product
              <ArrowRight className="size-4" />
            </span>

            <span
              className="
                inline-flex
                items-center
                gap-2
                text-[#0066CC]
                font-medium
              "
            >
              Request Quote
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
