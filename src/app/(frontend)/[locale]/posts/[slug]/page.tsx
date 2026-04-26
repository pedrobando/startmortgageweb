import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { isLocale } from '@/lib/locale'
import { payloadClient } from '@/lib/payload'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildArticle } from '@/lib/seo'

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const { isEnabled } = await draftMode()
  const payload = await payloadClient()
  const res = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    locale,
    draft: isEnabled,
  })
  const post = res.docs[0]
  if (!post) notFound()
  const origin = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', ...buildArticle(origin, locale, post) }} />
      <article className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold">{(post as any).title}</h1>
          {(post as any).meta?.description && (
            <p className="mt-3 text-zinc-600 text-lg">{(post as any).meta.description}</p>
          )}
          <div className="mt-10 prose prose-neutral max-w-none">
            <RichText data={(post as any).content as any} />
          </div>
        </div>
      </article>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const payload = await payloadClient()
  const res = await payload.find({
    collection: 'posts', where: { slug: { equals: slug } }, limit: 1, locale,
  })
  const post = res.docs[0] as any
  if (!post) return {}
  return {
    title: post.meta?.title || post.title,
    description: post.meta?.description,
  }
}
