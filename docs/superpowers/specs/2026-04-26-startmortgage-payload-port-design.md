# START Mortgage — Payload CMS Port (Design)

**Date:** 2026-04-26
**Source artifact:** `START Website.zip` at the repo root — a static, browser-Babel-compiled React single-page site with custom design system and ~25 Markdown content files.
**Goal:** Faithfully port the existing `start-mortgage.com` design and content into a production-grade Payload CMS + Next.js application, hosted on Vercel, with bilingual (en / es) editorial control.

---

## 1. Decisions Locked In (from brainstorming)

| Topic              | Decision                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------- |
| Scope              | Faithful 1:1 port of the existing design, sections, copy, and bilingual content.         |
| Hosting            | Vercel.                                                                                  |
| Database           | Postgres via `@payloadcms/db-postgres` (Neon or Vercel Postgres).                        |
| Localization       | Payload field-level localization (`localized: true`); routes `/` (en) and `/es/`.        |
| Page model         | Block-based page builder (`Pages` collection with a `layout` blocks field).              |
| Content seeding    | One-shot seed script that parses the `.md` files in `uploads/` into Payload docs.        |
| Forms              | `@payloadcms/plugin-form-builder` + Resend for transactional email.                      |
| Mortgage calculator| Pure client React component, no backend.                                                 |
| SEO                | `@payloadcms/plugin-seo` + JSON-LD blocks rendered server-side.                          |
| Drafts / preview   | Payload draft mode + Next.js `draftMode()` + live preview iframe enabled.                |
| Tweaks panel       | Replaced by a `SiteSettings` global (accent color, toggle marquee/offer/sticky-bar).     |
| Starter base       | `pnpm create payload-app -t website` (Payload Website Template), then customized.        |
| Redirects plugin   | Not in scope for v1 (can be added later if/when migrating from old site URLs).           |

---

## 2. Stack

- **Runtime:** Node.js 20 LTS
- **Framework:** Next.js 15 (App Router, RSC)
- **CMS:** Payload v3 (embedded in the same Next.js app via `@payloadcms/next`)
- **DB:** Postgres (`@payloadcms/db-postgres`)
- **Storage:** Vercel Blob (`@payloadcms/storage-vercel-blob`) for media uploads
- **Email:** Resend (`@payloadcms/email-resend`) for form submissions and admin auth
- **UI:** Tailwind CSS + shadcn/ui (Website Template defaults), themed with START design tokens
- **Plugins:** `@payloadcms/plugin-seo`, `@payloadcms/plugin-form-builder`
- **Package manager:** `pnpm`
- **TypeScript:** strict mode

---

## 3. Repository Structure

The `.zip` contents are temporary reference material. They are extracted to `/.extracted/` (gitignored) and the relevant assets are copied into the project tree:

```
/                                       repo root
  /src
    /app
      /(frontend)
        /[locale]
          /[[...slug]]/page.tsx          renders Pages by slug
          /posts/[slug]/page.tsx         renders blog Posts
          /loan-programs/[slug]/page.tsx renders Loan Program detail
          /preview/route.ts              draft-mode entry
      /(payload)
        /admin/[[...segments]]/page.tsx  Payload admin
      /api
        /[...slug]/route.ts              Payload REST + GraphQL
        /seed/route.ts                   protected one-shot seeder
    /collections                         Pages, Posts, LoanPrograms, FAQs, Reviews, Media, Users, Forms
    /globals                             Header, Footer, SiteSettings
    /blocks                              field schemas for each section block
    /components
      /blocks                            React renderers for each block
      /chrome                            Topbar, Nav, Footer, StickyBar
      /calculator                        client mortgage calculator
    /lib
      payload.ts                         server-side payload client
      locale.ts                          locale helpers + middleware
      seo.ts                             JSON-LD builders
    /seed
      index.ts                           orchestrator
      pages.ts                           seeds Pages from /uploads/*.md
      posts.ts                           seeds Posts from /uploads/blog-*.md
      loan-programs.ts                   seeds LoanPrograms
      faqs.ts, reviews.ts, settings.ts
    payload.config.ts
  /uploads                               original .md content (committed; consumed by seed)
  /design-system                         logos + reference CSS
  /public/brand                          logo PNGs (icon + wordmark, black + white)
  /docs/superpowers/specs/...            this file and future specs
```

