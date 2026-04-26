import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { isLocale, findPageByPath } from '@/lib/locale'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

export default async function CatchAll({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>
}) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const path = (slug ?? []).join('/')
  // Reserved sub-paths handled by sibling routes
  if (path.startsWith('posts/') || path.startsWith('loan-programs/')) notFound()
  const { isEnabled } = await draftMode()
  const page = await findPageByPath(path, locale, isEnabled)
  if (!page) notFound()
  return <RenderBlocks blocks={((page as any).layout ?? []) as any[]} locale={locale} />
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>
}) {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const page = await findPageByPath((slug ?? []).join('/'), locale)
  if (!page) return {}
  return {
    title: (page as any).meta?.title || page.title,
    description: (page as any).meta?.description,
  }
}
