'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import type { Media, Product } from '@/payload-types'

type Props = {
  product: Product
}

export function ProductGallery({ product }: Props) {
  const galleryImages = useMemo(() => {
    const images: Media[] = []

    if (product.featuredImage && typeof product.featuredImage === 'object') {
      images.push(product.featuredImage)
    }

    product.gallery?.forEach(({ image }) => {
      if (image && typeof image === 'object') {
        images.push(image)
      }
    })

    return Array.from(new Map(images.map((image) => [image.id, image])).values())
  }, [product])

  const [active, setActive] = useState(0)
  const thumbnailsRef = useRef<HTMLDivElement>(null)
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const container = thumbnailsRef.current
    const thumbnail = thumbnailRefs.current[active]

    if (!container || !thumbnail) return

    const left = thumbnail.offsetLeft - container.clientWidth / 2 + thumbnail.clientWidth / 2

    container.scrollTo({
      left,
      behavior: 'smooth',
    })
  }, [active])

  const total = galleryImages.length

  const current = galleryImages[active]

  const next = () => setActive((i) => (i + 1) % total)

  const prev = () => setActive((i) => (i - 1 + total) % total)

  const controlButton =
    'absolute z-20 flex items-center justify-center rounded-full bg-white/90 backdrop-blur transition-all duration-300 hover:scale-105 active:scale-95'

  return (
    <div className="lg:sticky">
      <div className="space-y-5">
        {/* Main Image */}
        <div className="group relative overflow-hidden rounded-3xl bg-secondary md:rounded-[2rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current?.url}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.15 }}
              transition={{
                duration: 0.35,
                ease: 'easeOut',
              }}
            >
              <Image
                src={current?.url ?? '/placeholder.jpg'}
                alt={current?.alt ?? product.title}
                width={1400}
                height={1400}
                priority
                sizes="(max-width:1024px)100vw,50vw"
                className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </motion.div>
          </AnimatePresence>

          {/* Counter */}
          <div className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-medium backdrop-blur md:left-5 md:top-5">
            {active + 1} / {total}
          </div>

          {/* Navigation */}
          {total > 1 && (
            <>
              <button
                aria-label="Previous image"
                onClick={prev}
                className={`${controlButton} left-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 md:flex md:left-5 md:h-10 md:w-10`}
              >
                <ChevronLeft className="size-4" />
              </button>

              <button
                aria-label="Next image"
                onClick={next}
                className={`${controlButton} right-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 md:flex md:right-5 md:h-10 md:w-10`}
              >
                <ChevronRight className="size-4" />
              </button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {total > 1 && (
          <div className="flex justify-center gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                aria-label={`Go to image ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active === index
                    ? 'w-6 bg-foreground'
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60'
                }`}
              />
            ))}
          </div>
        )}

        {/* Thumbnails */}
        {total > 1 && (
          <div
            ref={thumbnailsRef}
            className="snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 scrollbar-none scroll-smooth hidden md:flex"
          >
            {galleryImages.map((image, index) => {
              const isActive = active === index

              return (
                <button
                  ref={(el) => {
                    thumbnailRefs.current[index] = el
                  }}
                  key={`${image.id}-${index}`}
                  onClick={() => setActive(index)}
                  aria-label={`Show image ${index + 1}`}
                  aria-current={isActive}
                  className="relative shrink-0 snap-start"
                >
                  <div
                    className={`overflow-hidden rounded-2xl transition-all duration-300 ${
                      isActive ? 'border border-tertiary' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image.url ?? '/placeholder.jpg'}
                      alt={image.alt ?? ''}
                      width={96}
                      height={96}
                      loading="lazy"
                      className="h-16 w-16 object-cover transition-transform duration-500 hover:scale-110 md:h-20 md:w-20"
                    />
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="active-thumb"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 30,
                      }}
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
