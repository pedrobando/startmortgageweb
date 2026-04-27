/**
 * Extracts copy out of the labeled-section markdown format used in
 * uploads/*.md. Each section body looks like:
 *
 *   **H2:**
 *   A Mortgage Broker Who Puts You First — Not a Bank...
 *
 *   **Body Copy:**
 *   Big banks push one loan...
 *
 *   Then we walk you through every detail...
 *
 *   **Primary CTA (Button):**
 *   Book Your Free Planning Session
 *   *(Links to /planning-session)*
 *
 * The functions here pull those fields back out into structured data
 * the seeder block-builders can consume.
 */

import { sanitizeMarkdown } from './sanitize'

// Two label formats coexist in the corpus:
//   "**Body Copy:**\nThe big banks ..."   (label on its own line)
//   "**H3:** Bilingual From Day One"      (label + value on one line)
const FIELD_LABEL_LINE_RE = /^\*\*([^*]+?):\s*\*\*\s*$/
const FIELD_LABEL_INLINE_RE = /^\*\*([^*]+?):\s*\*\*\s+(.+)$/

/** A label like "**H1 (Heading):**" or "**Body Copy:**". Strips parentheticals. */
function normalizeLabel(raw: string): string {
  return raw.replace(/\s*\([^)]*\)\s*/g, '').trim().toLowerCase()
}

/**
 * Returns the section body split into a map of `label → array of lines`.
 * Lines under a separate-line label accumulate until the next label;
 * an inline `**Label:** value` line stores the value as a single entry.
 */
export function extractFields(body: string): Record<string, string[]> {
  const out: Record<string, string[]> = {}
  const cleaned = sanitizeMarkdown(body)
  const lines = cleaned.split('\n')
  let current: string | null = null
  for (const ln of lines) {
    const trimmed = ln.trim()
    const inline = FIELD_LABEL_INLINE_RE.exec(trimmed)
    if (inline) {
      const label = normalizeLabel(inline[1])
      if (!out[label]) out[label] = []
      out[label].push(inline[2])
      // Inline values do NOT open a continuation — the next line either
      // starts a new label or is body text we should ignore for that field.
      current = null
      continue
    }
    const labelOnly = FIELD_LABEL_LINE_RE.exec(trimmed)
    if (labelOnly) {
      current = normalizeLabel(labelOnly[1])
      if (!out[current]) out[current] = []
      continue
    }
    if (current) out[current].push(ln)
  }
  // Trim trailing blank lines from each field
  for (const k of Object.keys(out)) {
    while (out[k].length && !out[k][out[k].length - 1].trim()) out[k].pop()
    while (out[k].length && !out[k][0].trim()) out[k].shift()
  }
  return out
}

/** Joined non-empty lines as one paragraph string. */
export function fieldText(fields: Record<string, string[]>, ...labels: string[]): string {
  for (const l of labels) {
    const v = fields[l]
    if (!v || !v.length) continue
    const text = v.join('\n').trim()
    if (text) return text
  }
  return ''
}

/** Field as raw markdown (preserves line breaks for richText conversion). */
export function fieldMarkdown(fields: Record<string, string[]>, ...labels: string[]): string {
  for (const l of labels) {
    const v = fields[l]
    if (!v || !v.length) continue
    const text = v.join('\n').trim()
    if (text) return text
  }
  return ''
}

/**
 * "Book Your Free Planning Session\n*(Links to /planning-session)*" → { label, href }
 */
export function fieldCta(fields: Record<string, string[]>, ...labels: string[]): { label: string; href?: string } | null {
  for (const l of labels) {
    const v = fields[l]
    if (!v || !v.length) continue
    let label = ''
    let href: string | undefined
    for (const ln of v) {
      const m = ln.match(/^\*\(\s*Links?\s+to\s+([^)]+?)\s*\)\*\s*$/i)
      if (m) {
        href = m[1].trim()
        // Drop trailing "(will update to /es/...)" style notes
        href = href.split(/—|\s+\(/)[0].trim()
        if (!href.startsWith('/') && !/^https?:/.test(href)) href = '/' + href
      } else if (ln.trim()) {
        label += (label ? ' ' : '') + ln.trim()
      }
    }
    label = label.replace(/\s+/g, ' ').trim()
    if (label) return { label, href }
  }
  return null
}

/** Bulleted list lines `- item` or `* item` parsed as plain strings. */
export function fieldBullets(fields: Record<string, string[]>, ...labels: string[]): string[] {
  for (const l of labels) {
    const v = fields[l]
    if (!v || !v.length) continue
    const out: string[] = []
    for (const ln of v) {
      const m = ln.match(/^\s*[-*]\s+(.*)/)
      if (m) out.push(m[1].trim())
    }
    if (out.length) return out
  }
  return []
}

/** Parse a markdown pipe-table directly under the section. */
export function parseTable(body: string): { headers: string[]; rows: string[][] } | null {
  const lines = body.split('\n').filter(l => l.trim().startsWith('|'))
  if (lines.length < 2) return null
  // Drop the alignment row (dashes only)
  const trimCells = (l: string) =>
    l.split('|').slice(1, -1).map(c => c.trim())
  const headers = trimCells(lines[0])
  const rows: string[][] = []
  for (const ln of lines.slice(1)) {
    const cells = trimCells(ln)
    if (cells.every(c => /^[-:\s]+$/.test(c))) continue
    rows.push(cells)
  }
  return { headers, rows }
}

/**
 * Extracts each `**Card N:**` sub-block (with its own labels) from a
 * section body. Returns an array of field-maps, one per card.
 */
export function extractCards(body: string): Record<string, string[]>[] {
  const cleaned = sanitizeMarkdown(body)
  const cardRe = /^\*\*Card\s+\d+\s*:?\s*\*\*\s*$/i
  const lines = cleaned.split('\n')
  const cards: string[][] = []
  let current: string[] | null = null
  for (const ln of lines) {
    if (cardRe.test(ln.trim())) {
      if (current) cards.push(current)
      current = []
      continue
    }
    if (current) current.push(ln)
  }
  if (current) cards.push(current)
  return cards.map(c => extractFields(c.join('\n')))
}
