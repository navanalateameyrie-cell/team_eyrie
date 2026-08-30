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
    read: (({ req: { user } }: any) => {
      if (!user) return false
      const u = user as any
      if (u.role === 'super_admin' || u.role === 'admin') return true
      if (u.role === 'client') return { id: { equals: u.id } }
      if (u.role === 'staff') {
        return {
          or: [
            { id: { equals: u.id } },
            { 'clientServices.assignedProfessional': { equals: u.id } }
          ]
        }
      }
      return { id: { equals: u.id } }
    }) as any,
    create: ({ req: { user } }) => {
      if (!user) return false
      const u = user as any
      return u.role === 'super_admin' || u.role === 'admin'
    },
    update: (({ req: { user } }: any) => {
      if (!user) return false
      const u = user as any
      if (u.role === 'super_admin' || u.role === 'admin') return true
      return { id: { equals: u.id } }
    }) as any,
    delete: ({ req: { user } }) => {
      if (!user) return false
      const u = user as any
      return u.role === 'super_admin'
    },
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
        { label: 'Super Admin', value: 'super_admin' },
        { label: 'Staff', value: 'staff' },
      ],
    },
    // Client-specific profile fields
    { name: 'phone', type: 'text' },
    { name: 'pan', type: 'text', label: 'PAN Number' },
    { name: 'aadhaar', type: 'text', label: 'Aadhaar Number' },
    {
      name: 'clientServices',
      type: 'array',
      label: 'Service Engagements & Documents',
      admin: { condition: (data) => data.role === 'client' },
      fields: [
        {
          name: 'service',
          type: 'relationship',
          relationTo: 'services',
          required: true,
          label: 'Selected Service',
        },
        {
          name: 'assignedProfessional',
          type: 'relationship',
          relationTo: 'users',
          label: 'Assigned Professional (Staff)',
          admin: {
            description: 'The staff member handling this service for the client.',
          },
          filterOptions: {
            role: { in: ['admin', 'editor', 'staff', 'super_admin'] },
          },
        },
        {
          name: 'documents',
          type: 'array',
          label: 'Service Documents',
          fields: [
            {
              name: 'file',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Document File',
            },
            {
              name: 'title',
              type: 'text',
              label: 'Document Title / Description',
            },
            {
              name: 'uploadedBy',
              type: 'select',
              options: [
                { label: 'Client', value: 'client' },
                { label: 'Staff/Admin', value: 'staff' },
              ],
              defaultValue: 'client',
              label: 'Uploaded By',
            },
            {
              name: 'uploadDate',
              type: 'date',
              label: 'Upload Date',
            },
          ],
        },
      ],
    },
  ],
}
