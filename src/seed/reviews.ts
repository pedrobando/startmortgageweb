import 'server-only'
import path from 'node:path'
import fs from 'node:fs/promises'
import type { Payload } from 'payload'

export async function seedReviews(payload: Payload, uploadsDir: string, report: any) {
  const raw = await fs.readFile(path.join(uploadsDir, 'reviews.md'), 'utf8').catch(() => '')
  if (!raw) {
    report.skipped.push({ collection: 'reviews', reason: 'reviews.md not found' })
    return
  }
  // Each review is a blockquote followed by an em-dash byline.
  // Pattern:
  // > "quote text..."
  // — Author Name, Context
  const blocks = raw.split(/\n\s*\n/)
  for (const blk of blocks) {
    const lines = blk.split('\n').map(l => l.trim()).filter(Boolean)
    const quoteLines = lines.filter(l => l.startsWith('>'))
    const byline = lines.find(l => /^[—–-]\s+/.test(l))
    if (!quoteLines.length || !byline) continue
    const quote = quoteLines.map(l => l.replace(/^>\s?/, '').replace(/^"|"$/g, '').trim()).join(' ')
    const cleaned = byline.replace(/^[—–-]\s+/, '').trim()
    const [authorName, ...ctx] = cleaned.split(',').map(s => s.trim())
    if (!quote || !authorName) continue

    const existing = await payload.find({
      collection: 'reviews',
      where: { quote: { equals: quote } },
      limit: 1,
      locale: 'en',
    })
    if (existing.docs[0]) {
      report.skipped.push({ collection: 'reviews', authorName })
      continue
    }
    await payload.create({
      collection: 'reviews',
      locale: 'en',
      data: {
        quote,
        authorName,
        authorContext: ctx.join(', '),
        rating: 5,
        featured: true,
      } as any,
    })
    report.created.push({ collection: 'reviews', authorName })
  }
}
