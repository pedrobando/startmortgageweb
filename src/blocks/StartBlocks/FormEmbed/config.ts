import type { Block } from 'payload'

export const FormEmbed: Block = {
  slug: 'formEmbed',
  interfaceName: 'FormEmbedBlock',
  fields: [
    { name: 'form', type: 'relationship', relationTo: 'forms', required: true },
    { name: 'headline', type: 'text', localized: true },
    { name: 'intro', type: 'textarea', localized: true },
  ],
}
