import { Check } from 'lucide-react'
import type { Product } from '@/payload-types'

type Props = { product: Product }

export function ProductCustomisation({ product }: Props) {
  const c = product.customisation
  if (!c) return null

  const options: { label: string; enabled: boolean | null | undefined }[] = [
    { label: 'Custom logo / branding',         enabled: c.customLogoAvailable },
    { label: 'Custom sizing',                  enabled: c.customSizeAvailable },
    { label: 'Private label (hang tag, inner label)', enabled: c.privateLabelAvailable },
    { label: 'Custom / natural dye colour',    enabled: c.customDyeAvailable },
  ].filter((o) => o.enabled)

  if (!options.length && !c.customisationNotes) return null

  return (
    <div className="rounded-2xl border border-border p-6">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">Customisation Options</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {options.length > 0 && (
          <ul className="space-y-2">
            {options.map((o) => (
              <li key={o.label} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 shrink-0 text-green-600" />
                {o.label}
              </li>
            ))}
          </ul>
        )}
        {c.customisationNotes && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {c.customisationNotes}
          </p>
        )}
      </div>
    </div>
  )
}
