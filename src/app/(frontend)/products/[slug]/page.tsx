import config from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import type { Media, Certification } from '@/payload-types'

import { ProductGallery } from '@/components/sections/products/detail/ProductGallery'
import { ProductInfo } from '@/components/sections/products/detail/ProductInfo'
import { ProductSpecs } from '@/components/sections/products/detail/ProductSpecs'
import { ProductCertifications } from '@/components/sections/products/detail/ProductCertifications'
import { ProductCustomisation } from '@/components/sections/products/detail/ProductCustomisation'
import { ProductShipping } from '@/components/sections/products/detail/ProductShipping'
import { ProductRFQ } from '@/components/sections/products/detail/ProductRFQ'
import { RelatedProducts } from '@/components/sections/products/detail/RelatedProducts'

type Props = {
  params: { slug: string }
}

export const revalidate = 60

export async function generateMetadata({ params }: Props) {
  const { slug } = (await params) as { slug: string }
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    depth: 2,
  })

  const product = docs[0]
  if (!product) return { title: 'Product not found' }

  const title = product.seo?.metaTitle || product.title
  const description = product.seo?.metaDescription || product.shortDescription || ''
  const featuredImage =
    typeof product.featuredImage === 'object' ? (product.featuredImage as Media) : null
  const seo = (product as any).seo ?? {}
  const ogImage = typeof seo.ogImage === 'object' ? (seo.ogImage as Media) : featuredImage
  const canonical =
    typeof seo.canonicalUrl === 'string'
      ? seo.canonicalUrl
      : `https://zovaorganics.com/products/${product.slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://zovaorganics.com/products/${product.slug}`,
      images: ogImage?.url ? [{ url: ogImage.url }] : undefined,
    },
    alternates: {
      canonical,
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = (await params) as { slug: string }
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
  if (!product) notFound()

  // Related: same category, exclude self
  const { docs: related } = await payload.find({
    collection: 'products',
    where: {
      category: { equals: product.category },
      slug: { not_equals: slug },
      status: { equals: 'active' },
    },
    limit: 3,
    depth: 2,
  })

  const certs = (product.certifications ?? [])
    .map((c) => (typeof c === 'object' ? (c as Certification) : null))
    .filter(Boolean) as Certification[]

  return (
    <div className="pb-32">
      {/* ── Breadcrumb ── */}
      <div className="container-zova pt-32 pb-10">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <a href="/" className="hover:text-foreground transition-colors">
            Home
          </a>
          <span>/</span>
          <a href="/products" className="hover:text-foreground transition-colors">
            Products
          </a>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>
      </div>

      {/* ── Hero: gallery + info ── */}
      <div className="container-zova">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <ProductGallery product={product} />
          <ProductInfo product={product} certs={certs} />
        </div>
      </div>

      {/* ── Detail sections ── */}
      <div className="container-zova mt-20 grid gap-6 lg:grid-cols-3">
        <ProductSpecs product={product} />
        <ProductCertifications certs={certs} />
        <ProductShipping product={product} />
      </div>

      {/* ── Customisation ── */}
      {product.customisation && (
        <div className="container-zova mt-6">
          <ProductCustomisation product={product} />
        </div>
      )}

      {/* ── RFQ form ── */}
      <div className="container-zova mt-16">
        <ProductRFQ product={product} />
      </div>

      {/* ── Related products ── */}
      {related.length > 0 && (
        <div className="container-zova mt-24">
          <RelatedProducts products={related} />
        </div>
      )}
    </div>
  )
}
