import Link from 'next/link'
import type { Locale } from '@/lib/locale'

type Header = any
type Footer = any
type Settings = any

/* ---------- Topbar — thin masthead ---------- */

export function StartTopbar({
  header,
  settings,
  locale,
}: {
  header: Header
  settings: Settings
  locale: Locale
}) {
  const other = locale === 'en' ? 'es' : 'en'
  return (
    <div className="border-b border-[var(--color-hairline)]">
      <div className="container flex items-center justify-between gap-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-ink-soft)]">
        <a
          href={`tel:${settings?.business?.phoneE164 || '+16892103448'}`}
          className="link-underline tabular-nums"
        >
          {header?.utility?.phoneLabel || 'Call'}
          <span className="mx-1.5 text-[var(--color-leaf-deep)]">·</span>
          <span className="font-medium normal-case tracking-normal">
            {settings?.business?.phone || '(689) 210-3448'}
          </span>
        </a>
        <div className="hidden items-center gap-5 md:flex">
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-leaf)]" />
            {header?.utility?.languageBadge || 'Hablo Español'}
          </span>
          <span className="text-[var(--color-ink-mute)]">
            NMLS {settings?.business?.nmls?.broker || '2821608'}
          </span>
        </div>
        <Link href={`/${other}`} className="link-underline">
          <span className="text-[var(--color-leaf-deep)]">{other === 'es' ? 'En español' : 'In English'}</span>
        </Link>
      </div>
    </div>
  )
}

/* ---------- Nav — wordmark + center links + italic CTA ---------- */

