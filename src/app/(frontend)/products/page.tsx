import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { ProductsHero } from '@/components/sections/products/ProductsHero'
import { ProductsGrid } from '@/components/sections/products/ProductsGrid'
import type { Product } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Our Products - Zova Organics',
  description: 'Discover our range of sustainable products crafted for global markets.',
}

export const revalidate = 60

async function getProducts() {
  const payload = await getPayload({ config: configPromise })

  const response = await payload.find({
    collection: 'products',
    limit: 100,
    sort: 'title',
    depth: 2,
  })

  return (response.docs ?? []) as Product[]
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
