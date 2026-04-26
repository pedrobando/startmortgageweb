import type { Block } from 'payload'

export const Calculator: Block = {
  slug: 'calculator',
  interfaceName: 'CalculatorBlock',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'intro', type: 'textarea', localized: true },
    {
      name: 'defaults', type: 'group', fields: [
        { name: 'price', type: 'number', defaultValue: 350000 },
        { name: 'downPct', type: 'number', defaultValue: 5 },
        { name: 'ratePct', type: 'number', defaultValue: 6.5 },
        { name: 'termYears', type: 'number', defaultValue: 30 },
        { name: 'taxesAnnual', type: 'number', defaultValue: 4200 },
        { name: 'insuranceAnnual', type: 'number', defaultValue: 1800 },
      ],
    },
    { name: 'disclaimer', type: 'textarea', localized: true },
  ],
}
