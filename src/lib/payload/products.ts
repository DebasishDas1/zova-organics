import config from '@payload-config'
import { getPayload } from 'payload'

export async function getProducts() {
  const payload = await getPayload({
    config,
  })

  const products = await payload.find({
    collection: 'products',
    depth: 1,
  })

  return products.docs
}
