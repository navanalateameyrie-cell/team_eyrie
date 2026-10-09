import type { CollectionConfig } from 'payload'
import { anyone, isEditor } from '../access'
import { slugField } from '../fields/slug'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  labels: { singular: 'Professional', plural: 'Professionals' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'designation', 'order'],
    group: 'People',
  },
  access: { read: anyone, create: isEditor, update: isEditor, delete: isEditor },
  fields: [
    { name: 'name', type: 'text', required: true },
    slugField('name'),
    { name: 'designation', type: 'text', required: true },
    {
      name: 'qualifications',
      type: 'text',
      admin: { description: 'e.g. FCA, CS, LLB' },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Professional Profile Photo',
      admin: {
        description:
          '📸 Best Fit Size: 600 × 600 px (1:1 Square, recommended) or 600 × 750 px (4:5 Portrait). Minimum: 400 × 400 px. Composition: Keep face centered with ~15% to 20% headroom margin above the hair. ✨ Tip: Click the image to use the built-in Crop & Focal Point marker to align the face perfectly.',
      },
    },
    { name: 'bio', type: 'richText' },
    {
      name: 'expertise',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'Areas of expertise',
    },
    { name: 'offices', type: 'relationship', relationTo: 'offices', hasMany: true },
    {
      type: 'group',
      name: 'contact',
      fields: [
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Show on the homepage / leadership section.' },
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
