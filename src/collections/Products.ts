import type { Access, CollectionConfig } from 'payload'
import type { FieldHook } from 'payload'

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

  if (data?.title) {
    return generateSlug(data.title)
  }

  return value
}

export const skuHook: FieldHook = ({ value, data }) => {
  if (value) return value

  const categoryMap: Record<string, string> = {
    bags: 'BAG',
    pouches: 'POU',
    'organic-fabrics': 'FAB',
    'home-textiles': 'HOME',
    'yoga-wellness': 'YOGA',
    'custom-oem': 'OEM',
  }

  const category =
    categoryMap[data?.category] || data?.category?.toUpperCase()?.slice(0, 4) || 'GEN'

  const slugPart = data?.slug?.split('-').slice(0, 2).join('').toUpperCase() || 'ITEM'

  return `ZO-${category}-${slugPart}`
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

  versions: {
    drafts: true,
  },

  fields: [
    // ─── Core identity ────────────────────────────────────────────────
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
      hooks: {
        beforeValidate: [slugHook],
      },
      admin: {
        description: 'URL-safe identifier. e.g. natural-cotton-tote-bag',
      },
    },

    {
      name: 'sku',
      type: 'text',
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [skuHook],
      },
      admin: {
        description: 'Internal SKU code. e.g. ZO-TB-001',
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
        { label: 'Discontinued', value: 'discontinued' },
      ],
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show on homepage featured section',
      },
    },

    // ─── Classification ───────────────────────────────────────────────
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Organic fabrics', value: 'organic-fabrics' },
        { label: 'Bags', value: 'bags' },
        { label: 'Pouches', value: 'pouches' },
        { label: 'Home textiles', value: 'home-textiles' },
        { label: 'Yoga & wellness', value: 'yoga-wellness' },
        { label: 'Custom / OEM', value: 'custom-oem' },
      ],
    },

    {
      name: 'tags',
      type: 'array',
      admin: {
        description: 'e.g. "natural dye", "unbleached", "bulk"',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },

    // ─── Descriptions ─────────────────────────────────────────────────
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      admin: {
        description: 'One-line shown on product cards (max 160 chars)',
      },
    },

    {
      name: 'fullDescription',
      type: 'richText',
      admin: {
        description: 'Full product story shown on detail page',
      },
    },

    // ─── Media ────────────────────────────────────────────────────────
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'product-images',
      required: true,
    },

    {
      name: 'gallery',
      type: 'array',
      admin: {
        description: 'Additional product images (packaging, close-ups, in-use)',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'product-images',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },

    // ─── Physical specifications ──────────────────────────────────────
    {
      type: 'group',
      name: 'specifications',
      label: 'Specifications',
      fields: [
        {
          name: 'material',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g. 100% GOTS organic cotton',
          },
        },

        {
          name: 'gsm',
          type: 'text',
          admin: {
            description: 'e.g. 140–180 GSM (or range for customisable)',
          },
        },

        {
          name: 'dimensions',
          type: 'text',
          admin: {
            description: 'e.g. 38×42 cm',
          },
        },

        {
          name: 'colours',
          type: 'text',
          admin: {
            description: 'e.g. Natural, Black, custom azo-free dye',
          },
        },

        {
          name: 'finish',
          type: 'text',
          admin: {
            description: 'e.g. Unbleached, enzyme-washed, stonewashed',
          },
        },

        {
          name: 'additionalSpecs',
          type: 'array',
          label: 'Additional spec rows',
          admin: {
            description: 'Any extra spec key-value pairs for the detail table',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },

    // ─── Pricing ──────────────────────────────────────────────────────
    {
      type: 'group',
      name: 'pricing',
      label: 'Pricing',
      fields: [
        {
          name: 'currency',
          type: 'select',
          defaultValue: 'USD',
          options: [
            { label: 'USD', value: 'USD' },
            { label: 'EUR', value: 'EUR' },
            { label: 'GBP', value: 'GBP' },
          ],
        },

        {
          name: 'incoterm',
          type: 'select',
          defaultValue: 'FOB',
          options: [
            { label: 'FOB – Free on Board', value: 'FOB' },
            { label: 'CIF – Cost, Insurance & Freight', value: 'CIF' },
            { label: 'DDP – Delivered Duty Paid', value: 'DDP' },
            { label: 'EXW – Ex Works', value: 'EXW' },
          ],
        },

        {
          name: 'port',
          type: 'text',
          defaultValue: 'Mumbai, India',
          admin: {
            description: 'Port of origin for FOB/CIF pricing',
          },
        },

        {
          name: 'tiers',
          type: 'array',
          label: 'Price tiers',
          minRows: 1,
          admin: {
            description: 'Volume-based pricing. Add tiers from lowest to highest quantity.',
          },
          fields: [
            {
              name: 'minQty',
              type: 'number',
              required: true,
              min: 1,
              admin: { width: '25%' },
            },
            {
              name: 'maxQty',
              type: 'number',
              admin: {
                width: '25%',
                description: 'Leave blank for "and above"',
              },
            },
            {
              name: 'pricePerUnit',
              type: 'number',
              required: true,
              admin: { width: '25%' },
            },
            {
              name: 'unit',
              type: 'text',
              defaultValue: 'unit',
              admin: {
                width: '25%',
                description: 'e.g. unit, metre, kg',
              },
            },
          ],
        },
      ],
    },

    // ─── Order & lead time ────────────────────────────────────────────
    {
      type: 'group',
      name: 'ordering',
      label: 'Order details',
      fields: [
        {
          name: 'moq',
          type: 'number',
          required: true,
          label: 'Minimum order quantity',
        },

        {
          name: 'moqUnit',
          type: 'text',
          defaultValue: 'units',
          admin: {
            description: 'e.g. units, metres, kg',
          },
        },

        {
          name: 'leadTimeDays',
          type: 'text',
          admin: {
            description: 'e.g. 21–28 days after artwork approval',
          },
        },

        {
          name: 'sampleAvailable',
          type: 'checkbox',
          defaultValue: true,
          label: 'Sample available',
        },

        {
          name: 'sampleLeadTime',
          type: 'text',
          admin: {
            description: 'e.g. 5–7 business days',
            condition: (_, siblingData) => siblingData?.sampleAvailable,
          },
        },
      ],
    },

    // ─── Certifications ───────────────────────────────────────────────
    {
      name: 'certifications',
      type: 'relationship',
      relationTo: 'certifications',
      hasMany: true,
      admin: {
        description:
          'Link applicable certifications. Manage them in the Certifications collection.',
      },
    },

    // ─── Customisation ────────────────────────────────────────────────
    {
      type: 'group',
      name: 'customisation',
      label: 'Customisation options',
      fields: [
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
          label: 'Private label (hang tag, inner label)',
        },

        {
          name: 'customDyeAvailable',
          type: 'checkbox',
          defaultValue: false,
          label: 'Custom / natural dye colour',
        },

        {
          name: 'customisationNotes',
          type: 'textarea',
          admin: {
            description: 'Any extra details about customisation (shown on detail page)',
          },
        },
      ],
    },

    // ─── Shipping & compliance ────────────────────────────────────────
    {
      type: 'group',
      name: 'shipping',
      label: 'Shipping & compliance',
      fields: [
        {
          name: 'hsCode',
          type: 'text',
          label: 'HS code',
          admin: {
            description: 'Harmonised System code for customs. e.g. 6305.20',
          },
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
          options: [
            { label: 'Sea freight', value: 'sea' },
            { label: 'Air freight', value: 'air' },
            { label: 'Courier', value: 'courier' },
          ],
          defaultValue: ['sea', 'air'],
        },

        {
          name: 'documentsProvided',
          type: 'select',
          hasMany: true,
          label: 'Documents provided',
          options: [
            { label: 'Commercial invoice', value: 'commercial-invoice' },
            { label: 'Packing list', value: 'packing-list' },
            { label: 'Certificate of origin', value: 'coo' },
            { label: 'Phytosanitary cert', value: 'phyto' },
            { label: 'Test reports', value: 'test-reports' },
            { label: 'GOTS transaction cert', value: 'gots-tc' },
          ],
          defaultValue: ['commercial-invoice', 'packing-list', 'coo'],
        },
      ],
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
            description: 'Defaults to product title if empty',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          admin: {
            description: 'Max 160 chars. Defaults to shortDescription if empty.',
          },
        },
      ],
    },
  ],
}
