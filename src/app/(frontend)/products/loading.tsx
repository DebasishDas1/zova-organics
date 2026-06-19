import { SectionHero } from '@/components/sections/sheared/SectionHero'
import { ProductsGridSkeleton } from '@/components/sections/products/ProductsGridSkeleton'

// Next.js streams this instantly on hard navigation to /products
export default function ProductsLoading() {
  return (
    <>
      <SectionHero
        eyebrow="Products"
        title="Our sustainable collection."
        description="GOTS-certified organic cotton bags, pouches, and fabric products. Wholesale from 100 units."
      />
      <ProductsGridSkeleton />
    </>
  )
}
