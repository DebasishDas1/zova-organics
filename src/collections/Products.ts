import type { Access, CollectionConfig, FieldHook } from 'payload'
import { triggerRevalidation } from '../lib/revalidate'

const isAdmin: Access = ({ req: { user } }) => user?.role === 'admin'

const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

const slugHook: FieldHook = ({ data, value }) => {
  if (value) return value
  if (data?.title) return generateSlug(data.title)
  return value
}

export const skuHook: FieldHook = ({ data }) => {
  const categoryMap: Record<string, string> = {
    'shopping-grocery-bags': 'SGB',
    'lunch-tiffin-bags': 'LTB',
    'tote-bags': 'TOT',
    'fashion-designer-handbags': 'FDH',
    'gifting-bags': 'GFT',
    'promotional-event-bags': 'PEB',
    'wine-bottle-bags': 'WBB',
    'conference-folders-file-bags': 'CFB',
    'planter-bags': 'PLB',
    'gunny-sacks': 'GUN',
  }

  const category =
    categoryMap[data?.category] || data?.category?.toUpperCase()?.slice(0, 4) || 'GEN'
  const slugPart = data?.slug?.split('-').slice(0, 2).join('').toUpperCase() || 'ITEM'
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()

  return `ZO-${category}-${slugPart}-${rand}`
}

