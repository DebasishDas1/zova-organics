import type { Metadata } from 'next'
import { getProducts } from '@/lib/payload/products'
import { ProductsGrid } from '@/components/sections/products/ProductsGrid'
import { SectionHero } from '@/components/sections/sheared/SectionHero'

export const metadata: Metadata = {
  title: 'Organic Fabric Products — Wholesale Tote Bags, Pouches & More',
  description:
    'Browse GOTS-certified organic cotton tote bags, drawstring pouches, and fabric rolls. Wholesale pricing from 100 units, shipped worldwide from India.',
  alternates: {
    canonical: 'https://zovaorganics.com/products',
  },
  openGraph: {
    title: 'Organic Fabric Products — Wholesale Tote Bags, Pouches & More',
    description:
      'Browse GOTS-certified organic cotton tote bags, drawstring pouches, and fabric rolls. Wholesale pricing from 100 units, shipped worldwide from India.',
    url: 'https://zovaorganics.com/products',
    type: 'website',
  },
}

export default async function ProductsPage() {
  const products = (await getProducts()) ?? []

  const productListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Zova Organics product catalogue',
    description:
      'GOTS-certified organic cotton bags, pouches, and fabric products for wholesale buyers.',
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://zovaorganics.com/products/${product.slug}`,
      name: product.title,
    })),
  }

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Organic fabric products',
    url: 'https://zovaorganics.com/products',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zovaorganics.com' },
        { '@type': 'ListItem', position: 2, name: 'Products' },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }}
      />
      <SectionHero
        eyebrow="Products"
        title="Our sustainable collection"
        description="GOTS-certified organic cotton bags, pouches, and fabric products. Wholesale from 100 units."
      />
      <ProductsGrid products={products} />
    </>
  )
}
