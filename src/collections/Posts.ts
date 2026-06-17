import type { CollectionConfig } from 'payload'
import {
  lexicalEditor,
  HeadingFeature,
  InlineToolbarFeature,
  FixedToolbarFeature,
  LinkFeature,
  UploadFeature,
  HorizontalRuleFeature,
  BlockquoteFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  OrderedListFeature,
  UnorderedListFeature,
  IndentFeature,
  AlignFeature,
} from '@payloadcms/richtext-lexical'

const isAdmin = ({ req: { user } }: any) => user?.role === 'admin'

// Helper to trigger ISR revalidation via API route
const triggerRevalidation = async (tag: string) => {
  const base = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'
  await fetch(`${base}/api/revalidate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tag }),
  })
}

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    create: isAdmin,
    read: ({ req }) => {
      if (req.user?.role === 'admin') return true
      if (req.user) return true
      return { status: { equals: 'published' } }
    },
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'status', 'publishedAt'],
    group: 'Content',
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_SERVER_URL}/blogs/${data?.slug ?? ''}?preview=true`,
    },
  },
  versions: {
    drafts: { autosave: { interval: 800 } },
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.status === 'published' && !data?.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
        if (data?.content) {
          const raw = JSON.stringify(data.content)
          const words = raw
            .replace(/\"[^\"]*\":/g, ' ') // remove keys
            .replace(/[{}[\\]\",]/g, ' ') // remove punctuation
            .trim()
            .split(/\s+/)
            .filter(Boolean).length
          data.readingTime = Math.max(1, Math.round(words / 200))
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc }) => {
        try {
          await triggerRevalidation('posts')

          if (doc.slug) {
            await triggerRevalidation(`post-${doc.slug}`)
          }
        } catch (error) {
          console.error('Revalidation failed:', error)
        }

        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        try {
          await triggerRevalidation('posts')

          if (doc.slug) {
            await triggerRevalidation(`post-${doc.slug}`)
          }
        } catch (error) {
          console.error(error)
        }
        if (doc.slug) await triggerRevalidation(`post-${doc.slug}`)
        return doc
      },
    ],
  },
  fields: [
    // ─── Core ──────────────────────────────────────────────────────────────
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
      index: true,
      admin: { description: 'Auto-generated from title. Edit only if you need a custom URL.' },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            const source = value || data?.title || ''
            return source
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/[^a-z0-9\\s-]/g, '')
              .trim()
              .replace(/\\s+/g, '-')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, '')
              .slice(0, 120)
          },
        ],
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      index: true,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Set automatically on first publish. Override if needed.',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    { name: 'author', type: 'relationship', relationTo: 'users', admin: { position: 'sidebar' } },
    // ─── Classification ────────────────────────────────────────────────────
    {
      name: 'category',
      type: 'select',
      required: true,
      index: true,
      options: [
        { label: 'Export guides', value: 'export-guides' },
        { label: 'Organic certifications', value: 'certifications' },
        { label: 'Sustainability', value: 'sustainability' },
        { label: 'Industry news', value: 'industry-news' },
        { label: 'Supply chain', value: 'supply-chain' },
        { label: 'Buyer resources', value: 'buyer-resources' },
        { label: 'Company news', value: 'company-news' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-calculated from content word count on save.',
      },
    },
    {
      name: 'tags',
      type: 'array',
      admin: {
        position: 'sidebar',
        description: 'e.g. GOTS, tote bags, EU export, organic cotton',
      },
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    // ─── Content ───────────────────────────────────────────────────────────
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 160,
      admin: {
        description: 'Shown on blog cards and used as meta description. Max 160 characters.',
      },
    },
    { name: 'featuredImage', type: 'upload', relationTo: 'blog-images', required: true },
    {
      name: 'featuredImageAlt',
      type: 'text',
      required: true,
      admin: { description: 'Describe the image for screen readers and search engines.' },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: () => [
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          StrikethroughFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          OrderedListFeature(),
          UnorderedListFeature(),
          IndentFeature(),
          AlignFeature(),
          BlockquoteFeature(),
          HorizontalRuleFeature(),
          LinkFeature({
            enabledCollections: ['posts', 'products'],
            fields: ({ defaultFields }) => [
              ...defaultFields,
              {
                name: 'rel',
                type: 'select',
                label: 'Rel attribute',
                options: [
                  { label: 'Follow (default)', value: '' },
                  { label: 'No follow', value: 'nofollow' },
                  { label: 'Sponsored', value: 'sponsored' },
                ],
              },
            ],
          }),
          UploadFeature({
            collections: {
              media: {
                fields: [
                  { name: 'caption', type: 'text' },
                  {
                    name: 'size',
                    type: 'select',
                    defaultValue: 'full',
                    options: [
                      { label: 'Full width', value: 'full' },
                      { label: 'Wide (800px)', value: 'wide' },
                      { label: 'Medium', value: 'medium' },
                    ],
                  },
                ],
              },
            },
          }),
        ],
      }),
      admin: { description: 'Use H2/H3 headings, bullet lists, and images to structure for SEO.' },
    },
    // ─── Related content ───────────────────────────────────────────────────
    {
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      maxDepth: 1,
      admin: { description: 'Shown in the sidebar. Link products relevant to this post.' },
    },
    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      maxDepth: 1,
      admin: { description: 'Further reading shown at the bottom. Max 2–3 posts.' },
    },
    // ─── SEO ───────────────────────────────────────────────────────────────
    {
      type: 'group',
      name: 'seo',
      label: 'SEO',
      admin: { position: 'sidebar' },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          minLength: 10,
          maxLength: 60,
          admin: { description: 'Overrides post title in search results. Keep 10–60 chars.' },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 160,
          admin: { description: 'Overrides excerpt in search results. Keep under 160 chars.' },
        },
        {
          name: 'canonicalUrl',
          type: 'text',
          admin: { description: 'Only set if this post is republished from another URL.' },
        },
        {
          name: 'noIndex',
          type: 'checkbox',
          defaultValue: false,
          label: 'Hide from search engines (noindex)',
          admin: { description: 'Use for thin, duplicate, or temporary content only.' },
        },
        {
          name: 'focusKeyword',
          type: 'text',
          admin: {
            description:
              'Primary keyword this post targets. Internal tracking only — not published.',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'blog-images',
          label: 'Social share image',
          admin: {
            description:
              'Shown on LinkedIn, WhatsApp, Twitter previews. 1200×630px. Falls back to featured image.',
          },
        },
      ],
    },
    // ─── Schema markup ─────────────────────────────────────────────────────
    {
      type: 'group',
      name: 'schema',
      label: 'Schema markup',
      admin: { description: 'Controls the JSON-LD structured data injected in the page <head>.' },
      fields: [
        {
          name: 'articleType',
          type: 'select',
          defaultValue: 'Article',
          options: [
            { label: 'Article', value: 'Article' },
            { label: 'How-to guide', value: 'HowTo' },
            { label: 'FAQ page', value: 'FAQPage' },
          ],
          admin: {
            description: 'Article = standard post. HowTo / FAQPage unlock Google rich results.',
          },
        },
        {
          name: 'faqItems',
          type: 'array',
          label: 'FAQ items',
          admin: {
            description:
              'Shown only when type is "FAQ page". Each item becomes a rich result in Google.',
            condition: (_, siblingData) => siblingData?.articleType === 'FAQPage',
          },
          fields: [
            { name: 'question', type: 'text', required: true },
            {
              name: 'answer',
              type: 'textarea',
              required: true,
              admin: { description: 'Plain text only — no markdown. Keep answers concise.' },
            },
          ],
        },
      ],
    },
  ],
}
