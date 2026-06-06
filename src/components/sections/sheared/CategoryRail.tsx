'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'motion/react'

type Category = {
  label: string
  value: string
  icon: React.ElementType
}

type CategoryRailProps = {
  categories: Category[]
  active: string
  onChange: (value: string) => void
}

export function CategoryRail({ categories, active, onChange }: CategoryRailProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)

  const updateArrows = () => {
    const el = scrollRef.current

    if (!el) return

    setShowLeft(el.scrollLeft > 10)

    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10)
  }

  useEffect(() => {
    updateArrows()

    const el = scrollRef.current

    if (!el) return

    el.addEventListener('scroll', updateArrows)

    window.addEventListener('resize', updateArrows)

    return () => {
      el.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current

    if (!el) return

    el.scrollBy({
      left: direction === 'right' ? 300 : -300,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative mb-12">
      {/* Left Fade */}
      {showLeft && (
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-linear-to-r from-background to-transparent" />
      )}

      {/* Right Fade */}
      {showRight && (
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-linear-to-l from-background to-transparent" />
      )}

      {/* Left Button */}
      {showLeft && (
        <button
          onClick={() => scroll('left')}
          className="
            absolute
            left-2
            top-1/2
            z-20
            -translate-y-1/2
            rounded-full
            border
            bg-background/90
            p-2
            backdrop-blur
            shadow-sm
          "
        >
          <ChevronLeft className="size-4" />
        </button>
      )}

      {/* Right Button */}
      {showRight && (
        <button
          onClick={() => scroll('right')}
          className="
            absolute
            right-2
            top-1/2
            z-20
            -translate-y-1/2
            rounded-full
            border
            bg-background/90
            p-2
            backdrop-blur
            shadow-sm
          "
        >
          <ChevronRight className="size-4" />
        </button>
      )}

      {/* Categories */}
      <div
        ref={scrollRef}
        className="
          flex
          gap-10
          overflow-x-auto
          scrollbar-none
          pb-6
          px-4
        "
      >
        {categories.map((item) => {
          const Icon = item.icon
          const isActive = active === item.value

          return (
            <button
              key={item.value}
              onClick={() => onChange(item.value)}
              className="
                relative
                flex
                min-w-27.5
                shrink-0
                flex-col
                items-center
                gap-3
                pb-4
              "
            >
              <Icon className={isActive ? 'size-8' : 'size-8 text-muted-foreground'} />

              <span className={isActive ? 'text-sm' : 'text-sm text-muted-foreground'}>
                {item.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="category-indicator"
                  className="
                    absolute
                    bottom-0
                    h-0.5
                    w-10
                    rounded-full
                    bg-foreground
                  "
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
