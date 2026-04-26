import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { isLocale, findHome } from '@/lib/locale'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const { isEnabled } = await draftMode()
  const page = await findHome(locale, isEnabled)
  if (!page) notFound()
  return <RenderBlocks blocks={(page.layout ?? []) as any[]} locale={locale} />
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const page = await findHome(locale)
  return {
    title: (page as any)?.meta?.title || page?.title || 'START Mortgage',
    description: (page as any)?.meta?.description,
  }
}
