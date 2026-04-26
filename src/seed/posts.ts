import 'server-only'
import path from 'node:path'
import fs from 'node:fs/promises'
import matter from 'gray-matter'
import type { Payload } from 'payload'
import { mdToLexical, mdToPlain } from './markdown'

const POSTS = [
  { file: 'blog-fha-vs-conventional.md',         slug: 'fha-vs-conventional' },
  { file: 'blog-first-time-buyer-mistakes.md',   slug: 'first-time-buyer-mistakes' },
  { file: 'blog-how-much-house-can-i-afford.md', slug: 'how-much-house-can-i-afford' },
  { file: 'blog-what-is-pre-approval.md',        slug: 'what-is-pre-approval' },
  { file: 'blog-what-to-expect-at-closing.md',   slug: 'what-to-expect-at-closing' },
]

function extractTitle(md: string, fallback: string): string {
  const m = md.match(/^#\s+(.*)/m)
  return (m ? m[1].trim() : fallback).slice(0, 200)
}

export async function seedPosts(payload: Payload, uploadsDir: string, report: any) {
  for (const p of POSTS) {
    const full = path.join(uploadsDir, p.file)
    let raw: string
    try {
      raw = await fs.readFile(full, 'utf8')
    } catch {
      report.skipped.push({ collection: 'posts', file: p.file, reason: 'not found' })
      continue
    }
    const { content, data: fm } = matter(raw)
    const title = (fm.title as string) || extractTitle(content, p.slug)
    const excerpt =
      (fm.excerpt as string) ||
      mdToPlain(content).split('\n').filter(Boolean).slice(1, 4).join(' ').slice(0, 240)

    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: p.slug } },
      limit: 1,
      locale: 'en',
    })
    if (existing.docs[0]) {
      report.skipped.push({ collection: 'posts', file: p.file, reason: 'exists' })
      continue
    }
    await payload.create({
      collection: 'posts',
      locale: 'en',
      data: {
        title,
        slug: p.slug,
        content: mdToLexical(content) as any,
        meta: { description: excerpt } as any,
        _status: 'published',
        publishedAt: new Date().toISOString(),
      } as any,
    })
    report.created.push({ collection: 'posts', file: p.file, slug: p.slug })
  }
}
