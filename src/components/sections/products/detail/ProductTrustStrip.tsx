import { BadgeCheck, Globe2, Leaf, ShieldCheck, type LucideIcon } from 'lucide-react'

import type { Certification } from '@/payload-types'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

type ProductTrustStripProps = {
  certs?: Certification[]
}

type TrustItem = {
  icon: LucideIcon
  label: string
}

export function ProductTrustStrip({ certs = [] }: ProductTrustStripProps) {
  const items: TrustItem[] = [
    ...certs.slice(0, 4).map((cert) => ({
      icon: Leaf,
      label: cert.shortCode,
    })),
    {
      icon: ShieldCheck,
      label: 'Export Ready',
    },
    {
      icon: Globe2,
      label: 'Worldwide Shipping',
    },
    {
      icon: BadgeCheck,
      label: 'Quality Assured',
    },
  ]

  return (
    <section className="py-8">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {items.map((item, index) => {
          const Icon = item.icon

          return (
            <div key={`${item.label}-${index}`} className="flex items-center">
              <Badge
                variant="secondary"
                className="h-10 gap-2 rounded-full px-4 text-sm font-medium"
              >
                <Icon className="size-4 text-primary" />
                {item.label}
              </Badge>

              {index < items.length - 1 && (
                <Separator orientation="vertical" className="mx-3 hidden h-5 md:block" />
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
