import { notFound } from 'next/navigation'

import type { Media, Certification } from '@/payload-types'
import { getProductBySlug, getRelatedProducts } from '@/lib/payload/products'

import { ProductGallery } from '@/components/sections/products/detail/ProductGallery'
import { ProductTrustStrip } from '@/components/sections/products/detail/ProductTrustStrip'
import { ProductApplications } from '@/components/sections/products/detail/ProductApplications'
import { ProductSampleCTA } from '@/components/sections/products/detail/ProductSampleCTA'
import { RelatedProducts } from '@/components/sections/products/detail/RelatedProducts'
import { JsonLd } from '@/components/sections/sheared/JsonLd'
import { getServerURL } from '@/lib/server-url'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { BrandingSection } from '@/components/sections/products/detail/BrandingSection'
// import { ComplianceSection } from '@/components/sections/products/detail/ComplianceSection'
import { SpecificationsSection } from '@/components/sections/products/detail/SpecificationsSection'
import { ExportSection } from '@/components/sections/products/detail/ExportSection'
import { ProductInfo } from '@/components/sections/products/detail/ProductInfo'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 60
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  try {
    const product = await getProductBySlug(slug)
    if (!product) return {}

    const featuredImage = typeof product.featuredImage === 'object' ? product.featuredImage : null
    const baseUrl = getServerURL()

    const title = product.metaTitle ?? product.title ?? 'Untitled'
    const description = product.metaDescription ?? product.shortDescription ?? ''
    const imageUrl = featuredImage?.url
      ? featuredImage.url.startsWith('http')
        ? featuredImage.url
        : `${baseUrl}${featuredImage.url}`
      : undefined

    return {
      title,
      description,
      alternates: {
        canonical: `${baseUrl}/products/${product.slug}`,
      },
      openGraph: {
        title,
        description,
        url: `${baseUrl}/products/${product.slug}`,
        images: imageUrl
          ? [
              {
                url: imageUrl,
                width: featuredImage?.width || 1200,
                height: featuredImage?.height || 630,
                alt: product.title,
              },
            ]
          : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: imageUrl ? [imageUrl] : undefined,
      },
    }
  } catch {
    return {}
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const featuredImage =
    typeof product.featuredImage === 'object' ? (product.featuredImage as Media) : null

  const certs = (product.certifications ?? [])
    .map((cert) => (typeof cert === 'object' ? (cert as Certification) : null))
    .filter(Boolean) as Certification[]

  const relatedProducts = await getRelatedProducts(product.category, slug)

  const baseUrl = getServerURL()
  const imageUrl = featuredImage?.url
    ? featuredImage.url.startsWith('http')
      ? featuredImage.url
      : `${baseUrl}${featuredImage.url}`
    : undefined

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.shortDescription,
    sku: product.sku,
    image: imageUrl ? [imageUrl] : undefined,
    brand: {
      '@type': 'Brand',
      name: 'Zova Organics',
    },
  }

  return (
    <>
      <JsonLd schema={productSchema} />
      <div className="pb-32">
        <Breadcrumb className="container-zova pb-4 hidden md:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="container-zova pt-8 md:pt-0">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
            <ProductGallery product={product} />

            <div className="lg:sticky lg:top-28 h-fit">
              <ProductInfo product={product} certs={certs} />
            </div>
          </div>
        </section>

        <section className="container-zova mt-20 space-y-12">
          <ProductTrustStrip certs={certs} />
          <SpecificationsSection product={product} />
          <BrandingSection />
          {/* <ComplianceSection certs={certs} /> */}
          <ExportSection product={product} />
        </section>

        <section className="container-zova space-y-20 mt-12">
          <ProductApplications />
          <ProductSampleCTA product={product} />
        </section>

        {relatedProducts.length > 0 && (
          <section className="container-zova mt-28">
            <RelatedProducts products={relatedProducts} />
          </section>
        )}
      </div>
    </>
  )
}
