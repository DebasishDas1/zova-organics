import type { Product } from '@/payload-types'
import { ProductCard } from './ProductCard'

type ProductsGridProps = {
  products: Product[]
}

export function ProductsGrid({ products }: ProductsGridProps) {
  if (!products?.length) {
    return (
      <section className="pb-24">
        <div className="container-zova text-center">
          <p className="text-base text-muted-foreground">
            No products are available at the moment. Please check back soon.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="pb-24">
      <div className="container-zova">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
