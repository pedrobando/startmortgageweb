import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const LoanPrograms: CollectionConfig = {
  slug: 'loan-programs',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order', '_status'],
  },
  versions: { drafts: { autosave: { interval: 800 } }, maxPerDoc: 50 },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true,
      admin: { description: 'URL slug, e.g. "fha". Same in both locales.' } },
    { name: 'tagline', type: 'text', localized: true },
    { name: 'whoItsFor', type: 'textarea', localized: true },
    { name: 'requirements', type: 'richText', localized: true },
    {
      name: 'pros', type: 'array',
      fields: [{ name: 'item', type: 'text', required: true, localized: true }],
    },
    {
      name: 'cons', type: 'array',
      fields: [{ name: 'item', type: 'text', required: true, localized: true }],
    },
    { name: 'bestFor', type: 'textarea', localized: true },
    {
      name: 'iconKey', type: 'select',
      options: ['home', 'flag', 'flame', 'tractor', 'building', 'shield-check'],
      defaultValue: 'home',
    },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
