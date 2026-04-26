import type { Block } from 'payload'

export const Founder: Block = {
  slug: 'founder',
  interfaceName: 'FounderBlock',
  fields: [
    { name: 'headline', type: 'text', localized: true },
    { name: 'bio', type: 'richText', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'nmls', type: 'text' },
    { name: 'credentials', type: 'array', fields: [{ name: 'text', type: 'text', required: true, localized: true }] },
  ],
}
