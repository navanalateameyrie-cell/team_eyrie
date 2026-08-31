import type { GlobalConfig } from 'payload'
import { anyone, isEditor } from '../access'

/**
 * Localization note: arrays here are intentionally NOT marked `localized`.
 * Localizing the array itself would give each language its own set of rows,
 * forcing editors to re-upload the same images per language. Instead the text
 * fields *inside* each row are localized, so rows (and their images, links and
 * ordering) stay shared while the copy varies per locale.
 */
export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  admin: { group: 'Content' },
  access: { read: anyone, update: isEditor },
  fields: [
    {
      type: 'group',
      name: 'hero',
      fields: [
        { name: 'eyebrow', type: 'text', localized: true, defaultValue: 'India’s Integrated Professional Services Network' },
        { name: 'headline', type: 'text', localized: true, defaultValue: 'Team Eyrie' },
        { name: 'subheadline', type: 'text', localized: true, defaultValue: 'Together, We Create Value. Together, We Build Trust.' },
        { name: 'primaryCtaLabel', type: 'text', localized: true, defaultValue: 'Contact Us' },
        { name: 'primaryCtaLink', type: 'text', defaultValue: '/contact' },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
        {
          name: 'slides',
          type: 'array',
          label: 'Hero Slides (Max 4 Allowed)',
          minRows: 1,
          maxRows: 4,
          admin: {
            description: 'Only 4 images are allowed for the home section.',
            initCollapsed: true,
          },
          validate: (value: any) => {
            if (Array.isArray(value) && value.length > 4) {
              return 'Only 4 images are allowed for the home section'
            }
            return true
          },
          fields: [
            { name: 'badge', type: 'text', localized: true, label: 'Badge / Category' },
            { name: 'tagline', type: 'text', localized: true, label: 'Tagline' },
            { name: 'title', type: 'text', required: true, localized: true, label: 'Slide Title' },
            { name: 'description', type: 'textarea', localized: true, label: 'Description' },
            { name: 'image', type: 'upload', relationTo: 'media', label: 'Upload Background Image' },
            { name: 'imageUrl', type: 'text', label: 'Or Image Path (e.g. /images/herosection.png)' },
            { name: 'primaryCtaLabel', type: 'text', localized: true, label: 'Primary CTA Label' },
            { name: 'primaryCtaLink', type: 'text', label: 'Primary CTA Link' },
            { name: 'secondaryCtaLabel', type: 'text', localized: true, label: 'Secondary CTA Label' },
            { name: 'secondaryCtaLink', type: 'text', label: 'Secondary CTA Link' },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'intro',
      label: 'About / Intro',
      fields: [
        { name: 'heading', type: 'text', localized: true, defaultValue: 'About Team Eyrie' },
        { name: 'body', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Stats / counters',
      admin: { description: 'Shown as a strip of highlight numbers on the homepage.' },
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'e.g. 20+ or 9' } },
        { name: 'label', type: 'text', required: true, localized: true },
      ],
    },
    {
      type: 'group',
      name: 'process',
      label: 'How We Work',
      fields: [
        { name: 'heading', type: 'text', localized: true, defaultValue: 'How We Work' },
        {
          name: 'steps',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true, localized: true },
            { name: 'description', type: 'textarea', localized: true },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'whyEyrie',
      label: 'Why Team Eyrie (Sticky Scroll Showcase)',
      fields: [
        { name: 'tagline', type: 'text', localized: true, defaultValue: 'The Team Eyrie Advantage' },
        { name: 'heading', type: 'text', localized: true, defaultValue: 'Why Team Eyrie?' },
        {
          name: 'subheading',
          type: 'textarea',
          localized: true,
          defaultValue:
            'A single umbrella combining senior leadership, multidisciplinary intelligence, and technology-assisted execution.',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Feature Showcase Cards',
          admin: {
            initCollapsed: true,
          },
          fields: [
            { name: 'tag', type: 'text', localized: true, label: 'Category Tag (e.g. Synergy, Coverage)' },
            { name: 'title', type: 'text', required: true, localized: true, label: 'Title' },
            { name: 'description', type: 'textarea', required: true, localized: true, label: 'Description' },
            { name: 'image', type: 'upload', relationTo: 'media', label: 'Upload Feature Image' },
            { name: 'imageUrl', type: 'text', label: 'Or Image Path (e.g. /images/Why.png)' },
            { name: 'link', type: 'text', label: 'CTA Link (e.g. /why-team-eyrie)' },
            { name: 'linkLabel', type: 'text', localized: true, label: 'CTA Label (e.g. Explore Details)' },
            {
              name: 'bullets',
              type: 'array',
              label: 'Bullet Highlights',
              fields: [{ name: 'text', type: 'text', required: true, localized: true, label: 'Point' }],
            },
          ],
        },
      ],
    },
  ],
}
