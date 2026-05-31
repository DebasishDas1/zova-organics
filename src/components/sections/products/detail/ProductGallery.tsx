'use client'

import { useState } from 'react'
import Image from 'next/image'

import type { Product, Media } from '@/payload-types'

type Props = { product: Product }

export function ProductGallery({ product }: Props) {
  const featured = typeof product.featuredImage === 'object'
    ? (product.featuredImage as Media)
    : null

  const galleryImages: Media[] = [
    ...(featured ? [featured] : []),
    ...(product.gallery ?? [])
      .map((g) => (typeof g.image === 'object' ? (g.image as Media) : null))
      .filter(Boolean) as Media[],
  ]

  const [active, setActive] = useState(0)
  const current = galleryImages[active]

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="overflow-hidden rounded-3xl bg-secondary">
        <Image
          key={current?.url}
          src={current?.url ?? '/placeholder.jpg'}
          alt={current?.alt ?? product.title}
          width={900}
          height={900}
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="aspect-square w-full object-cover transition-opacity duration-300"
        />
      </div>

      {/* Thumbnails */}
      {galleryImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {galleryImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={[
                'shrink-0 overflow-hidden rounded-xl transition-all',
                active === i
                  ? 'ring-2 ring-foreground ring-offset-2'
                  : 'opacity-50 hover:opacity-80',
              ].join(' ')}
            >
              <Image
                src={img?.url ?? '/placeholder.jpg'}
                alt={img?.alt ?? `Image ${i + 1}`}
                width={100}
                height={100}
                className="h-16 w-16 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
