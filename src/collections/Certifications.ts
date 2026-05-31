import type { CollectionConfig } from 'payload'

export const Certifications: CollectionConfig = {
  slug: 'certifications',

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'issuingBody', 'validUntil'],
    group: 'Catalogue',
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. GOTS 6.0, OEKO-TEX Standard 100',
      },
    },

    {
      name: 'shortCode',
      type: 'text',
      required: true,
      admin: {
        description: 'Badge label shown on product cards. e.g. GOTS, OEKO-TEX',
      },
    },

    {
      name: 'issuingBody',
      type: 'text',
      admin: {
        description: 'e.g. Control Union, Intertek',
      },
    },

    {
      name: 'certificateNumber',
      type: 'text',
    },

    {
      name: 'validFrom',
      type: 'date',
    },

    {
      name: 'validUntil',
      type: 'date',
    },

    {
      name: 'certificateFile',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'PDF of the certificate — downloadable from the product page',
      },
    },

    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'One-sentence explanation shown in certification tooltips',
      },
    },
  ],
}
