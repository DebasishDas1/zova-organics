import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CalendarDays, Clock3 } from 'lucide-react'

interface BlogHeroProps {
  title: string
  excerpt?: string | null
  category?: string | null
  publishedAt?: string | null
  readingTime?: number | null
}

export function BlogHero({ title, excerpt, category, publishedAt, readingTime }: BlogHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto max-w-6xl px-6 py-20 lg:py-32">
        <div className="mx-auto max-w-4xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>

            <span>/</span>

            <Link href="/blogs" className="transition-colors hover:text-foreground">
              Insights
            </Link>
          </nav>

          {category && (
            <Badge variant="secondary" className="rounded-full px-4 py-1">
              {category.replace(/-/g, ' ')}
            </Badge>
          )}

          <h1
            className="
            mt-6
            text-5xl
            font-semibold
            tracking-tighter
            leading-[0.95]
            md:text-6xl
            lg:text-7xl
          "
          >
            {title}
          </h1>

          {excerpt && (
            <p
              className="
              mt-8
              max-w-3xl
              text-xl
              leading-9
              text-muted-foreground
            "
            >
              {excerpt}
            </p>
          )}

          <Separator className="my-10" />

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
        </div>
      </div>
    </section>
  )
}
