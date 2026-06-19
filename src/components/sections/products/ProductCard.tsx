import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { getImageUrl } from '@/lib/payload/image-url'
import type { Media, Product } from '@/payload-types'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { slug, title, shortDescription, featuredImage, ordering } = product

  const image = featuredImage && typeof featuredImage === 'object' ? featuredImage : null

  return (
    <article className="group">
      <Link href={`/products/${slug}`} aria-label={`View ${title}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden rounded-[32px] bg-secondary">
          <Image
            src={getImageUrl(image as Media | null, 'card') ?? '/placeholder.jpg'}
            alt={image?.alt || title}
            width={800}
            height={800}
            sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 25vw"
            className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>

        {/* Content */}
        <div className="px-4 py-8 text-center md:py-10">
          <h3 className="text-2xl font-medium tracking-tight md:text-3xl">{title}</h3>

          {shortDescription && (
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground md:mt-5 md:text-lg">
              {shortDescription}
            </p>
          )}

          {ordering?.moq && (
            <p className="mt-6 text-base font-medium md:mt-8 md:text-lg">
              MOQ from {ordering.moq.toLocaleString()} units
            </p>
          )}

          <div className="mt-8 flex items-center justify-center gap-8 md:mt-10">
            <span className="inline-flex items-center gap-2 font-medium text-zova-colour transition-all group-hover:gap-3">
              View Product
              <ArrowRight className="size-4" />
            </span>

            <span className="font-medium text-zova-colour">Request Quote</span>
          </div>
        </div>
      </Link>
    </article>
  )
}
