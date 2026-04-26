import 'server-only'
import path from 'node:path'
import fs from 'node:fs/promises'
import matter from 'gray-matter'
import type { Payload } from 'payload'
import { mdToLexical } from './markdown'

const PROGRAMS = [
  { file: 'loan-programs-conventional.md', slug: 'conventional', name: 'Conventional', iconKey: 'home' },
  { file: 'loan-programs-fha.md', slug: 'fha', name: 'FHA', iconKey: 'building' },
  { file: 'loan-programs-va.md', slug: 'va', name: 'VA', iconKey: 'flag' },
  { file: 'loan-programs-usda.md', slug: 'usda', name: 'USDA', iconKey: 'tractor' },
] as const

export async function seedLoanPrograms(payload: Payload, uploadsDir: string, report: any) {
  for (const p of PROGRAMS) {
    const full = path.join(uploadsDir, p.file)
    let raw: string
    try {
      raw = await fs.readFile(full, 'utf8')
    } catch {
      report.skipped.push({ collection: 'loan-programs', file: p.file, reason: 'not found' })
      continue
    }
    const { content } = matter(raw)
    const taglineMatch = content.match(/^>\s*(.*)/m)
    const tagline = taglineMatch ? taglineMatch[1].slice(0, 140) : ''
    const pros = (content.match(/^[-*]\s+✓?\s*(.*)$/gm) ?? [])
      .slice(0, 6)
      .map(s => ({ item: s.replace(/^[-*]\s+✓?\s*/, '').trim() }))
    const cons = (content.match(/^[-*]\s+(?:✗|❌|–|—)\s*(.*)$/gm) ?? [])
      .slice(0, 6)
      .map(s => ({ item: s.replace(/^[-*]\s+(?:✗|❌|–|—)\s*/, '').trim() }))

    const existing = await payload.find({
      collection: 'loan-programs',
      where: { slug: { equals: p.slug } },
      limit: 1,
      locale: 'en',
    })
    if (existing.docs[0]) {
      report.skipped.push({ collection: 'loan-programs', file: p.file, reason: 'exists' })
      continue
    }
    await payload.create({
      collection: 'loan-programs',
      locale: 'en',
      data: {
        name: p.name,
        slug: p.slug,
        tagline,
        requirements: mdToLexical(content) as any,
        pros,
        cons,
        iconKey: p.iconKey,
        order: PROGRAMS.indexOf(p as any),
      } as any,
    })
    report.created.push({ collection: 'loan-programs', slug: p.slug })
  }
}
