import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'mode', type: 'select', options: ['auto', 'manual'], defaultValue: 'auto' },
    {
      name: 'items', type: 'relationship', relationTo: 'reviews', hasMany: true,
      admin: { condition: (_, sib) => sib?.mode === 'manual' },
    },
  ],
}
