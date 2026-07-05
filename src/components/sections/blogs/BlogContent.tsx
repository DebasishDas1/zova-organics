import {
  RichText,
  type JSXConvertersFunction,
  type JSXConverters,
} from '@payloadcms/richtext-lexical/react'
import type { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import type { SerializedLexicalNode } from 'lexical'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { TableOfContents } from './TableOfContents'
import type { Post, Media } from '@/payload-types'

interface BlogContentProps {
  content: Post['content']
  className?: string
}

type RichTextNodeLike = SerializedLexicalNode & {
  type?: string
  text?: string
  children?: RichTextNodeLike[]
}

type ParagraphBlock =
  | {
      type: 'paragraph'
      children: RichTextNodeLike[]
    }
  | {
      type: 'hr'
    }

export function splitParagraphChildren(children: RichTextNodeLike[]): ParagraphBlock[] {
  const blocks: ParagraphBlock[] = []
  let buffer: RichTextNodeLike[] = []

  for (const child of children) {
    if (child.type === 'horizontalrule') {
      if (buffer.length > 0) {
        blocks.push({ type: 'paragraph', children: buffer })
        buffer = []
      }

      blocks.push({ type: 'hr' })
      continue
    }

    buffer.push(child)
  }

  if (buffer.length > 0) {
    blocks.push({ type: 'paragraph', children: buffer })
  }

  return blocks
}

// Matches the `size` option added to UploadFeature in Posts.ts.
// "full" gets the edge-to-edge treatment on mobile, like Apple's article images.
const containedWidth: Record<string, string> = {
  wide: 'sm:max-w-[820px]',
  medium: 'sm:max-w-[600px]',
}

// Same slug algorithm your TOC should use to build its links (# anchors)
export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function getPlainText(node: unknown): string {
  if (!node || typeof node !== 'object') return ''
  const n = node as { text?: string; children?: unknown[] }
  if (typeof n.text === 'string') return n.text
  if (Array.isArray(n.children)) return n.children.map(getPlainText).join('')
  return ''
}

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) =>
  ({
    ...defaultConverters,

    // Adds a stable id to every heading so the sticky TOC can actually scroll to it.
    // Visual sizing lives on the wrapping <article> via [&_h2]: selectors below —
    // that way it applies to the raw <h2>/<h3>/<h4> tag regardless of this converter.
    heading: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      const text = node.children.map(getPlainText).join('')
      const id = slugifyHeading(text)
      const Tag = node.tag as keyof React.JSX.IntrinsicElements
      return <Tag id={id}>{children}</Tag>
    },

    // Renders the custom caption + size fields added to UploadFeature.
    // "full" images bleed edge-to-edge on mobile, then settle into a
    // rounded, contained frame from the sm breakpoint up.
    upload: ({ node }) => {
      const uploadDoc = node.value as Media
      if (!uploadDoc || typeof uploadDoc !== 'object' || !uploadDoc.url) return null

      const fields = (node.fields ?? {}) as { caption?: string; size?: string }
      const size = fields.size ?? 'full'
      const isFull = size === 'full'
      const width = uploadDoc.width ?? 1600
      const height = uploadDoc.height ?? 900

      return (
        <figure
          className={cn(
            'my-10 sm:my-14',
            isFull
              ? 'relative left-1/2 w-screen -translate-x-1/2 sm:static sm:left-auto sm:w-full sm:translate-x-0'
              : cn('mx-auto w-full', containedWidth[size]),
          )}
        >
          <Image
            src={uploadDoc.url}
            alt={uploadDoc.alt ?? fields.caption ?? ''}
            width={width}
            height={height}
            sizes="(max-width: 640px) 100vw, 800px"
            className={cn('h-auto w-full', isFull ? 'sm:rounded-[20px]' : 'rounded-[20px]')}
          />
          {fields.caption && (
            <figcaption className="mt-3 px-4 text-center text-[13px] text-[#86868b] sm:px-0">
              {fields.caption}
            </figcaption>
          )}
        </figure>
      )
    },

    // Applies the rel dropdown (nofollow / sponsored) and opens external links safely
    link: ({ node, nodesToJSX }) => {
      const fields = node.fields as {
        url?: string
        newTab?: boolean
        rel?: string
        doc?: { value?: { slug?: string }; relationTo?: string }
      }

      const href =
        fields.url ??
        (fields.doc?.value?.slug
          ? `/${fields.doc.relationTo === 'products' ? 'products' : 'blogs'}/${fields.doc.value.slug}`
          : '#')

      const rel = [fields.newTab && 'noopener noreferrer', fields.rel].filter(Boolean).join(' ')

      return (
        <a
          href={href}
          target={fields.newTab ? '_blank' : undefined}
          rel={rel || undefined}
          className="text-[#0071e3] no-underline hover:underline"
        >
          {nodesToJSX({ nodes: node.children })}
        </a>
      )
    },

    // Large centered pull-quote in the Apple Newsroom style — no border,
    // just scale and weight doing the work.
    // NOTE: Lexical's actual node type for a quote is "quote", not "blockquote" —
    // using the wrong key here means this never renders.
    quote: ({ node, nodesToJSX }) => (
      <blockquote className="mx-auto my-14 max-w-140 px-4 text-center sm:my-20">
        <p className="text-[24px] font-semibold leading-[1.35] tracking-[-0.02em] text-[#1d1d1f] sm:text-[30px]">
          {nodesToJSX({ nodes: node.children })}
        </p>
      </blockquote>
    ),

    paragraph: ({ node, nodesToJSX }) => {
      const blocks = splitParagraphChildren(node.children as RichTextNodeLike[])

      return (
        <>
          {blocks.map((block, index) => {
            if (block.type === 'hr') {
              return <hr key={`hr-${index}`} className="my-16 border-[#d2d2d7] sm:my-20" />
            }

            return <p key={`paragraph-${index}`}>{nodesToJSX({ nodes: block.children })}</p>
          })}
        </>
      )
    },
  }) as JSXConverters<DefaultNodeTypes>

