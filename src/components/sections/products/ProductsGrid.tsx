'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  ShoppingBag,
  Package,
  Inbox,
  ShoppingBasket,
  BriefcaseBusiness,
  Gift,
  Wine,
  FileText,
  Sprout,
} from 'lucide-react'

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
    label: 'Shopping & Grocery Bags',
    value: 'shopping-grocery-bags',
    icon: ShoppingBasket,
  },
  {
    label: 'Lunch & Tiffin Bags',
    value: 'lunch-tiffin-bags',
    icon: Package,
  },
  {
    label: 'Tote Bags',
    value: 'tote-bags',
    icon: ShoppingBag,
  },
  {
    label: 'Fashion & Designer Handbags',
    value: 'fashion-designer-handbags',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Gifting Bags',
    value: 'gifting-bags',
    icon: Gift,
  },
  {
    label: 'Promotional & Event Bags',
    value: 'promotional-event-bags',
    icon: ShoppingBag,
  },
  {
    label: 'Wine & Bottle Bags',
    value: 'wine-bottle-bags',
    icon: Wine,
  },
  {
    label: 'Conference Folders & File Bags',
    value: 'conference-folders-file-bags',
    icon: FileText,
  },
  {
    label: 'Planter Bags',
    value: 'planter-bags',
    icon: Sprout,
  },
  {
    label: 'Gunny Sacks',
    value: 'gunny-sacks',
    icon: Package,
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

    return list
  }, [products, category, filters])

  const clearFilters = () => {
    setCategory('all')
    setFilters([])
  }

  const activeProducts = useMemo(() => {
    return filteredProducts.filter((product) => product.stockStatus === 'active')
  }, [filteredProducts])

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
              {activeProducts.length} Product
              {activeProducts.length !== 1 ? 's' : ''}
            </h2>
          </div>
        </div>

        {/* Products */}
        <AnimatePresence mode="wait">
          {activeProducts.length > 0 ? (
            <motion.div layout className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {activeProducts.map((product) => (
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
              <Inbox size={64} strokeWidth={1} className="mb-4" />
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
