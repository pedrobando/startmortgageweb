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

export async function runSeed() {
  const payload = await payloadClient()
  const uploadsDir = path.resolve(process.cwd(), 'uploads')
  const report: any = {
    created: [],
    skipped: [],
    errors: [] as { stage: string; message: string }[],
    startedAt: new Date().toISOString(),
    uploadsDir,
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
  await fs.writeFile(
    path.resolve(process.cwd(), 'seedReport.json'),
    JSON.stringify(report, null, 2),
  )
  return report
}
