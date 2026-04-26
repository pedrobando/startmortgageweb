import type { Block } from 'payload'

export const AudienceGrid: Block = {
  slug: 'audienceGrid',
  interfaceName: 'AudienceGridBlock',
  fields: [
    { name: 'title', type: 'text', localized: true },
    {
      name: 'audiences', type: 'array', fields: [
        {
          name: 'iconKey', type: 'select',
          options: ['home', 'users', 'briefcase', 'heart', 'globe', 'flag', 'wallet', 'sparkles'],
        },
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', localized: true },
        { name: 'href', type: 'text' },
      ],
    },
  ],
}
