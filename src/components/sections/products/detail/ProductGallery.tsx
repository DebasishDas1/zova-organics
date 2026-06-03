'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react'

import type { Product, Media } from '@/payload-types'

type Props = {
  product: Product
}

export function ProductGallery({ product }: Props) {
  const featured =
    typeof product.featuredImage === 'object' ? (product.featuredImage as Media) : null

  const galleryImages: Media[] = [
    ...(featured ? [featured] : []),
    ...((product.gallery ?? [])
      .map((item) => (typeof item.image === 'object' ? (item.image as Media) : null))
      .filter(Boolean) as Media[]),
  ]

  const [active, setActive] = useState(0)

  const current = galleryImages[active]

  const next = () => {
    setActive((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  const prev = () => {
    setActive((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  return (
    <div className="lg:sticky lg:top-28">
      <div className="space-y-4">
        {/* Main Image */}
        <div className="group relative overflow-hidden rounded-[2rem] bg-secondary">
          <AnimatePresence mode="wait">
            <motion.div
              key={current?.url}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Image
                src={current?.url ?? '/placeholder.jpg'}
                alt={current?.alt ?? product.title}
                width={1400}
                height={1400}
                priority
                sizes="(max-width:1024px)100vw,50vw"
                className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </motion.div>
          </AnimatePresence>

          {/* Counter */}
          <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium backdrop-blur">
            {active + 1} / {galleryImages.length}
          </div>

          {/* Expand */}
          <button
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:scale-105"
            aria-label="Expand image"
          >
            <Expand className="h-4 w-4" />
          </button>

          {/* Arrows */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:scale-105"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                onClick={next}
                className="absolute right-5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:scale-105"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {galleryImages.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
            {galleryImages.map((image, index) => {
              const activeThumb = active === index

              return (
                <button
                  key={`${image.id}-${index}`}
                  onClick={() => setActive(index)}
                  className="relative shrink-0"
                >
                  <div
                    className={[
                      'overflow-hidden rounded-2xl transition-all duration-300',
                      activeThumb
                        ? 'ring-2 ring-foreground ring-offset-2'
                        : 'opacity-60 hover:opacity-100',
                    ].join(' ')}
                  >
                    <Image
                      src={image.url ?? '/placeholder.jpg'}
                      alt={image.alt ?? ''}
                      width={120}
                      height={120}
                      className="h-20 w-20 object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  {activeThumb && (
                    <motion.div
                      layoutId="active-thumbnail"
                      className="absolute inset-0 rounded-2xl border-2 border-foreground"
                    />
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
