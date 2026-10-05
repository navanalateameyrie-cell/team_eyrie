import type { Field, TextField } from 'payload'

const slugify = (val: string) =>
  val
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

/** A slug field that auto-fills from `sourceField` when left blank. */
export const slugField = (
  sourceField = 'title',
  overrides?: Partial<TextField>,
): Field => {
  const { admin, ...restOverrides } = overrides || {}
  return {
    name: 'slug',
    type: 'text',
    index: true,
    unique: true,
    ...restOverrides,
    admin: {
      position: 'sidebar',
      description: 'URL path segment. Auto-generated from the title if left blank.',
      ...admin,
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          if (value) return slugify(value)
          const source = (data?.[sourceField] as string) || ''
          return source ? slugify(source) : value
        },
      ],
      ...(restOverrides.hooks || {}),
    },
  } as Field
}
