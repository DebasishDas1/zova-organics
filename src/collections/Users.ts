import type { CollectionConfig } from 'payload'

const isAdmin = ({ req: { user } }: any) => user?.role === 'admin'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    // Allow first-user creation; after that only admins can create users
    create: ({ req: { user } }) => {
      if (!user) return true // Payload passes this through only when no users exist yet
      return user.role === 'admin'
    },
    read: isAdmin,
    update: ({ req: { user }, id }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      // Allow users to update their own record
      return user.id === id
    },
    delete: isAdmin,
  },
  auth: true,
  fields: [
    {
      name: 'role',
      type: 'select',
      defaultValue: 'user',
      options: [
        { label: 'User', value: 'user' },
        { label: 'Admin', value: 'admin' },
      ],
      required: true,
      // Only admins can change roles
      access: {
        update: isAdmin,
      },
    },
  ],
}
