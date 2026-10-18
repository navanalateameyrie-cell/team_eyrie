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
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Upload Multiple Images (Card Slideshow)',
      admin: {
        description:
          'Upload or select multiple photographs for this card. Visitors can browse through them using side arrows on the card.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Single / Primary Image Upload',
      admin: {
        description: 'Primary photograph (used as cover image or fallback).',
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
      name: 'imageUrls',
      type: 'textarea',
      label: 'Or Additional Static Image URLs (One per line)',
      admin: {
        description: 'Optional: Enter additional static image paths (one per line) for multi-image slideshow.',
      },
    },
    {
      name: 'galleryImages',
      type: 'array',
      label: 'Detailed Photo Slides (Optional)',
      admin: {
        description: 'Add individual photos with custom captions.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Photo',
        },
        {
          name: 'imageUrl',
          type: 'text',
          label: 'Or Photo URL',
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Photo Caption',
        },
      ],
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

