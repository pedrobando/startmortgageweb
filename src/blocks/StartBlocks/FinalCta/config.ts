import type { Block } from 'payload'

export const FinalCta: Block = {
  slug: 'finalCta',
  interfaceName: 'FinalCtaBlock',
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'headline', type: 'text', required: true, localized: true },
    { name: 'body', type: 'textarea', localized: true },
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
  ],
}
