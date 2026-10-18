import type { GlobalConfig, Field } from 'payload'
import { anyone, isAdmin } from '../access'

const createBannerFields = (
  defaultTitle: string,
  defaultEyebrow: string,
  defaultSubtitle: string,
  defaultFocal = 'right center'
): Field[] => [
  {
    name: 'title',
    type: 'text',
    label: 'Banner Title / Headline',
    admin: {
      placeholder: defaultTitle,
      description: 'Leave empty to use the default title.',
    },
  },
  {
    name: 'eyebrow',
    type: 'text',
    label: 'Eyebrow Tag Badge',
    admin: {
      placeholder: defaultEyebrow,
      description: 'Leave empty to use the default eyebrow badge.',
    },
  },
  {
    name: 'subtitle',
    type: 'textarea',
    label: 'Subtitle / Description',
    admin: {
      placeholder: defaultSubtitle,
      description: 'Leave empty to use the default subtitle.',
    },
  },
  {
    name: 'bgImage',
    type: 'upload',
    relationTo: 'media',
    label: 'Banner Background Image',
    admin: {
      description: 'Upload a custom high-resolution banner photo (recommended: 1408x768 or 1920x1080). If empty, the default design image is used.',
    },
  },
  {
    name: 'focalPosition',
    type: 'select',
    label: 'Image Focal Point / Alignment',
    defaultValue: defaultFocal,
    options: [
      { label: 'Right Center (Default — Balanced for corporate graphics)', value: 'right center' },
      { label: 'Right Top (Recommended for people / headshots so heads are never cut)', value: 'right top' },
      { label: 'Center Center (Centered vertically and horizontally)', value: 'center center' },
      { label: 'Center Top (Top-aligned centered)', value: 'center top' },
      { label: 'Right Bottom (Bottom-aligned right)', value: 'right bottom' },
    ],
    admin: {
      description: 'Controls where the camera/crop focuses on different screen sizes.',
    },
  },
]

export const PageBanners: GlobalConfig = {
  slug: 'page-banners',
  admin: {
    group: 'Content',
    description: 'Customize hero banner images, titles, and focal points for each page across the website.',
  },
  access: {
    read: anyone,
    update: isAdmin,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'About Us',
          name: 'about',
          fields: createBannerFields(
            'About Team Eyrie',
            'The Power of Strategic Alliance',
            'An Integrated Multidisciplinary Professional Services Network Delivering Institutional Excellence Across India',
            'right center'
          ),
        },
        {
          label: 'Services',
          name: 'services',
          fields: createBannerFields(
            'Comprehensive Professional Services',
            'Institutional Service Capabilities',
            'Integrated advisory, assurance, taxation, and legal solutions delivered by specialized partner practices.',
            'right center'
          ),
        },
        {
          label: 'Industries',
          name: 'industries',
          fields: createBannerFields(
            'Industries We Serve',
            'Specialized Sector Practices',
            'Deep Domain Specialization Across 17 Core Economic Sectors',
            'right center'
          ),
        },
        {
          label: 'Careers',
          name: 'careers',
          fields: createBannerFields(
            'Careers & Articleship',
            'Grow with Industry Leaders',
            'Together We Rise. Together We Excel. Build an Extraordinary Career with India’s Premier Professional Services Network.',
            'right top'
          ),
        },
        {
          label: 'Our Team',
          name: 'people',
          fields: createBannerFields(
            'Our People & Leadership',
            'Multidisciplinary Leadership',
            'A network of nearly 20 Chartered Accountants supported by Company Secretaries, Advocates, Cost Accountants, MBAs, Insolvency Professionals, and Valuation Specialists.',
            'right top'
          ),
        },
        {
          label: 'Why Team Eyrie',
          name: 'whyEyrie',
          fields: createBannerFields(
            'The Eyrie Advantage',
            'Institutional Differentiators',
            'What Sets Us Apart — A New Benchmark in Professional Services',
            'right center'
          ),
        },
        {
          label: 'Our Presence',
          name: 'presence',
          fields: createBannerFields(
            'Pan-India Network',
            'Strategic National Footprint',
            'Connected across 8+ major industrial hubs, financial capitals, and technology corridors.',
            'right center'
          ),
        },
        {
          label: 'Contact Us',
          name: 'contact',
          fields: createBannerFields(
            'Contact Us',
            'Connect with Senior Practice Partners',
            'Trusted Advice. Practical Solutions. Sustainable Growth. Tell us how we can assist your business.',
            'right center'
          ),
        },
        {
          label: 'News & Insights',
          name: 'insights',
          fields: createBannerFields(
            'Knowledge Hub & Insights',
            'Regulatory Intelligence',
            'Authoritative analysis, tax circulars, statutory updates, and strategic thought leadership.',
            'right center'
          ),
        },
        {
          label: 'Gallery',
          name: 'gallery',
          fields: createBannerFields(
            'Photo & Media Gallery',
            'Moments & Milestones',
            'Explore conferences, leadership summits, firm celebrations, and our state-of-the-art office infrastructure across India.',
            'right center'
          ),
        },
        {
          label: 'Resource Center',
          name: 'resourceCenter',
          fields: createBannerFields(
            'Resource Center',
            'Statutory Intelligence & Compliance Toolkit',
            'Interactive Financial Calculators, Statutory Utilities, Bare Acts, Official Forms, and Regulatory Portals',
            'right center'
          ),
        },
      ],
    },
  ],
}

