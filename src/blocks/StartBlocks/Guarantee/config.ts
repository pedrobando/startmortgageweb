import type { Block } from 'payload'

export const Guarantee: Block = {
  slug: 'guarantee',
  interfaceName: 'GuaranteeBlock',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'body', type: 'richText', localized: true },
    {
      name: 'seal', type: 'group', fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'sub', type: 'text', localized: true },
      ],
    },
  ],
}
