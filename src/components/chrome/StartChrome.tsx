import Link from 'next/link'
import type { Locale } from '@/lib/locale'

type Header = any
type Footer = any
type Settings = any

/* ---------- Topbar ---------- */

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
    <div className="hidden border-b border-[var(--color-line)] bg-[var(--color-canvas-soft)] md:block">
      <div className="container flex items-center justify-between gap-4 py-2 text-[0.78rem] text-[var(--color-ink-mute)]">
        <a
          href={`tel:${settings?.business?.phoneE164 || '+16892103448'}`}
          className="flex items-center gap-2 transition-colors hover:text-[var(--color-ink)]"
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current" aria-hidden>
            <path d="M3.65 1.5C3.93 1.18 4.32 1 4.74 1h2.13c.5 0 .92.36 1 .85l.32 1.93a1 1 0 0 1-.27.86l-1.07 1.07a11.5 11.5 0 0 0 4.4 4.4l1.07-1.07a1 1 0 0 1 .86-.27l1.93.32a1 1 0 0 1 .85 1v2.13a1.5 1.5 0 0 1-1.65 1.5C8 13.4 2.6 8 2.5 1.65A1.5 1.5 0 0 1 3.65 1.5Z" />
          </svg>
          <span className="font-medium tabular text-[var(--color-ink)]">
            {settings?.business?.phone || '(689) 210-3448'}
          </span>
        </a>
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-leaf)]" />
            {header?.utility?.languageBadge || 'Hablamos español'}
          </span>
          <span>NMLS {settings?.business?.nmls?.broker || '2821608'}</span>
          <Link
            href={`/${other}`}
            className="font-medium text-[var(--color-ink)] transition-colors hover:text-[var(--color-leaf-deep)]"
          >
            {other === 'es' ? 'Español' : 'English'} →
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ---------- Nav ---------- */

