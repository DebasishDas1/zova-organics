import config from '@payload-config'
import { getPayload } from 'payload'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params

  const payload = await getPayload({
    config,
  })

  const products = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
  })

  const product = products.docs[0]

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="container-zova py-32">
      <h1>{product.title}</h1>

      <p>{product.shortDescription}</p>
    </div>
  )
}
