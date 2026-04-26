import type { Block } from 'payload'

export const RichTextBlock: Block = {
  slug: 'richText',
  interfaceName: 'RichTextBlock',
  fields: [
    { name: 'content', type: 'richText', required: true, localized: true },
    {
      name: 'maxWidth', type: 'select',
      options: ['narrow', 'default', 'wide', 'full'],
      defaultValue: 'default',
    },
  ],
}