export const Products: CollectionConfig = {
  slug: 'products',

  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'stockStatus', 'featured'],
    group: 'Catalogue',
  },

  // No versions/drafts — stockStatus already gives you a draft/active/out-of-stock
  // workflow without doubling every table with a shadow _v version.
  hooks: {
    afterChange: [
      async ({ doc }) => {
        await triggerRevalidation('products')
        if (doc.slug) await triggerRevalidation(`product-${doc.slug}`)
        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        await triggerRevalidation('products')
        if (doc.slug) await triggerRevalidation(`product-${doc.slug}`)
        return doc
      },
    ],
  },

  fields: [
    // ─── Top-level identity (always visible, no tab needed) ────────────
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      hooks: { beforeValidate: [slugHook] },
      admin: { description: 'URL-safe identifier. e.g. natural-cotton-tote-bag' },
    },
    {
      name: 'sku',
      type: 'text',
      hooks: { beforeValidate: [skuHook] },
      admin: {
        readOnly: true,
        description: 'Auto-generated from category and slug.',
      },
    },
    {
      name: 'stockStatus',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Active', value: 'active' },
        { label: 'Out of stock', value: 'out-of-stock' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Show on homepage featured section' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      admin: { position: 'sidebar' },
      options: [
        { label: 'Bags', value: 'bags' },
        { label: 'Shopping & Grocery Bags', value: 'shopping-grocery-bags' },
        { label: 'Lunch & Tiffin Bags', value: 'lunch-tiffin-bags' },
        { label: 'Tote Bags', value: 'tote-bags' },
        { label: 'Fashion & Designer Handbags', value: 'fashion-designer-handbags' },
        { label: 'Gifting Bags', value: 'gifting-bags' },
        { label: 'Promotional & Event Bags', value: 'promotional-event-bags' },
        { label: 'Wine & Bottle Bags', value: 'wine-bottle-bags' },
        { label: 'Conference Folders & File Bags', value: 'conference-folders-file-bags' },
        { label: 'Planter Bags', value: 'planter-bags' },
        { label: 'Gunny Sacks', value: 'gunny-sacks' },
      ],
    },
    {
      // Was an array of {tag} objects — that's its own DB table for a flat word list.
      // A comma-separated text field holds the same info with zero extra tables.
      name: 'tags',
      type: 'text',
      admin: { description: 'Comma-separated. e.g. natural dye, unbleached, bulk' },
    },

    // ─── Tabs group everything else without adding tables ──────────────
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Description & Media',
          fields: [
            {
              name: 'shortDescription',
              type: 'textarea',
              required: true,
              localized: true,
              admin: { description: 'One-line shown on product cards (max 160 chars)' },
            },
            { name: 'fullDescription', type: 'richText', localized: true },
            { name: 'featuredImage', type: 'upload', relationTo: 'media', required: true },
            {
              name: 'gallery',
              type: 'array',
              admin: { description: 'Additional product images (packaging, close-ups, in-use)' },
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                { name: 'caption', type: 'text', localized: true },
              ],
            },
            {
              name: 'certifications',
              type: 'relationship',
              relationTo: 'certifications',
              hasMany: true,
            },
          ],
        },
        {
          label: 'Specifications',
          fields: [
            {
              name: 'material',
              type: 'text',
              required: true,
              localized: true,
              admin: { description: 'e.g. 100% GOTS organic cotton' },
            },
            {
              name: 'gsm',
              type: 'text',
              localized: true,
              admin: { description: 'e.g. 140–180 GSM' },
            },
            {
              name: 'dimensions',
              type: 'text',
              localized: true,
              admin: { description: 'e.g. 38×42 cm' },
            },
            { name: 'colours', type: 'text', localized: true },
            {
              name: 'finish',
              type: 'text',
              localized: true,
              admin: { description: 'e.g. Unbleached, enzyme-washed' },
            },
            {
              name: 'additionalSpecs',
              type: 'array',
              label: 'Additional spec rows',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'value', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Ordering & Customisation',
          fields: [
            { name: 'moq', type: 'number', required: true, label: 'Minimum order quantity' },
            { name: 'moqUnit', type: 'text', defaultValue: 'units' },
            {
              name: 'leadTimeDays',
              type: 'text',
              admin: { description: 'e.g. 21–28 days after artwork approval' },
            },
            { name: 'sampleAvailable', type: 'checkbox', defaultValue: true },
            {
              name: 'sampleLeadTime',
              type: 'text',
              admin: {
                description: 'e.g. 5–7 business days',
                condition: (_, siblingData) => siblingData?.sampleAvailable,
              },
            },
            {
              name: 'customLogoAvailable',
              type: 'checkbox',
              defaultValue: true,
              label: 'Custom logo / branding',
            },
            {
              name: 'customSizeAvailable',
              type: 'checkbox',
              defaultValue: false,
              label: 'Custom sizing',
            },
            {
              name: 'privateLabelAvailable',
              type: 'checkbox',
              defaultValue: false,
              label: 'Private label',
            },
            {
              name: 'customDyeAvailable',
              type: 'checkbox',
              defaultValue: false,
              label: 'Custom / natural dye',
            },
            { name: 'customisationNotes', type: 'textarea', localized: true },
          ],
        },
        {
          label: 'Shipping & Compliance',
          fields: [
            {
              name: 'hsCode',
              type: 'text',
              label: 'HS code',
              admin: { description: 'e.g. 6305.20' },
            },
            {
              name: 'reachCompliant',
              type: 'checkbox',
              defaultValue: true,
              label: 'REACH compliant (EU)',
            },
            {
              name: 'shippingModes',
              type: 'select',
              hasMany: true,
              defaultValue: ['sea', 'air'],
              options: [
                { label: 'Sea freight', value: 'sea' },
                { label: 'Air freight', value: 'air' },
                { label: 'Courier', value: 'courier' },
              ],
            },
            {
              name: 'documentsProvided',
              type: 'select',
              hasMany: true,
              label: 'Documents provided',
              defaultValue: ['commercial-invoice', 'packing-list', 'coo'],
              options: [
                { label: 'Commercial invoice', value: 'commercial-invoice' },
                { label: 'Packing list', value: 'packing-list' },
                { label: 'Certificate of origin', value: 'coo' },
                { label: 'Phytosanitary cert', value: 'phyto' },
                { label: 'Test reports', value: 'test-reports' },
                { label: 'GOTS transaction cert', value: 'gots-tc' },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              localized: true,
              admin: { description: 'Defaults to product title if empty' },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              localized: true,
              admin: { description: 'Max 160 chars. Defaults to shortDescription if empty.' },
            },
          ],
        },
      ],
    },
  ],
}
