import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order'],
  },
  fields: [
    { name: 'question', type: 'text', required: true, localized: true },
    { name: 'answer', type: 'richText', required: true, localized: true },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
