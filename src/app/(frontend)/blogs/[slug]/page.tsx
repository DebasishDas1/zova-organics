// app/(frontend)/blogs/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPostBySlug, getAllPostSlugs } from '@/lib/payload/posts'
import type { Media, Product, Post } from '@/payload-types'
import { BlogCard } from '@/components/sections/blogs/BlogCard'
import { JsonLd } from '@/components/sections/sheared/JsonLd'

export const revalidate = 60

const BASE_URL = 'https://zovaorganics.com'

// Guard: DB unavailable at Docker build time → fall back to on-demand rendering
export async function generateStaticParams() {
  try {
    return await getAllPostSlugs()
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  try {
    const post = await getPostBySlug(slug)
    if (!post)
      return { title: 'Post Not Found', description: 'The requested blog post does not exist.' }

    const title = post.seo?.metaTitle ?? post.title ?? 'Untitled'
    const description = post.seo?.metaDescription ?? post.excerpt ?? ''

    const ogMediaUrl =
      post.seo?.ogImage && typeof post.seo.ogImage === 'object'
        ? ((post.seo.ogImage as Media).url ?? null)
        : post.featuredImage && typeof post.featuredImage === 'object'
          ? ((post.featuredImage as Media).url ?? null)
          : null

    const ogImageUrl = ogMediaUrl ?? `${BASE_URL}/og-image.jpg`

    return {
      title,
      description,
      robots: post.seo?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
      alternates: {
        canonical: post.seo?.canonicalUrl ?? `${BASE_URL}/blogs/${post.slug}`,
      },
      openGraph: {
        title,
        description,
        type: 'article',
        url: `${BASE_URL}/blogs/${post.slug}`,
        publishedTime: post.publishedAt ?? undefined,
        modifiedTime: post.updatedAt,
        authors: [`${BASE_URL}/about-us`],
        images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [ogImageUrl],
      },
    }
  } catch {
    return {}
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────

function isPopulatedPost(v: unknown): v is Post {
  return typeof v === 'object' && v !== null && 'slug' in v
}

function isPopulatedProduct(v: unknown): v is Product {
  return typeof v === 'object' && v !== null && 'slug' in v
}

// ── Page ───────────────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const featuredImage =
    typeof post.featuredImage === 'object' ? (post.featuredImage as Media) : null

  const relatedPosts = (post.relatedPosts ?? []).filter(isPopulatedPost)
  const relatedProducts = (post.relatedProducts ?? []).filter(isPopulatedProduct)

  const canonicalUrl = `${BASE_URL}/blogs/${post.slug}`

  // ── JSON-LD ──────────────────────────────────────────────────────────────
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': post.schema?.articleType ?? 'Article',
    headline: post.title,
    description: post.excerpt,
    url: canonicalUrl,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    ...(featuredImage?.url && { image: featuredImage.url }),
    author: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    ...(post.tags?.length && { keywords: post.tags.map((t) => t.tag).join(', ') }),
  }

  const faqSchema =
    post.schema?.articleType === 'FAQPage' &&
    Array.isArray(post.schema.faqItems) &&
    post.schema.faqItems.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.schema.faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }
      : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: `${BASE_URL}/blogs` },
      { '@type': 'ListItem', position: 3, name: post.title, item: canonicalUrl },
    ],
  }

  return (
    <>
      <JsonLd schema={articleSchema} />
      {faqSchema && <JsonLd schema={faqSchema} />}
      <JsonLd schema={breadcrumbSchema} />

      <article className="pb-32">
        {/* ── Hero ── */}
        <section className="container-zova pt-20">
          <div className="mx-auto max-w-4xl">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground"
            >
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/blogs" className="hover:text-foreground transition-colors">
                Insights
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-foreground line-clamp-1">{post.title}</span>
            </nav>

            {post.category && (
              <p className="mb-6 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {post.category.replace(/-/g, ' ')}
              </p>
            )}

            <h1 className="text-5xl font-semibold tracking-tighter leading-[1.05] md:text-6xl lg:text-7xl">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-8 text-xl leading-relaxed text-muted-foreground">{post.excerpt}</p>
            )}

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              {post.publishedAt && (
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              )}
              {post.readingTime && <span>{post.readingTime} min read</span>}
            </div>
          </div>
        </section>

        {/* ── Featured image ── */}
        {featuredImage?.url && (
          <section className="container-zova mt-16">
            <div className="relative aspect-16/8 overflow-hidden rounded-[40px]">
              <Image
                src={featuredImage.url}
                alt={post.featuredImageAlt ?? post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
          </section>
        )}

        {/* ── Body ── */}
        <section className="container-zova mt-24">
          <div className="grid gap-24 lg:grid-cols-[minmax(0,1fr)_280px]">
            {/* Main */}
            <div className="mx-auto w-full max-w-3xl">
              <div
                className="
                  prose prose-lg max-w-none
                  prose-headings:font-semibold prose-headings:tracking-[-0.03em]
                  prose-h2:text-4xl prose-h2:mt-20
                  prose-h3:text-2xl
                  prose-p:text-[18px] prose-p:leading-8
                  prose-li:leading-8
                  prose-img:rounded-[24px]
                  prose-blockquote:border-l-2 prose-blockquote:border-primary
                  prose-blockquote:bg-muted/30 prose-blockquote:px-6 prose-blockquote:py-2
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-code:text-primary prose-code:bg-muted
                  prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                  prose-code:before:content-none prose-code:after:content-none
                "
              >
                <RichText data={post.content} />
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="mt-16 border-t border-border pt-8">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="rounded-full border border-border px-4 py-2 text-xs text-muted-foreground"
                      >
                        {tag.tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-24 rounded-[28px] border border-border p-8">
                <h3 className="text-lg font-semibold">Zova Organics Editorial Team</h3>
                <p className="mt-3 text-muted-foreground">
                  Specialists in sustainable sourcing, organic textiles, private label
                  manufacturing, and global exports.
                </p>
              </div>

              {relatedPosts.length > 0 && (
                <section className="mt-32" aria-labelledby="further-reading-heading">
                  <h2
                    id="further-reading-heading"
                    className="mb-10 text-3xl font-semibold tracking-tight"
                  >
                    Further Reading
                  </h2>
                  <div className="grid gap-8 md:grid-cols-2">
                    {relatedPosts.map((related) => (
                      <BlogCard key={related.id} post={related} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside aria-label="Post sidebar" className="space-y-8 lg:sticky lg:top-32 lg:h-fit">
              {relatedProducts.length > 0 && (
                <div className="rounded-[24px] border border-border bg-card p-6">
                  <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide">
                    Related Products
                  </h3>
                  <div className="space-y-3">
                    {relatedProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        className="block rounded-xl border border-border p-4 transition-colors hover:bg-muted/40"
                      >
                        <p className="font-medium">{product.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">View product →</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-[28px] bg-primary p-8 text-primary-foreground">
                <h3 className="text-xl font-semibold">Looking for a sourcing partner?</h3>
                <p className="mt-3 text-sm opacity-90">
                  Request samples, certifications, export documentation, and pricing.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
                >
                  Request a Quote
                </Link>
              </div>

              <Link
                href="/blogs"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Insights
              </Link>
            </aside>
          </div>
        </section>
      </article>
    </>
  )
}
