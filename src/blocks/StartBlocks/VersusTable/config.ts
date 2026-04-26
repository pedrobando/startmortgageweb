import type { Block } from 'payload'

export const VersusTable: Block = {
  slug: 'versusTable',
  interfaceName: 'VersusTableBlock',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'columns', type: 'array', fields: [{ name: 'label', type: 'text', required: true, localized: true }] },
    {
      name: 'rows', type: 'array', fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'values', type: 'array', fields: [{ name: 'text', type: 'text', required: true, localized: true }] },
      ],
    },
    { name: 'footnote', type: 'text', localized: true },
  ],
}
