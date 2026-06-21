import { RichText } from '@payloadcms/richtext-lexical/react'
import { cn } from '@/lib/utils'
import { TableOfContents } from './TableOfContents'
import type { Post } from '@/payload-types'

interface BlogContentProps {
  content: Post['content']
  className?: string
}

export function BlogContent({ content, className }: BlogContentProps) {
  return (
    <section className="container mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-20 lg:grid-cols-[minmax(0,1fr)_280px]">
        {/* Main Content */}

        <article
          id="blog-content"
          className={cn(
            `
            mx-auto
            w-full
            max-w-3xl

            prose
            prose-neutral
            dark:prose-invert

            prose-headings:font-semibold
            prose-headings:tracking-[-0.04em]
            prose-headings:scroll-mt-24

            prose-h1:text-5xl
            prose-h2:text-4xl
            prose-h3:text-3xl
            prose-h4:text-2xl

            prose-h2:mt-20
            prose-h2:mb-6

            prose-h3:mt-14
            prose-h3:mb-5

            prose-p:text-[19px]
            prose-p:leading-9
            prose-p:text-muted-foreground

            prose-li:text-[18px]
            prose-li:leading-8

            prose-a:text-primary
            prose-a:no-underline
            hover:prose-a:underline

            prose-strong:text-foreground

            prose-img:rounded-[28px]
            prose-img:shadow-lg

            prose-pre:rounded-2xl

            prose-blockquote:border-l-2
            prose-blockquote:border-primary
            prose-blockquote:bg-muted/30
            prose-blockquote:px-8
            prose-blockquote:py-4
            prose-blockquote:rounded-r-xl

            prose-code:bg-muted
            prose-code:px-1.5
            prose-code:py-1
            prose-code:rounded-md
            prose-code:before:hidden
            prose-code:after:hidden

            prose-table:block
            prose-table:overflow-x-auto

            prose-hr:my-16
            `,
            className,
          )}
        >
          <RichText data={content} />
        </article>

        {/* Desktop TOC */}

        <div className="hidden lg:block">
          <div className="sticky top-28">
            <TableOfContents />
          </div>
        </div>
      </div>
    </section>
  )
}
