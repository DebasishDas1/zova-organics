import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'role',
      type: 'select',
      defaultValue: 'user',
      options: [
        {
          label: 'User',
          value: 'user',
        },
        {
          label: 'Partner',
          value: 'partner',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
      ],
      required: true,
    },
  ],
}
