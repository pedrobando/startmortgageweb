import Link from 'next/link'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import {
  Home, Flag, Flame, Tractor, Building, ShieldCheck, Scale, Wallet, Clock, Users,
  Search, BadgeCheck, Sparkles, Handshake, ChartLine, Headphones, Globe, Briefcase, Heart,
} from 'lucide-react'

import type { Locale } from '@/lib/locale'
import { payloadClient } from '@/lib/payload'
import { CalculatorBlockClient } from '@/components/calculator/CalculatorBlockClient'
import { FormSubmitter } from '@/components/forms/FormSubmitter'

const iconMap: Record<string, any> = {
  home: Home, flag: Flag, flame: Flame, tractor: Tractor, building: Building,
  'shield-check': ShieldCheck, scale: Scale, wallet: Wallet, clock: Clock, users: Users,
  search: Search, 'badge-check': BadgeCheck, sparkles: Sparkles, handshake: Handshake,
  chart: ChartLine, headphones: Headphones, globe: Globe, briefcase: Briefcase, heart: Heart,
}

function Icon({ name, className }: { name?: string; className?: string }) {
  const Cmp = (name && iconMap[name]) || Sparkles
  return <Cmp className={className ?? 'w-6 h-6'} />
}

function localeHref(locale: Locale, href?: string | null) {
  if (!href) return `/${locale}`
  if (/^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')) return href
  if (href.startsWith('/')) return `/${locale}${href}`
  return `/${locale}/${href}`
}

function ButtonLink({ locale, href, children, primary }: any) {
  const base = primary
    ? 'bg-[var(--accent)] hover:opacity-90 text-white font-semibold rounded-full px-7 py-3.5 inline-flex items-center'
    : 'border border-zinc-300 hover:border-zinc-900 rounded-full px-7 py-3.5 font-semibold inline-flex items-center'
  return <Link href={localeHref(locale, href)} className={base}>{children}</Link>
}

// ---- block renderers -------------------------------------------------------

function HeroBlock({ block, locale }: any) {
  const { eyebrow, headline, subheadline, primaryCta, secondaryCta, image, proofPoints } = block
  return (
    <section className="bg-gradient-to-b from-zinc-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid gap-10 md:grid-cols-2 items-center">
        <div>
          {eyebrow && <div className="text-[var(--accent)] font-semibold uppercase tracking-wide text-xs mb-3">{eyebrow}</div>}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">{headline}</h1>
          {subheadline && <p className="mt-5 text-lg md:text-xl text-zinc-600 max-w-xl">{subheadline}</p>}
          <div className="mt-7 flex flex-wrap gap-3">
            {primaryCta?.label && <ButtonLink locale={locale} href={primaryCta.href} primary>{primaryCta.label}</ButtonLink>}
            {secondaryCta?.label && <ButtonLink locale={locale} href={secondaryCta.href}>{secondaryCta.label}</ButtonLink>}
          </div>
          {proofPoints?.length > 0 && (
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              {proofPoints.map((p: any, i: number) => (
                <div key={i}>
                  <div className="text-2xl font-bold">{p.value}</div>
                  <div className="text-xs text-zinc-600">{p.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        {image?.url && (
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image src={image.url} alt={image.alt ?? ''} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  )
}

async function MarqueeBlock({ block, locale }: any) {
  const { mode, items, speed = 30 } = block
  let texts: string[] = []
  if (mode === 'manual' && items?.length) {
    texts = items.map((i: any) => i.text)
  } else {
    const payload = await payloadClient()
    const res = await payload.find({
      collection: 'reviews',
      where: { featured: { equals: true } },
      limit: 12,
      locale,
    })
    texts = res.docs.map((r: any) => `"${r.quote}" — ${r.authorName}`)
  }
  if (!texts.length) return null
  const doubled = [...texts, ...texts]
  return (
    <div className="bg-[var(--accent)] text-white overflow-hidden py-3">
      <div
        className="flex gap-12 whitespace-nowrap animate-[start-marquee_30s_linear_infinite]"
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((t, i) => (
          <span key={i} className="text-sm font-medium">★ {t}</span>
        ))}
      </div>
    </div>
  )
}

function WhyBrokerBlock({ block }: any) {
  const { title, intro, points } = block
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        {title && <h2 className="text-3xl md:text-4xl font-bold text-center">{title}</h2>}
        {intro && (
          <div className="mt-4 max-w-2xl mx-auto text-center text-zinc-600 prose prose-neutral">
            <RichText data={intro as any} />
          </div>
        )}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {(points ?? []).map((p: any, i: number) => (
            <div key={i} className="rounded-2xl border border-zinc-200 p-6 hover:border-[var(--accent)] transition">
              <div className="w-12 h-12 rounded-full bg-[#E8F4D8] flex items-center justify-center text-[var(--accent)]">
                <Icon name={p.iconKey} />
              </div>
              <div className="mt-4 font-semibold text-lg">{p.title}</div>
              <p className="mt-2 text-zinc-600">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function OfferBlock({ block, locale }: any) {
  const { title, body, bullets, cta, darkMode } = block
  return (
    <section className={darkMode ? 'bg-zinc-900 text-white py-20' : 'bg-zinc-50 py-20'}>
      <div className="mx-auto max-w-7xl px-4 grid gap-10 md:grid-cols-2 items-start">
        <div>
          {title && <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>}
          {body && <div className="mt-4 prose prose-neutral max-w-none"><RichText data={body as any} /></div>}
        </div>
        <div>
          <ul className="space-y-3">
            {(bullets ?? []).map((b: any, i: number) => (
              <li key={i} className="flex gap-3">
                <span className="text-[var(--accent)]">✓</span>{b.text}
              </li>
            ))}
          </ul>
          {cta?.label && (
            <div className="mt-6">
              <ButtonLink locale={locale} href={cta.href} primary>{cta.label}</ButtonLink>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function VersusTableBlock({ block }: any) {
  const { title, columns, rows, footnote } = block
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        {title && <h2 className="text-3xl md:text-4xl font-bold text-center">{title}</h2>}
        <div className="mt-10 overflow-x-auto rounded-2xl border border-zinc-200">
          <table className="w-full text-left">
            <thead className="bg-zinc-50">
              <tr>
                <th className="p-4"></th>
                {(columns ?? []).map((c: any, i: number) => (
                  <th key={i} className="p-4 font-semibold">{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(rows ?? []).map((r: any, i: number) => (
                <tr key={i} className="border-t border-zinc-200">
                  <td className="p-4 font-medium">{r.label}</td>
                  {(r.values ?? []).map((v: any, j: number) => (
                    <td key={j} className="p-4 text-zinc-600">{v.text}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {footnote && <p className="mt-3 text-xs text-zinc-600">{footnote}</p>}
      </div>
    </section>
  )
}

function ProcessBlock({ block }: any) {
  const { title, steps } = block
  return (
    <section className="py-20 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4">
        {title && <h2 className="text-3xl md:text-4xl font-bold text-center">{title}</h2>}
        <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {(steps ?? []).map((s: any, i: number) => (
            <li key={i} className="bg-white rounded-2xl p-6 border border-zinc-200">
              <div className="text-[var(--accent)] text-2xl font-bold">{s.number}</div>
              <div className="mt-2 font-semibold text-lg">{s.title}</div>
              <p className="mt-2 text-zinc-600 text-sm">{s.body}</p>
              {s.durationLabel && (
                <div className="mt-3 inline-flex bg-[#E8F4D8] text-[var(--accent)] text-xs font-semibold rounded-full px-2 py-1">
                  {s.durationLabel}
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function CalculatorBlock({ block }: any) {
  const { title, intro, defaults, disclaimer } = block
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-4">
        {title && <h2 className="text-3xl md:text-4xl font-bold text-center">{title}</h2>}
        {intro && <p className="mt-3 text-center text-zinc-600 max-w-2xl mx-auto">{intro}</p>}
        <div className="mt-10"><CalculatorBlockClient defaults={defaults} /></div>
        {disclaimer && <p className="mt-6 text-xs text-zinc-600 text-center max-w-2xl mx-auto">{disclaimer}</p>}
      </div>
    </section>
  )
}

async function LoanProgramsListBlock({ block, locale }: any) {
  const { title, intro, programs } = block
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
    <section className="py-20 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4">
        {title && <h2 className="text-3xl md:text-4xl font-bold text-center">{title}</h2>}
        {intro && <p className="mt-3 text-center text-zinc-600 max-w-2xl mx-auto">{intro}</p>}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {docs.map((p: any) => (
            <Link key={p.id} href={`/${locale}/loan-programs/${p.slug}`}
              className="bg-white rounded-2xl p-6 border border-zinc-200 hover:border-[var(--accent)] transition">
              <div className="w-12 h-12 rounded-full bg-[#E8F4D8] flex items-center justify-center text-[var(--accent)]">
                <Icon name={p.iconKey} />
              </div>
              <div className="mt-4 font-semibold text-lg">{p.name}</div>
              {p.tagline && <p className="mt-1 text-sm text-zinc-600">{p.tagline}</p>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function AudienceGridBlock({ block, locale }: any) {
  const { title, audiences } = block
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        {title && <h2 className="text-3xl md:text-4xl font-bold text-center">{title}</h2>}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {(audiences ?? []).map((a: any, i: number) => (
            <Link key={i} href={localeHref(locale, a.href)}
              className="rounded-2xl p-6 border border-zinc-200 hover:border-[var(--accent)] transition">
              <Icon name={a.iconKey} className="w-7 h-7 text-[var(--accent)]" />
              <div className="mt-3 font-semibold text-lg">{a.label}</div>
              {a.body && <p className="mt-1 text-sm text-zinc-600">{a.body}</p>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

async function TestimonialsBlock({ block, locale }: any) {
  const { title, mode, items } = block
  let docs: any[] = []
  const payload = await payloadClient()
  if (mode === 'manual' && items?.length) {
    const ids = (typeof items[0] === 'string' || typeof items[0] === 'number')
      ? items
      : items.map((x: any) => x.id || x)
    docs = (await payload.find({ collection: 'reviews', where: { id: { in: ids } }, limit: 12, locale })).docs
  } else {
    docs = (await payload.find({
      collection: 'reviews', where: { featured: { equals: true } }, limit: 6, locale,
    })).docs
  }
  return (
    <section className="py-20 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4">
        {title && <h2 className="text-3xl md:text-4xl font-bold text-center">{title}</h2>}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {docs.map((r: any) => (
            <div key={r.id} className="bg-white rounded-2xl p-6 border border-zinc-200">
              <div className="text-[var(--accent)]">{'★'.repeat(r.rating ?? 5)}</div>
              <p className="mt-3 italic">&ldquo;{r.quote}&rdquo;</p>
              <div className="mt-4 text-sm font-semibold">{r.authorName}</div>
              {r.authorContext && <div className="text-xs text-zinc-500">{r.authorContext}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GuaranteeBlock({ block }: any) {
  const { title, body, seal } = block
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-4 grid gap-8 md:grid-cols-[1fr_auto] items-center">
        <div>
          {title && <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>}
          {body && <div className="mt-4 prose prose-neutral max-w-none"><RichText data={body as any} /></div>}
        </div>
        {seal?.label && (
          <div className="rounded-full border-4 border-[var(--accent)] w-40 h-40 flex flex-col items-center justify-center text-center p-4">
            <div className="font-bold text-[var(--accent)] leading-tight">{seal.label}</div>
            {seal.sub && <div className="text-xs mt-1">{seal.sub}</div>}
          </div>
        )}
      </div>
    </section>
  )
}

function FounderBlock({ block }: any) {
  const { headline, bio, image, nmls, credentials } = block
  return (
    <section className="py-20 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 grid gap-10 md:grid-cols-[280px_1fr] items-center">
        {image?.url && (
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image src={image.url} alt={image.alt ?? ''} fill sizes="280px" className="object-cover" />
          </div>
        )}
        <div>
          {headline && <h2 className="text-3xl md:text-4xl font-bold">{headline}</h2>}
          {bio && <div className="mt-4 prose prose-neutral max-w-none"><RichText data={bio as any} /></div>}
          {nmls && <div className="mt-3 text-sm font-medium">NMLS# {nmls}</div>}
          {credentials?.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {credentials.map((c: any, i: number) => (
                <li key={i} className="bg-white border border-zinc-200 rounded-full px-3 py-1 text-xs">{c.text}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

function BilingualBlock({ block, locale }: any) {
  const { headline, body } = block
  const other = locale === 'en' ? 'es' : 'en'
  return (
    <section className="py-16 bg-[var(--accent)] text-white">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <div className="text-xs font-semibold uppercase tracking-wider opacity-80">{other.toUpperCase()}</div>
        {headline && <h2 className="mt-2 text-3xl md:text-4xl font-bold">{headline}</h2>}
        {body && <div className="mt-4 prose prose-invert max-w-none"><RichText data={body as any} /></div>}
      </div>
    </section>
  )
}

async function BlogTeasersBlock({ block, locale }: any) {
  const { title, mode, count = 3, posts } = block
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
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        {title && <h2 className="text-3xl md:text-4xl font-bold text-center">{title}</h2>}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {docs.map((p: any) => (
            <Link key={p.id} href={`/${locale}/posts/${p.slug}`}
              className="block bg-white rounded-2xl border border-zinc-200 hover:border-[var(--accent)] overflow-hidden transition">
              <div className="aspect-[16/9] bg-zinc-100" />
              <div className="p-5">
                <div className="font-semibold">{p.title}</div>
                {p.meta?.description && <p className="mt-2 text-sm text-zinc-600 line-clamp-3">{p.meta.description}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

async function FaqListBlock({ block, locale }: any) {
  const { title, mode, categoryFilter, items } = block
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
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4">
        {title && <h2 className="text-3xl md:text-4xl font-bold text-center">{title}</h2>}
        <div className="mt-10 divide-y divide-zinc-200">
          {docs.map((f: any) => (
            <details key={f.id} className="group py-4">
              <summary className="cursor-pointer font-medium flex items-center justify-between gap-4 list-none">
                <span>{f.question}</span>
                <span className="text-[var(--accent)] text-2xl group-open:rotate-45 transition">+</span>
              </summary>
              <div className="mt-3 text-zinc-600 prose prose-neutral max-w-none">
                <RichText data={f.answer as any} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCtaBlock({ block, locale }: any) {
  const { eyebrow, headline, body, primaryCta, secondaryCta, image } = block
  return (
    <section className="py-20 bg-zinc-900 text-white">
      <div className="mx-auto max-w-7xl px-4 grid gap-10 md:grid-cols-2 items-center">
        <div>
          {eyebrow && <div className="text-[var(--accent)] font-semibold uppercase tracking-wide text-xs mb-3">{eyebrow}</div>}
          {headline && <h2 className="text-3xl md:text-5xl font-bold">{headline}</h2>}
          {body && <p className="mt-4 opacity-90">{body}</p>}
          <div className="mt-6 flex flex-wrap gap-3">
            {primaryCta?.label && <ButtonLink locale={locale} href={primaryCta.href} primary>{primaryCta.label}</ButtonLink>}
            {secondaryCta?.label && (
              <Link href={localeHref(locale, secondaryCta.href)}
                className="border border-white/30 hover:border-white rounded-full px-7 py-3.5 font-semibold inline-flex items-center">
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
        {image?.url && (
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image src={image.url} alt={image.alt ?? ''} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  )
}

function RichTextBlock({ block }: any) {
  const { content, maxWidth = 'default' } = block
  const widthCls =
    maxWidth === 'narrow' ? 'max-w-2xl' :
    maxWidth === 'wide' ? 'max-w-5xl' :
    maxWidth === 'full' ? 'max-w-none' : 'max-w-3xl'
  if (!content) return null
  return (
    <section className="py-12">
      <div className={`mx-auto ${widthCls} px-4 prose prose-neutral`}>
        <RichText data={content as any} />
      </div>
    </section>
  )
}

async function FormEmbedBlock({ block, locale }: any) {
  const { form, headline, intro } = block
  let formDoc: any = form
  if (typeof form === 'string' || typeof form === 'number') {
    formDoc = await (await payloadClient()).findByID({ collection: 'forms', id: form, locale })
  }
  return (
    <section className="py-20">
      <div className="mx-auto max-w-2xl px-4">
        {headline && <h2 className="text-3xl md:text-4xl font-bold text-center">{headline}</h2>}
        {intro && <p className="mt-3 text-center text-zinc-600">{intro}</p>}
        <div className="mt-8 bg-white rounded-2xl border border-zinc-200 p-6">
          <FormSubmitter form={formDoc} />
        </div>
      </div>
    </section>
  )
}

// ---- dispatcher ------------------------------------------------------------

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
      {await Promise.all(blocks.map(async (b: any, i: number) => {
        const Cmp = dispatch[b.blockType]
        if (!Cmp) {
          return (
            <section key={b.id ?? i} className="py-6 bg-amber-50 text-amber-900">
              <div className="mx-auto max-w-7xl px-4 text-sm">
                Unknown block type: <code>{b.blockType}</code>
              </div>
            </section>
          )
        }
        const result = Cmp({ block: b, locale })
        return <div key={b.id ?? i}>{result instanceof Promise ? await result : result}</div>
      }))}
    </>
  )
}
