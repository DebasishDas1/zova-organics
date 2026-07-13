import { Check } from 'lucide-react'
import type { Product } from '@/payload-types'

type Props = { product: Product }

const SHIPPING_LABELS: Record<string, string> = {
  sea:     'Sea freight',
  air:     'Air freight',
  courier: 'Courier',
}

const DOC_LABELS: Record<string, string> = {
  'commercial-invoice': 'Commercial invoice',
  'packing-list':       'Packing list',
  'coo':                'Certificate of origin',
  'phyto':              'Phytosanitary cert',
  'test-reports':       'Test reports',
  'gots-tc':            'GOTS transaction cert',
}

export function ProductShipping({ product }: Props) {

  return (
    <div className="rounded-2xl border border-border p-6">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">Shipping & Compliance</h2>

      <dl className="space-y-3">
        {product.hsCode && (
          <div className="flex justify-between gap-4 border-b border-border pb-3">
            <dt className="text-sm text-muted-foreground">HS code</dt>
            <dd className="text-sm font-medium font-mono">{product.hsCode}</dd>
          </div>
        )}

        {product.reachCompliant && (
          <div className="flex justify-between gap-4 border-b border-border pb-3">
            <dt className="text-sm text-muted-foreground">REACH (EU)</dt>
            <dd className="flex items-center gap-1 text-sm font-medium">
              <Check className="h-3.5 w-3.5 text-green-600" /> Compliant
            </dd>
          </div>
        )}

        {(product.shippingModes ?? []).length > 0 && (
          <div className="flex justify-between gap-4 border-b border-border pb-3">
            <dt className="text-sm text-muted-foreground">Shipping</dt>
            <dd className="text-sm font-medium text-right">
              {(product.shippingModes as string[]).map((m) => SHIPPING_LABELS[m] ?? m).join(', ')}
            </dd>
          </div>
        )}

        {(product.documentsProvided ?? []).length > 0 && (
          <div className="border-b border-border pb-3 last:border-0 last:pb-0">
            <dt className="mb-2 text-sm text-muted-foreground">Documents provided</dt>
            <dd className="space-y-1">
              {(product.documentsProvided as string[]).map((d) => (
                <div key={d} className="flex items-center gap-2 text-sm">
                  <Check className="h-3.5 w-3.5 shrink-0 text-green-600" />
                  {DOC_LABELS[d] ?? d}
                </div>
              ))}
            </dd>
          </div>
        )}
      </dl>
    </div>
  )
}
