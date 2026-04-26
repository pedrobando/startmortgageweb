import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/lib/locale'

type Header = any
type Footer = any
type Settings = any

export function StartTopbar({ header, settings, locale }: { header: Header; settings: Settings; locale: Locale }) {
  const other = locale === 'en' ? 'es' : 'en'
  return (
    <div className="bg-zinc-900 text-white text-xs">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between gap-4">
        <a
          href={header?.utility?.phoneHref || `tel:${settings?.business?.phoneE164 || '+16892103448'}`}
          className="flex items-center gap-2 hover:text-[var(--accent)]"
        >
          <span aria-hidden>📞</span>
          <span>{header?.utility?.phoneLabel || 'Call us'}</span>
          <span className="font-medium">{settings?.business?.phone || '(689) 210-3448'}</span>
        </a>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline">{header?.utility?.languageBadge || 'Hablo Español'}</span>
          <span className="hidden sm:inline opacity-70">
            NMLS# {settings?.business?.nmls?.broker || '2821608'}
          </span>
          <Link href={`/${other}`} className="font-semibold hover:text-[var(--accent)]">
            {other.toUpperCase()}
          </Link>
        </div>
      </div>
    </div>
  )
}

export function StartNav({ header, locale }: { header: Header; locale: Locale }) {
  const items: any[] = header?.navItems ?? defaultNav(locale)
  const cta = header?.cta ?? { label: locale === 'es' ? 'Reserva tu sesión' : 'Book Planning Session', href: '/planning-session' }
  return (
    <nav className="bg-white border-b border-zinc-200">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between gap-6">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image src="/brand/logo-wordmark-black.png" alt="START Mortgage" width={160} height={40} priority />
        </Link>
        <ul className="hidden md:flex items-center gap-8">
          {items.map((it: any, i: number) => (
            <li key={i}>
              <Link
                href={it.href ? `/${locale}${it.href}` : '#'}
                className="text-sm font-medium hover:text-[var(--accent)]"
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
        {cta?.label && (
          <Link
            href={`/${locale}${cta.href || '/planning-session'}`}
            className="hidden md:inline-flex items-center gap-2 bg-[var(--accent)] hover:opacity-90 text-white font-semibold rounded-full px-5 py-2.5 text-sm"
          >
            {cta.label}
          </Link>
        )}
      </div>
    </nav>
  )
}

export function StartFooter({ footer, settings }: { footer: Footer; settings: Settings }) {
  const cols = footer?.columns ?? []
  return (
    <footer className="bg-zinc-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 md:grid-cols-4">
        <div className="space-y-4">
          <Image src="/brand/logo-wordmark-white.png" alt="START Mortgage" width={160} height={40} />
          <p className="text-sm opacity-80">Boutique bilingual mortgage brokerage. Central Florida.</p>
          <p className="text-xs opacity-60">
            {footer?.disclosure ||
              `Lend Labs LLC dba START Mortgage NMLS# ${settings?.business?.nmls?.broker || '2821608'}. Equal Housing Opportunity.`}
          </p>
        </div>
        {cols.map((col: any, i: number) => (
          <div key={i}>
            <div className="font-semibold mb-3">{col.heading}</div>
            <ul className="space-y-2 text-sm">
              {(col.links ?? []).map((l: any, j: number) => (
                <li key={j}>
                  <Link href={l.href} className="opacity-80 hover:opacity-100 hover:text-[var(--accent)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 text-xs opacity-60">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} START Mortgage.</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export function StartStickyBar({
  settings,
  locale,
}: {
  settings: Settings
  locale: Locale
}) {
  if (settings?.toggles?.showStickyBar === false) return null
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden bg-white border-t border-zinc-200 p-3 flex gap-2">
      <a
        href={`tel:${settings?.business?.phoneE164 || '+16892103448'}`}
        className="flex-1 text-center bg-zinc-100 rounded-full py-3 font-medium"
      >
        {settings?.business?.phone || '(689) 210-3448'}
      </a>
      <Link
        href={`/${locale}/planning-session`}
        className="flex-1 text-center bg-[var(--accent)] text-white rounded-full py-3 font-semibold"
      >
        {locale === 'es' ? 'Reserva' : 'Book'}
      </Link>
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
