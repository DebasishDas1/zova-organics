import type { Metadata } from 'next'
import Script from 'next/script'
import { getProducts } from '@/lib/payload/products'

import { ProductsGrid } from '@/components/sections/products/ProductsGrid'
import { SectionHero } from '@/components/sections/sheared/SectionHero'

export const metadata: Metadata = {
  title: 'Our Products - Zova Organics',
  description: 'Discover our range of sustainable products crafted for global markets.',
}

export default async function ProductsPage() {
  const products = (await getProducts()) ?? []
  const productListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Zova Organics product catalog',
    description: 'A curated list of sustainable textile, bags, and home goods from Zova Organics.',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://zovaorganics.com/products/${product.slug}`,
      name: product.title,
    })),
  }

  return (
    <>
      <Script id="product-list-schema" type="application/ld+json">
        {JSON.stringify(productListSchema)}
      </Script>
      <SectionHero
        eyebrow="Products"
        title="Our Sustainable Collection"
        description="Explore our range of eco-friendly products designed for the modern consumer."
      />
      <ProductsGrid products={products} />
    </>
  )
}