export function StartNav({ header, locale }: { header: Header; locale: Locale }) {
  const items: any[] = header?.navItems ?? defaultNav(locale)
  const cta =
    header?.cta ?? {
      label: locale === 'es' ? 'Reserva una sesión' : 'Book a planning session',
      href: '/planning-session',
    }
  return (
    <nav className="border-b border-[var(--color-hairline)] bg-[var(--color-paper)]/80 backdrop-blur-[2px]">
      <div className="container grid grid-cols-[auto_1fr_auto] items-center gap-8 py-5">
        <Link href={`/${locale}`} className="flex items-baseline gap-2">
          <span className="font-display text-[1.45rem] tracking-[-0.02em] font-medium leading-none">
            START
          </span>
          <span className="font-display italic text-[1.05rem] text-[var(--color-leaf-deep)] leading-none">
            mortgage
          </span>
        </Link>
        <ul className="hidden items-center justify-center gap-7 lg:flex">
          {items.map((it: any, i: number) => (
            <li key={i}>
              <Link
                href={it.href ? `/${locale}${it.href}` : '#'}
                className="link-leaf font-sans text-[0.92rem] tracking-[0.005em] text-[var(--color-ink)]"
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
        {cta?.label && (
          <Link
            href={`/${locale}${cta.href || '/planning-session'}`}
            className="hidden items-baseline gap-2 font-display italic text-[1rem] text-[var(--color-ink)] transition-colors hover:text-[var(--color-leaf-deep)] md:inline-flex"
          >
            <span className="not-italic font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-leaf-deep)]">
              No.
            </span>
            <span>{cta.label}</span>
            <span className="not-italic font-sans">→</span>
          </Link>
        )}
      </div>
    </nav>
  )
}

/* ---------- Footer ---------- */

export function StartFooter({ footer, settings }: { footer: Footer; settings: Settings }) {
  const cols = footer?.columns ?? defaultFooterColumns()
  const broker = settings?.business?.nmls?.broker || '2821608'
  const parent = settings?.business?.nmls?.parent || '2718409'
  const founder = settings?.business?.founderBio?.name || 'Jexayra Rivera'
  const founderNmls = settings?.business?.nmls?.founder || '1631454'
  return (
    <footer className="mt-24 border-t border-[var(--color-hairline)] bg-[var(--color-paper-deep)]">
      <div className="container py-16">
        <div className="grid items-end gap-10 md:grid-cols-[1.1fr_auto] md:gap-16">
          <div>
            <h2
              className="numeral text-[clamp(3rem,9vw,7rem)] leading-[0.85] tracking-[-0.04em]"
              style={{ fontWeight: 300 }}
            >
              START
              <span className="italic text-[var(--color-leaf-deep)]"> mortgage.</span>
            </h2>
            <p className="kicker mt-4">
              <span className="text-[var(--color-leaf-deep)]">★</span>
              <span className="ml-3">Boutique bilingual broker</span>
              <span className="mx-3 text-[var(--color-ink-mute)]">·</span>
              <span>Kissimmee, Florida</span>
            </p>
          </div>
          <div className="text-right font-mono text-xs leading-relaxed tracking-[0.02em] text-[var(--color-ink-soft)]">
            <div>{settings?.business?.address?.street || '112 N Clyde Ave'}</div>
            <div>
              {settings?.business?.address?.city || 'Kissimmee'},{' '}
              {settings?.business?.address?.region || 'FL'}{' '}
              {settings?.business?.address?.postalCode || '34741'}
            </div>
            <a
              href={`tel:${settings?.business?.phoneE164 || '+16892103448'}`}
              className="link-underline mt-2 inline-block tabular-nums"
            >
              {settings?.business?.phone || '(689) 210-3448'}
            </a>
            <div className="mt-1">
              <a
                href={`mailto:${settings?.business?.email || 'hello@startmortgage.com'}`}
                className="link-underline"
              >
                {settings?.business?.email || 'hello@startmortgage.com'}
              </a>
            </div>
          </div>
        </div>

        <hr className="rule mt-12" />

        <div className="mt-10 grid gap-10 md:grid-cols-4">
          {cols.map((col: any, i: number) => (
            <div key={i}>
              <div className="kicker">{col.heading}</div>
              <ul className="mt-4 space-y-2.5">
                {(col.links ?? []).map((l: any, j: number) => (
                  <li key={j}>
                    <Link
                      href={l.href}
                      className="link-leaf font-display italic text-[1.05rem] text-[var(--color-ink)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="rule mt-14" />

        <div className="mt-6 flex flex-col-reverse items-start justify-between gap-4 md:flex-row md:items-end">
          <p className="max-w-2xl font-mono text-[0.7rem] leading-relaxed text-[var(--color-ink-mute)]">
            Lend Labs LLC dba START Mortgage. NMLS {parent} / {broker}.
            Founder {founder} NMLS {founderNmls}.
            Equal Housing Opportunity. © {new Date().getFullYear()}.
          </p>
          <p className="font-display italic text-sm text-[var(--color-leaf-deep)]">
            The start of more.
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ---------- StickyBar ---------- */

export function StartStickyBar({
  settings,
  locale,
}: {
  settings: Settings
  locale: Locale
}) {
  if (settings?.toggles?.showStickyBar === false) return null
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-hairline)] bg-[var(--color-paper)]/95 backdrop-blur-md md:hidden">
      <div className="container flex items-center justify-between gap-3 py-3">
        <a
          href={`tel:${settings?.business?.phoneE164 || '+16892103448'}`}
          className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-ink-soft)]"
        >
          Call <span className="text-[var(--color-leaf-deep)]">·</span>{' '}
          <span className="font-medium normal-case tracking-normal">
            {settings?.business?.phone || '(689) 210-3448'}
          </span>
        </a>
        <Link
          href={`/${locale}/planning-session`}
          className="font-display italic text-[0.95rem] text-[var(--color-ink)]"
        >
          {locale === 'es' ? 'Reserva' : 'Book'} →
        </Link>
      </div>
    </div>
  )
}

function defaultNav(locale: Locale) {
  return locale === 'es'
    ? [
        { label: 'Cómo funciona', href: '/como-funciona' },
        { label: 'Pre-aprobación', href: '/pre-aprobacion' },
        { label: 'Sesión de planificación', href: '/sesion-de-planificacion' },
      ]
    : [
        { label: 'How it works', href: '/how-it-works' },
        { label: 'Loan programs', href: '/loan-programs' },
        { label: 'Pre-approval', href: '/pre-approval' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ]
}

function defaultFooterColumns() {
  return [
    {
      heading: 'Get started',
      links: [
        { label: 'Book a planning session', href: '/en/planning-session' },
        { label: 'Get pre-approved', href: '/en/pre-approval' },
        { label: 'How it works', href: '/en/how-it-works' },
      ],
    },
    {
      heading: 'Loan programs',
      links: [
        { label: 'Conventional', href: '/en/loan-programs/conventional' },
        { label: 'FHA', href: '/en/loan-programs/fha' },
        { label: 'VA', href: '/en/loan-programs/va' },
        { label: 'USDA', href: '/en/loan-programs/usda' },
      ],
    },
    {
      heading: 'About',
      links: [
        { label: 'Meet Jexayra', href: '/en/about' },
        { label: 'Reviews', href: '/en/reviews' },
        { label: 'Contact', href: '/en/contact' },
        { label: 'Realtor partners', href: '/en/realtors' },
      ],
    },
    {
      heading: 'En español',
      links: [
        { label: 'Inicio', href: '/es' },
        { label: 'Cómo funciona', href: '/es/como-funciona' },
        { label: 'Sesión de planificación', href: '/es/sesion-de-planificacion' },
      ],
    },
  ]
}
