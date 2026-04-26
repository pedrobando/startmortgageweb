import 'server-only'
import path from 'node:path'
import fs from 'node:fs/promises'
import type { Payload } from 'payload'
import { mdToLexical } from './markdown'

export async function seedFAQs(payload: Payload, uploadsDir: string, report: any) {
  const raw = await fs.readFile(path.join(uploadsDir, 'faq.md'), 'utf8').catch(() => '')
  if (!raw) {
    report.skipped.push({ collection: 'faqs', reason: 'faq.md not found' })
    return
  }
  // Strip the leading H1 + frontmatter then split by H2 headings.
  const stripped = raw.replace(/^---[\s\S]*?---\s*/m, '').replace(/^#\s+.*\n+/m, '')
  const sections = stripped.split(/^##\s+/m).slice(1)
  let order = 0
  for (const sec of sections) {
    const [headLine, ...rest] = sec.split('\n')
    const question = headLine.trim()
    if (!question) continue
    const answer = rest.join('\n').trim()
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