Note: the existing `START Website.zip` is left in place at the repo root for traceability and added to `.gitignore` so it never re-enters source control.

---

## 4. Data Model

### 4.1 Collections

| Slug             | Purpose                                                                       | Key fields                                                                                                                                  | Notes                                          |
| ---------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `pages`          | All standalone pages (home, about, contact, FAQ, etc.)                        | `title*`, `slug*`, `locale*` (`'en' \| 'es'`), `localizationKey*`, `layout` (blocks), `meta` (SEO plugin), `publishedAt`, `_status`         | `versions: { drafts: true, autosave: true }`. **One doc per (page × locale)** — no field-level localization on `pages`; `locale` is a stored enum field. See §6. |
| `posts`          | Blog posts                                                                    | `title*`, `slug*`, `heroImage`, `excerpt`, `content` (richText with embedded blocks), `publishedAt`, `categories`, `relatedPosts`, `meta`   | `localized` on title, excerpt, content, meta.  |
| `loan-programs`  | FHA, Conventional, VA, USDA detail pages                                      | `name*`, `slug*`, `tagline`, `whoItsFor`, `requirements` (richText), `pros[]`, `cons[]`, `bestFor`, `iconKey`, `meta`                       | Used by both individual `/loan-programs/[slug]` page and the homepage `LoanPrograms` block. |
| `faqs`           | Reusable Q&A entries                                                          | `question*`, `answer` (richText), `category` (rel → categories), `order`                                                                    | Surfaced via `FAQList` block (filterable by category) and JSON-LD `FAQPage`. |
| `reviews`        | Customer testimonials                                                         | `quote*`, `authorName*`, `authorContext`, `rating` (1-5), `date`, `featured` (bool)                                                         | Powers `Marquee` and `Testimonials` blocks.    |
| `categories`     | Tag-like taxonomy for posts and FAQs                                          | `title*`, `slug*`                                                                                                                           | From Website Template.                         |
| `media`          | Uploaded images (logos, hero, OG images)                                      | Default Payload media fields + `alt*` (localized)                                                                                           | Stored in Vercel Blob.                         |
| `users`          | Admin / editor accounts                                                       | Default auth fields + `roles[]` enum (`admin`, `editor`)                                                                                    | From Website Template.                         |
| `forms`          | Form Builder plugin: schema for each form                                     | Plugin-managed                                                                                                                              | Forms: "Planning Session", "Contact".          |
| `form-submissions`| Form Builder plugin: stored submissions                                      | Plugin-managed                                                                                                                              |                                                |

Required fields are marked `*`. All collections have `_status` (draft/published) and timestamps.

### 4.2 Globals

