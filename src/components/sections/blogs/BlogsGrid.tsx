'use client'

import { useMemo, useState } from 'react'
import {
  Sparkles,
  BookOpen,
  ShieldCheck,
  Leaf,
  Newspaper,
  Truck,
  Briefcase,
  Inbox,
} from 'lucide-react'

import type { Post } from '@/payload-types'
import { CategoryRail } from '../sheared/CategoryRail'
import { BlogCard } from './BlogCard'

type BlogsGridProps = {
  posts: Post[]
}

const CATEGORIES = [
  {
    label: 'All',
    value: 'all',
    icon: Sparkles,
  },
  {
    label: 'Export Guides',
    value: 'export-guides',
    icon: BookOpen,
  },
  {
    label: 'Certifications',
    value: 'certifications',
    icon: ShieldCheck,
  },
  {
    label: 'Sustainability',
    value: 'sustainability',
    icon: Leaf,
  },
  {
    label: 'Industry News',
    value: 'industry-news',
    icon: Newspaper,
  },
  {
    label: 'Supply Chain',
    value: 'supply-chain',
    icon: Truck,
  },
  {
    label: 'Buyer Resources',
    value: 'buyer-resources',
    icon: Briefcase,
  },
]

export function BlogsGrid({ posts }: BlogsGridProps) {
  const [category, setCategory] = useState('all')

  const filteredPosts = useMemo(() => {
    if (category === 'all') {
      return posts
    }

    return posts.filter((post) => post.category === category)
  }, [posts, category])

  const clearFilters = () => {
    setCategory('all')
  }

  return (
    <section className="pb-32">
      <div className="container-zova">
        {/* Category Rail */}
        <CategoryRail categories={CATEGORIES} active={category} onChange={setCategory} />

        {/* Section Header */}
        <div className="mt-20 mb-16 flex items-end justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Journal</p>

            <h2 className="mt-2 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
              Latest Articles
            </h2>
          </div>

          <p className="hidden text-sm text-muted-foreground md:block">
            {filteredPosts.length} articles
          </p>
        </div>

        {/* Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="
                  group
                  rounded-[28px]
                  border
                  border-border
                  bg-card
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
              >
                <BlogCard post={post} />
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center py-32 text-center">
            <Inbox size={64} strokeWidth={1} className="mb-4" />
            <h3 className="text-2xl font-medium">No articles found</h3>

            <p className="mt-3 max-w-md text-muted-foreground">
              Try another category or explore all available insights.
            </p>
            <button
              onClick={clearFilters}
              className="mt-8 rounded-full bg-foreground px-6 py-3 text-sm text-background"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
