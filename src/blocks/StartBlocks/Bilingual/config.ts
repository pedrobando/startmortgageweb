import type { Block } from 'payload'

export const Bilingual: Block = {
  slug: 'bilingual',
  interfaceName: 'BilingualBlock',
  fields: [
    {
      name: 'headline', type: 'text', localized: true,
      admin: { description: 'Renders in the OPPOSITE locale of the current page.' },
    },
    { name: 'body', type: 'richText', localized: true },
  ],
}
