import type { Block } from 'payload'

export const FaqList: Block = {
  slug: 'faqList',
  interfaceName: 'FaqListBlock',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'mode', type: 'select', options: ['auto', 'manual'], defaultValue: 'auto' },
    {
      name: 'categoryFilter', type: 'relationship', relationTo: 'categories',
      admin: { condition: (_, sib) => sib?.mode === 'auto' },
    },
    {
      name: 'items', type: 'relationship', relationTo: 'faqs', hasMany: true,
      admin: { condition: (_, sib) => sib?.mode === 'manual' },
    },
  ],
}
