'use client'

import { useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [, setActive] = useState('')

  const headings = useMemo<Heading[]>(() => {
    if (typeof document === 'undefined') return []

    return Array.from(document.querySelectorAll('#blog-content h2, #blog-content h3')).map((el) => {
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
    <Card>
      <CardHeader>
        <CardTitle>On this page</CardTitle>
      </CardHeader>

      <CardContent>
        {headings.map((heading) => (
          <a key={heading.id} href={`#${heading.id}`}>
            {heading.text}
          </a>
        ))}
      </CardContent>
    </Card>
  )
}
