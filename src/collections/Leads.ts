import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',

  admin: {
    useAsTitle: 'name',
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        {
          label: 'Organic Fabrics',
          value: 'organic-fabrics',
        },
        {
          label: 'Bags',
          value: 'bags',
        },
        {
          label: 'Private Label',
          value: 'private-label',
        },
        {
          label: 'Custom Product',
          value: 'custom-product',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'Contacted',
          value: 'contacted',
        },
        {
          label: 'Qualified',
          value: 'qualified',
        },
        {
          label: 'Closed',
          value: 'closed',
        },
      ],
    },
  ],
}
