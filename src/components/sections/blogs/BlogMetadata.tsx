import { CalendarDays, Clock3, Tag } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

interface BlogMetadataProps {
  publishedAt?: string | null
  readingTime?: number | null
  tags?: {
    id: string
    tag: string
  }[]
}

export function BlogMetadata({ publishedAt, readingTime, tags }: BlogMetadataProps) {
  return (
    <section className="container mx-auto max-w-5xl px-6 py-14">
      <div
        className="
        flex
        flex-col
        gap-8
        rounded-3xl
        border
        bg-card/50
        p-8
        backdrop-blur
        md:flex-row
        md:items-center
        md:justify-between
      "
      >
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          {publishedAt && (
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />

              <time dateTime={publishedAt}>
                {new Date(publishedAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </div>
          )}

          {readingTime && (
            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4" />

              <span>{readingTime} min read</span>
            </div>
          )}
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag.id} variant="secondary" className="rounded-full">
                <Tag className="mr-1 h-3 w-3" />

                {tag.tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
