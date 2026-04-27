import 'server-only'
import path from 'node:path'
import fs from 'node:fs/promises'
import type { Payload } from 'payload'
import { mdToLexical } from './markdown'

/**
 * uploads/faq.md is an authoring spec doc. The real Q/A pairs are
 * formatted as `**Q1: <question>**` followed by `A: <answer>` blocks.
 * Everything else (SEO settings, schema markup, layout notes, internal
 * linking maps) is metadata and must not seed into the FAQs collection.
 */
const Q_RE = /^\*\*Q\d+:\s*(.+?)\*\*\s*$/m

export async function seedFAQs(payload: Payload, uploadsDir: string, report: any) {
  const raw = await fs.readFile(path.join(uploadsDir, 'faq.md'), 'utf8').catch(() => '')
  if (!raw) {
    report.skipped.push({ collection: 'faqs', reason: 'faq.md not found' })
    return
  }
  // Split on horizontal-rule markers between Q/A blocks.
  const blocks = raw.split(/\n-{3,}\n/)
  let order = 0
  for (const blk of blocks) {
    const qMatch = blk.match(Q_RE)
    if (!qMatch) continue
    const question = qMatch[1].trim().replace(/[?]+$/, '?')
    if (!question) continue
    // Answer = lines after the question, stripping a leading "A:" if present.
    const idx = blk.indexOf(qMatch[0])
    const after = blk.slice(idx + qMatch[0].length).trim()
    const answer = after
      .replace(/^A:\s*/, '')
      .trim()
    if (!answer) continue

    const existing = await payload.find({
      collection: 'faqs',
      where: { question: { equals: question } },
      limit: 1,
      locale: 'en',
    })
    if (existing.docs[0]) {
      report.skipped.push({ collection: 'faqs', question })
      continue
    }
    await payload.create({
      collection: 'faqs',
      locale: 'en',
      data: {
        question,
        answer: mdToLexical(answer) as any,
        order: order++,
      } as any,
    })
    report.created.push({ collection: 'faqs', question })
  }
}
