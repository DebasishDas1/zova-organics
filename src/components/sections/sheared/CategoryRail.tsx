'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { LazyMotion, domAnimation, m } from 'motion/react'
import { cn } from '@/lib/utils'

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
  const [showRight, setShowRight] = useState(false)

  useEffect(() => {
    const el = scrollRef.current

    if (!el) return

    const updateArrows = () => {
      setShowLeft(el.scrollLeft > 10)

      setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10)
    }

    updateArrows()

    el.addEventListener('scroll', updateArrows, {
      passive: true,
    })

    window.addEventListener('resize', updateArrows)

    return () => {
      el.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: direction === 'right' ? 320 : -320,
      behavior: 'smooth',
    })
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative mb-10 md:mb-12">
        <div
          ref={scrollRef}
          className="
            flex
            gap-6 sm:gap-8 md:gap-10
            overflow-x-auto
            scroll-smooth
            snap-x snap-mandatory
            overscroll-x-contain
            scrollbar-none
          "
        >
          {categories.map((item) => {
            const Icon = item.icon
            const isActive = active === item.value

            return (
              <m.button
                key={item.value}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => onChange(item.value)}
                className="
                  group
                  relative
                  snap-start
                  shrink-0
                  min-w-22
                  sm:min-w-25
                  md:min-w-28
                  flex flex-col items-center
                  gap-2 sm:gap-3
                  pb-4
                "
              >
                <div className={cn('rounded-2xl p-3 transition-colors duration-200')}>
                  <Icon
                    className={cn(
                      'size-6 sm:size-7 md:size-8 transition-colors duration-200',
                      isActive ? 'text-foreground' : 'text-muted-foreground',
                    )}
                  />
                </div>

                <span
                  className={cn(
                    'text-xs sm:text-sm transition-colors duration-200',
                    isActive ? 'font-medium text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {item.label}
                </span>

                {isActive && (
                  <m.div
                    layoutId="category-indicator"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 35,
                      mass: 0.5,
                    }}
                    className="
                      absolute
                      bottom-0
                      left-1/2
                      h-0.5
                      w-8
                      -translate-x-1/2
                      rounded-full
                      bg-primary
                    "
                  />
                )}
              </m.button>
            )
          })}
        </div>
      </div>
    </LazyMotion>
  )
}
