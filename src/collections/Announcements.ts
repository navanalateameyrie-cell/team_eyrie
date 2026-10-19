import type { CollectionConfig } from 'payload'
import { anyone, isEditor } from '../access'
import { slugField } from '../fields/slug'

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  labels: { singular: 'News & Article', plural: 'News & Articles' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'pdfFile', 'publishedDate', 'status'],
    group: 'Content',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { status: { equals: 'published' } }
    },
    create: isEditor,
    update: isEditor,
    delete: isEditor,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    {
      name: 'category',
      type: 'select',
      defaultValue: 'news',
      options: [
        { label: 'News (PDF Download & Read)', value: 'news' },
        { label: 'Article / Thought Leadership (Read on Website)', value: 'insight' },
        { label: 'Regulatory Update', value: 'regulatory' },
        { label: 'Event', value: 'event' },
      ],
    },
    {
      name: 'pdfFile',
      type: 'upload',
      relationTo: 'media',
      label: 'News PDF Document',
      admin: {
        description: 'Upload a PDF file for News circulars or press releases. When users view this news card on the website, they get an option to Download and Read.',
      },
    },
    {
      name: 'pdfUrl',
      type: 'text',
      label: 'External PDF / Document URL (Optional)',
      admin: {
        description: 'Direct link to an external PDF or Gazette notification if not uploading a file above.',
      },
    },
    { name: 'excerpt', type: 'textarea' },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'body', type: 'richText' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    { name: 'publishedDate', type: 'date', admin: { position: 'sidebar' } },
  ],
}
