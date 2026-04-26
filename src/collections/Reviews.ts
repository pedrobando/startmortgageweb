import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'rating', 'featured', 'date'],
  },
  fields: [
    { name: 'quote', type: 'textarea', required: true, localized: true },
    { name: 'authorName', type: 'text', required: true },
    {
      name: 'authorContext', type: 'text', localized: true,
      admin: { description: 'e.g., "First-time buyer, Kissimmee, FL"' },
    },
    { name: 'rating', type: 'number', min: 1, max: 5, defaultValue: 5 },
    { name: 'date', type: 'date' },
    {
      name: 'featured', type: 'checkbox', defaultValue: false,
      admin: { description: 'Pulled into the marquee + homepage testimonials.' },
    },
  ],
}
