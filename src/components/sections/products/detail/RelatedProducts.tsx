import type { Product } from '@/payload-types'
import { ProductCard } from '../ProductCard'

type Props = { products: Product[] }

export function RelatedProducts({ products }: Props) {
  if (!products.length) return null

  return (
    <div>
      <h2 className="mb-8 text-xl font-medium">You may also like</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
