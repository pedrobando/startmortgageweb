import type { Block } from 'payload'

export const Process: Block = {
  slug: 'process',
  interfaceName: 'ProcessBlock',
  fields: [
    { name: 'title', type: 'text', localized: true },
    {
      name: 'steps', type: 'array', fields: [
        { name: 'number', type: 'text', required: true },
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', localized: true },
        { name: 'durationLabel', type: 'text', localized: true },
      ],
    },
  ],
}
