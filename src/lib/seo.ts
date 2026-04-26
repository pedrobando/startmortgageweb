import 'server-only'
import type { Locale } from './locale'

type Settings = any // payload-types SiteSettings; permissive for build-time speed

export function buildLocalBusiness(s: Settings, origin: string) {
  return {
    '@type': ['MortgageBroker', 'FinancialService', 'LocalBusiness'],
    '@id': `${origin}/#business`,
    name: 'START Mortgage',
    legalName: 'Lend Labs LLC dba START Mortgage',
    alternateName: 'START',
    url: `${origin}/`,
    logo: `${origin}/brand/logo-wordmark-black.png`,
    image: `${origin}/brand/logo-wordmark-black.png`,
    description:
      'Boutique bilingual mortgage brokerage serving Central Florida families. 24-hour pre-approvals, 30+ wholesale lender partners.',
    telephone: s?.business?.phoneE164,
    email: s?.business?.email,
    priceRange: 'Free consultation',
    address: {
      '@type': 'PostalAddress',
      streetAddress: s?.business?.address?.street,
      addressLocality: s?.business?.address?.city,
      addressRegion: s?.business?.address?.region,
      postalCode: s?.business?.address?.postalCode,
      addressCountry: s?.business?.address?.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: s?.business?.address?.lat,
      longitude: s?.business?.address?.lng,
    },
    areaServed: [
      'Kissimmee', 'Orlando', 'Poinciana', 'Saint Cloud',
      'Lakeland', 'Clermont', 'Winter Garden', 'Haines City',
    ].map(name => ({ '@type': 'City', name })),
    availableLanguage: ['en', 'es'],
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '20:00',
    }],
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'NMLS', value: s?.business?.nmls?.broker },
      { '@type': 'PropertyValue', propertyID: 'NMLS-Parent', value: s?.business?.nmls?.parent },
    ],
    founder: {
      '@type': 'Person',
      name: s?.business?.founderBio?.name,
      jobTitle: s?.business?.founderBio?.jobTitle,
      identifier: [{ '@type': 'PropertyValue', propertyID: 'NMLS', value: s?.business?.nmls?.founder }],
    },
    aggregateRating: s?.business?.rating ? {
      '@type': 'AggregateRating',
      ratingValue: s.business.rating.value,
      reviewCount: s.business.rating.count,
      bestRating: 5,
    } : undefined,
    sameAs: (s?.social || []).map((x: any) => x.href).filter(Boolean),
  }
}

export function buildWebsite(origin: string) {
  return {
    '@type': 'WebSite',
    url: `${origin}/`,
    name: 'START Mortgage',
    inLanguage: ['en', 'es'],
  }
}

export function buildFAQPage(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function buildBreadcrumb(
  origin: string,
  locale: Locale,
  segments: { label: string; href: string }[],
) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: segments.map((seg, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: seg.label,
      item: `${origin}/${locale}${seg.href}`,
    })),
  }
}

export function buildArticle(origin: string, locale: Locale, post: any) {
  return {
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.heroImage?.url ? `${origin}${post.heroImage.url}` : undefined,
    datePublished: post.publishedAt,
    inLanguage: locale,
    author: { '@type': 'Organization', name: 'START Mortgage' },
    mainEntityOfPage: `${origin}/${locale}/posts/${post.slug}`,
  }
}

export function jsonLdGraph(origin: string, nodes: any[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  }
}
