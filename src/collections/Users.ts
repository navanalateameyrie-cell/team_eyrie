import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
    group: 'Administration',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => (user as any)?.role === 'admin',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Administrator', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Recruiter', value: 'recruiter' },
        { label: 'Client', value: 'client' },
      ],
    },
    // Client-specific profile fields
    { name: 'phone', type: 'text', admin: { condition: (data) => data.role === 'client' } },
    { name: 'pan', type: 'text', label: 'PAN Number', admin: { condition: (data) => data.role === 'client' } },
    { name: 'aadhaar', type: 'text', label: 'Aadhaar Number', admin: { condition: (data) => data.role === 'client' } },
    { 
      name: 'selectedServices', 
      type: 'relationship', 
      relationTo: 'services', 
      hasMany: true,
      admin: { condition: (data) => data.role === 'client' }
    },
  ],
}
