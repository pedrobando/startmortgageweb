import { NextRequest, NextResponse } from 'next/server'

const RESERVED = /^\/(api|admin|_next|favicon\.ico|brand|media|sitemap.*|robots\.txt)/

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (RESERVED.test(pathname)) return NextResponse.next()
  if (/^\/(en|es)(\/|$)/.test(pathname)) {
    const m = pathname.match(/^\/(en|es)/)
    const res = NextResponse.next()
    if (m) res.cookies.set('NEXT_LOCALE', m[1], { path: '/' })
    return res
  }
  // No locale prefix → infer from Accept-Language and redirect.
  const accept = req.headers.get('accept-language') || ''
  const first = accept.split(',')[0]?.toLowerCase() || ''
  const prefersEs = /\b(es|es-[a-z]{2})\b/i.test(first)
  const target = prefersEs ? '/es' : '/en'
  return NextResponse.redirect(new URL(target + (pathname === '/' ? '' : pathname), req.url))
}

export const config = {
  matcher: ['/((?!api|_next|admin|favicon.ico|brand|media|sitemap|robots.txt).*)'],
}
