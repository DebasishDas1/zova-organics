import Link from 'next/link'
import Image from 'next/image'
import { FileText } from 'lucide-react'

import type { Post } from '@/payload-types'

type Props = {
  post: Post
}

// Human‑readable labels for post categories
const categoryLabels: Record<Post['category'], string> = {
  'export-guides': 'Export Guides',
  certifications: 'Certifications',
  sustainability: 'Sustainability',
  'industry-news': 'Industry News',
  'supply-chain': 'Supply Chain',
  'buyer-resources': 'Buyer Resources',
  'company-news': 'Company News',
}

export function BlogCard({ post }: Props) {
  const image = typeof post.featuredImage === 'object' ? post.featuredImage : null

  return (
    <Link href={`/blogs/${post.slug}`}>
      {/* Image */}
      <div className="relative mb-8 aspect-video overflow-hidden rounded-[24px]">
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.alt || post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="h-full w-full bg-muted" />
        )}
      </div>

      {/* Category */}
      <div className="mb-6 flex items-center gap-3">
        <FileText className="size-5 text-muted-foreground" />
        <span className="text-2xl font-semibold text-muted-foreground">
          {categoryLabels[post.category] ?? post.category ?? 'Whitepaper'}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-3xl font-bold leading-tight tracking-[-0.03em] text-foreground">
        {post.title}
      </h3>

      <h3 className="text-lg font-medium leading-relaxed text-foreground">{post.excerpt}</h3>
    </Link>
  )
}
