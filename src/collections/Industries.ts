import type { CollectionConfig } from 'payload'
import { anyone, isEditor } from '../access'
import { slugField } from '../fields/slug'

export const Industries: CollectionConfig = {
  slug: 'industries',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'slug', 'order'], group: 'Content' },
  access: { read: anyone, create: isEditor, update: isEditor, delete: isEditor },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    // Not localized — the slug is the shared URL key across every locale.
    slugField('name'),
    { name: 'description', type: 'textarea', localized: true },
    { name: 'icon', type: 'upload', relationTo: 'media' },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
