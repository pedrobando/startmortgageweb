import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import {
  ArrowLeft, ArrowRight, Check, X, Home, Flag, Tractor, Building2, ShieldCheck, Sparkles,
} from 'lucide-react'
import { isLocale } from '@/lib/locale'
import { payloadClient } from '@/lib/payload'

const iconMap: Record<string, any> = {
  home: Home, flag: Flag, tractor: Tractor, building: Building2, 'shield-check': ShieldCheck, flame: Sparkles,
}

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
  const Icon = (lp.iconKey && iconMap[lp.iconKey]) || Sparkles

  return (
    <article className="pb-24 md:pb-32">
      {/* Banner */}
      <header className="bg-[var(--color-canvas-soft)]">
        <div className="container py-12 md:py-20">
          <Link
            href={`/${locale}/loan-programs`}
            className="inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-[var(--color-ink-mute)] transition-colors hover:text-[var(--color-ink)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            All programs
          </Link>
          <div className="mt-8 grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-9">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--color-leaf)] text-[var(--color-ink)]">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <span className="text-[0.78rem] font-semibold uppercase tracking-[0.05em] text-[var(--color-ink-mute)]">
                  Loan program
                </span>
              </div>
              <h1 className="mt-5 text-[clamp(2.6rem,7vw,5.5rem)] font-bold leading-[1] tracking-[-0.035em]">
                {lp.name} <span className="text-[var(--color-leaf-deep)]">loans.</span>
              </h1>
              {lp.tagline && (
                <p className="mt-5 max-w-2xl text-[1.2rem] leading-[1.5] text-[var(--color-ink-soft)]">
                  {lp.tagline}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        {lp.whoItsFor && (
          <div className="grid gap-10 py-16 md:grid-cols-12 md:py-20">
            <div className="md:col-span-4">
              <div className="text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-[var(--color-leaf-deep)]">
                Who it's for
              </div>
            </div>
            <div className="md:col-span-8">
              <p className="text-[clamp(1.3rem,2.2vw,1.8rem)] font-medium leading-[1.4] text-[var(--color-ink)]">
                {lp.whoItsFor}
              </p>
            </div>
          </div>
        )}

        {/* Pros / Cons */}
        <div className="grid gap-5 py-12 md:grid-cols-2">
          {lp.pros?.length > 0 && (
            <div className="card p-7 md:p-8">
              <div className="text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-[var(--color-leaf-deep)]">
                Strengths
              </div>
              <ul className="mt-5 space-y-3.5">
                {lp.pros.map((p: any, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-[var(--color-leaf-tint)] text-[var(--color-leaf-deep)]">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="text-[0.98rem] leading-[1.55] text-[var(--color-ink)]">
                      {p.item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {lp.cons?.length > 0 && (
            <div className="card p-7 md:p-8">
              <div className="text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-[var(--color-ink-mute)]">
                Tradeoffs
              </div>
              <ul className="mt-5 space-y-3.5">
                {lp.cons.map((c: any, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-[var(--color-canvas-soft)] text-[var(--color-coral)]">
                      <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="text-[0.98rem] leading-[1.55] text-[var(--color-ink-soft)]">
                      {c.item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {lp.requirements && (
          <div className="grid gap-10 py-16 md:grid-cols-12 md:py-20">
            <div className="md:col-span-4">
              <div className="md:sticky md:top-24">
                <div className="text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-[var(--color-leaf-deep)]">
                  Details
                </div>
                <p className="mt-3 text-[0.92rem] leading-[1.6] text-[var(--color-ink-mute)]">
                  Requirements, eligibility, and how to qualify.
                </p>
              </div>
            </div>
            <div className="md:col-span-8">
              <div className="prose prose-neutral max-w-none text-[1.02rem] leading-[1.75] text-[var(--color-ink-soft)] [&_p]:mb-4 [&_strong]:text-[var(--color-ink)] [&_h2]:font-display [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-[var(--color-ink)] [&_h2]:text-[1.5rem] [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-display [&_h3]:font-semibold [&_h3]:text-[1.2rem] [&_h3]:mt-7 [&_h3]:mb-2 [&_h3]:text-[var(--color-ink)] [&_a]:text-[var(--color-leaf-deep)] [&_ul]:my-4 [&_ul]:pl-6 [&_li]:mb-2">
                <RichText data={lp.requirements as any} />
              </div>
            </div>
          </div>
        )}

        {lp.bestFor && (
          <div className="rounded-2xl border border-[var(--color-leaf)]/30 bg-[var(--color-leaf-tint)] p-7 md:p-9">
            <div className="text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-[var(--color-leaf-deep)]">
              Best for
            </div>
            <p className="mt-2 text-[1.15rem] font-medium leading-[1.5] text-[var(--color-ink)]">
              {lp.bestFor}
            </p>
          </div>
        )}

        {/* Other programs */}
        <div className="mt-16 border-t border-[var(--color-line)] pt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[1.6rem] font-bold tracking-[-0.02em]">Other programs</h2>
            <Link href={`/${locale}/loan-programs`} className="btn-text">
              View all <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
          </div>
          <ul className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {all.docs
              .filter((p: any) => p.id !== lp.id)
              .map((p: any) => {
                const I = (p.iconKey && iconMap[p.iconKey]) || Sparkles
                return (
                  <li key={p.id}>
                    <Link
                      href={`/${locale}/loan-programs/${p.slug}`}
                      className="card card-hover group flex items-center gap-4 p-5"
                    >
                      <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[var(--color-leaf-tint)] text-[var(--color-leaf-deep)]">
                        <I className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                      <span className="text-[1.05rem] font-semibold tracking-[-0.01em]">{p.name}</span>
                      <ArrowRight className="ml-auto h-4 w-4 text-[var(--color-ink-mute)] transition-all group-hover:translate-x-1 group-hover:text-[var(--color-leaf-deep)]" strokeWidth={1.75} />
                    </Link>
                  </li>
                )
              })}
          </ul>
        </div>

        {/* Closer CTA */}
        <div className="mt-16 rounded-3xl bg-[var(--color-ink)] p-10 text-[var(--color-canvas)] md:p-16">
          <h2 className="max-w-2xl text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.025em]">
            Ready to see if {lp.name} fits?
          </h2>
          <p className="mt-4 max-w-xl text-[1.05rem] leading-[1.6] text-[var(--color-line)]">
            Book a free 15-minute planning session — we&rsquo;ll show you the math and tell you exactly what to do next.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href={`/${locale}/planning-session`} className="btn-primary">
              Book a session
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
            <Link href={`/${locale}/pre-approval`} className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-[var(--color-line)] transition-all hover:text-[var(--color-canvas)] hover:gap-3">
              Pre-approval <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
