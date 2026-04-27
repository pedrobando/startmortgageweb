import Link from 'next/link'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import {
  Home, Flag, Flame, Tractor, Building2, ShieldCheck, Scale, Wallet, Clock, Users,
  Search, BadgeCheck, Sparkles, Handshake, ChartLine, Headphones, Globe, Briefcase, Heart, ArrowRight, Check, Star,
} from 'lucide-react'

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

const iconMap: Record<string, any> = {
  home: Home, flag: Flag, flame: Flame, tractor: Tractor, building: Building2,
  'shield-check': ShieldCheck, scale: Scale, wallet: Wallet, clock: Clock, users: Users,
  search: Search, 'badge-check': BadgeCheck, sparkles: Sparkles, handshake: Handshake,
  chart: ChartLine, headphones: Headphones, globe: Globe, briefcase: Briefcase, heart: Heart,
}

function Icon({ name, className }: { name?: string; className?: string }) {
  const Cmp = (name && iconMap[name]) || Sparkles
  return <Cmp className={className ?? 'h-5 w-5'} strokeWidth={1.5} />
}

function HeroPhoto({ alt = 'A Central Florida family at home' }: { alt?: string }) {
  // Rich placeholder — used until real photography lands.
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-leaf-tint)] via-[#FFF6E0] to-[#FFE2CC]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 75% 25%, rgba(226, 107, 59, 0.18), transparent 55%), radial-gradient(circle at 25% 80%, rgba(131, 195, 64, 0.28), transparent 55%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <div className="rounded-xl border border-white/60 bg-white/70 p-4 backdrop-blur-md">
          <div className="text-[0.78rem] font-semibold uppercase tracking-[0.05em] text-[var(--color-leaf-deep)]">
            ★ Featured client
          </div>
          <p className="mt-1 text-[0.95rem] font-medium text-[var(--color-ink)]">
            “Jexayra walked us through every step. We closed in 21 days.”
          </p>
          <p className="mt-1 text-[0.8rem] text-[var(--color-ink-mute)]">
            — Maria & José, Kissimmee
          </p>
        </div>
      </div>
      <span className="sr-only">{alt}</span>
    </div>
  )
}

/* ---------- Hero ---------- */

