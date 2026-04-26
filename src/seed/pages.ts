import 'server-only'
import path from 'node:path'
import fs from 'node:fs/promises'
import matter from 'gray-matter'
import type { Payload } from 'payload'
import { mdToLexical } from './markdown'
import { mapHomepage } from './homepage-blocks'

type Mapping = {
  file: string
  slug: string
  localizationKey: string
  locale: 'en' | 'es'
  /** When true the seeder runs the homepage section→block heuristic, otherwise the body becomes a single richText block. */
  isHome?: boolean
}

const MAPPING: Mapping[] = [
  { file: 'homepage.md', slug: 'home', localizationKey: 'home', locale: 'en', isHome: true },
  { file: 'es-inicio.md', slug: 'inicio', localizationKey: 'home', locale: 'es', isHome: true },
  { file: 'about.md', slug: 'about', localizationKey: 'about', locale: 'en' },
  { file: 'contact.md', slug: 'contact', localizationKey: 'contact', locale: 'en' },
  { file: 'faq.md', slug: 'faq', localizationKey: 'faq', locale: 'en' },
  { file: 'first-time-buyers.md', slug: 'first-time-buyers', localizationKey: 'first-time-buyers', locale: 'en' },
  { file: 'how-it-works.md', slug: 'how-it-works', localizationKey: 'how-it-works', locale: 'en' },
  { file: 'es-como-funciona.md', slug: 'como-funciona', localizationKey: 'how-it-works', locale: 'es' },
  { file: 'pre-approval.md', slug: 'pre-approval', localizationKey: 'pre-approval', locale: 'en' },
  { file: 'es-pre-aprobacion.md', slug: 'pre-aprobacion', localizationKey: 'pre-approval', locale: 'es' },
  { file: 'planning-session.md', slug: 'planning-session', localizationKey: 'planning-session', locale: 'en' },
  { file: 'es-sesion-de-planificacion.md', slug: 'sesion-de-planificacion', localizationKey: 'planning-session', locale: 'es' },
  { file: 'realtors.md', slug: 'realtors', localizationKey: 'realtors', locale: 'en' },
  { file: 'reviews.md', slug: 'reviews', localizationKey: 'reviews', locale: 'en' },
  { file: 'credit-readiness.md', slug: 'credit-readiness', localizationKey: 'credit-readiness', locale: 'en' },
  { file: 'loan-programs.md', slug: 'loan-programs', localizationKey: 'loan-programs', locale: 'en' },
]

function extractTitle(md: string, fallback: string): string {
  const m = md.match(/^#\s+(.*)/m)
  return (m ? m[1].trim() : fallback).slice(0, 200)
}

export async function seedPages(payload: Payload, uploadsDir: string, report: any) {
  // Resolve the Planning Session form ID once so any homepage formEmbed
  // block on either locale can point at the right form record.
  const planningSessionForm = await payload.find({
    collection: 'forms',
    where: { title: { equals: 'Planning Session' } },
    limit: 1,
  })
  const planningSessionFormId = (planningSessionForm.docs[0] as any)?.id

  for (const m of MAPPING) {
    const full = path.join(uploadsDir, m.file)
    let raw: string
    try {
      raw = await fs.readFile(full, 'utf8')
    } catch {
      report.skipped.push({ collection: 'pages', file: m.file, reason: 'not found' })
      continue
    }
    const { content, data: fm } = matter(raw)
    const title = (fm.title as string) || extractTitle(content, m.slug)
    let layout: any[]
    if (m.isHome) {
      layout = mapHomepage(content).map(b =>
        b.blockType === 'formEmbed' && !b.form && planningSessionFormId
          ? { ...b, form: planningSessionFormId }
          : b,
      )
    } else {
      layout = [{ blockType: 'richText', content: mdToLexical(content), maxWidth: 'default' }]
    }

    const existing = await payload.find({
      collection: 'pages',
      where: {
        and: [
          { slug: { equals: m.slug } },
          { locale: { equals: m.locale } },
        ],
      },
      limit: 1,
    })
    if (existing.docs[0]) {
      report.skipped.push({ collection: 'pages', file: m.file, slug: m.slug, locale: m.locale, reason: 'exists' })
      continue
    }
    await payload.create({
      collection: 'pages',
      data: {
        title,
        slug: m.slug,
        locale: m.locale,
        localizationKey: m.localizationKey,
        layout: layout as any,
        _status: 'published',
        publishedAt: new Date().toISOString(),
      } as any,
    })
    report.created.push({ collection: 'pages', file: m.file, slug: m.slug, locale: m.locale })
  }
}
