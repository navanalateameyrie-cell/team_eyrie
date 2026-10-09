import type { CollectionConfig } from 'payload'
import { anyone, isEditor, isAdmin } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content' },
  access: {
    read: anyone, // public assets
    create: isEditor,
    update: isEditor,
    delete: isAdmin,
  },
  upload: {
    staticDir: 'media',
    crop: true,
    focalPoint: true,
    displayPreview: true,
    mimeTypes: [
      'image/*',
      'video/*',
      'application/pdf',
      'application/msword', // .doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    ],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: undefined },
      { name: 'card', width: 800, height: undefined },
      { name: 'hero', width: 1920, height: undefined },
    ],
  },
  fields: [
    { name: 'alt', type: 'text', label: 'Alt text', required: true },
    { name: 'caption', type: 'text' },
  ],
}
