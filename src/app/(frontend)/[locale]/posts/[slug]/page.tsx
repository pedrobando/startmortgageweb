import Link from 'next/link'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
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
      <article className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-[var(--color-ink-mute)] transition-colors hover:text-[var(--color-ink)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            All articles
          </Link>
          <div className="mt-8 flex items-center gap-3 text-[0.85rem]">
            <span className="rounded-full bg-[var(--color-leaf-tint)] px-3 py-1 font-semibold uppercase tracking-[0.05em] text-[var(--color-leaf-deep)]">
              Article
            </span>
            {date && <span className="text-[var(--color-ink-mute)]">{date}</span>}
          </div>
          <h1 className="mt-6 text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            {post.title}
          </h1>
          {post.meta?.description && (
            <p className="mt-5 text-[1.2rem] leading-[1.55] text-[var(--color-ink-soft)]">
              {post.meta.description}
            </p>
          )}
          <hr className="mt-10 border-[var(--color-line)]" />
          <div className="mt-10 prose prose-neutral max-w-none text-[1.06rem] leading-[1.75] text-[var(--color-ink-soft)] [&_p]:mb-5 [&_strong]:text-[var(--color-ink)] [&_h2]:font-display [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-[var(--color-ink)] [&_h2]:text-[1.7rem] [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:font-display [&_h3]:font-semibold [&_h3]:text-[1.25rem] [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-[var(--color-ink)] [&_a]:text-[var(--color-leaf-deep)] [&_a:hover]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--color-leaf)] [&_blockquote]:pl-5 [&_blockquote]:font-medium [&_blockquote]:text-[var(--color-ink)] [&_ul]:my-5 [&_ul]:pl-6 [&_li]:mb-2">
            <RichText data={post.content as any} />
          </div>

          <div className="mt-16 rounded-2xl bg-[var(--color-canvas-soft)] p-8 md:p-10">
            <div className="text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-[var(--color-leaf-deep)]">
              Ready to start?
            </div>
            <h2 className="mt-2 text-[1.6rem] font-bold tracking-[-0.02em]">
              Get a pre-approval inside 24 hours.
            </h2>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link href={`/${locale}/planning-session`} className="btn-primary">
                Book a session
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
              <Link
                href={`/${locale}/pre-approval`}
                className="btn-text"
              >
                Pre-approval <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
            </div>
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
