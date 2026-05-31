import type { Metadata } from 'next'
import { getProducts } from '@/lib/payload/products'

import { ProductsHero } from '@/components/sections/products/ProductsHero'
import { ProductsGrid } from '@/components/sections/products/ProductsGrid'

export const metadata: Metadata = {
  title: 'Our Products - Zova Organics',
  description: 'Discover our range of sustainable products crafted for global markets.',
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <>
      <ProductsHero />
      <ProductsGrid products={products} />
    </>
  )
}
