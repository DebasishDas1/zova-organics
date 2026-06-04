import config from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import Script from 'next/script'

import type { Media, Certification } from '@/payload-types'

import { ProductGallery } from '@/components/sections/products/detail/ProductGallery'
import { ProductInfo } from '@/components/sections/products/detail/ProductInfo'
import { ProductTabs } from '@/components/sections/products/detail/ProductTabs'
import { ProductTrustStrip } from '@/components/sections/products/detail/ProductTrustStrip'
import { ProductApplications } from '@/components/sections/products/detail/ProductApplications'
import { ProductRFQ } from '@/components/sections/products/detail/ProductRFQ'
import { ProductSampleCTA } from '@/components/sections/products/detail/ProductSampleCTA'
import { RelatedProducts } from '@/components/sections/products/detail/RelatedProducts'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 60

// 1. Static params — tells Next.js all possible slugs at build time
export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const products = await payload.find({
    collection: 'products',
    limit: 1000,
    select: { slug: true },
  })
  return products.docs.map((p) => ({ slug: p.slug }))
}

// 2. Dynamic metadata from Payload
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })

  const product = result.docs[0]
  if (!product) return {}

  const featuredImage = typeof product.featuredImage === 'object' ? product.featuredImage : null

  const title = product.seo?.metaTitle || product.title
  const description = product.seo?.metaDescription || product.shortDescription

  return {
    title,
    description,
    alternates: {
      canonical: `https://zovaorganics.com/products/${product.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://zovaorganics.com/products/${product.slug}`,
      images: featuredImage?.url
        ? [{ url: featuredImage.url, width: 1200, height: 630, alt: product.title }]
        : undefined,
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params

  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'products',
    where: {
      slug: { equals: slug },
      status: { equals: 'active' },
    },
    depth: 2,
  })

  const product = docs[0]

  if (!product) {
    notFound()
  }

  const featuredImage =
    typeof product.featuredImage === 'object' ? (product.featuredImage as Media) : null

  const certs = (product.certifications ?? [])
    .map((cert) => (typeof cert === 'object' ? (cert as Certification) : null))
    .filter(Boolean) as Certification[]

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.shortDescription,
    sku: product.sku,
    image: featuredImage?.url ? [featuredImage.url] : undefined,
    brand: {
      '@type': 'Brand',
      name: 'Zova Organics',
    },
  }

  const { docs: relatedProducts } = await payload.find({
    collection: 'products',
    where: {
      category: { equals: product.category },
      slug: { not_equals: slug },
      status: { equals: 'active' },
    },
    limit: 4,
    depth: 2,
  })

  return (
    <>
      <Script id="product-schema" type="application/ld+json">
        {JSON.stringify(productSchema)}
      </Script>

      <div className="pb-32">
        {/* Breadcrumb */}
        <div className="container-zova py-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/">Home</a>
            <span>/</span>
            <a href="/products">Products</a>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </nav>
        </div>

        {/* Product Hero */}
        <section className="container-zova">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
            <ProductGallery product={product} />

            <div className="lg:sticky lg:top-28 h-fit">
              <ProductInfo product={product} certs={certs} />
            </div>
          </div>
        </section>

        {/* Trust Strip */}
        <div className="mt-16">
          <ProductTrustStrip certs={certs} />
        </div>

        {/* Tabs */}
        <section className="container-zova mt-20">
          <ProductTabs product={product} certs={certs} />
        </section>

        {/* Applications */}
        <section className="container-zova mt-20">
          <ProductApplications />
        </section>

        {/* Sample CTA */}
        <section className="container-zova mt-20">
          <ProductSampleCTA product={product} />
        </section>

        {/* RFQ */}
        <section className="container-zova mt-20">
          <ProductRFQ product={product} />
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="container-zova mt-28">
            <RelatedProducts products={relatedProducts} />
          </section>
        )}
      </div>
    </>
  )
}
