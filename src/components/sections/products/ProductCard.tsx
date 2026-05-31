import Link from 'next/link'
import Image from 'next/image'

import type { Product, Media } from '@/payload-types'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const image = typeof product.featuredImage === 'object' ? (product.featuredImage as Media) : null

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="overflow-hidden rounded-3xl bg-secondary">
        <Image
          src={image?.url ?? '/placeholder.jpg'}
          alt={image?.alt || product.title}
          width={800}
          height={800}
          className="aspect-square object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      <div className="mt-5">
        <p className="text-sm text-muted-foreground">{product.category}</p>

        <h3 className="mt-1 text-xl">{product.title}</h3>
      </div>
    </Link>
  )
}
