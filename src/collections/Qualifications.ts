import type { CollectionConfig } from 'payload'
import { anyone, isRecruiter } from '../access'

export const Qualifications: CollectionConfig = {
  slug: 'qualifications',
  labels: { singular: 'Qualification Master', plural: 'Qualification Master' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'roleName', 'role', 'status', 'order'],
    group: 'Recruitment',
  },
  access: {
    read: anyone,
    create: isRecruiter,
    update: isRecruiter,
    delete: isRecruiter,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Professional Qualification',
      admin: {
        description: 'e.g. CS Executive Completed, CA/CMA Qualified, MBA HR, Any Degree',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'role',
          type: 'relationship',
          relationTo: 'jobs',
          label: 'Mapped Career Job Opening',
          admin: {
            width: '50%',
            description: 'Link this qualification directly to a job opening',
          },
        },
        {
          name: 'roleName',
          type: 'text',
          label: 'Role / Designation Reference',
          admin: {
            width: '50%',
            description: 'e.g. Company secretary Articles/Interns, HR Manager',
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Eligibility / Criteria Details (Optional)',
      admin: {
        description: 'Specific eligibility criteria, experience, or notes for this qualification.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'status',
          type: 'select',
          defaultValue: 'active',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
          label: 'Display Order',
          admin: { width: '50%' },
        },
      ],
    },
  ],
}

