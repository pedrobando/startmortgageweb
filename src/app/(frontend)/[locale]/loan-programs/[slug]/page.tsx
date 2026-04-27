import Link from 'next/link'
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
  const all = await payload.find({
    collection: 'loan-programs',
    sort: 'order',
    limit: 8,
    locale,
  })

  return (
    <article className="pb-24 md:pb-32">
      {/* Banner */}
      <header className="border-b border-[var(--color-hairline)] bg-[var(--color-paper-deep)]">
        <div className="container py-16 md:py-24">
          <div className="grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-2">
              <div className="kicker kicker--leaf">No.</div>
              <div className="numeral text-7xl text-[var(--color-leaf-deep)]" style={{ fontWeight: 300 }}>
                {String((lp.order ?? 0) + 1).padStart(2, '0')}
              </div>
            </div>
            <div className="md:col-span-9 md:col-start-4">
              <div className="kicker">Loan program</div>
              <h1
                className="mt-3 font-display leading-[0.95] tracking-[-0.025em] text-[clamp(3rem,8vw,7rem)]"
                style={{ fontWeight: 400 }}
              >
                {lp.name}
                <span className="italic text-[var(--color-leaf-deep)]"> loans.</span>
              </h1>
              {lp.tagline && (
                <p className="mt-6 max-w-2xl font-display italic text-[1.4rem] leading-[1.4] text-[var(--color-ink-soft)]">
                  {lp.tagline}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        {lp.whoItsFor && (
          <div className="grid gap-12 py-20 md:grid-cols-12">
            <div className="md:col-span-3">
              <div className="kicker kicker--leaf">Who it's for</div>
            </div>
            <div className="md:col-span-9">
              <p className="font-display text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.35] text-[var(--color-ink)]" style={{ fontWeight: 400 }}>
                {lp.whoItsFor}
              </p>
            </div>
          </div>
        )}

        <hr className="rule" />

        {/* Pros / Cons */}
        <div className="grid gap-12 py-20 md:grid-cols-2 md:gap-20">
          {lp.pros?.length > 0 && (
            <div>
              <div className="kicker kicker--leaf">Strengths</div>
              <ul className="mt-6 space-y-4">
                {lp.pros.map((p: any, i: number) => (
                  <li key={i} className="flex items-baseline gap-4 border-b border-[var(--color-hairline)] pb-4">
                    <span className="numeral text-2xl text-[var(--color-leaf-deep)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display italic text-[1.1rem] leading-[1.4]">{p.item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {lp.cons?.length > 0 && (
            <div>
              <div className="kicker">Tradeoffs</div>
              <ul className="mt-6 space-y-4">
                {lp.cons.map((c: any, i: number) => (
                  <li key={i} className="flex items-baseline gap-4 border-b border-[var(--color-hairline)] pb-4">
                    <span className="numeral text-2xl text-[var(--color-coral)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display italic text-[1.1rem] leading-[1.4] text-[var(--color-ink-soft)]">{c.item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {lp.requirements && (
          <>
            <hr className="rule" />
            <div className="grid gap-12 py-20 md:grid-cols-12">
              <div className="md:col-span-3">
                <div className="kicker kicker--leaf">Details</div>
              </div>
              <div className="md:col-span-9">
                <div className="prose prose-neutral max-w-none font-sans text-[1.05rem] leading-[1.8] text-[var(--color-ink-soft)] [&_p]:mb-4 [&_strong]:text-[var(--color-ink)] [&_h2]:font-display [&_h2]:font-medium [&_h2]:text-[1.6rem] [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-display [&_h3]:font-medium [&_h3]:text-[1.25rem] [&_h3]:mt-6 [&_h3]:mb-2 [&_a]:text-[var(--color-leaf-deep)] [&_ul]:my-4 [&_ul]:pl-6 [&_li]:mb-2">
                  <RichText data={lp.requirements as any} />
                </div>
              </div>
            </div>
          </>
        )}

        {lp.bestFor && (
          <div className="border-l-2 border-[var(--color-leaf)] bg-[var(--color-leaf-tint)] px-6 py-7 md:px-10">
            <div className="kicker kicker--leaf">Best for</div>
            <p className="mt-2 font-display italic text-[1.2rem] leading-[1.5] text-[var(--color-ink)]">
              {lp.bestFor}
            </p>
          </div>
        )}

        <hr className="rule mt-20" />

        {/* Other programs nav */}
        <nav className="py-14">
          <div className="kicker kicker--leaf">Other programs</div>
          <ul className="mt-6 grid gap-3 md:grid-cols-4">
            {all.docs
              .filter((p: any) => p.id !== lp.id)
              .map((p: any) => (
                <li key={p.id}>
                  <Link
                    href={`/${locale}/loan-programs/${p.slug}`}
                    className="link-leaf font-display text-[1.4rem] tracking-[-0.005em]"
                    style={{ fontWeight: 400 }}
                  >
                    {p.name} <span className="font-sans italic text-sm text-[var(--color-ink-mute)]">→</span>
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-3">
          <Link href={`/${locale}/planning-session`} className="action-link">
            Book your planning session
          </Link>
          <Link
            href={`/${locale}/loan-programs`}
            className="link-leaf font-sans text-[0.95rem] text-[var(--color-ink-soft)]"
          >
            ← All programs
          </Link>
        </div>
      </div>
    </article>
  )
}
