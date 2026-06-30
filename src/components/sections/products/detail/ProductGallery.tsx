'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
  }, [product.featuredImage, product.gallery])

  const [active, setActive] = useState(0)

  const thumbnailsRef = useRef<HTMLDivElement>(null)
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([])

  const total = galleryImages.length
  const current = galleryImages[active]

  const next = useCallback(() => {
    setActive((i) => (i + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + total) % total)
  }, [total])

  useEffect(() => {
    const container = thumbnailsRef.current
    const thumbnail = thumbnailRefs.current[active]

    if (!container || !thumbnail) return

    container.scrollTo({
      left: thumbnail.offsetLeft - container.clientWidth / 2 + thumbnail.clientWidth / 2,
      behavior: 'smooth',
    })
  }, [active])

  // Preload next image
  useEffect(() => {
    if (galleryImages.length <= 1) return

    const nextIndex = (active + 1) % galleryImages.length

    const img = new window.Image()
    img.src = galleryImages[nextIndex].url ?? ''
  }, [active, galleryImages])

  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity

  const confidenceThreshold = 10000

  const handleDragEnd = useCallback(
    (
      _: MouseEvent | TouchEvent | PointerEvent,
      info: {
        offset: { x: number }
        velocity: { x: number }
      },
    ) => {
      const power = swipePower(info.offset.x, info.velocity.x)

      if (power < -confidenceThreshold) next()
      else if (power > confidenceThreshold) prev()
    },
    [next, prev],
  )

  const controlButton =
    'absolute top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition-transform duration-200 hover:scale-105 active:scale-95 md:flex'

  return (
    <div className="lg:sticky lg:top-24">
      <div className="space-y-5">
        {/* Main Image */}
        <div className="group relative overflow-hidden rounded-3xl bg-muted">
          <AnimatePresence mode="wait">
            <motion.div
              key={current?.url}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={handleDragEnd}
              className="touch-pan-y will-change-transform"
            >
              <Image
                src={current?.url ?? '/placeholder.jpg'}
                alt={current?.alt ?? product.title}
                width={1400}
                height={1400}
                priority={active === 0}
                loading={active === 0 ? 'eager' : 'lazy'}
                sizes="(max-width:640px) 100vw, (max-width:1024px) 90vw, 45vw"
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium shadow backdrop-blur">
            {active + 1} / {total}
          </div>

          {total > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous image"
                className={`${controlButton} left-4`}
              >
                <ChevronLeft className="size-5" />
              </button>

              <button onClick={next} aria-label="Next image" className={`${controlButton} right-4`}>
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </div>

        {/* Pagination */}
        {total > 1 && (
          <div className="flex justify-center gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                aria-label={`Go to image ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
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
            className="flex gap-3 overflow-x-auto overscroll-x-contain scrollbar-none"
          >
            {galleryImages.map((image, index) => {
              const isActive = active === index

              return (
                <button
                  key={image.id}
                  ref={(el) => {
                    thumbnailRefs.current[index] = el
                  }}
                  onClick={() => setActive(index)}
                  aria-label={`Show image ${index + 1}`}
                  className={`relative shrink-0 overflow-hidden rounded-2xl transition-all duration-300 ${
                    isActive ? 'border border-secondary' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={image.url ?? '/placeholder.jpg'}
                    alt={image.alt ?? ''}
                    width={88}
                    height={88}
                    loading="lazy"
                    sizes="88px"
                    className="h-20 w-20 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
