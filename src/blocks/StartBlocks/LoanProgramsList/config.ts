import type { Block } from 'payload'

export const LoanProgramsList: Block = {
  slug: 'loanProgramsList',
  interfaceName: 'LoanProgramsListBlock',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'intro', type: 'textarea', localized: true },
    { name: 'programs', type: 'relationship', relationTo: 'loan-programs', hasMany: true },
  ],
}
