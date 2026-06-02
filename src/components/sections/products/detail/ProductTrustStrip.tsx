import { Globe2, ShieldCheck, Leaf, BadgeCheck } from 'lucide-react'

import type { Certification } from '@/payload-types'

type ProductTrustStripProps = {
  certs?: Certification[]
}

export function ProductTrustStrip({ certs = [] }: ProductTrustStripProps) {
  const defaultItems = [
    {
      icon: ShieldCheck,
      label: 'Export Ready',
    },
    {
      icon: Globe2,
      label: 'Worldwide Shipping',
    },
  ]

  const certItems = certs.slice(0, 4).map((cert) => ({
    icon: Leaf,
    label: cert.shortCode,
  }))

  const items = [...certItems, ...defaultItems]

  return (
    <section className="border-y bg-background">
      <div className="container-zova py-6">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
            >
              <item.icon className="h-4 w-4 text-primary" />
              <span>{item.label}</span>
            </div>
          ))}

          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <BadgeCheck className="h-4 w-4 text-primary" />
            <span>Quality Assured</span>
          </div>
        </div>
      </div>
    </section>
  )
}
