import type { Metadata } from 'next'
import { getProducts } from '@/lib/payload/products'
import { ProductsGrid } from '@/components/sections/products/ProductsGrid'
import { SectionHero } from '@/components/sections/sheared/SectionHero'
import { JsonLd } from '@/components/sections/sheared/JsonLd'

export const revalidate = 60

const BASE_URL = 'https://zovaorganics.com'

export const metadata: Metadata = {
  title: 'Organic Fabric Products — Wholesale Tote Bags, Pouches & More',
  description:
    'Browse GOTS-certified organic cotton tote bags, drawstring pouches, and fabric rolls. Wholesale pricing from 100 units, shipped worldwide from India.',
  alternates: { canonical: `${BASE_URL}/products` },
  openGraph: {
    title: 'Organic Fabric Products — Wholesale Tote Bags, Pouches & More',
    description:
      'Browse GOTS-certified organic cotton tote bags, drawstring pouches, and fabric rolls. Wholesale pricing from 100 units, shipped worldwide from India.',
    url: `${BASE_URL}/products`,
    type: 'website',
  },
}

export default async function ProductsPage() {
  // Guard: DB may be unavailable during Docker build
  const products = (await getProducts().catch(() => [])) ?? []

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Organic fabric products',
    url: `${BASE_URL}/products`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Products', item: `${BASE_URL}/products` },
      ],
    },
  }

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
      url: `${BASE_URL}/products/${product.slug}`,
      name: product.title,
    })),
  }

  return (
    <>
      <JsonLd schema={collectionSchema} />
      <JsonLd schema={productListSchema} />
      <SectionHero
        eyebrow="Products"
        title="Our sustainable collection"
        description="GOTS-certified organic cotton bags, pouches, and fabric products. Wholesale from 100 units."
      />
      <ProductsGrid products={products} />
    </>
  )
}
