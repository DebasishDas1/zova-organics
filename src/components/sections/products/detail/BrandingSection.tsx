import { SectionHeader } from '@/components/ui/section'
import { Palette, Package, Tag, Stamp } from 'lucide-react'
import { DataCard } from './DataCard'

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

export function BrandingSection() {
  return (
    <section className="space-y-6">
      <SectionHeader
        icon={Palette}
        title="Branding & Customization"
        description="Private-label and OEM manufacturing options."
      />

      <div className="grid gap-4 md:grid-cols-4 grid-cols-2">
        {BRANDING_OPTIONS.map((item) => {
          return (
            <DataCard
              key={item.title}
              icon={item.icon}
              label={item.title}
              value={item.description}
            />
          )
        })}
      </div>
    </section>
  )
}
