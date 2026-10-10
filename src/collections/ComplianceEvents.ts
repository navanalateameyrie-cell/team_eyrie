import type { CollectionConfig } from 'payload'
import { anyone, isEditor } from '../access'

export const ComplianceEvents: CollectionConfig = {
  slug: 'compliance-events',
  labels: {
    singular: 'Calendar Event',
    plural: 'Calendar Events',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'category', 'isSpecialEvent', 'regime'],
    group: 'Compliance',
  },
  access: {
    read: anyone,
    create: isEditor,
    update: isEditor,
    delete: isEditor,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Event / Due Date Title',
      admin: {
        placeholder: 'e.g., GSTR-3B Monthly Return Filing or Corporate Tax Planning Seminar',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      label: 'Event / Due Date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'yyyy-MM-dd',
        },
        description: 'Choose the exact date for this statutory compliance deadline or special firm event.',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'GST',
      label: 'Category',
      options: [
        { label: 'GST (Goods & Services Tax)', value: 'GST' },
        { label: 'Income Tax', value: 'Income Tax' },
        { label: 'TDS / TCS', value: 'TDS / TCS' },
        { label: 'Corporate / ROC (MCA)', value: 'Corporate / ROC' },
        { label: 'Labor, EPF & ESI', value: 'Labor & Payroll' },
        { label: '⭐ Special Event / Firm Milestone', value: 'Special Event' },
        { label: 'Corporate Holiday / Banking Day', value: 'Holiday' },
        { label: 'Audit & Advisory Deadline', value: 'Audit' },
      ],
    },
    {
      name: 'isSpecialEvent',
      type: 'checkbox',
      defaultValue: false,
      label: 'Highlight as Special Event ⭐',
      admin: {
        description: 'Check this box to highlight this date with a special glowing badge and star marker on the website calendar.',
      },
    },
    {
      name: 'regime',
      type: 'text',
      label: 'Statutory Body / Badge Label',
      admin: {
        placeholder: 'e.g., GST, IT Act, MCA, Team Eyrie Special',
        description: 'Short tag displayed inside event pills on the website.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Event Details & Scope',
      admin: {
        description: 'Comprehensive statutory explanation, compliance rules, or event program information.',
      },
    },
    {
      name: 'applicableTo',
      type: 'text',
      label: 'Target Audience / Applicable Entity',
      admin: {
        placeholder: 'e.g., All Corporates, QRMP filers, Private Limited Companies, High-Net-Worth Individuals',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

