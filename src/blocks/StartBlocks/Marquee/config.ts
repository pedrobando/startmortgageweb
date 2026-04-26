import type { Block } from 'payload'

export const Marquee: Block = {
  slug: 'marquee',
  interfaceName: 'MarqueeBlock',
  fields: [
    { name: 'mode', type: 'select', options: ['auto', 'manual'], defaultValue: 'auto' },
    {
      name: 'items', type: 'array',
      admin: { condition: (_, sib) => sib?.mode === 'manual' },
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
    { name: 'speed', type: 'number', defaultValue: 30, admin: { description: 'Seconds per loop.' } },
  ],
}
