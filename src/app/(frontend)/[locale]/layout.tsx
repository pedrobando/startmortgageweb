import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/locale'
import { payloadClient } from '@/lib/payload'
import { StartTopbar, StartNav, StartFooter, StartStickyBar } from '@/components/chrome/StartChrome'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildLocalBusiness, buildWebsite, jsonLdGraph } from '@/lib/seo'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const payload = await payloadClient()
  const [header, footer, settings] = await Promise.all([
    payload.findGlobal({ slug: 'header', locale }).catch(() => null),
    payload.findGlobal({ slug: 'footer', locale }).catch(() => null),
    payload.findGlobal({ slug: 'site-settings', locale }).catch(() => null),
  ])
  const origin = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  return (
    <>
      <JsonLd data={jsonLdGraph(origin, [buildLocalBusiness(settings, origin), buildWebsite(origin)])} />
      <StartTopbar header={header} settings={settings} locale={locale} />
      <StartNav header={header} locale={locale} />
      <main>{children}</main>
      <StartFooter footer={footer} settings={settings} />
      <StartStickyBar settings={settings} locale={locale} />
    </>
  )
}
