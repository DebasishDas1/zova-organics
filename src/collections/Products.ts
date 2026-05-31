import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category'],
  },

  fields: [
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
    },

    {
      name: 'category',
      type: 'select',
      required: true,
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
          label: 'Home Textiles',
          value: 'home-textiles',
        },
      ],
    },

    {
      name: 'shortDescription',
      type: 'textarea',
    },

    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
