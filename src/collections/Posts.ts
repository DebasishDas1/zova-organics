import type { Access, CollectionConfig } from 'payload'
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
  EXPERIMENTAL_TableFeature,
} from '@payloadcms/richtext-lexical'
import { triggerRevalidation } from '../lib/revalidate'

const isAdmin: Access = ({ req: { user } }) => user?.role === 'admin'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    create: isAdmin,
    read: ({ req }) => {
      if (req.user?.role === 'admin') return true
      return { status: { equals: 'published' } }
    },
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'status', 'publishedAt'],
    group: 'Content',
    preview: (data) =>
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/preview?secret=${process.env.PAYLOAD_PREVIEW_SECRET}&slug=${data?.slug ?? ''}`,
  },
  // No versions/drafts/autosave — `status` (draft/published) is the
  // workflow, same as Products. Cuts the _v shadow tables entirely.
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.status === 'published' && !data?.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
        if (data?.content) {
          const raw = JSON.stringify(data.content)
          const words = raw
            .replace(/\"[^\"]*\":/g, ' ')
            .replace(/[{}[\]",]/g, ' ')
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
          if (doc.slug) await triggerRevalidation(`post-${doc.slug}`)
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
          if (doc.slug) await triggerRevalidation(`post-${doc.slug}`)
        } catch (error) {
          console.error(error)
        }
        return doc
      },
    ],
  },
  fields: [
    // ─── Core ──────────────────────────────────────────────────────────
    { name: 'title', type: 'text', required: true, localized: true },
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
              .replace(/[^a-z0-9\s-]/g, '')
              .trim()
              .replace(/\s+/g, '-')
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
    {
      name: 'category',
      type: 'select',
      required: true,
      index: true,
      admin: { position: 'sidebar' },
      options: [
        { label: 'Export guides', value: 'export-guides' },
        { label: 'Organic certifications', value: 'certifications' },
        { label: 'Sustainability', value: 'sustainability' },
        { label: 'Industry news', value: 'industry-news' },
        { label: 'Supply chain', value: 'supply-chain' },
        { label: 'Buyer resources', value: 'buyer-resources' },
        { label: 'Company news', value: 'company-news' },
      ],
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
      admin: { position: 'sidebar', readOnly: true, description: 'Auto-calculated on save.' },
    },
    {
      // Was an array of {tag} objects — flattened to comma-separated text, no extra table.
      name: 'tags',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Comma-separated. e.g. GOTS, tote bags, EU export',
      },
    },

    // ─── Content ───────────────────────────────────────────────────────
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      maxLength: 160,
      admin: {
        description: 'Shown on blog cards and used as meta description. Max 160 characters.',
      },
    },
    { name: 'featuredImage', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'featuredImageAlt',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'Describe the image for screen readers and search engines.' },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
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
          EXPERIMENTAL_TableFeature(),
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
    {
      name: 'contentPreview',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/admin/ContentPreview/ContentPreviewField#ContentPreviewField',
        },
      },
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      localized: true,
      admin: { description: 'Frequently Asked Questions for this post.' },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
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

    // ─── SEO / Schema (tabbed, no separate group tables) ────────────────
    {
      type: 'tabs',
      tabs: [
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              localized: true,
              minLength: 10,
              maxLength: 60,
              admin: { description: 'Overrides post title in search results. Keep 10–60 chars.' },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              localized: true,
              maxLength: 160,
              admin: { description: 'Overrides excerpt in search results. Keep under 160 chars.' },
            },
            {
              name: 'canonicalUrl',
              type: 'text',
              localized: true,
              admin: { description: 'Only set if this post is republished from another URL.' },
            },
            {
              name: 'noIndex',
              type: 'checkbox',
              defaultValue: false,
              label: 'Hide from search engines (noindex)',
            },
            {
              name: 'focusKeyword',
              type: 'text',
              admin: { description: 'Primary keyword this post targets. Internal tracking only.' },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Social share image',
              admin: { description: 'Shown on LinkedIn, WhatsApp, Twitter previews. 1200×630px.' },
            },
          ],
        },
        {
          label: 'Schema markup',
          description: 'Controls the JSON-LD structured data injected in the page <head>.',
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
            },
            {
              name: 'faqItems',
              type: 'array',
              label: 'FAQ items',
              admin: {
                description: 'Shown only when type is "FAQ page".',
                condition: (_, siblingData) => siblingData?.articleType === 'FAQPage',
              },
              fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
}
