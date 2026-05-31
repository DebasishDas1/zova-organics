import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Product, Media } from '@/payload-types'

type PageProps = {
  params: {
    slug: string
  }
}

export const revalidate = 60

async function getProduct(slug: string) {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 2,
  })

  const product = (result.docs ?? [])[0] as Product | undefined

  if (!product) {
    return null
  }

  return product
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProduct(params.slug)

  if (!product) {
    return {
      title: 'Product not found | Zova Organics',
      description: 'The requested product could not be found.',
    }
  }

  return {
    title: `${product.title} | Zova Organics`,
    description: product.shortDescription ?? 'Explore this sustainable product from Zova Organics.',
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  const image = typeof product.featuredImage === 'object' ? (product.featuredImage as Media) : null

  return (
    <section className="container-zova py-24">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            {product.category}
          </p>
          <h1 className="mt-4 text-4xl font-semibold">{product.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {product.shortDescription ?? 'Discover this sustainable product from Zova Organics.'}
          </p>

          <div className="mt-10 space-y-6">
            <p>
              {product.description
                ? 'This product includes premium material selection, ethical manufacturing, and global export support.'
                : 'Product details are available on request; message us for custom specs and pricing.'}
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] bg-secondary p-4">
          <Image
            src={image?.url ?? '/placeholder.jpg'}
            alt={image?.alt || product.title}
            width={900}
            height={900}
            className="aspect-square w-full rounded-[1.5rem] object-cover"
          />
        </div>
      </div>
    </section>
  )
}
