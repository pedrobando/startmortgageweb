import { mdToLexical } from './markdown'

type Section = { heading: string; body: string; level: number }

/**
 * uploads/homepage.md and uploads/es-inicio.md are authoring spec docs,
 * not final user-facing copy. Top-level h2s in those files are SEO /
 * schema / linking-map sections that must not render. The actual page
 * content lives under one specific h2 group whose body is a list of h3s
 * named "SECTION N: <intent>" / "SECCION N: <intent>".
 *
 * The mapper below ONLY consumes those h3s; every other h2 in the file
 * is treated as authoring metadata and discarded.
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

function bullets(body: string): string[] {
  return (body.match(/^[-*]\s+(.*)$/gm) ?? []).map(s => s.replace(/^[-*]\s+/, ''))
}

function firstSentences(body: string, n = 2): string {
  return body
    .replace(/^[-*].*\n?/gm, '')
    .split(/\n{2,}/)
    .filter(Boolean)
    .slice(0, n)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 280)
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

/* ---- block builders -------------------------------------------------- */

function toHero(sec: Section) {
  return {
    blockType: 'hero',
    eyebrow: 'START Mortgage',
    headline: 'The start of more.',
    subheadline: firstSentences(sec.body, 2) || 'Boutique bilingual mortgage guidance for Central Florida families. 24-hour pre-approvals.',
    primaryCta: { label: 'Get pre-approved', href: '/pre-approval' },
    secondaryCta: { label: 'How it works', href: '/how-it-works' },
    proofPoints: [
      { value: '24h', label: 'pre-approval' },
      { value: '30+', label: 'lenders' },
      { value: 'EN/ES', label: 'bilingual' },
    ],
  }
}

function toWhyBroker(sec: Section) {
  const items = bullets(sec.body).slice(0, 6).map(b => {
    const [t, ...rest] = b.split(':')
    return {
      iconKey: 'badge-check',
      title: (t || '').trim(),
      body: rest.join(':').trim() || (t || '').trim(),
    }
  })
  return {
    blockType: 'whyBroker',
    title: 'Why a broker, not a bank',
    intro: mdToLexical(firstSentences(sec.body, 2) || 'A broker shops 30+ wholesale lenders. A bank sells you the loan it has.'),
    points: items.length
      ? items
      : [
          { iconKey: 'scale', title: '30+ lenders', body: 'We rate-shop wholesale partners on every file.' },
          { iconKey: 'clock', title: '24-hour pre-approval', body: 'Most pre-approvals out within 24 hours of complete intake.' },
          { iconKey: 'handshake', title: 'One person, intake to close', body: 'No hand-offs. Same broker from first call to keys.' },
        ],
  }
}

function toFounder(sec: Section) {
  return {
    blockType: 'founder',
    headline: 'Meet Jexayra',
    bio: mdToLexical(sec.body.trim() || 'Jexayra Rivera, founder and broker — bilingual, with a decade of guiding Central Florida families to the right loan.'),
    nmls: '1631454',
    credentials: [
      { text: 'Bilingual EN/ES' },
      { text: 'Central Florida specialist' },
      { text: '30+ wholesale lender access' },
    ],
  }
}

function toLoanProgramsList(sec: Section) {
  return {
    blockType: 'loanProgramsList',
    title: 'Loan programs',
    intro: firstSentences(sec.body, 1) || 'Conventional, FHA, VA, USDA — pick the one that fits your situation.',
  }
}

function toFormEmbed() {
  return {
    blockType: 'formEmbed',
    headline: 'Book your planning session',
    intro: "Tell us a little about your goals — we'll reach out within 24 hours.",
    form: undefined as any,
  }
}

function toAudience(_sec: Section) {
  return {
    blockType: 'audienceGrid',
    title: 'Who we work with',
    audiences: [
      { iconKey: 'home', label: 'First-time buyers', body: 'Down payment, credit, paperwork — handled.', href: '/first-time-buyers' },
      { iconKey: 'briefcase', label: 'Self-employed', body: 'Bank-statement, 1099, P&L, asset-depletion programs.', href: '/loan-programs' },
      { iconKey: 'flag', label: 'Veterans', body: 'VA loans with no down payment.', href: '/loan-programs/va' },
      { iconKey: 'users', label: 'Realtor partners', body: "Pre-approvals your buyers will close on.", href: '/realtors' },
    ],
  }
}

