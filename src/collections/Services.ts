import type { CollectionConfig } from 'payload'
import { anyone, isEditor } from '../access'
import { slugField } from '../fields/slug'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order'],
    group: 'Content',
  },
  access: { read: anyone, create: isEditor, update: isEditor, delete: isEditor },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: { description: 'Short description shown on cards and listings.' },
    },
    { name: 'icon', type: 'upload', relationTo: 'media' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    {
      name: 'body',
      type: 'richText',
      admin: { description: 'Full page content for the service detail page.' },
    },
    {
      name: 'subServices',
      type: 'array',
      label: 'Sub-services',
      labels: { singular: 'Sub-service', plural: 'Sub-services' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'requiredDocuments',
      type: 'array',
      label: 'Required Documents for Client Portal',
      labels: { singular: 'Document', plural: 'Documents' },
      admin: { description: 'List of documents a client must upload for this service.' },
      fields: [
        { name: 'documentName', type: 'text', required: true, label: 'Document Name' },
      ],
    },
    {
      name: 'relatedIndustries',
      type: 'relationship',
      relationTo: 'industries',
      hasMany: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Controls display order (ascending).' },
    },
    {
      name: 'showOnHome',
      type: 'checkbox',
      label: 'Show on Home Page',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Check this box to display this service in the "What We Do" section on the home page.',
      },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (value === false || value === 'false' || value === 0 || value === null) return false
            if (value === true || value === 'true' || value === 1) return true
            return value ?? false
          },
        ],
      },
    },
    {
      type: 'group',
      name: 'seo',
      label: 'SEO',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
}
