'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Shirt, ShoppingBag, Package, Home, Leaf, Factory } from 'lucide-react'

import type { Product } from '@/payload-types'
import { ProductCard } from './ProductCard'
import { CategoryRail } from '../sheared/CategoryRail'

type ProductsGridProps = {
  products?: Product[]
}

const CATEGORIES = [
  {
    label: 'All Products',
    value: 'all',
    icon: Package,
  },
  {
    label: 'Organic Fabrics',
    value: 'organic-fabrics',
    icon: Shirt,
  },
  {
    label: 'Tote Bags',
    value: 'bags',
    icon: ShoppingBag,
  },
  {
    label: 'Pouches',
    value: 'pouches',
    icon: Package,
  },
  {
    label: 'Home Textiles',
    value: 'home-textiles',
    icon: Home,
  },
  {
    label: 'Yoga & Wellness',
    value: 'yoga-wellness',
    icon: Leaf,
  },
  {
    label: 'Custom OEM',
    value: 'custom-oem',
    icon: Factory,
  },
]

export function ProductsGrid({ products = [] }: ProductsGridProps) {
  const [category, setCategory] = useState('all')
  const [filters, setFilters] = useState<string[]>([])

  const filteredProducts = useMemo(() => {
    let list = [...products]

    if (category !== 'all') {
      list = list.filter((product) => product.category === category)
    }

    if (filters.includes('Sample Available')) {
      list = list.filter((product) => product.ordering?.sampleAvailable)
    }

    if (filters.includes('GOTS')) {
      list = list.filter((product) =>
        product.certifications?.some(
          (cert) => typeof cert === 'object' && cert.shortCode === 'GOTS',
        ),
      )
    }

    if (filters.includes('OEKO-TEX')) {
      list = list.filter((product) =>
        product.certifications?.some(
          (cert) => typeof cert === 'object' && cert.shortCode === 'OEKO-TEX',
        ),
      )
    }

    return list
  }, [products, category, filters])

  const clearFilters = () => {
    setCategory('all')
    setFilters([])
  }

  return (
    <section className="pb-32">
      <div className="container-zova">
        {/* Categories */}
        <CategoryRail categories={CATEGORIES} active={category} onChange={setCategory} />

        {/* Results Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Collection</p>

            <h2 className="mt-2 text-2xl font-medium md:text-3xl">
              {filteredProducts.length} Product
              {filteredProducts.length !== 1 ? 's' : ''}
            </h2>
          </div>
        </div>

        {/* Products */}
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div layout className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center py-24 text-center"
            >
              <h3 className="text-2xl font-medium">No matching products</h3>

              <p className="mt-4 max-w-md text-muted-foreground">
                Adjust your filters or browse our complete collection of sustainable products.
              </p>

              <button
                onClick={clearFilters}
                className="mt-8 rounded-full bg-foreground px-6 py-3 text-sm text-background"
              >
                View All Products
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
