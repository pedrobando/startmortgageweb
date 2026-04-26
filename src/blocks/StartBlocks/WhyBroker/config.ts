import type { Block } from 'payload'

export const WhyBroker: Block = {
  slug: 'whyBroker',
  interfaceName: 'WhyBrokerBlock',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'intro', type: 'richText', localized: true },
    {
      name: 'points', type: 'array', fields: [
        {
          name: 'iconKey', type: 'select',
          options: [
            'scale', 'wallet', 'clock', 'users', 'search', 'shield-check',
            'badge-check', 'sparkles', 'handshake', 'chart', 'headphones', 'globe',
          ],
        },
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', localized: true },
      ],
    },
  ],
}
