import Link from 'next/link'
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
  const post = res.docs[0] as any
  if (!post) notFound()
  const origin = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : null

  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', ...buildArticle(origin, locale, post) }} />
      <article className="container py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="kicker kicker--leaf">
            <Link href={`/${locale}`} className="link-underline">Journal</Link>
            {date && <span className="ml-3 text-[var(--color-ink-mute)]">— {date}</span>}
          </div>
          <h1
            className="mt-8 font-display leading-[1.05] tracking-[-0.02em] text-[clamp(2.4rem,5.5vw,4.5rem)]"
            style={{ fontWeight: 400 }}
          >
            {post.title}
          </h1>
          {post.meta?.description && (
            <p className="mt-6 font-display italic text-[1.25rem] leading-[1.5] text-[var(--color-ink-soft)]">
              {post.meta.description}
            </p>
          )}
          <hr className="rule mt-10" />
          <div className="mt-10 prose prose-neutral max-w-none font-sans text-[1.08rem] leading-[1.8] text-[var(--color-ink-soft)] [&_p]:mb-5 [&_strong]:text-[var(--color-ink)] [&_h2]:font-display [&_h2]:font-medium [&_h2]:tracking-[-0.01em] [&_h2]:text-[var(--color-ink)] [&_h2]:text-[1.8rem] [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:font-display [&_h3]:font-medium [&_h3]:text-[1.3rem] [&_h3]:mt-8 [&_h3]:mb-3 [&_a]:text-[var(--color-leaf-deep)] [&_a:hover]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--color-leaf-deep)] [&_blockquote]:pl-6 [&_blockquote]:font-display [&_blockquote]:italic [&_blockquote]:text-[1.25rem] [&_ul]:my-5 [&_ul]:pl-6 [&_li]:mb-2">
            <RichText data={post.content as any} />
          </div>
          <hr className="rule mt-16" />
          <div className="mt-10 flex items-baseline justify-between font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-ink-mute)]">
            <Link href={`/${locale}`} className="link-underline">← Back to home</Link>
            <span className="text-[var(--color-leaf-deep)]">★ End of article</span>
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
