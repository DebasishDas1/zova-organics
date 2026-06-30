'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { BadgeCheck, Clock3, Globe, Leaf, Package, type LucideIcon } from 'lucide-react'

import type { Certification, Product } from '@/payload-types'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { DataCard } from './DataCard'

type Props = {
  product: Product
  certs: Certification[]
}

type Highlight = {
  icon: LucideIcon
  label: string
  value: string
}

const CATEGORY_LABELS: Record<string, string> = {
  'organic-fabrics': 'Organic Fabrics',
  bags: 'Bags',
  pouches: 'Pouches',
  'home-textiles': 'Home Textiles',
  'yoga-wellness': 'Yoga & Wellness',
  'custom-oem': 'Custom OEM',
}

export function ProductInfo({ product, certs }: Props) {
  const { ordering } = product

  const highlights = useMemo<Highlight[]>(() => {
    const items: Highlight[] = []

    if (ordering?.moq) {
      items.push({
        icon: Package,
        label: 'MOQ',
        value: ordering.moq.toLocaleString(),
      })
    }

    if (ordering?.leadTimeDays) {
      items.push({
        icon: Clock3,
        label: 'Lead Time',
        value: `${ordering.leadTimeDays} Days`,
      })
    }

    items.push({
      icon: Globe,
      label: 'Shipping',
      value: 'Worldwide',
    })

    return items
  }, [ordering])

  const whatsappUrl = useMemo(() => {
    const productUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${product.slug}`

    return `https://wa.me/?text=${encodeURIComponent(`Check out ${product.title}: ${productUrl}`)}`
  }, [product.slug, product.title])

  return (
    <div className="flex flex-col">
      <Badge
        variant="outline"
        className="hidden w-fit rounded-full uppercase tracking-[0.2em] md:inline-flex"
      >
        {CATEGORY_LABELS[product.category] ?? product.category}
      </Badge>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight leading-tight md:text-5xl">
        {product.title}
      </h1>

      {certs.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {certs.map((cert) => (
            <Badge key={cert.id} variant="secondary" className="gap-1 rounded-full px-3 py-1">
              <BadgeCheck className="size-3.5" />
              {cert.shortCode}
            </Badge>
          ))}
        </div>
      )}

      <div className="my-8 flex gap-3">
        <Button size="lg" className="h-14 flex-1 rounded-full px-4 sm:flex-none sm:px-8" asChild>
          <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Enquire on WhatsApp
          </Link>
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="h-14 flex-1 rounded-full border-zova-green px-4 font-bold text-zova-green sm:flex-none sm:px-8"
          asChild
        >
          <Link href="/contact">Request a Quote</Link>
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-2">
        {highlights.map((item) => (
          <DataCard key={item.label} {...item} />
        ))}
      </div>

      <Card className="mt-8">
        <CardContent className="flex gap-4 p-6">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-background">
            <Leaf className="size-5 text-primary" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">Sustainably sourced</h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Manufactured in India using certified organic materials and ethical production
              practices. Perfect for brands seeking sustainable supply chains and private-label
              partnerships.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-8">
        {product.sku && <Badge variant="ghost">SKU {product.sku}</Badge>}
      </div>
    </div>
  )
}
