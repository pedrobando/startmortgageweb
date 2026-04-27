import { mdToLexical } from './markdown'
import { sanitizeMarkdown } from './sanitize'
import {
  extractFields,
  extractCards,
  fieldText,
  fieldMarkdown,
  fieldCta,
  fieldBullets,
  parseTable,
} from './copy-extract'

type Section = { heading: string; body: string; level: number }

/**
 * Pulls user-facing copy out of the labeled-section format used in
 * uploads/homepage.md and uploads/es-inicio.md and turns each section
 * into a Payload block. The seed source is a copy deck — not a build
 * spec — so the job here is to lift the actual headlines, body
 * paragraphs, bullets, and CTAs into the right block fields.
 */

const SECTION_GROUP_RE = /section[\s-]*by[\s-]*section/i
const SECTION_RE = /^(?:section|secci[óo]n)\s*\d+\s*[:\-]\s*(.+)$/i

function parseSections(md: string): Section[] {
  const lines = md.split('\n')
  const all: Section[] = []
  let current: Section | null = null
  for (const ln of lines) {
    const h2 = ln.match(/^##\s+(.*)/)
    const h3 = ln.match(/^###\s+(.*)/)
    if (h2) {
      if (current) all.push(current)
      current = { heading: h2[1].trim(), body: '', level: 2 }
    } else if (h3) {
      if (current) all.push(current)
      current = { heading: h3[1].trim(), body: '', level: 3 }
    } else if (current) {
      current.body += ln + '\n'
    }
  }
  if (current) all.push(current)
  return all
}

function classifyIntent(name: string): string {
  const n = name.toLowerCase()
  if (/header/.test(n)) return 'skip'
  if (/footer/.test(n)) return 'skip'
  if (/hero/.test(n)) return 'hero'
  if (/feature|why|broker/.test(n)) return 'whyBroker'
  if (/(executive|founder|about teaser|presentaci[oó]n|ejecutivo)/.test(n)) return 'founder'
  if (/(statistic|counter|estad[ií]stica|contador)/.test(n)) return 'proofPoints'
  if (/(service|loan program|servicio|programa de pr[eé]stamo)/.test(n)) return 'loanProgramsList'
  if (/(appointment|formulario|cita|form)/.test(n)) return 'formEmbed'
  if (/(team|audience|miembro|tarjeta de ruta|routing)/.test(n)) return 'audienceGrid'
  if (/(blog|article|secci[oó]n de blog)/.test(n)) return 'blogTeasers'
  if (/(newsletter|spanish cta|biling|cta en espa[nñ]ol|bloque biling)/.test(n)) return 'bilingual'
  if (/(final|cta|llamado|reservar|book)/.test(n)) return 'finalCta'
  if (/testimonial|review|rese[nñ]a/.test(n)) return 'testimonials'
  if (/(faq|pregunta)/.test(n)) return 'faqList'
  if (/(process|how it works|como funciona|paso)/.test(n)) return 'process'
  if (/(versus|vs\.?|comparison|comparac)/.test(n)) return 'versusTable'
  if (/(guarantee|seal|garant[ií]a|sello)/.test(n)) return 'guarantee'
  if (/(marquee|tape)/.test(n)) return 'marquee'
  return 'richText'
}

/* ---- block builders ---- */

function toHero(sec: Section, allSections: Section[]) {
  const f = extractFields(sec.body)
  const headline = fieldText(f, 'h1', 'h2', 'h1 (heading)') || 'The start of more.'
  const subheadline = fieldText(f, 'subheadline', 'subhead', 'subheadline (text editor)')
  const primary = fieldCta(f, 'primary cta', 'primary cta (button)', 'cta button')
  const secondary = fieldCta(f, 'secondary cta', 'secondary cta (text link below button)')

  // Trust bar / Statistics live as a markdown table either inside this
  // section's "Trust Bar" body or as a sibling "Statistics" section.
  const trustBarBody = (f['trust bar (below hero — replaces inviz client logo bar)']
    ?? f['trust bar']
    ?? f['trust bar (below hero)']
    ?? []).join('\n')
  let proofPoints: { value: string; label: string }[] = []
  const trustTable = parseTable(trustBarBody) ?? findStatsTable(allSections)
  if (trustTable && trustTable.rows.length) {
    proofPoints = trustTable.rows
      .map(r => ({ value: (r[0] ?? '').trim(), label: (r[1] ?? '').trim() }))
      .filter(p => p.value && p.label)
  }

  return {
    blockType: 'hero',
    eyebrow: 'START Mortgage',
    headline,
    subheadline,
    primaryCta: primary ? { label: primary.label, href: primary.href } : undefined,
    secondaryCta: secondary ? { label: secondary.label, href: secondary.href } : undefined,
    proofPoints,
  }
}

function findStatsTable(all: Section[]) {
  const stats = all.find(s => /statistic|counter|estad[ií]stica/i.test(s.heading))
  if (!stats) return null
  return parseTable(stats.body)
}

function toWhyBroker(sec: Section) {
  const f = extractFields(sec.body)
  const eyebrow = fieldText(f, 'section tag', 'section tag (small text above heading)')
  const title = fieldText(f, 'h2', 'h1') || 'Why a broker, not a bank'
  const intro = fieldMarkdown(f, 'body copy', 'body')
  const cards = extractCards(sec.body)
  const points = cards
    .map(c => ({
      iconKey: pickIcon(fieldText(c, 'icon')),
      title: fieldText(c, 'h3', 'h2', 'card title'),
      body: fieldText(c, 'body', 'card body'),
    }))
    .filter(p => p.title || p.body)

  return {
    blockType: 'whyBroker',
    title: eyebrow ? `${eyebrow} — ${title}` : title,
    intro: intro ? mdToLexical(intro) : undefined,
    points: points.length
      ? points
      : [
          { iconKey: 'scale', title: 'Multiple lenders', body: 'We rate-shop on every file.' },
          { iconKey: 'clock', title: '24-hour pre-approval', body: 'Most pre-approvals out within 24 hours of complete intake.' },
          { iconKey: 'handshake', title: 'One person, intake to close', body: 'Same broker from first call to keys.' },
        ],
  }
}

// whyBroker's Block schema constrains iconKey to a fixed enum.
const WHY_ICONS = [
  'scale', 'wallet', 'clock', 'users', 'search', 'shield-check',
  'badge-check', 'sparkles', 'handshake', 'chart', 'headphones', 'globe',
] as const
type WhyIcon = typeof WHY_ICONS[number]

function pickIcon(name: string): WhyIcon {
  const n = (name || '').toLowerCase()
  if (/chat|biling|globe|language|idioma/.test(n)) return 'globe'
  if (/shield|check|trust|approve/.test(n)) return 'shield-check'
  if (/clock|communica|time|update/.test(n)) return 'clock'
  if (/scale|rate|shop|compare/.test(n)) return 'scale'
  if (/wallet|money|cost|saving/.test(n)) return 'wallet'
  if (/handshake|partner/.test(n)) return 'handshake'
  if (/users|people|team|family/.test(n)) return 'users'
  if (/search|research/.test(n)) return 'search'
  if (/chart|stat|track/.test(n)) return 'chart'
  if (/headphone|support|help/.test(n)) return 'headphones'
  if (/sparkle|star/.test(n)) return 'sparkles'
  return 'badge-check'
}

function toFounder(sec: Section) {
  const f = extractFields(sec.body)
  const eyebrow = fieldText(f, 'section tag', 'section tag (small text above heading)')
  const headline = fieldText(f, 'h2', 'h1') || 'Meet your guide'
  const bio = fieldMarkdown(f, 'body copy', 'body')
  const bullets = fieldBullets(f, 'bullet points', 'bullets')
  const cta = fieldCta(f, 'cta button', 'primary cta', 'cta')
  return {
    blockType: 'founder',
    headline: eyebrow && eyebrow.length < 40 ? `${eyebrow} — ${headline}` : headline,
    bio: bio ? mdToLexical(bio) : undefined,
    nmls: '1631454',
    credentials: bullets.map(t => ({ text: t })),
    // headline + cta are not separate fields on the Founder block but
    // we keep the cta-bearing CTA for reference; the page's finalCta
    // block already covers that role.
    _ctaHint: cta,
  }
}

function toLoanProgramsList(sec: Section) {
  const f = extractFields(sec.body)
  const eyebrow = fieldText(f, 'section tag')
  const title = fieldText(f, 'h2', 'h1') || 'Loan programs'
  const intro = fieldText(f, 'body copy', 'body')

  // The 4 programs are listed as a pipe-table with columns:
  //   Card Title | Card Body | Link
  const t = parseTable(sec.body)
  // We don't inline the programs into the block (the renderer queries
  // the loan-programs collection); the table here just confirms the
  // ordering — collection-driven render is fine.
  void t

  return {
    blockType: 'loanProgramsList',
    title: eyebrow && eyebrow.length < 40 ? `${eyebrow} — ${title}` : title,
    intro,
  }
}

function toFormEmbed(sec: Section) {
  const f = extractFields(sec.body)
  const headline = fieldText(f, 'h2', 'h1') || 'Ready to take the first step?'
  const intro = fieldText(f, 'body copy', 'body')
  return {
    blockType: 'formEmbed',
    headline,
    intro,
    form: undefined as any,
  }
}

// audienceGrid's Block schema constrains iconKey to a fixed enum.
const AUDIENCE_ICONS = ['home', 'users', 'briefcase', 'heart', 'globe', 'flag', 'wallet', 'sparkles'] as const
type AudienceIcon = typeof AUDIENCE_ICONS[number]

function pickAudienceIcon(label: string): AudienceIcon {
  const n = label.toLowerCase()
  if (/first[-\s]?time|home|family|familias|hogar/.test(n)) return 'home'
  if (/refinanc|wallet|money|saving|ahorr/.test(n)) return 'wallet'
  if (/self[-\s]?employed|business|owner|emprende|negocio/.test(n)) return 'briefcase'
  if (/veteran|military|service|militar/.test(n)) return 'flag'
  if (/realtor|partner|agent|socio|agente/.test(n)) return 'users'
  if (/heart|love|family/.test(n)) return 'heart'
  if (/globe|biling|spanish|english|idioma/.test(n)) return 'globe'
  return 'sparkles'
}

function toAudience(sec: Section) {
  const t = parseTable(sec.body)
  if (!t || !t.rows.length) {
    return {
      blockType: 'audienceGrid',
      title: 'Whatever your situation, there is a path forward',
      audiences: [
        { iconKey: 'home', label: 'First-time buyers', body: '', href: '/first-time-buyers' },
        { iconKey: 'briefcase', label: 'Self-employed', body: '', href: '/loan-programs' },
        { iconKey: 'flag', label: 'Veterans', body: '', href: '/loan-programs/va' },
        { iconKey: 'users', label: 'Realtor partners', body: '', href: '/realtors' },
      ],
    }
  }
  const f = extractFields(sec.body)
  const title = fieldText(f, 'h2', 'h1') || 'Whatever your situation, there is a path forward'
  // Header order: Card Title | Card Subtitle | Card Body | Link
  // Sometimes the "Subtitle" column is missing.
  const audiences = t.rows.map(r => {
    const [titleCell, subOrBody, body, link] = r
    const label = (titleCell ?? '').trim()
    const bodyText = (link ? body : subOrBody) ?? ''
    const href = (link ?? body ?? '').trim()
    return {
      iconKey: pickAudienceIcon(label),
      label,
      body: bodyText.trim(),
      href: href || undefined,
    }
  }).filter(a => a.label)
  return { blockType: 'audienceGrid', title, audiences }
}

function toBlogTeasers(sec: Section) {
  const f = extractFields(sec.body)
  const title = fieldText(f, 'h2', 'h1') || 'Mortgage answers — written for real people'
  return { blockType: 'blogTeasers', title, mode: 'auto', count: 3 }
}

function toBilingual(sec: Section) {
  const f = extractFields(sec.body)
  const headline = fieldText(f, 'h2', 'h1') || '¿Hablas español? Hablamos contigo.'
  const body = fieldMarkdown(f, 'body copy', 'body')
  return {
    blockType: 'bilingual',
    headline,
    body: body ? mdToLexical(body) : undefined,
  }
}

function toFinalCta(sec: Section) {
  const f = extractFields(sec.body)
  const eyebrow = fieldText(f, 'section tag')
  const headline = fieldText(f, 'h2', 'h1') || 'Your start of more begins here.'
  const body = fieldText(f, 'body copy', 'body')
  const primary = fieldCta(f, 'cta button', 'primary cta', 'submit button')
  const secondary = fieldCta(f, 'secondary cta')
  return {
    blockType: 'finalCta',
    eyebrow,
    headline,
    body,
    primaryCta: primary
      ? { label: primary.label, href: primary.href }
      : { label: 'Book Planning Session', href: '/planning-session' },
    secondaryCta: secondary ? { label: secondary.label, href: secondary.href } : undefined,
  }
}

/* ---- main mapper ---- */

export function mapHomepage(md: string): any[] {
  const all = parseSections(md)
  const startIdx = all.findIndex(s => s.level === 2 && SECTION_GROUP_RE.test(s.heading))
  if (startIdx === -1) return []

  const sections: Section[] = []
  for (let i = startIdx + 1; i < all.length; i++) {
    if (all[i].level === 2) break
    if (all[i].level === 3 && SECTION_RE.test(all[i].heading)) {
      const m = all[i].heading.match(SECTION_RE)!
      sections.push({
        ...all[i],
        heading: m[1].trim(),
        body: sanitizeMarkdown(all[i].body),
      })
    }
  }

  const blocks: any[] = []
  for (const sec of sections) {
    const intent = classifyIntent(sec.heading)
    if (intent === 'skip') continue
    switch (intent) {
      case 'hero': blocks.push(toHero(sec, sections)); break
      case 'whyBroker': blocks.push(toWhyBroker(sec)); break
      case 'founder': {
        const block = toFounder(sec)
        delete (block as any)._ctaHint
        blocks.push(block)
        break
      }
      case 'loanProgramsList': blocks.push(toLoanProgramsList(sec)); break
      case 'formEmbed': blocks.push(toFormEmbed(sec)); break
      case 'audienceGrid': blocks.push(toAudience(sec)); break
      case 'blogTeasers': blocks.push(toBlogTeasers(sec)); break
      case 'bilingual': blocks.push(toBilingual(sec)); break
      case 'finalCta': blocks.push(toFinalCta(sec)); break
      case 'proofPoints':
        // Rolled into Hero proofPoints via the stats table.
        break
      default:
        // Unknown intent → drop a richText block with the section body so
        // copy doesn't disappear.
        if (sec.body.trim()) {
          blocks.push({ blockType: 'richText', content: mdToLexical(`## ${sec.heading}\n\n${sec.body}`) })
        }
        break
    }
  }
  return blocks
}
