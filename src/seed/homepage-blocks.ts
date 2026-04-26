import { mdToLexical } from './markdown'

type Section = { heading: string; body: string }

/**
 * Splits a markdown body into sections at h2/h3 headings, preserving the
 * heading text and the body content under each.
 */
function splitByH2OrH3(md: string): Section[] {
  const lines = md.split('\n')
  const out: Section[] = []
  let current: Section | null = null
  for (const ln of lines) {
    const m = ln.match(/^#{2,3}\s+(.*)/)
    if (m) {
      if (current) out.push(current)
      current = { heading: m[1].trim(), body: '' }
    } else if (current) {
      current.body += ln + '\n'
    }
  }
  if (current) out.push(current)
  return out
}

function bullets(body: string): string[] {
  return (body.match(/^[-*]\s+(.*)$/gm) ?? []).map(s => s.replace(/^[-*]\s+/, ''))
}

function firstSentences(body: string, n = 2): string {
  return body.split(/\n{2,}/).slice(0, n).join(' ').trim().replace(/\s+/g, ' ').slice(0, 280)
}

function toHero(sec: Section) {
  return {
    blockType: 'hero',
    eyebrow: 'START Mortgage',
    headline: sec.heading,
    subheadline: firstSentences(sec.body, 2),
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
    title: sec.heading,
    intro: mdToLexical(firstSentences(sec.body, 2)),
    points: items,
  }
}

function toOffer(sec: Section) {
  const items = bullets(sec.body).map(b => ({ text: b }))
  const intro = sec.body.split('\n').filter(l => !/^[-*]/.test(l)).join('\n').trim()
  return {
    blockType: 'offer',
    title: sec.heading,
    body: mdToLexical(intro || sec.body),
    bullets: items,
    cta: { label: 'Book Planning Session', href: '/planning-session' },
    darkMode: false,
  }
}

function toVersus(sec: Section) {
  return {
    blockType: 'versusTable',
    title: sec.heading,
    columns: [{ label: 'Broker' }, { label: 'Bank' }],
    rows: [
      { label: 'Lender options', values: [{ text: '30+ wholesale' }, { text: '1' }] },
      { label: 'Rate shopping', values: [{ text: 'Yes' }, { text: 'No' }] },
      { label: 'Personal service', values: [{ text: 'One person, intake to close' }, { text: 'Hand-offs' }] },
    ],
  }
}

function toProcess(sec: Section) {
  const items = bullets(sec.body).slice(0, 4).map((b, i) => {
    const [t, ...rest] = b.split(':')
    return {
      number: String(i + 1).padStart(2, '0'),
      title: t.trim(),
      body: rest.join(':').trim(),
      durationLabel: '',
    }
  })
  const fallback = [
    { number: '01', title: 'Intake', body: 'Quick conversation about goals and docs.', durationLabel: '15 min' },
    { number: '02', title: 'Pre-approval', body: 'Soft credit pull, income docs.', durationLabel: '24 hours' },
    { number: '03', title: 'Shop loans', body: 'We compare 30+ lenders.', durationLabel: '2-3 days' },
    { number: '04', title: 'Close', body: 'Title, signing, keys.', durationLabel: '21-30 days' },
  ]
  return { blockType: 'process', title: sec.heading, steps: items.length ? items : fallback }
}

function toAudience(sec: Section) {
  return {
    blockType: 'audienceGrid',
    title: sec.heading,
    audiences: [
      { iconKey: 'home', label: 'First-time buyers', body: 'Down payment, credit, paperwork — handled.', href: '/first-time-buyers' },
      { iconKey: 'briefcase', label: 'Self-employed', body: 'Bank-statement, 1099, P&L, asset-depletion programs.', href: '/loan-programs' },
      { iconKey: 'flag', label: 'Veterans', body: 'VA loans with no down payment.', href: '/loan-programs/va' },
      { iconKey: 'users', label: 'Families', body: 'Move-up buyers, multi-gen households.', href: '/loan-programs' },
    ],
  }
}

/**
 * Heuristically maps homepage.md headings into specific block types.
 * Anything that doesn't match becomes a richText block.
 */
export function mapHomepage(md: string): any[] {
  const sections = splitByH2OrH3(md)
  const blocks: any[] = []
  for (const sec of sections) {
    const head = sec.heading.toLowerCase()
    if (/section\s*1|^header|^hero/.test(head)) blocks.push(toHero(sec))
    else if (/marquee/.test(head)) blocks.push({ blockType: 'marquee', mode: 'auto', speed: 30 })
    else if (/why broker|why a broker|why us/.test(head)) blocks.push(toWhyBroker(sec))
    else if (/offer|24-?hour/.test(head)) blocks.push(toOffer(sec))
    else if (/vs\.?|versus|broker.*bank|comparison/.test(head)) blocks.push(toVersus(sec))
    else if (/process|how it works|step/.test(head)) blocks.push(toProcess(sec))
    else if (/calculator/.test(head)) blocks.push({
      blockType: 'calculator',
      title: sec.heading,
      defaults: {
        price: 350000, downPct: 5, ratePct: 6.5, termYears: 30,
        taxesAnnual: 4200, insuranceAnnual: 1800,
      },
    })
    else if (/loan program/.test(head)) blocks.push({
      blockType: 'loanProgramsList',
      title: sec.heading,
      intro: firstSentences(sec.body, 1),
    })
    else if (/audience|who we serve|first-?time|self-?employed/.test(head)) blocks.push(toAudience(sec))
    else if (/testimonial|review/.test(head)) blocks.push({
      blockType: 'testimonials', title: sec.heading, mode: 'auto',
    })
    else if (/guarantee|seal|promise/.test(head)) blocks.push({
      blockType: 'guarantee',
      title: sec.heading,
      body: mdToLexical(sec.body),
      seal: { label: 'START Promise', sub: '24h pre-approval' },
    })
    else if (/founder|jexayra/.test(head)) blocks.push({
      blockType: 'founder',
      headline: sec.heading,
      bio: mdToLexical(sec.body),
      nmls: '1631454',
    })
    else if (/biling|español|en espanol|spanish/.test(head)) blocks.push({
      blockType: 'bilingual',
      headline: sec.heading,
      body: mdToLexical(sec.body),
    })
    else if (/blog|article|read/.test(head)) blocks.push({
      blockType: 'blogTeasers',
      title: sec.heading,
      mode: 'auto',
      count: 3,
    })
    else if (/faq|question/.test(head)) blocks.push({
      blockType: 'faqList', title: sec.heading, mode: 'auto',
    })
    else if (/final|book|ready|get started/.test(head)) blocks.push({
      blockType: 'finalCta',
      headline: sec.heading,
      body: firstSentences(sec.body, 2),
      primaryCta: { label: 'Book Planning Session', href: '/planning-session' },
    })
    else blocks.push({
      blockType: 'richText',
      content: mdToLexical(`## ${sec.heading}\n\n${sec.body}`),
    })
  }
  return blocks
}
