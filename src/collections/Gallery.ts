import type { CollectionConfig } from 'payload'
import { anyone, isEditor } from '../access'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  labels: { singular: 'Gallery Item', plural: 'Gallery Items' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'location', 'order'],
    group: 'Content',
  },
  access: {
    read: anyone,
    create: isEditor,
    update: isEditor,
    delete: isEditor,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          defaultValue: 'events',
          required: true,
          options: [
            { label: 'Events & Celebrations', value: 'events' },
            { label: 'Seminars & Conferences', value: 'conferences' },
            { label: 'Office & Infrastructure', value: 'office' },
            { label: 'Team & Culture', value: 'team' },
            { label: 'Client Engagements', value: 'client' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'date',
          type: 'date',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image Upload',
      admin: {
        description: 'Upload high-resolution photograph (JPEG, PNG, WebP).',
      },
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'Or Static / Custom Image URL',
      admin: {
        description: 'e.g. /images/indian-advisory-team.png if using a static file',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
      label: 'Caption / Description',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'location',
          type: 'text',
          label: 'Location (e.g. Bengaluru, Mumbai, Chennai)',
          admin: { width: '50%' },
        },
        {
          name: 'order',
          type: 'number',
          label: 'Display Order',
          defaultValue: 0,
          admin: { width: '50%' },
        },
      ],
    },
  ],
}

