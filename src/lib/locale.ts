import 'server-only'
import { payloadClient } from './payload'

export type Locale = 'en' | 'es'

export const SUPPORTED_LOCALES: Locale[] = ['en', 'es']
export const DEFAULT_LOCALE: Locale = 'en'

export const isLocale = (s: string | undefined): s is Locale =>
  s === 'en' || s === 'es'

export async function findPageByPath(slug: string, locale: Locale, draft = false) {
  const payload = await payloadClient()
  // Try (slug, locale) first
  const bySlug = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { slug: { equals: slug } },
        { locale: { equals: locale } },
      ],
    },
    limit: 1,
    draft,
    locale,
  })
  if (bySlug.docs[0]) return bySlug.docs[0]
  // Fallback (localizationKey, locale)
  const byKey = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { localizationKey: { equals: slug } },
        { locale: { equals: locale } },
      ],
    },
    limit: 1,
    draft,
    locale,
  })
  return byKey.docs[0]
}

export async function findHome(locale: Locale, draft = false) {
  const payload = await payloadClient()
  const res = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { localizationKey: { equals: 'home' } },
        { locale: { equals: locale } },
      ],
    },
    limit: 1,
    draft,
    locale,
  })
  return res.docs[0]
}

export async function counterpartUrlForPage(
  page: { localizationKey?: string | null; slug?: string | null },
  currentLocale: Locale,
): Promise<string> {
  const other: Locale = currentLocale === 'en' ? 'es' : 'en'
  if (!page.localizationKey) return `/${other}`
  const payload = await payloadClient()
  const res = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { localizationKey: { equals: page.localizationKey } },
        { locale: { equals: other } },
      ],
    },
    limit: 1,
    locale: other,
  })
  const doc = res.docs[0]
  if (!doc) return `/${other}`
  if (doc.localizationKey === 'home') return `/${other}`
  return `/${other}/${doc.slug}`
}
