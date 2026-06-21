import { Badge } from '@/components/ui/badge'
import { Hash } from 'lucide-react'

interface BlogTag {
  id: string
  tag: string
}

interface BlogTagsProps {
  tags?: BlogTag[] | null
}

export function BlogTags({ tags }: BlogTagsProps) {
  if (!tags?.length) return null

  return (
    <section className="mt-24 border-t pt-12">
      <div className="flex items-center gap-2 mb-6">
        <Hash className="h-4 w-4 text-muted-foreground" />

        <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Topics
        </h3>
      </div>

      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            variant="secondary"
            className="
              rounded-full
              px-4
              py-2
              text-sm
              font-normal
              transition-all
              hover:bg-primary
              hover:text-primary-foreground
            "
          >
            {tag.tag}
          </Badge>
        ))}
      </div>
    </section>
  )
}
