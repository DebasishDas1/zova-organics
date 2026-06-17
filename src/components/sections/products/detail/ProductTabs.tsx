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

export function ProductTabs({ product, certs }: ProductTabsProps) {
  const tiers = product.pricing?.tiers ?? []

  const brandingOptions = [
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
      <div className="mb-10 max-w-3xl">
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
        {/* Tabs */}
        <TabsList className="mb-10 h-auto w-fit flex-wrap rounded-full border bg-background p-1">
          <TabsTrigger value="details" className="gap-2">
            <FileText className="h-4 w-4" />
            Details
          </TabsTrigger>

          <TabsTrigger value="pricing" className="gap-2">
            <DollarSign className="h-4 w-4" />
            Pricing
          </TabsTrigger>

          <TabsTrigger value="branding" className="gap-2">
            <Palette className="h-4 w-4" />
            Branding
          </TabsTrigger>

          <TabsTrigger value="compliance" className="gap-2">
            <ShieldCheck className="h-4 w-4" />
            Compliance
          </TabsTrigger>

          <TabsTrigger value="export" className="gap-2">
            <Globe2 className="h-4 w-4" />
            Export
          </TabsTrigger>
        </TabsList>

        {/* DETAILS */}
        <TabsContent value="details">
          <div className="grid gap-4 md:grid-cols-2">
            <SpecCard icon={Package} label="Material" value={product.specifications?.material} />

            <SpecCard icon={Layers3} label="GSM" value={product.specifications?.gsm} />

            <SpecCard icon={Ruler} label="Dimensions" value={product.specifications?.dimensions} />

            <SpecCard icon={Palette} label="Colours" value={product.specifications?.colours} />
          </div>
        </TabsContent>

        {/* PRICING */}
        <TabsContent value="pricing">
          {tiers.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {tiers.map((tier, index) => (
                <div
                  key={index}
                  className="rounded-3xl border bg-card p-8 transition-all duration-300 hover:-translate-y-1"
                >
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Quantity</p>

                  <p className="mt-2 text-lg font-medium">
                    {tier.minQty.toLocaleString()}
                    {tier.maxQty ? ` - ${tier.maxQty.toLocaleString()}` : '+'}
                  </p>

                  <div className="mt-8">
                    <p className="text-4xl font-medium">${tier.pricePerUnit.toFixed(2)}</p>

                    <p className="mt-2 text-sm text-muted-foreground">per {tier.unit ?? 'unit'}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="Pricing available on request." />
          )}
        </TabsContent>

        {/* BRANDING */}
        <TabsContent value="branding">
          <div className="grid gap-4 md:grid-cols-2">
            {brandingOptions.map((item) => (
              <div key={item.title} className="rounded-3xl border bg-card p-6">
                <item.icon className="mb-5 h-5 w-5 text-muted-foreground" />

                <h3 className="font-medium">{item.title}</h3>

                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* COMPLIANCE */}
        <TabsContent value="compliance">
          {certs.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {certs.map((cert) => (
                <div key={cert.id} className="rounded-3xl border bg-card p-8">
                  <ShieldCheck className="mb-4 h-6 w-6 text-muted-foreground" />

                  <h3 className="font-medium">{cert.name}</h3>

                  <p className="mt-2 text-sm text-muted-foreground">{cert.shortCode}</p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="Certification details available upon request." />
          )}
        </TabsContent>

        {/* EXPORT */}
        <TabsContent value="export">
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard
              icon={Package}
              label="Minimum Order"
              value={
                product.ordering?.moq
                  ? `${product.ordering.moq.toLocaleString()} ${product.ordering.moqUnit ?? ''}`
                  : '-'
              }
            />

            <InfoCard
              icon={Clock3}
              label="Lead Time"
              value={product.ordering?.leadTimeDays ? `${product.ordering.leadTimeDays} Days` : '-'}
            />

            <InfoCard icon={Ship} label="Incoterm" value={product.pricing?.incoterm ?? '-'} />

            <InfoCard icon={Globe2} label="Export Markets" value="Worldwide" />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}

function SpecCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value?: string | number | null
}) {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <Icon className="mb-5 h-5 w-5 text-muted-foreground" />

      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>

      <p className="mt-2 text-lg font-medium">{value || '-'}</p>
    </div>
  )
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value?: string | number | null
}) {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <Icon className="mb-5 h-5 w-5 text-muted-foreground" />

      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>

      <p className="mt-2 text-lg font-medium">{value || '-'}</p>
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
