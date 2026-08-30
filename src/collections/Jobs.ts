import type { CollectionConfig } from 'payload'
import { anyone, isRecruiter } from '../access'
import { slugField } from '../fields/slug'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: { singular: 'Job Opening', plural: 'Job Openings' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'employmentType', 'status', 'closingDate'],
    group: 'Recruitment',
  },
  access: {
    // Only published jobs are public; recruiters/admins manage all.
    read: ({ req: { user } }) => {
      if (user) return true
      return { status: { equals: 'open' } }
    },
    create: isRecruiter,
    update: isRecruiter,
    delete: isRecruiter,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    {
      type: 'row',
      fields: [
        {
          name: 'employmentType',
          type: 'select',
          admin: { width: '50%' },
          defaultValue: 'full-time',
          options: [
            { label: 'Full-time', value: 'full-time' },
            { label: 'Part-time', value: 'part-time' },
            { label: 'Contract', value: 'contract' },
            { label: 'Internship / Articleship', value: 'internship' },
          ],
        },
        {
          name: 'status',
          type: 'select',
          admin: { 
            width: '50%', 
            position: 'sidebar',
            components: {
              Cell: '/components/admin/StatusCell',
            },
          },
          defaultValue: 'draft',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Open', value: 'open' },
            { label: 'Closed', value: 'closed' },
          ],
        },
      ],
    },
    { name: 'location', type: 'relationship', relationTo: 'offices', hasMany: true },
    { name: 'department', type: 'text' },
    {
      type: 'row',
      fields: [
        { name: 'experienceMin', type: 'number', label: 'Min experience (yrs)', admin: { width: '50%' } },
        { name: 'experienceMax', type: 'number', label: 'Max experience (yrs)', admin: { width: '50%' } },
      ],
    },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'description', type: 'richText' },
    {
      name: 'responsibilities',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'requirements',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    { name: 'openings', type: 'number', defaultValue: 1, admin: { position: 'sidebar' } },
    { name: 'closingDate', type: 'date', admin: { position: 'sidebar' } },
  ],
}
