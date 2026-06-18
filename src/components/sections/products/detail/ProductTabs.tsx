'use client'

import {
  FileText,
  DollarSign,
  Palette,
  ShieldCheck,
  Globe2,
  Package,
  Ruler,
  Layers3,
  Clock3,
  Ship,
  Tag,
  Stamp,
  type LucideIcon,
} from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import type { Product, Certification } from '@/payload-types'

type ProductTabsProps = {
  product: Product
  certs: Certification[]
}

const triggerClass = `
  shrink-0
  gap-2

  rounded-2xl

  px-4
  py-3

  text-sm
  font-medium

  transition-all
  duration-200

  data-[state=active]:bg-black
  data-[state=active]:text-white
  `

const contentClass = `
  mt-0

  data-[state=active]:animate-in
  data-[state=active]:fade-in-0
  data-[state=active]:slide-in-from-bottom-2
  data-[state=active]:duration-300
`

export function ProductTabs({ product, certs }: ProductTabsProps) {
  const tiers = product.pricing?.tiers ?? []

  const BRANDING_OPTIONS = [
    {
      icon: Palette,
      title: 'Custom Colours',
      description: 'Pantone matching and custom dyeing available.',
    },
    {
      icon: Tag,
      title: 'Private Label',
      description: 'Custom woven labels, care labels and branding.',
    },
    {
      icon: Package,
      title: 'Retail Packaging',
      description: 'Custom boxes, sleeves and sustainable packaging.',
    },
    {
      icon: Stamp,
      title: 'Logo Printing',
      description: 'Screen print, embroidery and custom finishes.',
    },
  ]

  return (
    <section>
      {/* Header */}
      <div className="mb-10 max-w-3xl text-center mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Product Information
        </p>

        <h2 className="mt-4 text-3xl font-medium md:text-4xl">
          Everything your sourcing team needs.
        </h2>

        <p className="mt-4 text-muted-foreground">
          Technical specifications, pricing guidance, compliance standards and export information
          for international buyers.
        </p>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mx-auto mb-8">
          <TabsTrigger value="details" className={triggerClass}>
            <FileText className="size-4" />
            Details
          </TabsTrigger>

          <TabsTrigger value="pricing" className={triggerClass}>
            <DollarSign className="size-4" />
            Pricing
          </TabsTrigger>

          <TabsTrigger value="branding" className={triggerClass}>
            <Palette className="size-4" />
            Branding
          </TabsTrigger>

          <TabsTrigger value="compliance" className={triggerClass}>
            <ShieldCheck className="size-4" />
            Compliance
          </TabsTrigger>

          <TabsTrigger value="export" className={triggerClass}>
            <Globe2 className="size-4" />
            Export
          </TabsTrigger>
        </TabsList>

        {/* DETAILS */}
        <TabsContent value="details" className={contentClass}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DataCard icon={Package} label="Material" value={product.specifications?.material} />

            <DataCard icon={Layers3} label="GSM" value={product.specifications?.gsm} />

            <DataCard icon={Ruler} label="Dimensions" value={product.specifications?.dimensions} />

            <DataCard icon={Palette} label="Colours" value={product.specifications?.colours} />
          </div>
        </TabsContent>

        {/* PRICING */}
        <TabsContent value="pricing" className={contentClass}>
          {tiers.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {tiers.map((tier, index) => (
                <div
                  key={index}
                  className="
              rounded-3xl
              border

              bg-card

              p-6
              md:p-8

              transition-colors

              hover:border-primary/20
              hover:bg-primary/1.5
            "
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Quantity
                  </p>

                  <p className="mt-2 text-lg font-medium">
                    {tier.minQty.toLocaleString()}
                    {tier.maxQty ? ` - ${tier.maxQty.toLocaleString()}` : '+'}
                  </p>

                  <div className="mt-8">
                    <p className="text-4xl font-semibold tracking-tight">
                      ${tier.pricePerUnit.toFixed(2)}
                    </p>

                    <p className="mt-2 text-sm text-muted-foreground">per {tier.unit ?? 'unit'}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="Custom pricing is available based on order volume and branding requirements." />
          )}
        </TabsContent>

        {/* BRANDING */}
        <TabsContent value="branding" className={contentClass}>
          <div className="grid gap-4 lg:grid-cols-2">
            {BRANDING_OPTIONS.map((item, index) => (
              <div
                key={item.title}
                className="
            group

            rounded-3xl
            border

            bg-card

            p-6
            md:p-8

            transition-all
            duration-300

            hover:border-primary/20
          "
              >
                <div className="flex items-start justify-between">
                  <div
                    className="
                flex
                size-12
                items-center
                justify-center

                rounded-2xl

                bg-primary/10
              "
                  >
                    <item.icon className="size-5 text-primary" />
                  </div>

                  <span className="text-xs font-medium text-muted-foreground">0{index + 1}</span>
                </div>

                <h3 className="mt-6 text-xl font-medium tracking-tight">{item.title}</h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* COMPLIANCE */}
        <TabsContent value="compliance" className={contentClass}>
          {certs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {certs.map((cert) => (
                <div
                  key={cert.id}
                  className="
              rounded-3xl
              border

              bg-card

              p-6
              md:p-8
            "
                >
                  <ShieldCheck className="mb-5 size-5 text-primary" />

                  <h3 className="font-medium tracking-tight">{cert.name}</h3>

                  <p className="mt-2 text-sm text-muted-foreground">{cert.shortCode}</p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="Certification details available upon request." />
          )}
        </TabsContent>

        {/* EXPORT */}
        <TabsContent value="export" className={contentClass}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DataCard
              icon={Package}
              label="Minimum Order"
              value={
                product.ordering?.moq
                  ? `${product.ordering.moq.toLocaleString()} ${product.ordering.moqUnit ?? ''}`
                  : '-'
              }
            />

            <DataCard
              icon={Clock3}
              label="Lead Time"
              value={product.ordering?.leadTimeDays ? `${product.ordering.leadTimeDays} Days` : '-'}
            />

            <DataCard icon={Ship} label="Incoterm" value={product.pricing?.incoterm ?? '-'} />

            <DataCard icon={Globe2} label="Export Markets" value="Worldwide" />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}

function DataCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value?: string | number | null
}) {
  return (
    <div className="rounded-3xl border bg-card p-5 md:p-6">
      <Icon className="mb-4 size-5 text-primary" />

      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>

      <p className="mt-2 text-base font-medium md:text-lg">{value || '-'}</p>
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-3xl border bg-card p-10 text-center">
      <p className="text-muted-foreground">{text}</p>
    </div>
  )
}
