import type { Block } from 'payload'

export const Offer: Block = {
  slug: 'offer',
  interfaceName: 'OfferBlock',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'body', type: 'richText', localized: true },
    { name: 'bullets', type: 'array', fields: [{ name: 'text', type: 'text', required: true, localized: true }] },
    {
      name: 'cta', type: 'group', fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'href', type: 'text' },
      ],
    },
    { name: 'darkMode', type: 'checkbox', defaultValue: false },
  ],
}
