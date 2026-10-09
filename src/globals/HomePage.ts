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
        { name: 'eyebrow', type: 'text', defaultValue: 'India’s Integrated Professional Services Network', admin: { width: '50%' } },
        { name: 'headline', type: 'text', defaultValue: 'Team Eyrie', admin: { width: '50%' } },
        { name: 'subheadline', type: 'text', defaultValue: 'Together, We Create Value. Together, We Build Trust.' },
        { name: 'primaryCtaLabel', type: 'text', defaultValue: 'Contact Us', admin: { width: '50%' } },
        { name: 'primaryCtaLink', type: 'text', defaultValue: '/contact', admin: { width: '50%' } },
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
            { name: 'badge', type: 'text', label: 'Badge / Category', admin: { width: '50%' } },
            { name: 'tagline', type: 'text', label: 'Tagline', admin: { width: '50%' } },
            { name: 'title', type: 'text', required: true, label: 'Slide Title' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'image', type: 'upload', relationTo: 'media', label: 'Upload Background Image' },
            { name: 'imageUrl', type: 'text', label: 'Or Image Path (e.g. /images/herosection.png)', admin: { width: '50%' } },
            { name: 'videoUrl', type: 'text', label: 'Or Video Path (e.g. /videos/ca2.mp4)', admin: { width: '50%' } },
            { name: 'primaryCtaLabel', type: 'text', label: 'Primary CTA Label', admin: { width: '50%' } },
            { name: 'primaryCtaLink', type: 'text', label: 'Primary CTA Link', admin: { width: '50%' } },
            { name: 'secondaryCtaLabel', type: 'text', label: 'Secondary CTA Label', admin: { width: '50%' } },
            { name: 'secondaryCtaLink', type: 'text', label: 'Secondary CTA Link', admin: { width: '50%' } },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'intro',
      label: 'About / Intro',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'About Team Eyrie' },
        { name: 'body', type: 'textarea' },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Stats / counters',
      admin: { description: 'Shown as a strip of highlight numbers on the homepage.' },
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'e.g. 20+ or 9' } },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      type: 'group',
      name: 'process',
      label: 'How We Work',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'How We Work' },
        {
          name: 'steps',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'servicesSection',
      label: 'What We Do (Services Showcase)',
      fields: [
        {
          name: 'showSection',
          type: 'checkbox',
          label: 'Show "What We Do" Section on Home Page',
          defaultValue: true,
          admin: { description: 'Uncheck to completely hide the What We Do section from the home page.' },
          hooks: {
            beforeValidate: [
              ({ value }) => {
                if (value === false || value === 'false' || value === 0 || value === null) return false
                if (value === true || value === 'true' || value === 1) return true
                return value ?? true
              },
            ],
          },
        },
        { name: 'eyebrow', type: 'text', defaultValue: 'Comprehensive Offerings' },
        { name: 'heading', type: 'text', defaultValue: 'What We Do' },
        {
          name: 'subheading',
          type: 'textarea',
          defaultValue:
            'Delivering end-to-end solutions from assurance and taxation to transaction advisory and international expansion.',
        },
        {
          name: 'selectedServices',
          type: 'relationship',
          relationTo: 'services',
          hasMany: true,
          label: 'Selected Services to Feature (Optional Override)',
          admin: {
            description:
              'Optional: Select specific services to feature on the home page and control their order. If left empty, all services with "Show on Home Page" checked in the Services collection will be displayed.',
          },
        },
      ],
    },
    {
      type: 'group',
      name: 'whyEyrie',
      label: 'Why Team Eyrie (Sticky Scroll Showcase)',
      fields: [
        {
          name: 'showSection',
          type: 'checkbox',
          label: 'Show "Why Team Eyrie" Section on Home Page',
          defaultValue: true,
          admin: { description: 'Uncheck to completely hide the Why Team Eyrie section from the home page.' },
        },
        { name: 'tagline', type: 'text', defaultValue: 'The Team Eyrie Advantage' },
        { name: 'heading', type: 'text', defaultValue: 'Why Team Eyrie?' },
        {
          name: 'subheading',
          type: 'textarea',
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
            {
              name: 'showOnHome',
              type: 'checkbox',
              label: 'Show on Home Page',
              defaultValue: true,
              admin: { description: 'Check this box to display this feature on the home page. Uncheck to hide it.' },
              hooks: {
                beforeValidate: [
                  ({ value }) => {
                    if (value === false || value === 'false' || value === 0 || value === null) return false
                    if (value === true || value === 'true' || value === 1) return true
                    return value ?? true
                  },
                ],
              },
            },
            { name: 'tag', type: 'text', label: 'Category Tag (e.g. Synergy, Coverage)' },
            { name: 'title', type: 'text', required: true, label: 'Title' },
            { name: 'description', type: 'textarea', required: true, label: 'Description' },
            { name: 'image', type: 'upload', relationTo: 'media', label: 'Upload Feature Image' },
            { name: 'imageUrl', type: 'text', label: 'Or Image Path (e.g. /images/Why.png)' },
            { name: 'link', type: 'text', label: 'CTA Link (e.g. /why-team-eyrie)' },
            { name: 'linkLabel', type: 'text', label: 'CTA Label (e.g. Explore Details)' },
            {
              name: 'bullets',
              type: 'array',
              label: 'Bullet Highlights',
              fields: [{ name: 'text', type: 'text', required: true, label: 'Point' }],
            },
          ],
        },
      ],
    },
  ],
}
