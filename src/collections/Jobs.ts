import type { CollectionConfig } from 'payload'
import { anyone, isRecruiter } from '../access'
import { slugField } from '../fields/slug'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: { singular: 'Job Opening', plural: 'Job Openings' },
  defaultSort: 'order',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['order', 'title', 'location', 'employmentType', 'status', 'closingDate'],
    group: 'Recruitment',
  },
  access: {
    // Published and open jobs are public; recruiters/admins manage all.
    read: ({ req: { user } }) => {
      if (user) return true
      return { status: { not_equals: 'closed' } }
    },
    create: isRecruiter,
    update: isRecruiter,
    delete: isRecruiter,
  },
  fields: [
    {
      name: 'order',
      type: 'number',
      label: 'Display Order / Sequence',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Order in which this job appears on the website (e.g. 1, 2, 3... Ascending).',
      },
    },
    { name: 'title', type: 'text', required: true },
    slugField('title', { admin: { position: undefined } }),
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
            components: {
              Cell: '/components/admin/StatusCell',
            },
          },
          defaultValue: 'open',
          options: [
            { label: 'Open (Visible on Website)', value: 'open' },
            { label: 'Draft', value: 'draft' },
            { label: 'Closed (Hidden)', value: 'closed' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'department',
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'location',
          type: 'relationship',
          relationTo: 'offices',
          hasMany: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'experienceMin',
          type: 'number',
          label: 'Min experience (yrs)',
          admin: { width: '50%' },
        },
        {
          name: 'experienceMax',
          type: 'number',
          label: 'Max experience (yrs)',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'openings',
          type: 'number',
          defaultValue: 1,
          admin: { width: '50%' },
        },
        {
          name: 'closingDate',
          type: 'date',
          admin: {
            width: '50%',
            description: 'Application deadline. The job will remain active throughout this date and automatically disappear from the website the following day.',
          },
        },
      ],
    },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'description', type: 'richText' },
    {
      name: 'qualifications',
      type: 'relationship',
      relationTo: 'qualifications' as any,
      hasMany: true,
      label: 'Professional Qualifications (from Qualification Master)',
      admin: {
        description: 'Select the required or eligible professional qualifications for this job opening.',
      },
    },
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
  ],
}
