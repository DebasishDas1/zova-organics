import { Badge } from '@/components/ui/badge'
import { CalendarDays, Clock3 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BlogHeroProps {
  title: string
  excerpt?: string | null
  category?: string | null
  publishedAt?: string | null
  readingTime?: number | null
}

function formatDate(value?: string | null) {
  if (!value) return null

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null

  return date.toLocaleDateString('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function BlogHero({ title, excerpt, category, publishedAt, readingTime }: BlogHeroProps) {
  const formattedDate = formatDate(publishedAt)

  return (
    <section className={cn('container-zova', 'flex items-center', 'py-10 sm:py-14 lg:py-20')}>
      <div className="w-full max-w-5xl">
        {category && (
          <Badge
            variant="secondary"
            className="mb-5 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground"
          >
            {category}
          </Badge>
        )}

        <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h1>

        {excerpt && (
          <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg sm:leading-8 md:text-xl md:leading-9">
            {excerpt}
          </p>
        )}

        {(formattedDate || readingTime) && (
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground sm:gap-4">
            {formattedDate && (
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1.5">
                <CalendarDays className="h-4 w-4" />
                {formattedDate}
              </span>
            )}

            {typeof readingTime === 'number' && readingTime > 0 && (
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1.5">
                <Clock3 className="h-4 w-4" />
                {readingTime} min read
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