function HeroBlock({ block, locale }: any) {
  const {
    eyebrow = 'Boutique bilingual mortgage broker',
    headline = 'Your front door, sooner.',
    subheadline,
    primaryCta,
    secondaryCta,
    proofPoints,
    image,
  } = block
  return (
    <section className="overflow-hidden">
      <div className="container grid items-center gap-12 pt-14 pb-20 md:grid-cols-12 md:gap-16 md:pt-20 md:pb-28">
        <div className="md:col-span-7">
          <div className="fade-up eyebrow eyebrow--leaf">
            <span>{eyebrow}</span>
          </div>
          <h1
            className="fade-up mt-6 text-[clamp(2.6rem,6.5vw,5rem)] font-bold leading-[1] tracking-[-0.035em]"
            style={{ ['--fade-delay' as any]: '80ms' }}
          >
            {headline}
          </h1>
          {subheadline && (
            <p
              className="fade-up mt-6 max-w-xl text-[1.15rem] leading-[1.55] text-[var(--color-ink-soft)] md:text-[1.2rem]"
              style={{ ['--fade-delay' as any]: '180ms' }}
            >
              {subheadline}
            </p>
          )}
          <div
            className="fade-up mt-10 flex flex-wrap items-center gap-4"
            style={{ ['--fade-delay' as any]: '280ms' }}
          >
            {primaryCta?.label && (
              <Link href={localeHref(locale, primaryCta.href)} className="btn-primary">
                {primaryCta.label}
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            )}
            {secondaryCta?.label && (
              <Link href={localeHref(locale, secondaryCta.href)} className="btn-text">
                {secondaryCta.label.replace(/^or\s+/i, '')}
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
            )}
          </div>
          <div
            className="fade-up mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.88rem] text-[var(--color-ink-mute)]"
            style={{ ['--fade-delay' as any]: '380ms' }}
          >
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[var(--color-leaf-deep)]" strokeWidth={2.5} />
              Free consultation
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[var(--color-leaf-deep)]" strokeWidth={2.5} />
              No credit pull
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[var(--color-leaf-deep)]" strokeWidth={2.5} />
              Hablamos español
            </span>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="fade-up" style={{ ['--fade-delay' as any]: '120ms' }}>
            {image?.url ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={image.url}
                  alt={image.alt ?? 'Hero photograph'}
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <HeroPhoto />
            )}
          </div>
        </div>
      </div>

      {/* Trust bar */}
      {proofPoints?.length > 0 && (
        <div className="border-y border-[var(--color-line)] bg-[var(--color-canvas-soft)]">
          <div className="container grid grid-cols-2 gap-y-6 py-8 md:grid-cols-4 md:gap-y-0">
            {proofPoints.slice(0, 4).map((p: any, i: number) => (
              <div key={i} className="flex items-baseline gap-3 px-2 md:px-6 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-[var(--color-line)]">
                <span className="tabular text-[1.6rem] font-bold text-[var(--color-ink)] md:text-[1.9rem]">
                  {p.value}
                </span>
                <span className="text-[0.85rem] leading-tight text-[var(--color-ink-mute)]">
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

/* ---------- Marquee ---------- */

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
    <div className="border-y border-[var(--color-line)] bg-[var(--color-canvas-soft)] py-3 overflow-hidden">
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{ animation: `ticker ${speed}s linear infinite` }}
      >
        {doubled.map((t, i) => (
          <span key={i} className="flex items-center gap-3 text-[0.9rem] text-[var(--color-ink-soft)]">
            <Star className="h-3.5 w-3.5 fill-[var(--color-leaf)] stroke-[var(--color-leaf-deep)]" strokeWidth={1.5} />
            <span>{t}</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  )
}

/* ---------- WhyBroker — clean feature cards ---------- */

function WhyBrokerBlock({ block }: any) {
  const { title = 'A broker, not a bank.', intro, points } = block
  return (
    <section className="container py-20 md:py-28">
      <div className="grid items-end gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="eyebrow eyebrow--leaf">Why START</div>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            {title}
          </h2>
          {intro && (
            <div className="mt-5 max-w-2xl text-[1.05rem] leading-[1.65] text-[var(--color-ink-soft)]">
              <RichText data={intro as any} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {(points ?? []).slice(0, 6).map((p: any, i: number) => (
          <div key={i} className="card card-hover p-7">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-[var(--color-leaf-tint)] text-[var(--color-leaf-deep)]">
              <Icon name={p.iconKey} className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-[1.25rem] font-semibold tracking-[-0.015em]">{p.title}</h3>
            {p.body && (
              <p className="mt-2 text-[0.95rem] leading-[1.6] text-[var(--color-ink-soft)]">{p.body}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- Offer ---------- */

function OfferBlock({ block, locale }: any) {
  const { title, body, bullets, cta, darkMode } = block
  const dark = darkMode
  return (
    <section
      className={
        dark
          ? 'bg-[var(--color-ink)] text-[var(--color-canvas)]'
          : 'bg-[var(--color-canvas-soft)]'
      }
    >
      <div className="container grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-6">
          {title && (
            <h2 className={`text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.025em] ${dark ? 'text-[var(--color-canvas)]' : ''}`}>
              {title}
            </h2>
          )}
          {body && (
            <div className={`mt-6 max-w-xl text-[1.05rem] leading-[1.65] ${dark ? 'text-[var(--color-line)]' : 'text-[var(--color-ink-soft)]'}`}>
              <RichText data={body as any} />
            </div>
          )}
          {cta?.label && (
            <Link href={localeHref(locale, cta.href)} className="btn-primary mt-8">
              {cta.label}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          )}
        </div>
        <div className="md:col-span-5 md:col-start-8">
          {bullets?.length > 0 && (
            <ul className="space-y-4">
              {bullets.map((b: any, i: number) => (
                <li key={i} className="flex gap-3">
                  <span
                    className={`mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full ${
                      dark ? 'bg-[var(--color-leaf)] text-[var(--color-ink)]' : 'bg-[var(--color-leaf-tint)] text-[var(--color-leaf-deep)]'
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  <span className={`text-[1.02rem] leading-[1.55] ${dark ? 'text-[var(--color-canvas)]' : 'text-[var(--color-ink)]'}`}>
                    {b.text}
                  </span>
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
    <section className="container py-20 md:py-28">
      {title && (
        <h2 className="mb-10 max-w-3xl text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.025em]">
          {title}
        </h2>
      )}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-[var(--color-canvas-soft)]">
            <tr>
              <th className="px-6 py-4 text-left text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-[var(--color-ink-mute)]">
                Criterion
              </th>
              {(columns ?? []).map((c: any, i: number) => (
                <th
                  key={i}
                  className={`px-6 py-4 text-left text-[0.78rem] font-semibold uppercase tracking-[0.06em] ${
                    i === 0 ? 'text-[var(--color-leaf-deep)]' : 'text-[var(--color-ink-mute)]'
                  }`}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(rows ?? []).map((r: any, i: number) => (
              <tr key={i} className="border-t border-[var(--color-line)]">
                <td className="px-6 py-4 font-medium text-[var(--color-ink)]">{r.label}</td>
                {(r.values ?? []).map((v: any, j: number) => (
                  <td
                    key={j}
                    className={`px-6 py-4 text-[0.95rem] ${
                      j === 0 ? 'font-medium text-[var(--color-ink)]' : 'text-[var(--color-ink-mute)]'
                    }`}
                  >
                    {v.text}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footnote && (
        <p className="mt-3 text-[0.85rem] text-[var(--color-ink-mute)]">{footnote}</p>
      )}
    </section>
  )
}

/* ---------- Process ---------- */

function ProcessBlock({ block }: any) {
  const { title, steps } = block
  return (
    <section className="bg-[var(--color-canvas-soft)]">
      <div className="container py-20 md:py-28">
        <div className="eyebrow eyebrow--leaf">How it works</div>
        {title && (
          <h2 className="mt-4 max-w-3xl text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.025em]">
            {title}
          </h2>
        )}
        <ol className="mt-12 grid gap-5 md:grid-cols-4">
          {(steps ?? []).map((s: any, i: number) => (
            <li key={i} className="card p-6">
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-leaf)] text-[0.85rem] font-bold tabular text-[var(--color-ink)]">
                  {s.number}
                </span>
                {s.durationLabel && (
                  <span className="text-[0.78rem] font-medium text-[var(--color-ink-mute)]">
                    {s.durationLabel}
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-[1.15rem] font-semibold tracking-[-0.015em]">{s.title}</h3>
              {s.body && (
                <p className="mt-2 text-[0.92rem] leading-[1.55] text-[var(--color-ink-soft)]">{s.body}</p>
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
    <section className="container py-20 md:py-28">
      <div className="grid items-end gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="eyebrow eyebrow--leaf">Tool</div>
          {title && (
            <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.025em]">
              {title}
            </h2>
          )}
          {intro && (
            <p className="mt-5 max-w-xl text-[1.05rem] leading-[1.6] text-[var(--color-ink-soft)]">
              {intro}
            </p>
          )}
        </div>
      </div>
      <div className="mt-10">
        <CalculatorBlockClient defaults={defaults} />
      </div>
      {disclaimer && (
        <p className="mt-5 max-w-2xl text-[0.85rem] leading-relaxed text-[var(--color-ink-mute)]">
          {disclaimer}
        </p>
      )}
    </section>
  )
}

/* ---------- LoanProgramsList ---------- */

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
  return (
    <section className="container py-20 md:py-28">
      <div className="grid items-end gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="eyebrow eyebrow--leaf">Programs</div>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            {title}
          </h2>
          {intro && (
            <p className="mt-5 max-w-xl text-[1.05rem] leading-[1.6] text-[var(--color-ink-soft)]">
              {intro}
            </p>
          )}
        </div>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {docs.map((p: any) => (
          <Link
            key={p.id}
            href={`/${locale}/loan-programs/${p.slug}`}
            className="card card-hover group p-6 flex flex-col"
          >
            <div className="grid h-12 w-12 place-items-center rounded-full bg-[var(--color-leaf-tint)] text-[var(--color-leaf-deep)]">
              <Icon name={p.iconKey} className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-[1.4rem] font-bold tracking-[-0.015em]">{p.name}</h3>
            {p.tagline && (
              <p className="mt-2 text-[0.9rem] leading-[1.55] text-[var(--color-ink-soft)]">
                {p.tagline}
              </p>
            )}
            <span className="mt-auto pt-6 inline-flex items-center gap-1 text-[0.88rem] font-medium text-[var(--color-leaf-deep)] transition-all group-hover:gap-2">
              Learn more <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ---------- AudienceGrid ---------- */

function AudienceGridBlock({ block, locale }: any) {
  const { title = 'Whoever you are, there is a path forward', audiences } = block
  return (
    <section className="bg-[var(--color-canvas-soft)]">
      <div className="container py-20 md:py-28">
        <div className="eyebrow eyebrow--leaf">Audiences</div>
        <h2 className="mt-4 max-w-3xl text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.025em]">
          {title}
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3 lg:grid-cols-5">
          {(audiences ?? []).map((a: any, i: number) => (
            <Link
              key={i}
              href={localeHref(locale, a.href)}
              className="card card-hover group p-6"
            >
              <div className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-leaf-tint)] text-[var(--color-leaf-deep)]">
                <Icon name={a.iconKey} className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-[1.05rem] font-semibold tracking-[-0.01em]">{a.label}</h3>
              {a.body && (
                <p className="mt-2 text-[0.88rem] leading-[1.55] text-[var(--color-ink-soft)]">
                  {a.body}
                </p>
              )}
              <span className="mt-4 inline-flex items-center gap-1 text-[0.85rem] font-medium text-[var(--color-leaf-deep)] transition-all group-hover:gap-2">
                Learn more <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
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
    <section className="container py-20 md:py-28">
      <div className="eyebrow eyebrow--leaf">Reviews</div>
      <h2 className="mt-4 max-w-3xl text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.025em]">
        {title}
      </h2>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {docs.map((r: any) => (
          <figure key={r.id} className="card p-6">
            <div className="flex gap-0.5 text-[var(--color-leaf-deep)]">
              {Array.from({ length: r.rating ?? 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[var(--color-leaf)] stroke-[var(--color-leaf-deep)]" strokeWidth={1.5} />
              ))}
            </div>
            <blockquote className="mt-4 text-[1.05rem] leading-[1.55] text-[var(--color-ink)]">
              “{r.quote}”
            </blockquote>
            <figcaption className="mt-5 border-t border-[var(--color-line)] pt-4">
              <div className="text-[0.92rem] font-semibold">{r.authorName}</div>
              {r.authorContext && (
                <div className="text-[0.82rem] text-[var(--color-ink-mute)]">{r.authorContext}</div>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

/* ---------- Guarantee ---------- */

function GuaranteeBlock({ block }: any) {
  const { title, body, seal } = block
  return (
    <section className="container py-20 md:py-28">
      <div className="card grid gap-10 p-10 md:grid-cols-[1fr_auto] md:items-center md:p-14">
        <div>
          <div className="eyebrow eyebrow--leaf">Promise</div>
          {title && (
            <h2 className="mt-4 text-[clamp(2rem,3.5vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.025em]">
              {title}
            </h2>
          )}
          {body && (
            <div className="mt-5 max-w-xl text-[1.05rem] leading-[1.65] text-[var(--color-ink-soft)]">
              <RichText data={body as any} />
            </div>
          )}
        </div>
        {seal?.label && (
          <div className="grid h-44 w-44 place-items-center rounded-full bg-[var(--color-leaf-tint)] text-center">
            <div>
              <div className="text-[1.4rem] font-bold leading-tight text-[var(--color-leaf-deep)]">
                {seal.label}
              </div>
              {seal.sub && (
                <div className="mt-1 text-[0.78rem] font-medium uppercase tracking-[0.06em] text-[var(--color-ink-soft)]">
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
  return (
    <section className="container py-20 md:py-28">
      <div className="grid items-start gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="eyebrow eyebrow--leaf">Founder</div>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            {headline}
          </h2>
          {bio && (
            <div className="mt-6 max-w-xl text-[1.05rem] leading-[1.7] text-[var(--color-ink-soft)] [&_p]:mb-4">
              <RichText data={bio as any} />
            </div>
          )}
          {credentials?.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {credentials.map((c: any, i: number) => (
                <li
                  key={i}
                  className="rounded-full border border-[var(--color-line)] bg-[var(--color-canvas-soft)] px-3 py-1.5 text-[0.82rem] font-medium text-[var(--color-ink-soft)]"
                >
                  {c.text}
                </li>
              ))}
            </ul>
          )}
          {nmls && (
            <div className="mt-6 text-[0.85rem] tabular text-[var(--color-ink-mute)]">
              NMLS {nmls}
            </div>
          )}
        </div>

        <div className="md:col-span-5">
          {image?.url ? (
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src={image.url}
                alt={image.alt ?? 'Founder portrait'}
                fill
                sizes="(min-width: 768px) 35vw, 90vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-leaf-tint)] via-[#FFF6E0] to-[#FFE2CC]">
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-[6rem] font-bold text-[var(--color-leaf-deep)]/85">JR</div>
              </div>
              <div className="absolute inset-x-0 bottom-0 border-t border-white/40 bg-white/70 px-6 py-4 backdrop-blur-md">
                <div className="text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-[var(--color-ink-soft)]">
                  Jexayra Rivera
                </div>
                <div className="mt-0.5 text-[0.82rem] text-[var(--color-ink-mute)]">
                  Founder · NMLS {nmls || '1631454'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* ---------- Bilingual ---------- */

function BilingualBlock({ block, locale }: any) {
  const { headline, body } = block
  const other = locale === 'en' ? 'es' : 'en'
  return (
    <section className="container py-20 md:py-24">
      <div
        className="card overflow-hidden p-10 md:p-16"
        style={{
          background:
            'linear-gradient(135deg, var(--color-leaf-tint) 0%, #FFF6E0 100%)',
          borderColor: 'transparent',
        }}
      >
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-leaf-deep)]/20 bg-white/60 px-3 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-[var(--color-leaf-deep)] backdrop-blur">
              <Globe className="h-3.5 w-3.5" strokeWidth={2} />
              {other.toUpperCase()}
            </div>
          </div>
          <div className="md:col-span-9 md:col-start-4">
            {headline && (
              <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-[1.1] tracking-[-0.025em] text-[var(--color-ink)]">
                {headline}
              </h2>
            )}
            {body && (
              <div className="mt-5 max-w-2xl text-[1.05rem] leading-[1.65] text-[var(--color-ink-soft)] [&_p]:mb-3">
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
    <section className="container py-20 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="eyebrow eyebrow--leaf">Journal</div>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.025em]">
            {title}
          </h2>
        </div>
        <Link
          href={`/${locale}`}
          className="btn-text"
        >
          All articles <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
        </Link>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {docs.map((p: any) => (
          <Link
            key={p.id}
            href={`/${locale}/posts/${p.slug}`}
            className="card card-hover group flex flex-col overflow-hidden"
          >
            <div className="aspect-[16/9] bg-gradient-to-br from-[var(--color-leaf-tint)] to-[#FFF6E0]" />
            <div className="flex flex-1 flex-col p-6">
              <div className="text-[0.78rem] font-semibold uppercase tracking-[0.05em] text-[var(--color-ink-mute)]">
                Article
              </div>
              <h3 className="mt-2 text-[1.1rem] font-semibold leading-[1.3] tracking-[-0.01em]">
                {p.title}
              </h3>
              {p.meta?.description && (
                <p className="mt-3 text-[0.92rem] leading-[1.55] text-[var(--color-ink-soft)] line-clamp-3">
                  {p.meta.description}
                </p>
              )}
              <span className="mt-auto pt-5 inline-flex items-center gap-1 text-[0.88rem] font-medium text-[var(--color-leaf-deep)] transition-all group-hover:gap-2">
                Read <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
            </div>
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
    <section className="container py-20 md:py-28">
      <div className="grid items-start gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-24">
            <div className="eyebrow eyebrow--leaf">FAQ</div>
            <h2 className="mt-4 text-[clamp(2rem,3.5vw,2.6rem)] font-bold tracking-[-0.025em]">
              {title}
            </h2>
            <p className="mt-4 text-[0.95rem] leading-[1.6] text-[var(--color-ink-mute)]">
              Don&rsquo;t see your question? Book a free planning session — we&rsquo;ll
              answer it together.
            </p>
          </div>
        </div>
        <div className="md:col-span-8">
          <ul className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
            {docs.map((f: any) => (
              <li key={f.id}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[1.02rem] font-medium tracking-[-0.005em] transition-colors hover:text-[var(--color-leaf-deep)]">
                    <span>{f.question}</span>
                    <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full border border-[var(--color-line)] text-[var(--color-ink-soft)] transition-all group-open:rotate-45 group-open:border-[var(--color-leaf)] group-open:bg-[var(--color-leaf)] group-open:text-[var(--color-ink)]">
                      <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden>
                        <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <div className="prose prose-neutral max-w-none pb-5 pr-14 text-[0.98rem] leading-[1.65] text-[var(--color-ink-soft)] [&_p]:mb-3">
                    <RichText data={f.answer as any} />
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ---------- FinalCta ---------- */

function FinalCtaBlock({ block, locale }: any) {
  const { eyebrow, headline = 'Ready when you are.', body, primaryCta, secondaryCta } = block
  return (
    <section className="container py-20 md:py-28">
      <div
        className="relative overflow-hidden rounded-3xl bg-[var(--color-ink)] p-10 text-[var(--color-canvas)] md:p-20"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-50"
          style={{
            background:
              'radial-gradient(circle at 80% 20%, rgba(131, 195, 64, 0.18), transparent 50%), radial-gradient(circle at 10% 90%, rgba(226, 107, 59, 0.12), transparent 50%)',
          }}
        />
        <div className="relative max-w-3xl">
          {eyebrow && (
            <div className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[var(--color-leaf)]">
              {eyebrow}
            </div>
          )}
          <h2 className="mt-4 text-[clamp(2.4rem,5.5vw,4.4rem)] font-bold leading-[1.02] tracking-[-0.03em]">
            {headline}
          </h2>
          {body && (
            <p className="mt-6 max-w-xl text-[1.1rem] leading-[1.6] text-[var(--color-line)]">
              {body}
            </p>
          )}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {primaryCta?.label && (
              <Link href={localeHref(locale, primaryCta.href)} className="btn-primary">
                {primaryCta.label}
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            )}
            {secondaryCta?.label && (
              <Link
                href={localeHref(locale, secondaryCta.href)}
                className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-[var(--color-line)] transition-all hover:text-[var(--color-canvas)] hover:gap-3"
              >
                {secondaryCta.label.replace(/^or\s+/i, '')}
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- RichText ---------- */

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
        className={`mx-auto ${widthCls} prose prose-neutral text-[1.05rem] leading-[1.75]
          prose-headings:font-display prose-headings:tracking-[-0.025em] prose-headings:font-semibold
          prose-h2:text-[clamp(1.6rem,3vw,2.4rem)] prose-h3:text-[1.4rem]
          prose-a:text-[var(--color-leaf-deep)] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-[var(--color-ink)]`}
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
    <section className="container py-20 md:py-28">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="eyebrow eyebrow--leaf">Get started</div>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.025em]">
            {headline}
          </h2>
          {intro && (
            <p className="mt-5 max-w-md text-[1.05rem] leading-[1.6] text-[var(--color-ink-soft)]">
              {intro}
            </p>
          )}
          <ul className="mt-8 space-y-3">
            {[
              'Free 15-minute conversation',
              'Pre-approval inside 24 hours',
              'Service in English or Spanish',
              'No credit pull, no obligation',
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-3 text-[0.98rem] text-[var(--color-ink-soft)]">
                <span className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-[var(--color-leaf-tint)] text-[var(--color-leaf-deep)]">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <div className="card p-7 md:p-9">
            <FormSubmitter form={formDoc} />
          </div>
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
                className="container py-6 text-[0.82rem] text-[var(--color-ink-mute)]"
              >
                — Unknown block: {b.blockType}
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
