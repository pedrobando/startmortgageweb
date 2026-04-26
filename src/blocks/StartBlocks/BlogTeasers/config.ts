import type { Block } from 'payload'

export const BlogTeasers: Block = {
  slug: 'blogTeasers',
  interfaceName: 'BlogTeasersBlock',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'mode', type: 'select', options: ['auto', 'manual'], defaultValue: 'auto' },
    {
      name: 'count', type: 'number', defaultValue: 3,
      admin: { condition: (_, sib) => sib?.mode === 'auto' },
    },
    {
      name: 'posts', type: 'relationship', relationTo: 'posts', hasMany: true,
      admin: { condition: (_, sib) => sib?.mode === 'manual' },
    },
  ],
}
