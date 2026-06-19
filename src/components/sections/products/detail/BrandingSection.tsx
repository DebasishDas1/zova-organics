import { SectionHeader } from '@/components/ui/section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Palette, Package, Tag, Stamp } from 'lucide-react'

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
          const Icon = item.icon

          return (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icon className="size-5 text-primary" />
                  {item.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