| Slug           | Purpose                                                                                                                                |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `header`       | Top utility bar (phone, "Hablo Español", NMLS#), main nav items, dropdowns (Loan Programs, Resources), CTA button label + href.        |
| `footer`       | Footer columns, NMLS disclosure, legal copy, social links.                                                                             |
| `site-settings`| Brand: accent color (default `#83C340`); toggles for `showMarquee`, `showStickyBar`, `darkOffer` (replaces dev-time tweaks panel). Business info: phone, email, address, NMLS numbers, founder bio (used by JSON-LD and chrome). |

All globals are `localized` where text fields apply.

---

## 5. Blocks (Page-Builder Sections)

Each block is a Payload `Block` config plus a corresponding React renderer. Names match the existing component names in the .zip so traceability is obvious.

| Block slug         | Source component        | Editable fields                                                                                                                                  |
| ------------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `hero`             | `HeroOffer.jsx` (top)   | `eyebrow`, `headline*`, `subheadline`, `primaryCta {label, href}`, `secondaryCta`, `image` (rel media), `proofPoints[] {label, value}`           |
| `marquee`          | `Sections.jsx`          | `mode`: `auto` (pull featured Reviews) \| `manual` (`items[]`); `speed`                                                                          |
| `whyBroker`        | `Middle.jsx`            | `title`, `intro` (richText), `points[] {iconKey, title, body}`                                                                                   |
| `offer`            | `Sections.jsx`          | `title`, `body` (richText), `bullets[]`, `cta {label, href}`, `darkMode` (bool)                                                                  |
| `versusTable`      | `Sections.jsx`          | `title`, `columns[] {label}`, `rows[] {label, values[]}`, `footnote`                                                                             |
| `process`          | `Sections.jsx`          | `title`, `steps[] {number, title, body, durationLabel}`                                                                                          |
| `calculator`       | `Sections.jsx`          | `title`, `intro`, `defaults {price, downPct, ratePct, termYears, taxesAnnual, insuranceAnnual}`, `disclaimer`                                    |
| `loanProgramsList` | `Sections.jsx`          | `title`, `intro`, `programs[]` (rel → loan-programs)                                                                                             |
| `audienceGrid`     | `Sections.jsx`          | `title`, `audiences[] {label, body, iconKey, href}`                                                                                              |
| `testimonials`     | `Sections.jsx`          | `title`, `mode`: `auto` \| `manual`; `items[]` (rel → reviews) when manual                                                                       |
| `guarantee`        | `Sections.jsx`          | `title`, `body` (richText), `seal {label, sub}`                                                                                                  |
| `founder`          | `Sections.jsx`          | `headline`, `bio` (richText), `image`, `nmls`, `credentials[]`                                                                                   |
| `bilingual`        | `Sections.jsx`          | `headline`, `body` (richText), pulled in opposite locale automatically                                                                           |
| `blogTeasers`      | `Sections.jsx`          | `title`, `mode`: `auto` (latest N) \| `manual` (rel → posts), `count`                                                                            |
| `faqList`          | `Sections.jsx`          | `title`, `mode`: `auto` (by category) \| `manual` (rel → faqs); `categoryFilter`                                                                 |
| `finalCta`         | `Sections.jsx`          | `eyebrow`, `headline`, `body`, `primaryCta`, `secondaryCta`, `image`                                                                             |
| `richText`         | n/a                     | Generic Lexical richText for inner pages (about, blog post bodies, etc.)                                                                         |
| `formEmbed`        | n/a                     | `form` (rel → forms), `headline`, `intro`                                                                                                        |

Required fields marked `*`. All `localized: true` on text fields.

`iconKey` is a string enum mapped client-side to a `lucide-react` icon — keeps editors out of arbitrary SVG and matches the existing Lucide usage in `index.html`.

---

## 6. Localization

Locales declared in `payload.config.ts`: `['en', 'es']`, default `'en'`, fallback enabled.

The model is a **deliberate hybrid** because the existing site uses different URL slugs per language (`/how-it-works` vs `/es/como-funciona`):

- **Pages** — *one document per (page × locale)*, linked by a `localizationKey` string field. Field-level localization is **not** used on `pages`; each doc is single-locale. Routing resolves `(localizationKey, locale) → slug`. A `locale` field on each doc tracks which language it represents.
- **Posts, LoanPrograms, FAQs, Reviews** — *one document, field-level localization*. Slugs for these are the same in both languages (e.g., a post `fha-vs-conventional` has en + es titles/bodies on one doc), and the URL is `/[locale]/posts/[slug]`. Text and richText fields are marked `localized: true`.
- **Globals (Header, Footer, SiteSettings)** — field-level localization on text fields (nav labels, footer copy, etc.).
- **Media `alt`** — field-level localization.

Frontend routing:
- `/` → Pages where `localizationKey = 'home'` and `locale = 'en'`.
- `/es` → Pages where `localizationKey = 'home'` and `locale = 'es'`.
- `/[slug]` and `/es/[slug]` → resolve by `(slug, locale)` first, fall back to `(localizationKey, locale)`.
- `/[locale]/posts/[slug]` and `/[locale]/loan-programs/[slug]` → query the single doc with `?locale=…`.

A locale switcher in the header reads the current Page's `localizationKey` (or, for Posts/LoanPrograms, just keeps the same slug) and links to the matching URL in the other locale. If a Page has no Spanish counterpart yet, the switcher links to `/es` (the localized homepage) rather than 404'ing.

Middleware: `src/middleware.ts` sets a `NEXT_LOCALE` cookie based on URL prefix and (on the bare root) checks `Accept-Language` to redirect first-time visitors to `/es` if Spanish is preferred.

---

## 7. Forms + Calculator

### Forms (Form Builder plugin)
- Two seeded forms in v1: **"Planning Session"** (name, email, phone, locale preference, goals textarea) and **"Contact"** (name, email, message).
- Submissions stored in `form-submissions`.
- Confirmation email to the visitor + notification email to a configurable internal address (set in `SiteSettings`).
- Email transport: Resend via `@payloadcms/email-resend`. `RESEND_API_KEY` env var.
- Forms are surfaced on the page via the `formEmbed` block.

### Mortgage calculator
- Pure client component (`'use client'`), zero network calls.
- Inputs: home price, down payment %, rate %, term years, annual taxes, annual insurance.
- Output: monthly P&I, monthly total (PITI), total interest paid, amortization mini-chart.
- Defaults editable per-page via the `calculator` block.
- Lives in `src/components/calculator/` and is rendered inside the `calculator` block component.

### CTAs
- All "Book Planning Session" CTAs in the .zip are reused; their target is a single page `/planning-session` (en) / `/es/sesion-de-planificacion` (es) which embeds the Planning Session form via `formEmbed`.

---

## 8. SEO + Structured Data

- `@payloadcms/plugin-seo` adds a `meta` group to Pages, Posts, and LoanPrograms (title, description, image, keywords). Localized.
- JSON-LD is rendered server-side from `SiteSettings` and the active document. Builders in `src/lib/seo.ts`:
  - `LocalBusiness` / `MortgageBroker` / `FinancialService` graph node — emitted on every page (mirrors current `index.html`).
  - `WebSite` node — every page.
  - `FAQPage` node — pages that contain a `faqList` block.
  - `BreadcrumbList` node — non-home pages.
  - `Article` node — Posts.
- `<link rel="alternate" hreflang>` tags emitted for every page that has a counterpart in the other locale.
- `sitemap.xml` and `robots.txt` generated dynamically (Next.js `app/sitemap.ts` + `app/robots.ts`) reading published Pages, Posts, and LoanPrograms in both locales.
- Per-page Open Graph image: defaults to brand wordmark, override-able via `meta.image`.

---

## 9. Theming / Design System Port

Source: `design-system/colors_and_type.css` and `site.css` from the .zip.

- Tailwind config gets START tokens added under `theme.extend`:
  - Colors: `start.green` (`#83C340` accent), `start.greenHover`, `start.greenPressed`, `start.greenTint`, plus the neutral palette from the source CSS.
  - Fonts: `Poppins` for both `sans` and `display`. Loaded via `next/font/google` with the weights used in the source (400/500/600/700).
- The accent is exposed as a CSS variable `--accent` (default `#83C340`) so `SiteSettings.accentColor` can override it at runtime via a small server-rendered `<style>` tag in the root layout.
- `site.css` is **not** copied verbatim. Instead, each Block component reimplements its layout with Tailwind utility classes. The CSS file remains in `/.extracted` (or `/design-system` for traceability) but is not loaded.
- Logos (`logo-icon-black.png`, `logo-icon-white.png`, `logo-wordmark-black.png`, `logo-wordmark-white.png`) are copied to `public/brand/` and used via `<Image>`.

---

## 10. Live Preview / Drafts

- All content collections have `versions: { drafts: true, autosave: true }`.
- Payload admin Live Preview is configured for Pages, Posts, and LoanPrograms; the iframe URL hits `/[locale]/preview` which sets Next.js `draftMode()` and renders the document via the same routes that render published content.
- A "View Live" button in admin links to the public URL.
- `next.config` allows the admin origin in `images.remotePatterns` for media previews.

---

## 11. Seed Strategy

Goal: a fully populated CMS on first launch — editors do not start from an empty admin.

- Trigger: `POST /api/seed` (auth-gated by `SEED_SECRET` env), or `pnpm payload run seed` locally.
- Idempotent: each entry checks for an existing doc by `(collection, slug, locale)` before creating; reruns produce no duplicates.
- Source: the `.md` files in `/uploads/`.
- Mapping:

| File pattern                      | Target collection / global                | Locale |
| --------------------------------- | ----------------------------------------- | ------ |
| `homepage.md`                     | `pages` slug `home`, `localizationKey` `home` | `en`   |
| `es-inicio.md`                    | `pages` slug `inicio`, `localizationKey` `home` | `es`   |
| `about.md`                        | `pages` slug `about`                      | `en`   |
| `contact.md`                      | `pages` slug `contact`                    | `en`   |
| `faq.md`                          | `pages` slug `faq` + populates `faqs` collection | `en`   |
| `first-time-buyers.md`            | `pages` slug `first-time-buyers`          | `en`   |
| `how-it-works.md`                 | `pages` slug `how-it-works`               | `en`   |
| `es-como-funciona.md`             | `pages` slug `como-funciona`, `localizationKey` `how-it-works` | `es` |
| `pre-approval.md`                 | `pages` slug `pre-approval`               | `en`   |
| `es-pre-aprobacion.md`            | `pages` slug `pre-aprobacion`, `localizationKey` `pre-approval` | `es` |
| `planning-session.md`             | `pages` slug `planning-session`           | `en`   |
| `es-sesion-de-planificacion.md`   | `pages` slug `sesion-de-planificacion`, `localizationKey` `planning-session` | `es` |
| `realtors.md`                     | `pages` slug `realtors`                   | `en`   |
| `reviews.md`                      | `pages` slug `reviews` + populates `reviews` collection | `en` |
| `credit-readiness.md`             | `pages` slug `credit-readiness`           | `en`   |
| `loan-programs.md`                | `pages` slug `loan-programs`              | `en`   |
| `loan-programs-conventional.md`   | `loan-programs` slug `conventional`       | `en`   |
| `loan-programs-fha.md`            | `loan-programs` slug `fha`                | `en`   |
| `loan-programs-va.md`             | `loan-programs` slug `va`                 | `en`   |
| `loan-programs-usda.md`           | `loan-programs` slug `usda`               | `en`   |
| `blog-fha-vs-conventional.md`     | `posts` slug `fha-vs-conventional`        | `en`   |
| `blog-first-time-buyer-mistakes.md`| `posts` slug `first-time-buyer-mistakes` | `en`   |
| `blog-how-much-house-can-i-afford.md`| `posts` slug `how-much-house-can-i-afford` | `en` |
| `blog-what-is-pre-approval.md`    | `posts` slug `what-is-pre-approval`       | `en`   |
| `blog-what-to-expect-at-closing.md`| `posts` slug `what-to-expect-at-closing` | `en`   |
| `homepage-inviz-mapping.md`       | not seeded — internal mapping doc         | —      |

- Markdown → Payload mapping uses `gray-matter` (frontmatter) + `mdast-util-from-markdown` + a small AST-walker that maps headings/paragraphs/lists to Lexical nodes. Section headers in the homepage `.md` (e.g., `### SECTION 1: Header`) are mapped to specific blocks rather than copied as raw text.
- A `seedReport.json` file is written summarizing what was created/skipped.
- Spanish posts: not present in the .zip; blog stays English-only in v1. The `blogTeasers` block on Spanish pages will either (a) render its English posts with a small "Disponible en inglés" tag, or (b) be omitted from the Spanish homepage layout. Default: option (a).

---

## 12. Deployment

- **Vercel project** with framework preset Next.js.
- **Env vars** (set in Vercel + `.env.local`):

| Var                          | Purpose                                                |
| ---------------------------- | ------------------------------------------------------ |
| `DATABASE_URI`               | Postgres connection string                             |
| `PAYLOAD_SECRET`             | JWT/cookie secret                                      |
| `BLOB_READ_WRITE_TOKEN`      | Vercel Blob token                                      |
| `RESEND_API_KEY`             | Resend transactional email                             |
| `SEED_SECRET`                | Auth for `/api/seed`                                   |
| `NEXT_PUBLIC_SERVER_URL`     | Public origin (e.g., `https://startmortgage.com`)      |
| `PREVIEW_SECRET`             | Live preview / draft mode token                        |

- Preview deployments are public and use a separate Postgres branch (Neon branch or staging Vercel Postgres).
- Production database migrations run via Payload's migration CLI in a `vercel-build` step that gates the deploy on success.
- The `/api/seed` endpoint is run **once** against production after the first deploy, then `SEED_SECRET` is rotated.

---

## 13. Out of Scope (v1)

- Redirects plugin / WordPress URL migration map (defer until DNS cutover is planned).
- Spanish blog posts (none exist in the .zip).
- Admin role granularity beyond `admin` / `editor`.
- Multi-tenant or franchise locations.
- Server-side mortgage rate fetch / live rates feed.
- Payment intake.
- Search (we will rely on the small site footprint; can add Pagefind or Algolia later).

---

## 14. Risks + Open Questions

- **Block mapping fidelity.** The .zip uses heavy bespoke layouts in `Sections.jsx`. Reimplementing each in Tailwind without copying `site.css` verbatim risks visual drift. Mitigation: keep `site.css` accessible during build and review each block side-by-side against the original before merging.
- **Seed fragility.** Markdown → Lexical conversion is the most error-prone step. Mitigation: snapshot tests on a few representative files, idempotent re-runs, and a `seedReport.json`.
- **Phone number / NMLS data conflicts.** `index.html` JSON-LD says `+1-407-555-1234` and NMLS `2821608`; `homepage.md` says `(689) 210-3448` and NMLS `2718409`. The seed must pick one source of truth — proposal: `SiteSettings` is the canonical source, populated from `homepage.md` (the editorial copy), and the JSON-LD in the old `index.html` is treated as stale. Confirm with stakeholder before launch.
- **Localized slugs require a `localizationKey` convention.** Easy to forget on new pages. Mitigation: a `beforeChange` hook on `pages` defaults `localizationKey` to the English slug if not set, and admin UI shows the key prominently.

---

## 15. Implementation Outline (for the writing-plans skill)

The following is the order in which the implementation plan will be authored. This section is not an implementation plan itself — it lists the milestones the next planning step will expand.

1. Bootstrap project: `pnpm create payload-app -t website`, switch to Postgres, configure Vercel Blob + Resend.
2. Define data model: collections (Pages, Posts, LoanPrograms, FAQs, Reviews, Categories, Media, Users) and globals (Header, Footer, SiteSettings). Add localization config.
3. Define blocks: 18 block configs (Hero through FormEmbed) with localized fields.
4. Port the design system: Tailwind tokens, Poppins font, accent variable, logo assets.
5. Build chrome components: Topbar, Nav, Footer, StickyBar.
6. Build block renderers, one per block, matching the .zip visuals.
7. Build the dynamic page route `/[locale]/[[...slug]]` and post / loan-program detail routes.
8. Wire the SEO plugin and the JSON-LD builders.
9. Wire forms (Form Builder + Resend) and the client-side calculator.
10. Wire live preview and draft mode.
11. Build the seeder and run it locally; verify all .md files import cleanly.
12. Add sitemap, robots, hreflang.
13. Deploy preview to Vercel; smoke test with seeded content.
14. Production deploy + one-time seed; rotate `SEED_SECRET`.

Each of these will be broken into reviewable steps in the implementation plan.
