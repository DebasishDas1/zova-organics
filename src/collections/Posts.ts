import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'status', 'publishedAt'],
    group: 'Content',
  },

  versions: {
    drafts: {
      autosave: {
        interval: 800,
      },
    },
  },

  fields: [
    // ─── Core ─────────────────────────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL slug. e.g. what-is-gots-certification',
      },
    },

    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Review', value: 'review' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Controls published date shown to readers. Defaults to now on first publish.',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },

    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
      },
    },

    // ─── Classification ───────────────────────────────────────────────
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Export guides', value: 'export-guides' },
        { label: 'Organic certifications', value: 'certifications' },
        { label: 'Sustainability', value: 'sustainability' },
        { label: 'Industry news', value: 'industry-news' },
        { label: 'Supply chain', value: 'supply-chain' },
        { label: 'Buyer resources', value: 'buyer-resources' },
        { label: 'Company news', value: 'company-news' },
      ],
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'tags',
      type: 'array',
      admin: {
        position: 'sidebar',
        description: 'e.g. GOTS, tote bags, EU export, organic cotton',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },

    // ─── Content ──────────────────────────────────────────────────────
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'Short summary shown on blog listing cards and in search results (max 160 chars)',
      },
    },

    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    {
      name: 'featuredImageAlt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alt text for accessibility and SEO',
      },
    },

    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Main post body. Use headings (H2, H3) to structure for SEO.',
      },
    },

    // ─── Related content ──────────────────────────────────────────────
    {
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: {
        description: 'Link relevant products — shown at the bottom of the post',
      },
    },

    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      admin: {
        description: 'Suggested further reading — 2 or 3 posts max',
      },
    },

    // ─── SEO ──────────────────────────────────────────────────────────
    {
      type: 'group',
      name: 'seo',
      label: 'SEO',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: {
            description: 'Defaults to post title. Keep under 60 chars.',
          },
        },

        {
          name: 'metaDescription',
          type: 'textarea',
          admin: {
            description: 'Defaults to excerpt. Keep under 160 chars.',
          },
        },

        {
          name: 'canonicalUrl',
          type: 'text',
          admin: {
            description: 'Only set if this post is syndicated from another URL',
          },
        },

        {
          name: 'noIndex',
          type: 'checkbox',
          defaultValue: false,
          label: 'No index (hide from search engines)',
          admin: {
            description: 'Use for thin or duplicate content you do not want indexed',
          },
        },

        {
          name: 'focusKeyword',
          type: 'text',
          admin: {
            description: 'Primary keyword this post targets — for internal tracking only',
          },
        },

        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Open Graph image',
          admin: {
            description:
              'Image shown when shared on LinkedIn, WhatsApp etc. (1200×630px ideal). Defaults to featured image.',
          },
        },
      ],
    },

    // ─── Schema markup ────────────────────────────────────────────────
    {
      type: 'group',
      name: 'schema',
      label: 'Schema markup',
      admin: {
        description: 'Structured data for Google rich results',
      },
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
            description: 'Affects the JSON-LD schema injected into the page <head>',
          },
        },

        {
          name: 'faqItems',
          type: 'array',
          label: 'FAQ items',
          admin: {
            description: 'Only used when Article type is "FAQ page". Renders FAQ rich results.',
            condition: (_, siblingData) => siblingData?.articleType === 'FAQPage',
          },
          fields: [
            {
              name: 'question',
              type: 'text',
              required: true,
            },
            {
              name: 'answer',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
