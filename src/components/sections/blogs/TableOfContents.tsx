'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [, setActive] = useState('')
  const [headings, setHeadings] = useState<Heading[]>([])

  useEffect(() => {
    if (typeof document === 'undefined') return

    const nextHeadings = Array.from(
      document.querySelectorAll('#blog-content h2, #blog-content h3'),
    ).map((el) => {
      if (!el.id) {
        el.id = el
          .textContent!.toLowerCase()
          .replace(/[^\w\s]/g, '')
          .replace(/\s+/g, '-')
      }

      return {
        id: el.id,
        text: el.textContent ?? '',
        level: Number(el.tagName.substring(1)),
      }
    })

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(nextHeadings)
  }, [])

  useEffect(() => {
    if (!headings.length) return

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) {
          setActive(visible.target.id)
        }
      },
      {
        rootMargin: '-30% 0px -60% 0px',
      },
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [headings])

  if (!headings.length) return null

  return (
    <Card className="bg-white backdrop-blur-xl sm:mx-0">
      <CardHeader className="pb-2 sm:pb-3">
        <CardTitle className="text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:text-[0.82rem]">
          On this page
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-1 pb-4 sm:gap-1.5 sm:pb-5">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              'group relative rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all duration-200 hover:bg-muted/70 hover:text-foreground sm:px-3.5 sm:py-2.5',
              heading.level === 3 && 'pl-6 text-[0.93rem] sm:pl-7',
            )}
          >
            <span className="absolute left-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-transparent transition-colors duration-200 group-hover:bg-primary" />
            <span className="block truncate leading-5">{heading.text}</span>
          </a>
        ))}
      </CardContent>
    </Card>
  )
}