export function StartNav({ header, locale }: { header: Header; locale: Locale }) {
  const items: any[] = header?.navItems ?? defaultNav(locale)
  const cta =
    header?.cta ?? {
      label: locale === 'es' ? 'Reserva una sesión' : 'Book a session',
      href: '/planning-session',
    }
  return (
    <nav className="sticky top-0 z-30 border-b border-[var(--color-line)] bg-[var(--color-canvas)]/85 backdrop-blur">
      <div className="container flex items-center justify-between gap-8 py-4">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Logomark />
          <span className="text-[1.1rem] font-bold tracking-[-0.02em]">START</span>
          <span className="text-[1.1rem] font-medium text-[var(--color-ink-mute)] tracking-[-0.01em]">Mortgage</span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {items.map((it: any, i: number) => (
            <li key={i}>
              <Link
                href={it.href ? `/${locale}${it.href}` : '#'}
                className="text-[0.94rem] font-medium text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={`/${locale}/pre-approval`}
            className="text-[0.92rem] font-medium text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
          >
            Pre-approval
          </Link>
          {cta?.label && (
            <Link href={`/${locale}${cta.href || '/planning-session'}`} className="btn-primary">
              {cta.label}
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

function Logomark() {
  return (
    <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--color-leaf)] text-[var(--color-ink)]">
      <span className="text-[0.85rem] font-bold leading-none">S</span>
    </span>
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
    <footer className="mt-24 border-t border-[var(--color-line)] bg-[var(--color-canvas-soft)]">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2">
              <Logomark />
              <span className="text-[1.05rem] font-bold tracking-[-0.02em]">START</span>
              <span className="text-[1.05rem] font-medium text-[var(--color-ink-mute)]">Mortgage</span>
            </div>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-[1.6] text-[var(--color-ink-soft)]">
              Boutique bilingual mortgage guidance for Central Florida families.
              24-hour pre-approvals, 30+ wholesale lender partners, one person from
              first call to keys.
            </p>
            <div className="mt-6 space-y-1.5 text-[0.9rem] text-[var(--color-ink-soft)]">
              <div>{settings?.business?.address?.street || '112 N Clyde Ave'}</div>
              <div>
                {settings?.business?.address?.city || 'Kissimmee'},{' '}
                {settings?.business?.address?.region || 'FL'}{' '}
                {settings?.business?.address?.postalCode || '34741'}
              </div>
              <a
                href={`tel:${settings?.business?.phoneE164 || '+16892103448'}`}
                className="inline-block tabular text-[var(--color-ink)] transition-colors hover:text-[var(--color-leaf-deep)]"
              >
                {settings?.business?.phone || '(689) 210-3448'}
              </a>
              <div>
                <a
                  href={`mailto:${settings?.business?.email || 'hello@startmortgage.com'}`}
                  className="text-[var(--color-ink)] transition-colors hover:text-[var(--color-leaf-deep)]"
                >
                  {settings?.business?.email || 'hello@startmortgage.com'}
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-7 md:col-start-6 md:grid-cols-4">
            {cols.map((col: any, i: number) => (
              <div key={i}>
                <div className="text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-[var(--color-ink-mute)]">
                  {col.heading}
                </div>
                <ul className="mt-4 space-y-3">
                  {(col.links ?? []).map((l: any, j: number) => (
                    <li key={j}>
                      <Link
                        href={l.href}
                        className="text-[0.92rem] text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="mt-14 border-[var(--color-line)]" />

        <div className="mt-6 flex flex-col-reverse items-start justify-between gap-3 text-[0.78rem] text-[var(--color-ink-mute)] md:flex-row md:items-center">
          <p className="max-w-2xl leading-relaxed">
            Lend Labs LLC dba START Mortgage. NMLS <span className="tabular">{parent}</span>{' '}
            / <span className="tabular">{broker}</span>. Founder {founder} NMLS{' '}
            <span className="tabular">{founderNmls}</span>. Equal Housing Opportunity. ©{' '}
            <span className="tabular">{new Date().getFullYear()}</span>.
          </p>
          <p className="text-[var(--color-ink-soft)]">The start of more.</p>
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
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-line)] bg-[var(--color-canvas)]/95 backdrop-blur md:hidden">
      <div className="container flex items-center justify-between gap-3 py-3">
        <a
          href={`tel:${settings?.business?.phoneE164 || '+16892103448'}`}
          className="flex items-center gap-2 text-[0.9rem] font-medium text-[var(--color-ink)]"
        >
          <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-[var(--color-canvas-soft)]">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current" aria-hidden>
              <path d="M3.65 1.5C3.93 1.18 4.32 1 4.74 1h2.13c.5 0 .92.36 1 .85l.32 1.93a1 1 0 0 1-.27.86l-1.07 1.07a11.5 11.5 0 0 0 4.4 4.4l1.07-1.07a1 1 0 0 1 .86-.27l1.93.32a1 1 0 0 1 .85 1v2.13a1.5 1.5 0 0 1-1.65 1.5C8 13.4 2.6 8 2.5 1.65A1.5 1.5 0 0 1 3.65 1.5Z" />
            </svg>
          </span>
          <span className="tabular">{settings?.business?.phone || '(689) 210-3448'}</span>
        </a>
        <Link href={`/${locale}/planning-session`} className="btn-primary text-[0.85rem]">
          {locale === 'es' ? 'Reservar' : 'Book'}
        </Link>
      </div>
    </div>
  )
}

function defaultNav(locale: Locale) {
  return locale === 'es'
    ? [
        { label: 'Cómo funciona', href: '/como-funciona' },
        { label: 'Programas', href: '/loan-programs' },
        { label: 'Sobre nosotros', href: '/about' },
        { label: 'Contacto', href: '/contact' },
      ]
    : [
        { label: 'How it works', href: '/how-it-works' },
        { label: 'Loan programs', href: '/loan-programs' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ]
}

function defaultFooterColumns() {
  return [
    {
      heading: 'Get started',
      links: [
        { label: 'Plan a session', href: '/en/planning-session' },
        { label: 'Pre-approval', href: '/en/pre-approval' },
        { label: 'How it works', href: '/en/how-it-works' },
      ],
    },
    {
      heading: 'Programs',
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
        { label: 'Realtor partners', href: '/en/realtors' },
      ],
    },
    {
      heading: 'Español',
      links: [
        { label: 'Inicio', href: '/es' },
        { label: 'Cómo funciona', href: '/es/como-funciona' },
        { label: 'Sesión de planificación', href: '/es/sesion-de-planificacion' },
      ],
    },
  ]
}
