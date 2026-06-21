// app/(frontend)/blogs/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostBySlug } from '@/lib/payload/posts'
import type { Media } from '@/payload-types'
import { JsonLd } from '@/components/sections/sheared/JsonLd'
import { BlogHero } from '@/components/sections/blogs/BlogHero'
import { BlogFeaturedImage } from '@/components/sections/blogs/BlogFeaturedImage'
import { BlogMetadata } from '@/components/sections/blogs/BlogMetadata'
import { AuthorCard } from '@/components/sections/blogs/AuthorCard'
import { RelatedProducts } from '@/components/sections/blogs/RelatedProducts'
import { RelatedPosts } from '@/components/sections/blogs/RelatedPosts'
import { BlogCTA } from '@/components/sections/blogs/BlogCTA'
import { BlogTags } from '@/components/sections/blogs/BlogTags'
import { Suspense } from 'react'
import { BlogContent } from '@/components/sections/blogs/BlogContent'

export const dynamic = 'force-dynamic'
export const revalidate = 60

// ── Metadata ───────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) {
    // Return minimal metadata to avoid Next.js errors when post is missing
    return {
      title: 'Post Not Found',
      description: 'The requested blog post does not exist.',
    }
  }

  // Defensive defaults for required metadata fields
  const title = post.seo?.metaTitle ?? post.title ?? 'Untitled'
  const description = post.seo?.metaDescription ?? post.excerpt ?? ''

  // ogImage falls back to featuredImage — both are Media relationships
  const ogMediaUrl =
    post.seo?.ogImage && typeof post.seo.ogImage === 'object'
      ? ((post.seo.ogImage as Media).url ?? null)
      : post.featuredImage && typeof post.featuredImage === 'object'
        ? ((post.featuredImage as Media).url ?? null)
        : null

  const ogImageUrl =
    ogMediaUrl ?? `${process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://zovaorganics.com'}/og-image.jpg`
  return {
    title,
    description,
    robots: post.seo?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: {
      canonical: post.seo?.canonicalUrl ?? `https://zovaorganics.com/blogs/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://zovaorganics.com/blogs/${post.slug}`,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: ['https://zovaorganics.com/about-us'],
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

// ── Page ───────────────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  // Safe relationship casts after depth:2 population
  const featuredImage =
    typeof post.featuredImage === 'object' ? (post.featuredImage as Media) : null

  const canonicalUrl = `https://zovaorganics.com/blogs/${post.slug}`

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
      '@id': 'https://zovaorganics.com/#organization',
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://zovaorganics.com/#organization',
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    ...(post.tags?.length && {
      keywords: post.tags.map((t) => t.tag).join(', '),
    }),
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zovaorganics.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Insights',
        item: 'https://zovaorganics.com/blogs',
      },
      { '@type': 'ListItem', position: 3, name: post.title, item: canonicalUrl },
    ],
  }

  return (
    <>
      <JsonLd schema={articleSchema} />
      {faqSchema && <JsonLd schema={faqSchema} />}
      <JsonLd schema={breadcrumbSchema} />

      <article>
        <BlogHero
          title={post.title}
          excerpt={post.excerpt}
          category={post.category}
          publishedAt={post.publishedAt}
          readingTime={post.readingTime}
        />

        {featuredImage?.url && (
          <BlogFeaturedImage src={featuredImage.url} alt={post.featuredImageAlt ?? post.title} />
        )}

        <BlogMetadata
          publishedAt={post.publishedAt}
          readingTime={post.readingTime}
          // tags={post.tags}
        />
        <BlogContent content={post.content} />
        <BlogTags />
        <AuthorCard />
        <BlogCTA />
        <Suspense fallback={null}>
          <RelatedPosts posts={[]} />
        </Suspense>
        <Suspense fallback={null}>
          <RelatedProducts products={[]} />
        </Suspense>
      </article>
    </>
  )
}
