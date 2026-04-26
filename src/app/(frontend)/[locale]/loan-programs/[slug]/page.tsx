import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { isLocale } from '@/lib/locale'
import { payloadClient } from '@/lib/payload'

export default async function LoanProgramPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const payload = await payloadClient()
  const res = await payload.find({
    collection: 'loan-programs',
    where: { slug: { equals: slug } },
    limit: 1,
    locale,
  })
  const lp = res.docs[0] as any
  if (!lp) notFound()
  return (
    <article className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        {lp.tagline && (
          <div className="text-[var(--accent)] font-semibold uppercase text-xs">{lp.tagline}</div>
        )}
        <h1 className="mt-2 text-4xl md:text-5xl font-bold">{lp.name}</h1>
        {lp.whoItsFor && <p className="mt-4 text-lg text-zinc-600">{lp.whoItsFor}</p>}
        <div className="mt-10 grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-zinc-200 p-6">
            <div className="font-semibold">Pros</div>
            <ul className="mt-3 space-y-2">
              {(lp.pros ?? []).map((p: any, i: number) => (
                <li key={i} className="text-zinc-600">✓ {p.item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-200 p-6">
            <div className="font-semibold">Cons</div>
            <ul className="mt-3 space-y-2">
              {(lp.cons ?? []).map((c: any, i: number) => (
                <li key={i} className="text-zinc-600">– {c.item}</li>
              ))}
            </ul>
          </div>
        </div>
        {lp.requirements && (
          <div className="mt-10 prose prose-neutral max-w-none">
            <RichText data={lp.requirements as any} />
          </div>
        )}
        {lp.bestFor && (
          <p className="mt-6 text-zinc-600">
            <strong>Best for:</strong> {lp.bestFor}
          </p>
        )}
      </div>
    </article>
  )
}
