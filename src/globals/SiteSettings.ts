import type { GlobalConfig } from 'payload'
import { anyone, isAdmin } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: { group: 'Administration' },
  access: { read: anyone, update: isAdmin },
  fields: [
    { name: 'organizationName', type: 'text', defaultValue: 'Team Eyrie' },
    { name: 'tagline', type: 'text', defaultValue: 'Together, We Create Value. Together, We Build Trust.' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      type: 'group',
      name: 'contact',
      fields: [
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'whatsapp', type: 'text' },
      ],
    },
    {
      type: 'group',
      name: 'social',
      fields: [
        { name: 'linkedin', type: 'text' },
        { name: 'twitter', type: 'text' },
        { name: 'facebook', type: 'text' },
      ],
    },
    {
      name: 'recruitmentEmail',
      type: 'email',
      admin: { description: 'Address notified when a new job application is submitted.' },
    },
    {
      name: 'enquiryEmail',
      type: 'email',
      admin: { description: 'Address notified when a new contact enquiry is submitted.' },
    },
  ],
}
