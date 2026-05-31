import { ProductsHero } from '@/components/sections/products/ProductsHero'
import { ProductsGrid } from '@/components/sections/products/ProductsGrid'

export const metadata = {
  title: 'Our Products - Zova Organic',
  description: 'Discover our range of sustainable products crafted for global markets.',
}

export default async function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <ProductsGrid products={[]} />
    </>
  )
}
