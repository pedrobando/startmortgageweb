import Link from 'next/link'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'

import type { Locale } from '@/lib/locale'
import { payloadClient } from '@/lib/payload'
import { CalculatorBlockClient } from '@/components/calculator/CalculatorBlockClient'
import { FormSubmitter } from '@/components/forms/FormSubmitter'

/* ---------- helpers ---------- */

function localeHref(locale: Locale, href?: string | null) {
  if (!href) return `/${locale}`
  if (/^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')) return href
  if (href.startsWith('/')) return `/${locale}${href}`
  return `/${locale}/${href}`
}

/** Splits a headline at the first em-dash so the trailing clause can be italicized. */
function splitHeadline(s: string): [string, string | null] {
  const m = s.match(/^(.*?)\s+[—–-]\s+(.+)$/)
  return m ? [m[1], m[2]] : [s, null]
}

/** Splits a headline into words for staggered reveal. */
function words(s: string): string[] {
  return s.split(/(\s+)/) // keep whitespace tokens
}

function Asterism() {
  return (
    <div aria-hidden className="my-16 text-center">
      <span className="asterism">✻ &nbsp; ✻ &nbsp; ✻</span>
    </div>
  )
}

/* ---------- Hero ---------- */

function HeroBlock({ block, locale }: any) {
  const { eyebrow, headline = 'The start of more.', subheadline, primaryCta, secondaryCta, proofPoints } = block
  const [head, tail] = splitHeadline(headline)
  return (
    <section className="relative overflow-hidden">
      <div className="container grid items-end gap-12 pt-16 pb-20 md:grid-cols-12 md:pt-24 md:pb-28">
        <div className="md:col-span-8">
          {eyebrow && (
            <div className="kicker kicker--leaf flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-[var(--color-leaf-deep)]" />
              <span>{eyebrow}</span>
            </div>
          )}
          <h1
            className="font-display mt-6 leading-[0.95] tracking-[-0.025em]"
            style={{ fontWeight: 400 }}
          >
            <span className="block text-[clamp(2.4rem,6.5vw,5.6rem)]">
              {words(head).map((w, i) =>
                /\s/.test(w) ? (
                  <span key={i}>{w}</span>
                ) : (
                  <span
                    key={i}
                    className="reveal-up"
                    style={{ ['--reveal-delay' as any]: `${i * 60}ms` }}
                  >
                    {w}
                  </span>
                ),
              )}
            </span>
            {tail && (
              <span
                className="block italic text-[var(--color-leaf-deep)] reveal-up text-[clamp(2rem,5.5vw,4.6rem)]"
                style={{ ['--reveal-delay' as any]: `${head.split(/\s+/).length * 60 + 200}ms`, fontWeight: 400 }}
              >
                — {tail}
              </span>
            )}
          </h1>
          {subheadline && (
            <p
              className="reveal-up mt-8 max-w-xl text-[1.1rem] leading-[1.6] text-[var(--color-ink-soft)] md:text-[1.2rem]"
              style={{ ['--reveal-delay' as any]: '900ms' }}
            >
              {subheadline}
            </p>
          )}
          <div
            className="reveal-up mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-4"
            style={{ ['--reveal-delay' as any]: '1100ms' }}
          >
            {primaryCta?.label && (
              <Link
                href={localeHref(locale, primaryCta.href)}
                className="action-link"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta?.label && (
              <Link
                href={localeHref(locale, secondaryCta.href)}
                className="link-leaf font-sans text-[0.95rem] tracking-[0.005em] text-[var(--color-ink-soft)]"
              >
                or {secondaryCta.label.replace(/^or\s+/i, '')}
              </Link>
            )}
          </div>
        </div>

        {/* Floating illustrative mark — leaf seal in the white space */}
        <div className="hidden md:col-span-4 md:flex md:items-end md:justify-end">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-8 -z-10"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, rgba(131,195,64,0.12), transparent 70%)',
              }}
            />
            <div className="paper-card tilt-1 px-7 py-8 text-center">
              <div className="kicker kicker--leaf">EST.</div>
              <div className="numeral mt-1 text-6xl">2018</div>
              <div className="kicker mt-2">No. 2821608</div>
              <div className="mt-4 font-display italic text-sm text-[var(--color-ink-soft)]">
                Kissimmee · FL
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust bar — magazine cover splash */}
      {proofPoints?.length > 0 && (
        <div className="border-y border-[var(--color-hairline)] bg-[var(--color-paper-deep)]">
          <div className="container grid grid-cols-2 divide-x divide-[var(--color-hairline)] md:grid-cols-4">
            {proofPoints.slice(0, 4).map((p: any, i: number) => (
              <div key={i} className="flex flex-col gap-1 px-4 py-7 first:pl-0 md:px-8">
                <div className="numeral text-[clamp(2.5rem,5vw,4rem)] text-[var(--color-ink)]">
                  {p.value}
                </div>
                <div className="kicker text-[var(--color-ink-mute)]">{p.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

/* ---------- Marquee — typographic ticker ---------- */

async function MarqueeBlock({ block, locale }: any) {
  const { mode, items, speed = 38 } = block
  let texts: string[] = []
  if (mode === 'manual' && items?.length) {
    texts = items.map((i: any) => i.text)
  } else {
    const payload = await payloadClient()
    const res = await payload.find({
      collection: 'reviews',
      where: { featured: { equals: true } },
      limit: 8,
      locale,
    })
    texts = res.docs.map((r: any) => `“${r.quote}” — ${r.authorName}`)
  }
  if (!texts.length) return null
  const doubled = [...texts, ...texts]
  return (
    <div className="border-y border-[var(--color-hairline)] bg-[var(--color-paper)] py-4">
      <div className="overflow-hidden">
        <div
          className="flex gap-16 whitespace-nowrap"
          style={{ animation: `ticker ${speed}s linear infinite` }}
        >
          {doubled.map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-6 font-display italic text-[1.05rem] text-[var(--color-ink)]"
            >
              <span className="text-[var(--color-leaf-deep)]">✻</span>
              <span>{t}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- WhyBroker — numbered editorial features ---------- */

function WhyBrokerBlock({ block }: any) {
  const { title = 'Why a broker, not a bank', intro, points } = block
  const [head, tail] = splitHeadline(title)
  return (
    <section className="container py-24 md:py-32">
      <Asterism />
      <div className="grid items-end gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <div className="kicker kicker--leaf">No. 01 / Difference</div>
        </div>
        <div className="md:col-span-9">
          <h2
            className="font-display leading-[1.02] tracking-[-0.02em] text-[clamp(2rem,4.5vw,3.6rem)]"
            style={{ fontWeight: 400 }}
          >
            {head}
            {tail && (
              <span className="block italic text-[var(--color-leaf-deep)]">— {tail}</span>
            )}
          </h2>
          {intro && (
            <div className="mt-6 max-w-2xl font-sans text-[1.05rem] leading-[1.7] text-[var(--color-ink-soft)]">
              <RichText data={intro as any} />
            </div>
          )}
        </div>
      </div>

      <hr className="rule mt-16" />

      <ol className="grid gap-x-10 gap-y-12 md:grid-cols-3">
        {(points ?? []).slice(0, 6).map((p: any, i: number) => (
          <li key={i} className="pt-8">
            <div className="flex items-baseline gap-3">
              <span className="numeral text-3xl text-[var(--color-leaf-deep)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="kicker">— Card</span>
            </div>
            <h3 className="mt-4 font-display text-[1.65rem] leading-[1.15] tracking-[-0.01em]" style={{ fontWeight: 500 }}>
              {p.title}
            </h3>
            {p.body && (
              <p className="mt-3 font-sans text-[0.98rem] leading-[1.65] text-[var(--color-ink-soft)]">
                {p.body}
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}

/* ---------- Offer ---------- */

function OfferBlock({ block, locale }: any) {
  const { title, body, bullets, cta, darkMode } = block
  return (
    <section className={darkMode ? 'bg-[var(--color-ink)] text-[var(--color-paper)]' : 'bg-[var(--color-paper-deep)]'}>
      <div className="container grid gap-12 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-6">
          {title && (
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]" style={{ fontWeight: 400 }}>
              {title}
            </h2>
          )}
          {body && (
            <div className={`mt-6 max-w-xl font-sans text-[1.05rem] leading-[1.7] ${darkMode ? 'text-[var(--color-paper-deep)]' : 'text-[var(--color-ink-soft)]'}`}>
              <RichText data={body as any} />
            </div>
          )}
          {cta?.label && (
            <Link href={localeHref(locale, cta.href)} className="action-link mt-10">
              {cta.label}
            </Link>
          )}
        </div>
        <div className="md:col-span-5 md:col-start-8">
          {bullets?.length > 0 && (
            <ul className="space-y-4 border-l border-[var(--color-hairline)] pl-6">
              {bullets.map((b: any, i: number) => (
                <li key={i} className="font-display italic text-[1.2rem] leading-[1.4]">
                  <span className="not-italic font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-leaf-deep)] mr-3">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {b.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

/* ---------- VersusTable ---------- */

function VersusTableBlock({ block }: any) {
  const { title, columns, rows, footnote } = block
  return (
    <section className="container py-24 md:py-32">
      <Asterism />
      {title && (
        <h2 className="mb-12 text-center font-display text-[clamp(1.8rem,3.5vw,2.8rem)]" style={{ fontWeight: 400 }}>
          {title}
        </h2>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--color-ink)]">
              <th className="kicker py-4 pr-6 text-left">Criterion</th>
              {(columns ?? []).map((c: any, i: number) => (
                <th key={i} className="kicker py-4 pr-6 text-left">
                  <span className={i === 0 ? 'text-[var(--color-leaf-deep)]' : ''}>{c.label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(rows ?? []).map((r: any, i: number) => (
              <tr key={i} className="border-b border-[var(--color-hairline)]">
                <td className="py-5 pr-6 font-display italic text-[1.05rem] text-[var(--color-ink)]">{r.label}</td>
                {(r.values ?? []).map((v: any, j: number) => (
                  <td
                    key={j}
                    className={`py-5 pr-6 font-sans text-[0.98rem] ${j === 0 ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink-mute)]'}`}
                  >
                    {v.text}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footnote && <p className="mt-4 font-mono text-[0.7rem] text-[var(--color-ink-mute)]">{footnote}</p>}
    </section>
  )
}

/* ---------- Process ---------- */

function ProcessBlock({ block }: any) {
  const { title, steps } = block
  return (
    <section className="bg-[var(--color-paper-deep)]">
      <div className="container py-24 md:py-32">
        <div className="kicker kicker--leaf mb-3">Process</div>
        {title && (
          <h2 className="max-w-3xl font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]" style={{ fontWeight: 400 }}>
            {title}
          </h2>
        )}
        <ol className="mt-16 grid gap-8 md:grid-cols-4">
          {(steps ?? []).map((s: any, i: number) => (
            <li key={i} className="relative pt-6">
              <div className="absolute left-0 top-0 h-px w-full bg-[var(--color-hairline)]" />
              <div className="numeral text-[var(--color-leaf-deep)]" style={{ fontSize: '3.5rem' }}>
                {s.number}
              </div>
              <h3 className="mt-3 font-display text-[1.4rem] leading-[1.15]" style={{ fontWeight: 500 }}>{s.title}</h3>
              {s.body && <p className="mt-3 font-sans text-[0.95rem] leading-[1.6] text-[var(--color-ink-soft)]">{s.body}</p>}
              {s.durationLabel && (
                <div className="kicker mt-4 text-[var(--color-leaf-deep)]">⏱ {s.durationLabel}</div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------- Calculator ---------- */

function CalculatorBlock({ block }: any) {
  const { title, intro, defaults, disclaimer } = block
  return (
    <section className="container py-24 md:py-32">
      <Asterism />
      <div className="grid items-end gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="kicker kicker--leaf">Tool</div>
          {title && (
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]" style={{ fontWeight: 400 }}>
              {title}
            </h2>
          )}
          {intro && (
            <p className="mt-5 max-w-xl font-sans text-[1.05rem] leading-[1.7] text-[var(--color-ink-soft)]">
              {intro}
            </p>
          )}
        </div>
      </div>
      <div className="mt-12">
        <CalculatorBlockClient defaults={defaults} />
      </div>
      {disclaimer && (
        <p className="mt-6 max-w-2xl font-mono text-[0.72rem] leading-relaxed text-[var(--color-ink-mute)]">
          {disclaimer}
        </p>
      )}
    </section>
  )
}

/* ---------- LoanProgramsList — magazine TOC ---------- */

async function LoanProgramsListBlock({ block, locale }: any) {
  const { title = 'Loan programs', intro, programs } = block
  let docs: any[] = []
  const payload = await payloadClient()
  if (programs?.length) {
    const ids = (typeof programs[0] === 'string' || typeof programs[0] === 'number')
      ? programs
      : programs.map((p: any) => p.id || p)
    docs = (await payload.find({ collection: 'loan-programs', where: { id: { in: ids } }, limit: 8, locale })).docs
  } else {
    docs = (await payload.find({ collection: 'loan-programs', sort: 'order', limit: 8, locale })).docs
  }
  const [head, tail] = splitHeadline(title)
  return (
    <section className="container py-24 md:py-32">
      <div className="grid items-end gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <div className="kicker kicker--leaf">No. 02 / Programs</div>
        </div>
        <div className="md:col-span-9">
          <h2 className="font-display leading-[1.02] tracking-[-0.02em] text-[clamp(2rem,4.5vw,3.6rem)]" style={{ fontWeight: 400 }}>
            {head}
            {tail && <span className="block italic text-[var(--color-leaf-deep)]">— {tail}</span>}
          </h2>
          {intro && (
            <p className="mt-5 max-w-xl font-sans text-[1rem] leading-[1.7] text-[var(--color-ink-soft)]">
              {intro}
            </p>
          )}
        </div>
      </div>

      <ul className="mt-12 border-t border-[var(--color-ink)]">
        {docs.map((p: any, i: number) => (
          <li key={p.id} className="border-b border-[var(--color-hairline)]">
            <Link
              href={`/${locale}/loan-programs/${p.slug}`}
              className="group grid items-baseline gap-6 py-7 transition-colors hover:bg-[var(--color-paper-deep)] md:grid-cols-[5rem_1fr_auto_3rem]"
            >
              <span className="numeral text-3xl text-[var(--color-leaf-deep)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-display text-[2rem] leading-[1.05] tracking-[-0.01em] md:text-[2.6rem]" style={{ fontWeight: 400 }}>
                {p.name}
                {i % 2 === 1 && <span className="italic text-[var(--color-ink-mute)]">.</span>}
              </span>
              <span className="hidden font-sans text-[0.95rem] text-[var(--color-ink-soft)] md:inline">
                {p.tagline}
              </span>
              <span className="font-display italic text-[1rem] text-[var(--color-ink-mute)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-leaf-deep)]">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ---------- AudienceGrid ---------- */

const audienceIcon: Record<string, string> = {
  home: '⌂',
  users: '◐',
  briefcase: '◇',
  heart: '♡',
  globe: '◯',
  flag: '⚑',
  wallet: '◎',
  sparkles: '✻',
}

function AudienceGridBlock({ block, locale }: any) {
  const { title = 'Whoever you are, there is a path', audiences } = block
  return (
    <section className="bg-[var(--color-paper-deep)]">
      <div className="container py-24 md:py-32">
        <Asterism />
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="kicker kicker--leaf">No. 03 / Audiences</div>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-display leading-[1.02] tracking-[-0.02em] text-[clamp(2rem,4.5vw,3.6rem)]" style={{ fontWeight: 400 }}>
              {title}
            </h2>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-12">
          {(audiences ?? []).map((a: any, i: number) => (
            <Link
              key={i}
              href={localeHref(locale, a.href)}
              className={`group paper-card relative flex flex-col gap-3 p-7 transition-transform hover:-translate-y-1 ${
                i === 0
                  ? 'md:col-span-7 md:row-span-2 md:p-10'
                  : i === 1
                    ? 'md:col-span-5 md:p-8'
                    : 'md:col-span-4 md:p-7'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="kicker">No. {String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-2xl text-[var(--color-leaf-deep)]">
                  {audienceIcon[a.iconKey] ?? '✻'}
                </span>
              </div>
              <h3
                className={`font-display leading-[1.05] tracking-[-0.01em] ${
                  i === 0 ? 'text-[clamp(1.8rem,3vw,2.6rem)]' : 'text-[1.4rem]'
                }`}
                style={{ fontWeight: 500 }}
              >
                {a.label}
              </h3>
              {a.body && (
                <p className="mt-1 font-sans text-[0.95rem] leading-[1.6] text-[var(--color-ink-soft)]">
                  {a.body}
                </p>
              )}
              <span className="mt-auto pt-4 font-display italic text-sm text-[var(--color-ink-mute)] transition-colors group-hover:text-[var(--color-leaf-deep)]">
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Testimonials ---------- */

async function TestimonialsBlock({ block, locale }: any) {
  const { title = 'In their words', mode, items } = block
  let docs: any[] = []
  const payload = await payloadClient()
  if (mode === 'manual' && items?.length) {
    const ids = (typeof items[0] === 'string' || typeof items[0] === 'number')
      ? items
      : items.map((x: any) => x.id || x)
    docs = (await payload.find({ collection: 'reviews', where: { id: { in: ids } }, limit: 12, locale })).docs
  } else {
    docs = (await payload.find({ collection: 'reviews', where: { featured: { equals: true } }, limit: 6, locale })).docs
  }
  return (
    <section className="container py-24 md:py-32">
      <Asterism />
      <h2 className="text-center font-display text-[clamp(2rem,4vw,3rem)]" style={{ fontWeight: 400 }}>
        {title}
      </h2>
      <div className="mt-14 grid gap-10 md:grid-cols-3">
        {docs.map((r: any, i: number) => (
          <figure
            key={r.id}
            className={`relative pt-10 ${i === 1 ? 'md:translate-y-6' : ''}`}
          >
            <span
              aria-hidden
              className="absolute -top-2 left-0 font-display italic text-[var(--color-leaf-deep)]"
              style={{ fontSize: '5rem', lineHeight: 0.8 }}
            >
              “
            </span>
            <blockquote className="font-display italic text-[1.25rem] leading-[1.4] text-[var(--color-ink)]">
              {r.quote}
            </blockquote>
            <figcaption className="mt-5 flex items-baseline justify-between border-t border-[var(--color-hairline)] pt-3 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-ink-soft)]">
              <span>{r.authorName}</span>
              <span className="text-[var(--color-leaf-deep)]">{'★'.repeat(r.rating ?? 5)}</span>
            </figcaption>
            {r.authorContext && (
              <div className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[var(--color-ink-mute)]">
                {r.authorContext}
              </div>
            )}
          </figure>
        ))}
      </div>
    </section>
  )
}

/* ---------- Guarantee — circular seal ---------- */

function GuaranteeBlock({ block }: any) {
  const { title, body, seal } = block
  return (
    <section className="container py-24 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-[1fr_auto] md:gap-20">
        <div>
          {title && (
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05]" style={{ fontWeight: 400 }}>
              {title}
            </h2>
          )}
          {body && (
            <div className="mt-6 max-w-xl font-sans text-[1.05rem] leading-[1.7] text-[var(--color-ink-soft)]">
              <RichText data={body as any} />
            </div>
          )}
        </div>
        {seal?.label && (
          <div className="relative flex h-52 w-52 items-center justify-center">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              <defs>
                <path id="seal-curve" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
              </defs>
              <circle cx="50" cy="50" r="46" fill="none" stroke="var(--color-leaf-deep)" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-leaf-deep)" strokeWidth="0.5" />
              <text fontFamily="var(--font-mono)" fontSize="5" fill="var(--color-leaf-deep)" letterSpacing="2">
                <textPath href="#seal-curve" startOffset="0">
                  · START PROMISE · 24-HOUR PRE-APPROVAL ·
                </textPath>
              </text>
            </svg>
            <div className="text-center">
              <div className="font-display italic text-[var(--color-leaf-deep)] text-2xl leading-tight">
                {seal.label}
              </div>
              {seal.sub && (
                <div className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-ink-soft)]">
                  {seal.sub}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/* ---------- Founder ---------- */

function FounderBlock({ block }: any) {
  const { headline = 'Meet your guide', bio, image, nmls, credentials } = block
  const [head, tail] = splitHeadline(headline)
  return (
    <section className="container py-24 md:py-32">
      <Asterism />
      <div className="grid items-start gap-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="kicker kicker--leaf">Founder</div>
          <h2
            className="mt-3 font-display leading-[1.02] tracking-[-0.02em] text-[clamp(2rem,4.5vw,3.6rem)]"
            style={{ fontWeight: 400 }}
          >
            {head}
            {tail && <span className="block italic text-[var(--color-leaf-deep)]">— {tail}</span>}
          </h2>
          {bio && (
            <div className="mt-8 max-w-xl font-sans text-[1.05rem] leading-[1.75] text-[var(--color-ink-soft)] [&_p]:mb-4">
              <RichText data={bio as any} />
            </div>
          )}
          {credentials?.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
              {credentials.map((c: any, i: number) => (
                <li
                  key={i}
                  className="border border-[var(--color-hairline)] bg-[var(--color-paper)] px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-[var(--color-ink-soft)]"
                >
                  {c.text}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="md:col-span-5 md:pt-8">
          <figure className="tilt-1">
            {image?.url ? (
              <div className="relative aspect-[3/4]">
                <Image
                  src={image.url}
                  alt={image.alt ?? 'Founder portrait'}
                  fill
                  sizes="(min-width: 768px) 35vw, 90vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="relative flex aspect-[3/4] items-end overflow-hidden bg-[linear-gradient(155deg,var(--color-paper-deep),var(--color-paper-edge))]">
                <div className="absolute inset-0 opacity-50" style={{
                  background: 'radial-gradient(circle at 30% 20%, rgba(131,195,64,0.18), transparent 60%)',
                }} />
                <div className="relative p-8">
                  <div className="font-display text-[clamp(3rem,8vw,5rem)] italic text-[var(--color-leaf-deep)] leading-[0.85]" style={{ fontWeight: 400 }}>
                    JR
                  </div>
                </div>
              </div>
            )}
            <figcaption className="mt-3 flex items-baseline justify-between border-t border-[var(--color-hairline)] pt-3 font-mono text-[0.7rem] uppercase tracking-[0.15em]">
              <span>{nmls ? `NMLS ${nmls}` : 'NMLS 1631454'}</span>
              <span className="text-[var(--color-leaf-deep)]">Plate 01</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

/* ---------- Bilingual — italic Spanish pull-quote ---------- */

function BilingualBlock({ block, locale }: any) {
  const { headline, body } = block
  const other = locale === 'en' ? 'es' : 'en'
  return (
    <section className="border-y border-[var(--color-hairline)] bg-[var(--color-paper-deep)]">
      <div className="container py-20 md:py-28">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-2">
            <div
              className="numeral text-[var(--color-leaf-deep)]"
              style={{ fontSize: '3rem', fontWeight: 300 }}
            >
              {other.toUpperCase()}
            </div>
            <div className="kicker mt-1">— Bilingüe</div>
          </div>
          <div className="md:col-span-9 md:col-start-4">
            {headline && (
              <p
                className="font-display italic leading-[1.1] tracking-[-0.015em] text-[clamp(1.7rem,4vw,3rem)] text-[var(--color-ink)]"
                style={{ fontWeight: 400 }}
              >
                {headline}
              </p>
            )}
            {body && (
              <div className="mt-6 max-w-2xl font-sans text-[1.05rem] leading-[1.7] text-[var(--color-ink-soft)] [&_p]:mb-3">
                <RichText data={body as any} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- BlogTeasers ---------- */

async function BlogTeasersBlock({ block, locale }: any) {
  const { title = 'From the journal', mode, count = 3, posts } = block
  const payload = await payloadClient()
  let docs: any[] = []
  if (mode === 'manual' && posts?.length) {
    const ids = (typeof posts[0] === 'string' || typeof posts[0] === 'number')
      ? posts
      : posts.map((x: any) => x.id || x)
    docs = (await payload.find({ collection: 'posts', where: { id: { in: ids } }, limit: count, locale })).docs
  } else {
    docs = (await payload.find({ collection: 'posts', sort: '-publishedAt', limit: count, locale })).docs
  }
  return (
    <section className="container py-24 md:py-32">
      <div className="flex items-end justify-between border-b border-[var(--color-ink)] pb-4">
        <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)]" style={{ fontWeight: 400 }}>
          {title}
        </h2>
        <Link
          href={`/${locale}`}
          className="kicker link-underline hidden md:inline"
        >
          Issue No. 01
        </Link>
      </div>
      <div className="mt-10 grid gap-12 md:grid-cols-3">
        {docs.map((p: any, i: number) => (
          <Link
            key={p.id}
            href={`/${locale}/posts/${p.slug}`}
            className="group flex flex-col"
          >
            <div className="kicker">No. {String(i + 1).padStart(2, '0')} — Article</div>
            <h3
              className="mt-3 font-display text-[1.5rem] leading-[1.2] tracking-[-0.005em] transition-colors group-hover:text-[var(--color-leaf-deep)]"
              style={{ fontWeight: 500 }}
            >
              {p.title}
            </h3>
            {p.meta?.description && (
              <p className="mt-3 font-sans text-[0.95rem] leading-[1.65] text-[var(--color-ink-soft)] line-clamp-3">
                {p.meta.description}
              </p>
            )}
            <span className="mt-4 font-display italic text-sm text-[var(--color-ink-mute)] transition-colors group-hover:text-[var(--color-leaf-deep)]">
              Read on →
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ---------- FaqList ---------- */

async function FaqListBlock({ block, locale }: any) {
  const { title = 'Common questions', mode, categoryFilter, items } = block
  const payload = await payloadClient()
  let docs: any[] = []
  if (mode === 'manual' && items?.length) {
    const ids = (typeof items[0] === 'string' || typeof items[0] === 'number')
      ? items
      : items.map((x: any) => x.id || x)
    docs = (await payload.find({ collection: 'faqs', where: { id: { in: ids } }, limit: 50, locale })).docs
  } else {
    const where: any = {}
    if (categoryFilter) {
      where.category = { equals: typeof categoryFilter === 'object' ? categoryFilter.id : categoryFilter }
    }
    docs = (await payload.find({ collection: 'faqs', where, sort: 'order', limit: 50, locale })).docs
  }
  return (
    <section className="container py-24 md:py-32">
      <Asterism />
      <div className="grid items-end gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <div className="kicker kicker--leaf">No. 04 / FAQ</div>
        </div>
        <div className="md:col-span-9">
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05]" style={{ fontWeight: 400 }}>
            {title}
          </h2>
        </div>
      </div>
      <ul className="mt-12 border-t border-[var(--color-ink)]">
        {docs.map((f: any, i: number) => (
          <li key={f.id} className="border-b border-[var(--color-hairline)]">
            <details className="group">
              <summary className="grid cursor-pointer list-none grid-cols-[3rem_1fr_2rem] items-baseline gap-4 py-6 transition-colors hover:bg-[var(--color-paper-deep)]">
                <span className="kicker text-[var(--color-leaf-deep)]">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-[1.25rem] leading-[1.3] tracking-[-0.005em]" style={{ fontWeight: 500 }}>
                  {f.question}
                </span>
                <span className="font-display text-2xl text-[var(--color-leaf-deep)] transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="grid grid-cols-[3rem_1fr_2rem] gap-4 pb-7">
                <div />
                <div className="prose prose-neutral max-w-none font-sans text-[1rem] leading-[1.7] text-[var(--color-ink-soft)] [&_p]:mb-3">
                  <RichText data={f.answer as any} />
                </div>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ---------- FinalCta — editorial closer ---------- */

function FinalCtaBlock({ block, locale }: any) {
  const { eyebrow, headline = 'Ready when you are.', body, primaryCta, secondaryCta } = block
  return (
    <section className="bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="container py-28 md:py-40">
        <Asterism />
        {eyebrow && (
          <div className="kicker kicker--leaf text-center">{eyebrow}</div>
        )}
        <h2
          className="mx-auto mt-4 max-w-4xl text-center font-display leading-[1.02] tracking-[-0.02em] text-[clamp(2.4rem,6vw,5.2rem)]"
          style={{ fontWeight: 400 }}
        >
          {headline}
        </h2>
        {body && (
          <p className="mx-auto mt-8 max-w-xl text-center font-sans text-[1.05rem] leading-[1.7] text-[var(--color-paper-edge)]">
            {body}
          </p>
        )}
        <div className="mt-12 flex flex-wrap items-baseline justify-center gap-x-10 gap-y-4">
          {primaryCta?.label && (
            <Link
              href={localeHref(locale, primaryCta.href)}
              className="action-link text-[var(--color-paper)] [&::after]:font-light"
              style={{ color: 'var(--color-paper)' }}
            >
              {primaryCta.label}
            </Link>
          )}
          {secondaryCta?.label && (
            <Link
              href={localeHref(locale, secondaryCta.href)}
              className="link-leaf font-sans text-[0.95rem] tracking-[0.005em] text-[var(--color-paper-edge)]"
            >
              or {secondaryCta.label.replace(/^or\s+/i, '')}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

/* ---------- RichText (generic block) ---------- */

function RichTextBlock({ block }: any) {
  const { content, maxWidth = 'default' } = block
  const widthCls =
    maxWidth === 'narrow' ? 'max-w-2xl'
    : maxWidth === 'wide' ? 'max-w-5xl'
    : maxWidth === 'full' ? 'max-w-none'
    : 'max-w-3xl'
  if (!content) return null
  return (
    <section className="container py-12">
      <div
        className={`mx-auto ${widthCls} prose prose-neutral font-sans text-[1.05rem] leading-[1.75]
          prose-headings:font-display prose-headings:tracking-[-0.01em] prose-headings:font-medium
          prose-h2:text-[clamp(1.6rem,3vw,2.4rem)] prose-h3:text-[1.4rem]
          prose-a:text-[var(--color-leaf-deep)] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-[var(--color-ink)] prose-blockquote:font-display prose-blockquote:italic
          prose-blockquote:border-l-[var(--color-leaf-deep)]`}
      >
        <RichText data={content as any} />
      </div>
    </section>
  )
}

/* ---------- FormEmbed ---------- */

async function FormEmbedBlock({ block, locale }: any) {
  const { form, headline = 'Book your planning session', intro } = block
  let formDoc: any = form
  if (typeof form === 'string' || typeof form === 'number') {
    formDoc = await (await payloadClient()).findByID({ collection: 'forms', id: form, locale })
  }
  return (
    <section className="container py-24 md:py-32">
      <Asterism />
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="kicker kicker--leaf">No. 05 / Inquiry</div>
          <h2
            className="mt-3 font-display leading-[1.02] tracking-[-0.02em] text-[clamp(2rem,4vw,3.2rem)]"
            style={{ fontWeight: 400 }}
          >
            {headline}
          </h2>
          {intro && (
            <p className="mt-6 max-w-md font-sans text-[1rem] leading-[1.7] text-[var(--color-ink-soft)]">
              {intro}
            </p>
          )}
          <div className="mt-10 border-t border-[var(--color-hairline)] pt-6 font-mono text-[0.72rem] uppercase tracking-[0.15em] text-[var(--color-ink-soft)]">
            <div>Free consultation</div>
            <div className="mt-1">No credit pull · No obligation</div>
            <div className="mt-1 text-[var(--color-leaf-deep)]">Hablo Español</div>
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <FormSubmitter form={formDoc} />
        </div>
      </div>
    </section>
  )
}

/* ---------- Dispatcher ---------- */

const dispatch: Record<string, any> = {
  hero: HeroBlock,
  marquee: MarqueeBlock,
  whyBroker: WhyBrokerBlock,
  offer: OfferBlock,
  versusTable: VersusTableBlock,
  process: ProcessBlock,
  calculator: CalculatorBlock,
  loanProgramsList: LoanProgramsListBlock,
  audienceGrid: AudienceGridBlock,
  testimonials: TestimonialsBlock,
  guarantee: GuaranteeBlock,
  founder: FounderBlock,
  bilingual: BilingualBlock,
  blogTeasers: BlogTeasersBlock,
  faqList: FaqListBlock,
  finalCta: FinalCtaBlock,
  richText: RichTextBlock,
  formEmbed: FormEmbedBlock,
}

export async function RenderBlocks({ blocks, locale }: { blocks: any[]; locale: Locale }) {
  if (!blocks?.length) return null
  return (
    <>
      {await Promise.all(
        blocks.map(async (b: any, i: number) => {
          const Cmp = dispatch[b.blockType]
          if (!Cmp) {
            return (
              <section
                key={b.id ?? i}
                className="container py-6 font-mono text-xs text-[var(--color-ink-mute)]"
              >
                — Unknown block: {b.blockType} —
              </section>
            )
          }
          const result = Cmp({ block: b, locale })
          return <div key={b.id ?? i}>{result instanceof Promise ? await result : result}</div>
        }),
      )}
    </>
  )
}