export function BlogContent({ content, className }: BlogContentProps) {
  if (!content) return null

  return (
    <section className="w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28 ontainer-zova">
      <div className="mx-auto grid w-full max-w-280 gap-12 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-20">
        {/* Main Content */}

        <article
          id="blog-content"
          className={cn(
            // Layout
            'mx-auto w-full min-w-0 max-w-160 overflow-x-hidden',

            // Prevent any child from overflowing the screen
            '**:max-w-full',
            '[&_img]:h-auto [&_img]:max-w-full',
            '[&_video]:max-w-full',
            '[&_iframe]:max-w-full',
            '[&_table]:block [&_table]:w-full [&_table]:overflow-x-auto',
            '[&_pre]:max-w-full [&_pre]:overflow-x-auto',
            '[&_code]:wrap-break-word',
            '[&_a]:break-all',
            '[&_p]:wrap-break-word',
            '[&_li]:wrap-break-word',

            // Headings
            '[&_h1]:mt-0 [&_h1]:text-[36px] [&_h1]:font-semibold [&_h1]:leading-[1.1] [&_h1]:tracking-[-0.03em] [&_h1]:text-[#1d1d1f] [&_h1]:scroll-mt-28 sm:[&_h1]:text-[44px]',
            '[&_h2]:mt-16 [&_h2]:mb-5 [&_h2]:text-[26px] [&_h2]:font-semibold [&_h2]:leading-[1.2] [&_h2]:tracking-[-0.03em] [&_h2]:text-[#1d1d1f] [&_h2]:scroll-mt-28 sm:[&_h2]:mt-20 sm:[&_h2]:mb-6 sm:[&_h2]:text-[30px]',
            '[&_h3]:mt-12 [&_h3]:mb-4 [&_h3]:text-[21px] [&_h3]:font-semibold [&_h3]:leading-[1.3] [&_h3]:tracking-[-0.03em] [&_h3]:text-[#1d1d1f] [&_h3]:scroll-mt-28 sm:[&_h3]:mt-14 sm:[&_h3]:text-[23px]',
            '[&_h4]:mt-8 [&_h4]:mb-3 [&_h4]:text-[18px] [&_h4]:font-semibold [&_h4]:text-[#1d1d1f] [&_h4]:scroll-mt-28',

            // Body
            '[&_p]:my-5 [&_p]:text-[17px] [&_p]:leading-[1.65] [&_p]:text-[#1d1d1f]/82 sm:[&_p]:text-[19px] sm:[&_p]:leading-[1.6]',

            // Lists
            '[&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6',
            '[&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6',
            '[&_li]:my-2 [&_li]:text-[17px] [&_li]:leading-[1.6] [&_li]:text-[#1d1d1f]/82 sm:[&_li]:text-[19px]',
            '[&_li_p]:my-0',

            // Inline
            '[&_strong]:font-semibold [&_strong]:text-[#1d1d1f]',
            '[&_em]:italic',

            // Code
            '[&_pre]:my-8 [&_pre]:rounded-2xl [&_pre]:border [&_pre]:border-[#d2d2d7] [&_pre]:bg-[#f5f5f7] [&_pre]:p-4 [&_pre]:text-[14px]',
            '[&_code]:rounded-md [&_code]:bg-[#f5f5f7] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[15px] [&_code]:text-[#1d1d1f]',
            '[&_pre_code]:bg-transparent [&_pre_code]:p-0',

            // Tables
            '[&_figure]:my-8 [&_figure]:w-full [&_figure]:max-w-full [&_figure]:overflow-x-auto',
            '[&_table]:w-max [&_table]:min-w-full [&_table]:border-collapse [&_table]:text-[15px]',
            '[&_thead]:bg-[#f5f5f7]',
            '[&_th]:whitespace-nowrap [&_th]:border-b [&_th]:border-[#d2d2d7] [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-semibold',
            '[&_td]:whitespace-nowrap [&_td]:border-b [&_td]:border-[#e8e8ed] [&_td]:px-4 [&_td]:py-3 [&_td]:align-top',

            className,
          )}
        >
          <RichText data={content} converters={jsxConverters} />
        </article>

        {/* Desktop TOC — kept off mobile so the article opens straight into content */}

        <div className="hidden lg:block">
          <div className="sticky top-28">
            <TableOfContents />
          </div>
        </div>
      </div>
    </section>
  )
}
