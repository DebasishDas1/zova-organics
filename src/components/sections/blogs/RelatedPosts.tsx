import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

import { BlogCard } from '@/components/sections/blogs/BlogCard'
import type { Post } from '@/payload-types'

interface Props {
  posts: Post[]
}

export function RelatedPosts({ posts }: Props) {
  if (!posts.length) return null

  return (
    <section className="container mx-auto max-w-7xl px-6 py-28">
      <div className="mb-14 flex items-end justify-between">
        <div>
          <Badge variant="outline">Continue Reading</Badge>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight">Related Insights</h2>

          <p className="mt-3 max-w-xl text-lg text-muted-foreground">
            Explore more articles about organic textiles, sourcing and sustainable manufacturing.
          </p>
        </div>

        <Link href="/blogs" className="hidden items-center gap-2 text-sm font-medium lg:flex">
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
