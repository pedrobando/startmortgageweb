import 'server-only'
import path from 'node:path'
import fs from 'node:fs/promises'
import { payloadClient } from '@/lib/payload'
import { seedPages } from './pages'
import { seedPosts } from './posts'
import { seedLoanPrograms } from './loan-programs'
import { seedFAQs } from './faqs'
import { seedReviews } from './reviews'
import { seedSiteSettings } from './site-settings'
import { seedForms } from './forms'

type Options = { force?: string }

export async function runSeed(opts: Options = {}) {
  const payload = await payloadClient()
  const uploadsDir = path.resolve(process.cwd(), 'uploads')
  const report: any = {
    created: [],
    skipped: [],
    deleted: [] as Array<{ collection: string; slug: string; locale: string }>,
    errors: [] as { stage: string; message: string }[],
    startedAt: new Date().toISOString(),
    uploadsDir,
    force: opts.force,
  }

  // force=home — delete existing home pages so the seeder re-creates them
  // force=all  — delete all seeded pages, posts, loan-programs, faqs, reviews
  if (opts.force === 'home' || opts.force === 'all') {
    const where = opts.force === 'home'
      ? { localizationKey: { equals: 'home' } }
      : {}
    const pages = await payload.find({ collection: 'pages', where, limit: 200, pagination: false })
    for (const p of pages.docs as any[]) {
      await payload.delete({ collection: 'pages', id: p.id })
      report.deleted.push({ collection: 'pages', slug: p.slug, locale: p.locale })
    }
  }
  if (opts.force === 'all') {
    for (const c of ['posts', 'loan-programs', 'faqs', 'reviews'] as const) {
      const docs = await payload.find({ collection: c as any, limit: 500, pagination: false })
      for (const d of docs.docs as any[]) {
        await payload.delete({ collection: c as any, id: d.id })
        report.deleted.push({ collection: c, slug: d.slug ?? d.question ?? d.authorName, locale: 'en' })
      }
    }
  }

  const stages: Array<[string, () => Promise<void>]> = [
    ['site-settings', () => seedSiteSettings(payload, report)],
    ['reviews', () => seedReviews(payload, uploadsDir, report)],
    ['forms', () => seedForms(payload, report)],
    ['loan-programs', () => seedLoanPrograms(payload, uploadsDir, report)],
    ['posts', () => seedPosts(payload, uploadsDir, report)],
    ['faqs', () => seedFAQs(payload, uploadsDir, report)],
    ['pages', () => seedPages(payload, uploadsDir, report)],
  ]

  for (const [stage, fn] of stages) {
    try {
      await fn()
    } catch (err: any) {
      report.errors.push({ stage, message: String(err?.message ?? err) })
    }
  }

  report.finishedAt = new Date().toISOString()
  // Best-effort: write seedReport.json to the working dir locally; ignore
  // failures (Vercel functions run on a read-only filesystem).
  try {
    await fs.writeFile(
      path.resolve(process.cwd(), 'seedReport.json'),
      JSON.stringify(report, null, 2),
    )
  } catch (err: any) {
    if (err?.code !== 'EROFS') throw err
  }
  return report
}
