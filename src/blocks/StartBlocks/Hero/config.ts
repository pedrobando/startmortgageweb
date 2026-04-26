import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'headline', type: 'text', required: true, localized: true },
    { name: 'subheadline', type: 'textarea', localized: true },
    {
      name: 'primaryCta', type: 'group', fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'href', type: 'text' },
      ],
    },
    {
      name: 'secondaryCta', type: 'group', fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'href', type: 'text' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'proofPoints', type: 'array', fields: [
        { name: 'value', type: 'text', required: true, localized: true },
        { name: 'label', type: 'text', required: true, localized: true },
      ],
    },
  ],
}