function toBlogTeasers() {
  return { blockType: 'blogTeasers', title: 'Read up before you buy', mode: 'auto', count: 3 }
}

function toBilingual(sec: Section) {
  return {
    blockType: 'bilingual',
    headline: '¿Hablas español? Hablamos contigo.',
    body: mdToLexical(sec.body.trim() || 'Toda nuestra atención está disponible en inglés o español — desde la primera llamada hasta el cierre.'),
  }
}

function toFinalCta(_sec: Section) {
  return {
    blockType: 'finalCta',
    eyebrow: 'Ready when you are',
    headline: 'Your start of more begins here.',
    body: 'A 15-minute conversation, then a pre-approval inside 24 hours.',
    primaryCta: { label: 'Book Planning Session', href: '/planning-session' },
    secondaryCta: { label: 'See loan programs', href: '/loan-programs' },
  }
}

/* ---- main mapper ------------------------------------------------------ */

export function mapHomepage(md: string): any[] {
  const all = parseSections(md)
  const startIdx = all.findIndex(s => s.level === 2 && SECTION_GROUP_RE.test(s.heading))
  if (startIdx === -1) return []

  const sections: Section[] = []
  for (let i = startIdx + 1; i < all.length; i++) {
    if (all[i].level === 2) break
    if (all[i].level === 3 && SECTION_RE.test(all[i].heading)) {
      const m = all[i].heading.match(SECTION_RE)!
      sections.push({ ...all[i], heading: m[1].trim() })
    }
  }

  const blocks: any[] = []
  for (const sec of sections) {
    const intent = classifyIntent(sec.heading)
    if (intent === 'skip') continue
    switch (intent) {
      case 'hero': blocks.push(toHero(sec)); break
      case 'whyBroker': blocks.push(toWhyBroker(sec)); break
      case 'founder': blocks.push(toFounder(sec)); break
      case 'loanProgramsList': blocks.push(toLoanProgramsList(sec)); break
      case 'formEmbed': blocks.push(toFormEmbed()); break
      case 'audienceGrid': blocks.push(toAudience(sec)); break
      case 'blogTeasers': blocks.push(toBlogTeasers()); break
      case 'bilingual': blocks.push(toBilingual(sec)); break
      case 'finalCta': blocks.push(toFinalCta(sec)); break
      case 'testimonials':
        blocks.push({ blockType: 'testimonials', title: 'What clients say', mode: 'auto' })
        break
      case 'faqList':
        blocks.push({ blockType: 'faqList', title: 'Common questions', mode: 'auto' })
        break
      case 'process':
        blocks.push({
          blockType: 'process',
          title: 'How it works',
          steps: [
            { number: '01', title: 'Intake', body: '15-minute call about your goals + docs.', durationLabel: '15 min' },
            { number: '02', title: 'Pre-approval', body: 'Soft credit pull, income docs.', durationLabel: '24 hours' },
            { number: '03', title: 'Shop loans', body: 'We compare 30+ lenders.', durationLabel: '2-3 days' },
            { number: '04', title: 'Close', body: 'Title, signing, keys.', durationLabel: '21-30 days' },
          ],
        })
        break
      case 'guarantee':
        blocks.push({
          blockType: 'guarantee',
          title: 'The START Promise',
          body: mdToLexical(sec.body.trim() || 'A pre-approval inside 24 hours of complete intake — every time.'),
          seal: { label: 'START Promise', sub: '24h pre-approval' },
        })
        break
      case 'marquee':
        blocks.push({ blockType: 'marquee', mode: 'auto', speed: 30 })
        break
      case 'proofPoints':
        // Already covered by Hero proofPoints
        break
      case 'versusTable':
        blocks.push({
          blockType: 'versusTable',
          title: 'Broker vs. bank',
          columns: [{ label: 'Broker' }, { label: 'Bank' }],
          rows: [
            { label: 'Lender options', values: [{ text: '30+ wholesale' }, { text: '1' }] },
            { label: 'Rate shopping', values: [{ text: 'Yes' }, { text: 'No' }] },
            { label: 'Personal service', values: [{ text: 'One person, intake to close' }, { text: 'Hand-offs' }] },
          ],
        })
        break
      default:
        if (sec.body.trim()) {
          blocks.push({ blockType: 'richText', content: mdToLexical(`## ${sec.heading}\n\n${sec.body}`) })
        }
        break
    }
  }
  return blocks
}
