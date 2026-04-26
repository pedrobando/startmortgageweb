import type { MetadataRoute } from 'next'
import { payloadClient } from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const payload = await payloadClient()
  const out: MetadataRoute.Sitemap = []

  for (const locale of ['en', 'es'] as const) {
    const [pages, posts, programs] = await Promise.all([
      payload.find({
        collection: 'pages',
        where: { and: [{ locale: { equals: locale } }, { _status: { equals: 'published' } }] },
        limit: 500,
        pagination: false,
        depth: 0,
        select: { slug: true, localizationKey: true, updatedAt: true } as any,
      }),
      payload.find({
        collection: 'posts',
        where: { _status: { equals: 'published' } },
        limit: 500,
        pagination: false,
        depth: 0,
        locale,
        select: { slug: true, updatedAt: true } as any,
      }),
      payload.find({
        collection: 'loan-programs',
        limit: 100,
        pagination: false,
        depth: 0,
        locale,
        select: { slug: true, updatedAt: true } as any,
      }),
    ])

    for (const p of pages.docs as any[]) {
      const path = p.localizationKey === 'home' ? '' : `/${p.slug}`
      out.push({ url: `${origin}/${locale}${path}`, lastModified: p.updatedAt })
    }
    for (const p of posts.docs as any[]) {
      out.push({ url: `${origin}/${locale}/posts/${p.slug}`, lastModified: p.updatedAt })
    }
    for (const lp of programs.docs as any[]) {
      out.push({ url: `${origin}/${locale}/loan-programs/${lp.slug}`, lastModified: lp.updatedAt })
    }
  }

  return out
}
