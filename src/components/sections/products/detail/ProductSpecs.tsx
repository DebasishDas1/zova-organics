import type { Product } from '@/payload-types'

type Props = { product: Product }

export function ProductSpecs({ product }: Props) {

  const rows: { label: string; value: string | null | undefined }[] = [
    { label: 'Material', value: product.material },
    { label: 'GSM', value: product.gsm },
    { label: 'Dimensions', value: product.dimensions },
    { label: 'Colours', value: product.colours },
    { label: 'Finish', value: product.finish },
    ...(product.additionalSpecs ?? []).map((s) => ({
      label: s.label,
      value: s.value,
    })),
  ].filter((r) => r.value)

  if (!rows.length) return null

  return (
    <div className="rounded-2xl border border-border p-6">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">Specifications</h2>
      <dl className="space-y-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"
          >
            <dt className="text-sm text-muted-foreground shrink-0">{row.label}</dt>
            <dd className="text-sm font-medium text-right">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
