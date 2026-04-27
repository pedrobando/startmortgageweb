/**
 * Strips authoring-tool metadata from a Markdown body before it is fed
 * into the seeder. The source files in /uploads were originally written
 * as authoring spec docs against another stack — we only want the
 * user-facing copy from them, never the SEO config / schema markup /
 * layout notes / linking maps / build notes that those docs also carry.
 */

const FORBIDDEN_HEADING_PATTERNS = [
  /\brankmath\b/i,
  /\belementor\b/i,
  /\bwordpress\b/i,
  /\byoast\b/i,
  /^seo\s+settings?/i,
  /^schema\s+markup/i,
  /^json[-\s]?ld/i,
  /^internal\s+linking/i,
  /^outbound\s+links/i,
  /^pages?\s+that\s+should\s+link/i,
  /^breadcrumb\b/i,
  /^hreflang/i,
  /^build\s+notes/i,
  /^layout\s+notes/i,
]

const FORBIDDEN_INLINE_PATTERNS = [
  /^\s*Platform:\s+.*\bWordPress\b.*$/im,
  /^\s*Platform:\s+.*\bElementor\b.*$/im,
  /^\s*SEO:\s+.*\bRankMath\b.*$/im,
  /^\s*Use\s+Elementor.*$/im,
  /^\s*\[?Inviz\s+\w+\s+(?:template|section).*$/im,
]

const FORBIDDEN_WORDS = /\b(?:WordPress|Elementor|RankMath|Yoast|Inviz)\b/gi

export function sanitizeMarkdown(md: string): string {
  // 1. Strip h2 sections whose heading matches the forbidden list. (h3+ inside
  //    a stripped h2 go with it; h3+ outside any matching h2 stay.)
  const lines = md.split('\n')
  const out: string[] = []
  let dropping = false
  for (const ln of lines) {
    const h1 = /^#\s+(.*)/.exec(ln)
    const h2 = /^##\s+(.*)/.exec(ln)
    if (h1) {
      // h1s reset the dropping state
      dropping = false
      out.push(ln)
      continue
    }
    if (h2) {
      const heading = h2[1].trim()
      dropping = FORBIDDEN_HEADING_PATTERNS.some(re => re.test(heading))
      if (dropping) continue
      out.push(ln)
      continue
    }
    if (!dropping) out.push(ln)
  }

  let cleaned = out.join('\n')

  // 2. Drop full-line metadata headers anywhere in the doc.
  for (const re of FORBIDDEN_INLINE_PATTERNS) {
    cleaned = cleaned.replace(re, '')
  }

  // 3. Strip pipe-separated metadata fragments containing forbidden words.
  cleaned = cleaned.replace(/\|\s*[^|]*\b(?:WordPress|Elementor|RankMath|Yoast|Inviz)\b[^|]*/gi, '')

  // 4. Strip remaining inline mentions of forbidden words (best-effort).
  cleaned = cleaned.replace(FORBIDDEN_WORDS, '')

  // 5. Collapse runs of blank lines and trim trailing whitespace.
  cleaned = cleaned
    .split('\n')
    .map(l => l.replace(/[ \t]+$/, ''))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  return cleaned
}
