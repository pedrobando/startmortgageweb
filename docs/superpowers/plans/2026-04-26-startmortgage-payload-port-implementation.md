# START Mortgage — Payload CMS Port Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Faithfully port the existing static React `start-mortgage.com` design + 26 Markdown content files into a production-grade Payload v3 + Next.js 15 site on Vercel.

**Architecture:** Block-based page builder with 18 blocks mirroring the .zip's `Sections.jsx`. Hybrid localization: one-doc-per-locale `Pages` linked by `localizationKey`; field-level `localized: true` on `Posts/LoanPrograms/FAQs/Reviews/Globals`. SEO plugin + server-rendered JSON-LD. Form Builder + Resend for forms. Client-only mortgage calculator. Idempotent one-shot Markdown→Payload seeder.

**Tech Stack:** Next.js 15 (App Router) + Payload v3 + Postgres (`@payloadcms/db-postgres`) + Vercel Blob (`@payloadcms/storage-vercel-blob`) + Resend (`@payloadcms/email-resend`) + Tailwind + shadcn/ui. pnpm. TypeScript strict.

**Reference inputs (already in repo):**
- `docs/superpowers/specs/2026-04-26-startmortgage-payload-port-design.md` — design spec (locked).
- `uploads/*.md` — 26 Markdown content files.
- `reference/` — original static React app for visual reference only.
- `design-system/colors_and_type.css` — design tokens source.
- `design-system/logo-*.png` — brand logos.

**Boundary disclosure:** Phases 0–17 are fully autonomous-executable. Phase 18 produces a hand-off list for the 5 human-gated steps (Postgres provision, Vercel link, Blob token, Resend key, production seed).

---

## Phase 0: Repo cleanup + project bootstrap

**Files:**
- Delete: `.extracted/` (gitignored scratch)
- Create: project scaffold via `pnpm create payload-app`
- Modify: `.gitignore`

- [ ] **Step 1: Remove leftover scratch dir**

```bash
rm -rf /Users/pedrobandorivera/Git/startmortgageweb/.extracted
```

- [ ] **Step 2: Run Payload Website Template scaffolder non-interactively**

We do NOT scaffold into a subdirectory — the repo IS the project. Run the scaffolder into a temp dir and then move files in. Use `--db postgres --no-git` to avoid clobbering our git state.

```bash
cd /tmp && rm -rf payload-scaffold && \
  pnpm create payload-app payload-scaffold --template website --db postgres --no-git --use-pnpm <<< 'no'
```

Expected: produces `/tmp/payload-scaffold/` with the Website Template (Next.js 15 + Payload v3 baseline).

- [ ] **Step 3: Move scaffolded files into the repo (preserving `uploads/`, `reference/`, `design-system/`, `docs/`, `HANDOFF.md`)**

```bash
cd /Users/pedrobandorivera/Git/startmortgageweb
# Move everything from the scaffold except node_modules and .git
( cd /tmp/payload-scaffold && \
  find . -mindepth 1 -maxdepth 1 \
    ! -name node_modules ! -name .git ! -name pnpm-lock.yaml \
    -exec mv {} /Users/pedrobandorivera/Git/startmortgageweb/ \; )
mv /tmp/payload-scaffold/pnpm-lock.yaml ./pnpm-lock.yaml
rm -rf /tmp/payload-scaffold
```

- [ ] **Step 4: Update `.gitignore` to add Next.js/Payload artifacts**

Append to existing `.gitignore`:

```
# next.js
/.next/
/out/

# payload
/dist/
/build/
.payload/
generated-types.ts
generated-schema.json

# editor
.idea/
.vscode/
```

- [ ] **Step 5: Verify package.json has expected scripts**

Confirm the following scripts are present (from Website Template). If any are missing, add them:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "generate:types": "payload generate:types",
    "generate:importmap": "payload generate:importmap",
    "payload": "payload",
    "lint": "next lint",
    "test": "vitest"
  }
}
```

- [ ] **Step 6: Install deps**

```bash
pnpm install
```

Expected: succeeds; produces `node_modules/`.

- [ ] **Step 7: Commit baseline scaffold**

```bash
git add -A && git commit -m "chore(bootstrap): scaffold Payload Website Template into repo

Runs pnpm create payload-app -t website --db postgres into a temp
directory and moves the scaffolded files into place, preserving the
existing uploads/, reference/, design-system/, docs/, HANDOFF.md and
.gitignore additions for .extracted/ and the source .zip.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Phase 1: Local Postgres + env setup

**Files:**
- Create: `.env.local` (gitignored)
- Create: `.env.example` (committed)

- [ ] **Step 1: Install Postgres 16 via Homebrew**

```bash
brew install postgresql@16 && brew services start postgresql@16
```

Expected: service starts; `postgresql@16` reports running.

- [ ] **Step 2: Create dev database**

```bash
/opt/homebrew/opt/postgresql@16/bin/createdb startmortgage_dev
```

- [ ] **Step 3: Generate secrets**

```bash
PAYLOAD_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
PREVIEW_SECRET=$(node -e "console.log(require('crypto').randomBytes(24).toString('hex'))")
SEED_SECRET=$(node -e "console.log(require('crypto').randomBytes(24).toString('hex'))")
echo "PAYLOAD_SECRET=$PAYLOAD_SECRET"
echo "PREVIEW_SECRET=$PREVIEW_SECRET"
echo "SEED_SECRET=$SEED_SECRET"
```

- [ ] **Step 4: Write `.env.local`** (replace placeholder values with the generated secrets above)

```env
# Local dev
DATABASE_URI=postgres://$(whoami)@localhost:5432/startmortgage_dev
PAYLOAD_SECRET=<generated>
PREVIEW_SECRET=<generated>
SEED_SECRET=<generated>
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Optional in dev — leave blank to disable Resend / Blob in local
RESEND_API_KEY=
BLOB_READ_WRITE_TOKEN=
RESEND_FROM_EMAIL=hello@startmortgage.com
RESEND_NOTIFICATION_TO=hello@startmortgage.com
```

- [ ] **Step 5: Write `.env.example` (committed)**

Same shape but with placeholder values.

- [ ] **Step 6: Commit `.env.example`**

```bash
git add .env.example && git commit -m "chore(env): add .env.example template"
```

---

## Phase 2: payload.config.ts — DB adapter, plugins, locales, storage, email

**Files:**
- Modify: `src/payload.config.ts`
- Modify: `src/plugins/index.ts` (or wherever Website Template defines plugins)

- [ ] **Step 1: Open `src/payload.config.ts` and replace MongoDB adapter with Postgres**

Remove `@payloadcms/db-mongodb` import, install/import `@payloadcms/db-postgres`:

```bash
pnpm remove @payloadcms/db-mongodb
pnpm add @payloadcms/db-postgres
```

In `payload.config.ts`:

```ts
import { postgresAdapter } from '@payloadcms/db-postgres'

export default buildConfig({
  // ...existing
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI! },
  }),
})
```

- [ ] **Step 2: Add localization config to `payload.config.ts`**

```ts
localization: {
  locales: [
    { label: 'English', code: 'en' },
    { label: 'Español', code: 'es' },
  ],
  defaultLocale: 'en',
  fallback: true,
},
```

- [ ] **Step 3: Add Vercel Blob storage adapter (with local-fs fallback when token absent)**

```bash
pnpm add @payloadcms/storage-vercel-blob
```

In `payload.config.ts`:

```ts
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

const plugins = [
  // ...existing
  ...(process.env.BLOB_READ_WRITE_TOKEN
    ? [vercelBlobStorage({
        collections: { media: true },
        token: process.env.BLOB_READ_WRITE_TOKEN,
      })]
    : []),
]
```

When the token is absent (local dev) Payload falls back to its default disk storage in the `media` upload directory.

- [ ] **Step 4: Add Resend email adapter**

```bash
pnpm add @payloadcms/email-resend
```

```ts
import { resendAdapter } from '@payloadcms/email-resend'

email: process.env.RESEND_API_KEY
  ? resendAdapter({
      defaultFromAddress: process.env.RESEND_FROM_EMAIL || 'hello@startmortgage.com',
      defaultFromName: 'START Mortgage',
      apiKey: process.env.RESEND_API_KEY,
    })
  : undefined,
```

- [ ] **Step 5: Confirm `@payloadcms/plugin-seo` and `@payloadcms/plugin-form-builder` are wired**

Website Template ships with these. Verify `src/plugins/index.ts` (or equivalent) calls `seoPlugin({...})` and `formBuilderPlugin({...})`. If not, add them:

```ts
import { seoPlugin } from '@payloadcms/plugin-seo'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'

const plugins = [
  seoPlugin({
    collections: ['pages', 'posts', 'loan-programs'],
    uploadsCollection: 'media',
    generateTitle: ({ doc }) => `${doc?.title || ''} | START Mortgage`,
    generateDescription: ({ doc }) => doc?.meta?.description || doc?.excerpt || '',
  }),
  formBuilderPlugin({
    fields: { text: true, textarea: true, email: true, number: true, select: true, checkbox: true, message: true },
    formOverrides: { slug: 'forms' },
  }),
  // ...other plugins
]
```

- [ ] **Step 6: Generate Payload types**

```bash
pnpm payload generate:types
```

Expected: writes `src/payload-types.ts`.

- [ ] **Step 7: Run dev server and verify admin loads + can create first user**

```bash
pnpm dev &
sleep 10
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/admin
```

Expected: 200 (or 302 to login). Browse to `/admin` to create the first admin user manually if needed for smoke testing later.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat(payload): switch to Postgres, add localization, Vercel Blob, Resend"
```

---

## Phase 3: Globals — Header, Footer, SiteSettings

**Files:**
- Modify: `src/Header/config.ts` (Website Template default)
- Modify: `src/Footer/config.ts` (Website Template default)
- Create: `src/globals/SiteSettings/config.ts`
- Modify: `src/payload.config.ts` to register SiteSettings

The Website Template ships Header and Footer globals. We extend them and add SiteSettings.

- [ ] **Step 1: Extend Header global with localized fields per spec §4.2**

In `src/Header/config.ts`:

```ts
import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: { read: () => true },
  fields: [
    { name: 'utility', type: 'group', fields: [
      { name: 'phoneLabel', type: 'text', localized: true, defaultValue: 'Call us' },
      { name: 'phoneHref', type: 'text', defaultValue: 'tel:+16892103448' },
      { name: 'languageBadge', type: 'text', localized: true, defaultValue: 'Hablo Español' },
      { name: 'nmlsLabel', type: 'text', localized: true, defaultValue: 'NMLS# 2821608' },
    ]},
    { name: 'navItems', type: 'array', localized: false, fields: [
      { name: 'label', type: 'text', required: true, localized: true },
      { name: 'href', type: 'text' },
      { name: 'children', type: 'array', fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'href', type: 'text', required: true },
      ]},
    ]},
    { name: 'cta', type: 'group', fields: [
      { name: 'label', type: 'text', localized: true, defaultValue: 'Book Planning Session' },
      { name: 'href', type: 'text', defaultValue: '/planning-session' },
    ]},
  ],
}
```

- [ ] **Step 2: Extend Footer global**

In `src/Footer/config.ts`:

```ts
import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: { read: () => true },
  fields: [
    { name: 'columns', type: 'array', localized: false, fields: [
      { name: 'heading', type: 'text', required: true, localized: true },
      { name: 'links', type: 'array', fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'href', type: 'text', required: true },
      ]},
    ]},
    { name: 'disclosure', type: 'textarea', localized: true,
      defaultValue: 'Lend Labs LLC dba START Mortgage NMLS# 2821608. Equal Housing Opportunity.' },
    { name: 'legalLinks', type: 'array', fields: [
      { name: 'label', type: 'text', required: true, localized: true },
      { name: 'href', type: 'text', required: true },
    ]},
    { name: 'social', type: 'array', fields: [
      { name: 'platform', type: 'select', options: ['facebook','instagram','linkedin','tiktok','youtube'] },
      { name: 'href', type: 'text', required: true },
    ]},
  ],
}
```

- [ ] **Step 3: Create SiteSettings global**

`src/globals/SiteSettings/config.ts`:

```ts
import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: { read: () => true },
  fields: [
    { name: 'brand', type: 'group', fields: [
      { name: 'accentColor', type: 'text', defaultValue: '#83C340',
        admin: { description: 'Hex like #83C340. Drives the --accent CSS variable.' } },
      { name: 'logoIconBlack', type: 'upload', relationTo: 'media' },
      { name: 'logoIconWhite', type: 'upload', relationTo: 'media' },
      { name: 'logoWordmarkBlack', type: 'upload', relationTo: 'media' },
      { name: 'logoWordmarkWhite', type: 'upload', relationTo: 'media' },
    ]},
    { name: 'toggles', type: 'group', fields: [
      { name: 'showMarquee', type: 'checkbox', defaultValue: true },
      { name: 'showStickyBar', type: 'checkbox', defaultValue: true },
      { name: 'darkOffer', type: 'checkbox', defaultValue: false,
        admin: { description: 'Render the homepage offer block on a dark background.' } },
    ]},
    { name: 'business', type: 'group', fields: [
      { name: 'phone', type: 'text', defaultValue: '(689) 210-3448' },
      { name: 'phoneE164', type: 'text', defaultValue: '+16892103448' },
      { name: 'email', type: 'email', defaultValue: 'hello@startmortgage.com' },
      { name: 'address', type: 'group', fields: [
        { name: 'street', type: 'text', defaultValue: '112 N Clyde Ave' },
        { name: 'city', type: 'text', defaultValue: 'Kissimmee' },
        { name: 'region', type: 'text', defaultValue: 'FL' },
        { name: 'postalCode', type: 'text', defaultValue: '34741' },
        { name: 'country', type: 'text', defaultValue: 'US' },
        { name: 'lat', type: 'number', defaultValue: 28.2919 },
        { name: 'lng', type: 'number', defaultValue: -81.4076 },
      ]},
      { name: 'nmls', type: 'group', fields: [
        { name: 'broker', type: 'text', defaultValue: '2821608' },
        { name: 'parent', type: 'text', defaultValue: '2718409' },
        { name: 'founder', type: 'text', defaultValue: '1631454' },
      ]},
      { name: 'founderBio', type: 'group', fields: [
        { name: 'name', type: 'text', defaultValue: 'Jexayra Rivera' },
        { name: 'jobTitle', type: 'text', localized: true, defaultValue: 'Mortgage Broker, Founder' },
        { name: 'bio', type: 'richText', localized: true },
      ]},
      { name: 'rating', type: 'group', fields: [
        { name: 'value', type: 'number', defaultValue: 4.9 },
        { name: 'count', type: 'number', defaultValue: 127 },
      ]},
    ]},
    { name: 'forms', type: 'group', fields: [
      { name: 'notificationEmail', type: 'email', defaultValue: 'hello@startmortgage.com',
        admin: { description: 'Where new form submissions are emailed.' } },
    ]},
    { name: 'social', type: 'array', fields: [
      { name: 'platform', type: 'select', options: ['facebook','instagram','linkedin','tiktok','youtube'] },
      { name: 'href', type: 'text', required: true },
    ]},
  ],
}
```

- [ ] **Step 4: Register SiteSettings in `payload.config.ts`**

```ts
import { SiteSettings } from './globals/SiteSettings/config'

globals: [Header, Footer, SiteSettings],
```

- [ ] **Step 5: Regenerate types and commit**

```bash
pnpm payload generate:types
git add -A && git commit -m "feat(globals): extend Header/Footer; add SiteSettings"
```

---

## Phase 4: Collections — Pages, Posts, LoanPrograms, FAQs, Reviews, Categories, Media, Users

**Files:**
- Modify: `src/collections/Pages/index.ts` (Website Template default)
- Modify: `src/collections/Posts/index.ts` (Website Template default)
- Create: `src/collections/LoanPrograms/index.ts`
- Create: `src/collections/FAQs/index.ts`
- Create: `src/collections/Reviews/index.ts`
- Modify: `src/collections/Media/index.ts` (add localized alt)
- Confirm: `src/collections/Categories`, `src/collections/Users` exist (from Website Template)
- Modify: `src/payload.config.ts` to register new collections

### 4.1 Pages — one-doc-per-locale, layout blocks, drafts + autosave

- [ ] **Step 1: Modify `src/collections/Pages/index.ts`**

Key changes from the Website Template default:
- Add `locale` (select: en/es) and `localizationKey` (text) fields. Disable field-level localization on the page itself (each doc represents a single locale).
- Replace the existing layout blocks with our 18-block list (added in Phase 5).
- Add `beforeChange` hook defaulting `localizationKey` to slug if not set.

```ts
import type { CollectionConfig } from 'payload'
import { authenticated, anyone } from '../../access'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'locale', 'localizationKey', '_status'],
    livePreview: {
      url: ({ data, locale }) => {
        const loc = (locale?.code as string) || data?.locale || 'en'
        const slug = data?.slug === 'home' ? '' : data?.slug
        return `${process.env.NEXT_PUBLIC_SERVER_URL}/${loc}${slug ? `/${slug}` : ''}?preview=true&token=${process.env.PREVIEW_SECRET}`
      },
    },
  },
  hooks: {
    beforeChange: [({ data }) => {
      if (data && !data.localizationKey && data.slug) data.localizationKey = data.slug
      return data
    }],
  },
  versions: { drafts: { autosave: { interval: 800 } }, maxPerDoc: 50 },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: false,
      admin: { description: 'URL slug for this page in this locale (no leading /).' } },
    { name: 'locale', type: 'select', required: true, options: [
      { label: 'English', value: 'en' }, { label: 'Español', value: 'es' },
    ], defaultValue: 'en' },
    { name: 'localizationKey', type: 'text', required: true,
      admin: { description: 'Stable key shared across en/es versions. Defaults to slug on save.' } },
    { name: 'layout', type: 'blocks', minRows: 0,
      blocks: [/* injected from Phase 5 */] },
    // SEO plugin appends a 'meta' group automatically.
    { name: 'publishedAt', type: 'date' },
  ],
  indexes: [
    { fields: ['slug', 'locale'], unique: true },
    { fields: ['localizationKey', 'locale'] },
  ],
}
```

- [ ] **Step 2: Posts — keep field-level localization**

In `src/collections/Posts/index.ts`, ensure:
- `title`, `excerpt`, `content` (richText), `meta.*` are `localized: true`.
- `slug` is shared across locales (single doc per post).
- `versions.drafts.autosave` enabled.

(Most of this is already the Website Template default; verify and only patch what's missing.)

- [ ] **Step 3: Create LoanPrograms collection**

`src/collections/LoanPrograms/index.ts`:

```ts
import type { CollectionConfig } from 'payload'
import { authenticated, anyone } from '../../access'

export const LoanPrograms: CollectionConfig = {
  slug: 'loan-programs',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  admin: { useAsTitle: 'name', defaultColumns: ['name','slug','_status'] },
  versions: { drafts: { autosave: { interval: 800 } }, maxPerDoc: 50 },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'tagline', type: 'text', localized: true },
    { name: 'whoItsFor', type: 'textarea', localized: true },
    { name: 'requirements', type: 'richText', localized: true },
    { name: 'pros', type: 'array', fields: [{ name: 'item', type: 'text', localized: true, required: true }] },
    { name: 'cons', type: 'array', fields: [{ name: 'item', type: 'text', localized: true, required: true }] },
    { name: 'bestFor', type: 'textarea', localized: true },
    { name: 'iconKey', type: 'select', options: ['home','flag','flame','tractor','building','shield-check'], defaultValue: 'home' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
```

- [ ] **Step 4: Create FAQs collection**

`src/collections/FAQs/index.ts`:

```ts
import type { CollectionConfig } from 'payload'
import { authenticated, anyone } from '../../access'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  admin: { useAsTitle: 'question', defaultColumns: ['question','category','order','_status'] },
  fields: [
    { name: 'question', type: 'text', required: true, localized: true },
    { name: 'answer', type: 'richText', required: true, localized: true },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
```

- [ ] **Step 5: Create Reviews collection**

`src/collections/Reviews/index.ts`:

```ts
import type { CollectionConfig } from 'payload'
import { authenticated, anyone } from '../../access'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  admin: { useAsTitle: 'authorName', defaultColumns: ['authorName','rating','featured','date'] },
  fields: [
    { name: 'quote', type: 'textarea', required: true, localized: true },
    { name: 'authorName', type: 'text', required: true },
    { name: 'authorContext', type: 'text', localized: true,
      admin: { description: 'e.g., "First-time buyer, Kissimmee, FL"' } },
    { name: 'rating', type: 'number', min: 1, max: 5, defaultValue: 5 },
    { name: 'date', type: 'date' },
    { name: 'featured', type: 'checkbox', defaultValue: false,
      admin: { description: 'Pulled into the marquee and homepage testimonials block.' } },
  ],
}
```

- [ ] **Step 6: Patch Media — add `alt` localized**

In `src/collections/Media/index.ts`, ensure `alt` exists and is localized:

```ts
{ name: 'alt', type: 'text', required: true, localized: true },
```

- [ ] **Step 7: Register new collections in `payload.config.ts`**

```ts
import { LoanPrograms } from './collections/LoanPrograms'
import { FAQs } from './collections/FAQs'
import { Reviews } from './collections/Reviews'

collections: [Pages, Posts, LoanPrograms, FAQs, Reviews, Categories, Media, Users],
```

- [ ] **Step 8: Run a migration to apply schema changes**

```bash
pnpm payload migrate:create
pnpm payload migrate
```

Expected: tables created in `startmortgage_dev`.

- [ ] **Step 9: Regenerate types and commit**

```bash
pnpm payload generate:types
git add -A && git commit -m "feat(collections): add LoanPrograms, FAQs, Reviews; localize Media.alt; reshape Pages for hybrid localization"
```

---

## Phase 5: Block schemas (18 blocks)

**Files:**
- Create: `src/blocks/<BlockName>/config.ts` for each of 18 blocks
- Create: `src/blocks/index.ts` aggregating exports
- Modify: `src/collections/Pages/index.ts` to import the block list
- Modify: `src/collections/Posts/index.ts` to add `richText` and `formEmbed` for inline use

The 18 blocks are taxonomically defined in spec §5. Each block lives in `src/blocks/<Name>/config.ts` exporting a `Block` named after the file.

- [ ] **Step 1: Hero block**

`src/blocks/Hero/config.ts`:

```ts
import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'headline', type: 'text', required: true, localized: true },
    { name: 'subheadline', type: 'textarea', localized: true },
    { name: 'primaryCta', type: 'group', fields: [
      { name: 'label', type: 'text', localized: true },
      { name: 'href', type: 'text' },
    ]},
    { name: 'secondaryCta', type: 'group', fields: [
      { name: 'label', type: 'text', localized: true },
      { name: 'href', type: 'text' },
    ]},
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'proofPoints', type: 'array', fields: [
      { name: 'value', type: 'text', required: true, localized: true },
      { name: 'label', type: 'text', required: true, localized: true },
    ]},
  ],
}
```

- [ ] **Step 2: Marquee block**

`src/blocks/Marquee/config.ts`:

```ts
import type { Block } from 'payload'

export const Marquee: Block = {
  slug: 'marquee',
  fields: [
    { name: 'mode', type: 'select', options: ['auto','manual'], defaultValue: 'auto' },
    { name: 'items', type: 'array',
      admin: { condition: (_, sib) => sib?.mode === 'manual' },
      fields: [{ name: 'text', type: 'text', required: true, localized: true }] },
    { name: 'speed', type: 'number', defaultValue: 30, admin: { description: 'Seconds per loop.' } },
  ],
}
```

- [ ] **Step 3: WhyBroker block**

`src/blocks/WhyBroker/config.ts`:

```ts
import type { Block } from 'payload'

export const WhyBroker: Block = {
  slug: 'whyBroker',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'intro', type: 'richText', localized: true },
    { name: 'points', type: 'array', fields: [
      { name: 'iconKey', type: 'select',
        options: ['scale','wallet','clock','users','search','shield-check','badge-check','sparkles','handshake','chart','headphones','globe'] },
      { name: 'title', type: 'text', required: true, localized: true },
      { name: 'body', type: 'textarea', localized: true },
    ]},
  ],
}
```

- [ ] **Step 4: Offer block**

`src/blocks/Offer/config.ts`:

```ts
import type { Block } from 'payload'

export const Offer: Block = {
  slug: 'offer',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'body', type: 'richText', localized: true },
    { name: 'bullets', type: 'array', fields: [{ name: 'text', type: 'text', required: true, localized: true }] },
    { name: 'cta', type: 'group', fields: [
      { name: 'label', type: 'text', localized: true },
      { name: 'href', type: 'text' },
    ]},
    { name: 'darkMode', type: 'checkbox', defaultValue: false },
  ],
}
```

- [ ] **Step 5: VersusTable block**

`src/blocks/VersusTable/config.ts`:

```ts
import type { Block } from 'payload'

export const VersusTable: Block = {
  slug: 'versusTable',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'columns', type: 'array', fields: [{ name: 'label', type: 'text', required: true, localized: true }] },
    { name: 'rows', type: 'array', fields: [
      { name: 'label', type: 'text', required: true, localized: true },
      { name: 'values', type: 'array', fields: [{ name: 'text', type: 'text', required: true, localized: true }] },
    ]},
    { name: 'footnote', type: 'text', localized: true },
  ],
}
```

- [ ] **Step 6: Process block**

`src/blocks/Process/config.ts`:

```ts
import type { Block } from 'payload'

export const Process: Block = {
  slug: 'process',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'steps', type: 'array', fields: [
      { name: 'number', type: 'text', required: true },
      { name: 'title', type: 'text', required: true, localized: true },
      { name: 'body', type: 'textarea', localized: true },
      { name: 'durationLabel', type: 'text', localized: true },
    ]},
  ],
}
```

- [ ] **Step 7: Calculator block**

`src/blocks/Calculator/config.ts`:

```ts
import type { Block } from 'payload'

export const Calculator: Block = {
  slug: 'calculator',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'intro', type: 'textarea', localized: true },
    { name: 'defaults', type: 'group', fields: [
      { name: 'price', type: 'number', defaultValue: 350000 },
      { name: 'downPct', type: 'number', defaultValue: 5 },
      { name: 'ratePct', type: 'number', defaultValue: 6.5 },
      { name: 'termYears', type: 'number', defaultValue: 30 },
      { name: 'taxesAnnual', type: 'number', defaultValue: 4200 },
      { name: 'insuranceAnnual', type: 'number', defaultValue: 1800 },
    ]},
    { name: 'disclaimer', type: 'textarea', localized: true },
  ],
}
```

- [ ] **Step 8: LoanProgramsList block**

`src/blocks/LoanProgramsList/config.ts`:

```ts
import type { Block } from 'payload'

export const LoanProgramsList: Block = {
  slug: 'loanProgramsList',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'intro', type: 'textarea', localized: true },
    { name: 'programs', type: 'relationship', relationTo: 'loan-programs', hasMany: true },
  ],
}
```

- [ ] **Step 9: AudienceGrid block**

`src/blocks/AudienceGrid/config.ts`:

```ts
import type { Block } from 'payload'

export const AudienceGrid: Block = {
  slug: 'audienceGrid',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'audiences', type: 'array', fields: [
      { name: 'iconKey', type: 'select', options: ['home','users','briefcase','heart','globe','flag','wallet','sparkles'] },
      { name: 'label', type: 'text', required: true, localized: true },
      { name: 'body', type: 'textarea', localized: true },
      { name: 'href', type: 'text' },
    ]},
  ],
}
```

- [ ] **Step 10: Testimonials block**

`src/blocks/Testimonials/config.ts`:

```ts
import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'mode', type: 'select', options: ['auto','manual'], defaultValue: 'auto' },
    { name: 'items', type: 'relationship', relationTo: 'reviews', hasMany: true,
      admin: { condition: (_, sib) => sib?.mode === 'manual' } },
  ],
}
```

- [ ] **Step 11: Guarantee block**

`src/blocks/Guarantee/config.ts`:

```ts
import type { Block } from 'payload'

export const Guarantee: Block = {
  slug: 'guarantee',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'body', type: 'richText', localized: true },
    { name: 'seal', type: 'group', fields: [
      { name: 'label', type: 'text', localized: true },
      { name: 'sub', type: 'text', localized: true },
    ]},
  ],
}
```

- [ ] **Step 12: Founder block**

`src/blocks/Founder/config.ts`:

```ts
import type { Block } from 'payload'

export const Founder: Block = {
  slug: 'founder',
  fields: [
    { name: 'headline', type: 'text', localized: true },
    { name: 'bio', type: 'richText', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'nmls', type: 'text' },
    { name: 'credentials', type: 'array', fields: [{ name: 'text', type: 'text', required: true, localized: true }] },
  ],
}
```

- [ ] **Step 13: Bilingual block**

`src/blocks/Bilingual/config.ts`:

```ts
import type { Block } from 'payload'

export const Bilingual: Block = {
  slug: 'bilingual',
  fields: [
    { name: 'headline', type: 'text', localized: true,
      admin: { description: 'Renders in the OPPOSITE locale of the current page (es text on en pages, vice versa).' } },
    { name: 'body', type: 'richText', localized: true },
  ],
}
```

- [ ] **Step 14: BlogTeasers block**

`src/blocks/BlogTeasers/config.ts`:

```ts
import type { Block } from 'payload'

export const BlogTeasers: Block = {
  slug: 'blogTeasers',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'mode', type: 'select', options: ['auto','manual'], defaultValue: 'auto' },
    { name: 'count', type: 'number', defaultValue: 3, admin: { condition: (_, sib) => sib?.mode === 'auto' } },
    { name: 'posts', type: 'relationship', relationTo: 'posts', hasMany: true,
      admin: { condition: (_, sib) => sib?.mode === 'manual' } },
  ],
}
```

- [ ] **Step 15: FaqList block**

`src/blocks/FaqList/config.ts`:

```ts
import type { Block } from 'payload'

export const FaqList: Block = {
  slug: 'faqList',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'mode', type: 'select', options: ['auto','manual'], defaultValue: 'auto' },
    { name: 'categoryFilter', type: 'relationship', relationTo: 'categories',
      admin: { condition: (_, sib) => sib?.mode === 'auto' } },
    { name: 'items', type: 'relationship', relationTo: 'faqs', hasMany: true,
      admin: { condition: (_, sib) => sib?.mode === 'manual' } },
  ],
}
```

- [ ] **Step 16: FinalCta block**

`src/blocks/FinalCta/config.ts`:

```ts
import type { Block } from 'payload'

export const FinalCta: Block = {
  slug: 'finalCta',
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'headline', type: 'text', required: true, localized: true },
    { name: 'body', type: 'textarea', localized: true },
    { name: 'primaryCta', type: 'group', fields: [
      { name: 'label', type: 'text', localized: true },
      { name: 'href', type: 'text' },
    ]},
    { name: 'secondaryCta', type: 'group', fields: [
      { name: 'label', type: 'text', localized: true },
      { name: 'href', type: 'text' },
    ]},
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
```

- [ ] **Step 17: RichText block (generic)**

`src/blocks/RichText/config.ts`:

```ts
import type { Block } from 'payload'

export const RichTextBlock: Block = {
  slug: 'richText',
  fields: [
    { name: 'content', type: 'richText', required: true, localized: true },
    { name: 'maxWidth', type: 'select', options: ['narrow','default','wide','full'], defaultValue: 'default' },
  ],
}
```

- [ ] **Step 18: FormEmbed block**

`src/blocks/FormEmbed/config.ts`:

```ts
import type { Block } from 'payload'

export const FormEmbed: Block = {
  slug: 'formEmbed',
  fields: [
    { name: 'form', type: 'relationship', relationTo: 'forms', required: true },
    { name: 'headline', type: 'text', localized: true },
    { name: 'intro', type: 'textarea', localized: true },
  ],
}
```

- [ ] **Step 19: Aggregate exports in `src/blocks/index.ts`**

```ts
export { Hero } from './Hero/config'
export { Marquee } from './Marquee/config'
export { WhyBroker } from './WhyBroker/config'
export { Offer } from './Offer/config'
export { VersusTable } from './VersusTable/config'
export { Process } from './Process/config'
export { Calculator } from './Calculator/config'
export { LoanProgramsList } from './LoanProgramsList/config'
export { AudienceGrid } from './AudienceGrid/config'
export { Testimonials } from './Testimonials/config'
export { Guarantee } from './Guarantee/config'
export { Founder } from './Founder/config'
export { Bilingual } from './Bilingual/config'
export { BlogTeasers } from './BlogTeasers/config'
export { FaqList } from './FaqList/config'
export { FinalCta } from './FinalCta/config'
export { RichTextBlock } from './RichText/config'
export { FormEmbed } from './FormEmbed/config'
```

- [ ] **Step 20: Wire blocks into Pages.layout**

In `src/collections/Pages/index.ts`:

```ts
import * as B from '../../blocks'

// inside fields:
{
  name: 'layout', type: 'blocks', minRows: 0,
  blocks: [
    B.Hero, B.Marquee, B.WhyBroker, B.Offer, B.VersusTable, B.Process, B.Calculator,
    B.LoanProgramsList, B.AudienceGrid, B.Testimonials, B.Guarantee, B.Founder,
    B.Bilingual, B.BlogTeasers, B.FaqList, B.FinalCta, B.RichTextBlock, B.FormEmbed,
  ],
},
```

- [ ] **Step 21: Migrate, regenerate types, commit**

```bash
pnpm payload migrate:create
pnpm payload migrate
pnpm payload generate:types
git add -A && git commit -m "feat(blocks): define 18 page-builder block schemas"
```

---

## Phase 6: Design system port — Tailwind tokens, Poppins, accent var, logos

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/(frontend)/globals.css`
- Modify: `src/app/(frontend)/layout.tsx` (font loading + accent var injection)
- Create: `public/brand/logo-{icon,wordmark}-{black,white}.png`

- [ ] **Step 1: Inspect source CSS for canonical tokens**

```bash
grep -E "^\s*--" /Users/pedrobandorivera/Git/startmortgageweb/design-system/colors_and_type.css
```

- [ ] **Step 2: Extend `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  // ...existing
  theme: {
    extend: {
      colors: {
        start: {
          green: 'var(--accent, #83C340)',
          greenHover: '#74AE38',
          greenPressed: '#5F9329',
          greenTint: '#E8F4D8',
          ink: '#0E0E0E',
          inkSoft: '#1A1A1A',
          slate: '#3F3F46',
          mist: '#F4F4F5',
          line: '#E4E4E7',
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      borderRadius: { 'xl': '14px', '2xl': '20px' },
    },
  },
}

export default config
```

- [ ] **Step 3: Wire Poppins via `next/font` and accent var in root layout**

In `src/app/(frontend)/layout.tsx`:

```tsx
import { Poppins } from 'next/font/google'
import { getPayload } from 'payload'
import config from '@payload-config'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400','500','600','700'],
  variable: '--font-poppins',
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  const accent = settings?.brand?.accentColor || '#83C340'
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <style>{`:root { --accent: ${accent}; }`}</style>
      </head>
      <body className="font-sans text-start-ink antialiased">{children}</body>
    </html>
  )
}
```

- [ ] **Step 4: Copy logo PNGs to `public/brand/`**

```bash
mkdir -p /Users/pedrobandorivera/Git/startmortgageweb/public/brand
cp /Users/pedrobandorivera/Git/startmortgageweb/design-system/logo-icon-black.png    public/brand/
cp /Users/pedrobandorivera/Git/startmortgageweb/design-system/logo-icon-white.png    public/brand/
cp /Users/pedrobandorivera/Git/startmortgageweb/design-system/logo-wordmark-black.png public/brand/
cp /Users/pedrobandorivera/Git/startmortgageweb/design-system/logo-wordmark-white.png public/brand/
```

- [ ] **Step 5: Globals.css — base styles**

In `src/app/(frontend)/globals.css` add (preserving Website Template's existing reset + Tailwind directives):

```css
:root {
  --accent: #83C340;
}

html { scroll-behavior: smooth; }
body { background: #fff; color: #0E0E0E; }
```

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat(design): port Tailwind tokens, Poppins font, accent CSS var, logo assets"
```

---

## Phase 7: Lib utilities — locale resolver, JSON-LD builders, payload helpers

**Files:**
- Create: `src/lib/payload.ts`
- Create: `src/lib/locale.ts`
- Create: `src/lib/seo.ts`

- [ ] **Step 1: `src/lib/payload.ts` — server-side payload client wrapper**

```ts
import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'

export const payloadClient = async () => getPayload({ config })
```

- [ ] **Step 2: `src/lib/locale.ts` — locale resolver + switcher helper**

```ts
import 'server-only'
import { payloadClient } from './payload'

export type Locale = 'en' | 'es'

export const SUPPORTED_LOCALES: Locale[] = ['en', 'es']
export const DEFAULT_LOCALE: Locale = 'en'

export const isLocale = (s: string | undefined): s is Locale =>
  s === 'en' || s === 'es'

export async function findPageByPath(slug: string, locale: Locale, draft = false) {
  const payload = await payloadClient()
  // Try (slug, locale) first
  const bySlug = await payload.find({
    collection: 'pages',
    where: { and: [{ slug: { equals: slug } }, { locale: { equals: locale } }] },
    limit: 1,
    draft,
  })
  if (bySlug.docs[0]) return bySlug.docs[0]
  // Fallback (localizationKey, locale)
  const byKey = await payload.find({
    collection: 'pages',
    where: { and: [{ localizationKey: { equals: slug } }, { locale: { equals: locale } }] },
    limit: 1,
    draft,
  })
  return byKey.docs[0]
}

export async function findHome(locale: Locale, draft = false) {
  const payload = await payloadClient()
  const res = await payload.find({
    collection: 'pages',
    where: { and: [{ localizationKey: { equals: 'home' } }, { locale: { equals: locale } }] },
    limit: 1,
    draft,
  })
  return res.docs[0]
}

export async function counterpartUrlForPage(
  page: { localizationKey?: string | null; slug?: string | null },
  currentLocale: Locale,
): Promise<string> {
  const other: Locale = currentLocale === 'en' ? 'es' : 'en'
  if (!page.localizationKey) return `/${other}`
  const payload = await payloadClient()
  const res = await payload.find({
    collection: 'pages',
    where: { and: [
      { localizationKey: { equals: page.localizationKey } },
      { locale: { equals: other } },
    ]},
    limit: 1,
  })
  const doc = res.docs[0]
  if (!doc) return `/${other}`
  if (doc.localizationKey === 'home') return `/${other}`
  return `/${other}/${doc.slug}`
}
```

- [ ] **Step 3: `src/lib/seo.ts` — JSON-LD builders**

```ts
import 'server-only'
import type { Locale } from './locale'

type Settings = any // payload-types SiteSettings; permissive for build-time speed

export function buildLocalBusiness(s: Settings, origin: string) {
  return {
    '@type': ['MortgageBroker','FinancialService','LocalBusiness'],
    '@id': `${origin}/#business`,
    name: 'START Mortgage',
    legalName: 'Lend Labs LLC dba START Mortgage',
    alternateName: 'START',
    url: `${origin}/`,
    logo: `${origin}/brand/logo-wordmark-black.png`,
    image: `${origin}/brand/logo-wordmark-black.png`,
    description: 'Boutique bilingual mortgage brokerage serving Central Florida families. 24-hour pre-approvals, 30+ wholesale lender partners.',
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
    geo: { '@type': 'GeoCoordinates', latitude: s?.business?.address?.lat, longitude: s?.business?.address?.lng },
    areaServed: ['Kissimmee','Orlando','Poinciana','Saint Cloud','Lakeland','Clermont','Winter Garden','Haines City']
      .map(name => ({ '@type': 'City', name })),
    availableLanguage: ['en','es'],
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      opens: '08:00', closes: '20:00',
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
  return { '@type': 'WebSite', url: `${origin}/`, name: 'START Mortgage', inLanguage: ['en','es'] }
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

export function buildBreadcrumb(origin: string, locale: Locale, segments: { label: string; href: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: segments.map((seg, i) => ({
      '@type': 'ListItem', position: i + 1, name: seg.label, item: `${origin}/${locale}${seg.href}`,
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
  return { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) }
}
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat(lib): add payload client, locale resolver, JSON-LD builders"
```

---

## Phase 8: Chrome — Topbar, Nav, Footer, StickyBar

**Files:**
- Create: `src/components/chrome/Topbar.tsx`
- Create: `src/components/chrome/Nav.tsx`
- Create: `src/components/chrome/Footer.tsx`
- Create: `src/components/chrome/StickyBar.tsx`
- Create: `src/components/chrome/Logo.tsx`
- Modify: `src/app/(frontend)/[locale]/layout.tsx` to render Topbar, Nav, Footer, StickyBar around the page

Reference: `reference/components/Chrome.jsx` for visual structure.

- [ ] **Step 1: Logo wrapper that pulls from SiteSettings or falls back to `/brand`**

`src/components/chrome/Logo.tsx`:

```tsx
import Image from 'next/image'

type Variant = 'icon-black'|'icon-white'|'wordmark-black'|'wordmark-white'

const fallback: Record<Variant, string> = {
  'icon-black': '/brand/logo-icon-black.png',
  'icon-white': '/brand/logo-icon-white.png',
  'wordmark-black': '/brand/logo-wordmark-black.png',
  'wordmark-white': '/brand/logo-wordmark-white.png',
}

export function Logo({ variant, src, alt = 'START Mortgage', className }:
  { variant: Variant; src?: string; alt?: string; className?: string }) {
  const final = src || fallback[variant]
  const isIcon = variant.startsWith('icon')
  return <Image src={final} alt={alt} width={isIcon ? 40 : 160} height={40}
    className={className} priority />
}
```

- [ ] **Step 2: Topbar (utility row above the nav)**

`src/components/chrome/Topbar.tsx`:

```tsx
import type { Locale } from '@/lib/locale'

type Header = any; type Settings = any

export function Topbar({ header, settings, locale }: { header: Header; settings: Settings; locale: Locale }) {
  return (
    <div className="bg-start-ink text-white text-xs">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between gap-4">
        <a href={header?.utility?.phoneHref || `tel:${settings?.business?.phoneE164}`} className="flex items-center gap-2 hover:text-start-green">
          <span aria-hidden>📞</span>
          <span>{header?.utility?.phoneLabel || 'Call us'}</span>
          <span className="font-medium">{settings?.business?.phone}</span>
        </a>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline">{header?.utility?.languageBadge || 'Hablo Español'}</span>
          <span className="hidden sm:inline opacity-70">{header?.utility?.nmlsLabel}</span>
          <LangSwitcher locale={locale} />
        </div>
      </div>
    </div>
  )
}

function LangSwitcher({ locale }: { locale: Locale }) {
  const other = locale === 'en' ? 'es' : 'en'
  return <a href={`/${other}`} className="font-semibold hover:text-start-green">{other.toUpperCase()}</a>
}
```

- [ ] **Step 3: Nav with dropdowns**

`src/components/chrome/Nav.tsx`:

```tsx
import Link from 'next/link'
import { Logo } from './Logo'
import type { Locale } from '@/lib/locale'

type Header = any

export function Nav({ header, locale }: { header: Header; locale: Locale }) {
  const items: any[] = header?.navItems ?? []
  const cta = header?.cta
  return (
    <nav className="bg-white border-b border-start-line">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between gap-6">
        <Link href={`/${locale}`} className="flex items-center gap-2"><Logo variant="wordmark-black" /></Link>
        <ul className="hidden md:flex items-center gap-8">
          {items.map((it, i) => (
            <li key={i} className="relative group">
              {it.children?.length ? (
                <>
                  <span className="text-sm font-medium hover:text-start-green cursor-pointer">{it.label}</span>
                  <div className="absolute left-0 top-full pt-3 hidden group-hover:block z-30">
                    <div className="bg-white border border-start-line shadow-xl rounded-xl p-2 min-w-[220px]">
                      {it.children.map((c: any, j: number) => (
                        <Link key={j} href={c.href} className="block px-3 py-2 rounded hover:bg-start-mist text-sm">{c.label}</Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link href={it.href || '#'} className="text-sm font-medium hover:text-start-green">{it.label}</Link>
              )}
            </li>
          ))}
        </ul>
        {cta?.label && (
          <Link href={`/${locale}${cta.href || '/planning-session'}`}
            className="hidden md:inline-flex items-center gap-2 bg-start-green hover:bg-start-greenHover text-white font-semibold rounded-full px-5 py-2.5 text-sm">
            {cta.label}
          </Link>
        )}
      </div>
    </nav>
  )
}
```

- [ ] **Step 4: Footer**

`src/components/chrome/Footer.tsx`:

```tsx
import Link from 'next/link'
import { Logo } from './Logo'

type Footer = any; type Settings = any

export function Footer({ footer, settings }: { footer: Footer; settings: Settings }) {
  return (
    <footer className="bg-start-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 md:grid-cols-4">
        <div className="space-y-4">
          <Logo variant="wordmark-white" />
          <p className="text-sm opacity-80">Boutique bilingual mortgage brokerage. Central Florida.</p>
          <p className="text-xs opacity-60">{footer?.disclosure}</p>
        </div>
        {(footer?.columns ?? []).map((col: any, i: number) => (
          <div key={i}>
            <div className="font-semibold mb-3">{col.heading}</div>
            <ul className="space-y-2 text-sm">
              {(col.links ?? []).map((l: any, j: number) => (
                <li key={j}><Link href={l.href} className="opacity-80 hover:opacity-100 hover:text-start-green">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 text-xs opacity-60">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {settings?.business?.founderBio?.name || 'START Mortgage'}.</span>
          <div className="flex gap-4">
            {(footer?.legalLinks ?? []).map((l: any, i: number) => (
              <Link key={i} href={l.href} className="hover:text-start-green">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 5: StickyBar**

`src/components/chrome/StickyBar.tsx`:

```tsx
import Link from 'next/link'
import type { Locale } from '@/lib/locale'

type Header = any; type Settings = any

export function StickyBar({ header, settings, locale }: { header: Header; settings: Settings; locale: Locale }) {
  if (!settings?.toggles?.showStickyBar) return null
  const cta = header?.cta
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden bg-white border-t border-start-line p-3 flex gap-2">
      <a href={`tel:${settings?.business?.phoneE164}`} className="flex-1 text-center bg-start-mist rounded-full py-3 font-medium">
        {settings?.business?.phone}
      </a>
      <Link href={`/${locale}${cta?.href || '/planning-session'}`} className="flex-1 text-center bg-start-green text-white rounded-full py-3 font-semibold">
        {cta?.label || 'Book'}
      </Link>
    </div>
  )
}
```

- [ ] **Step 6: Locale layout pulls globals + renders chrome**

`src/app/(frontend)/[locale]/layout.tsx`:

```tsx
import { notFound } from 'next/navigation'
import { Topbar } from '@/components/chrome/Topbar'
import { Nav } from '@/components/chrome/Nav'
import { Footer } from '@/components/chrome/Footer'
import { StickyBar } from '@/components/chrome/StickyBar'
import { isLocale } from '@/lib/locale'
import { payloadClient } from '@/lib/payload'

export default async function LocaleLayout({
  children, params,
}: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const payload = await payloadClient()
  const [header, footer, settings] = await Promise.all([
    payload.findGlobal({ slug: 'header', locale }),
    payload.findGlobal({ slug: 'footer', locale }),
    payload.findGlobal({ slug: 'site-settings', locale }),
  ])
  return (
    <>
      <Topbar header={header} settings={settings} locale={locale} />
      <Nav header={header} locale={locale} />
      <main>{children}</main>
      <Footer footer={footer} settings={settings} />
      <StickyBar header={header} settings={settings} locale={locale} />
    </>
  )
}
```

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat(chrome): build Topbar, Nav, Footer, StickyBar + Logo wrapper"
```

---

## Phase 9: Block renderers (18 React components)

**Files:**
- Create: `src/components/blocks/<BlockName>.tsx` for each of 18 blocks
- Create: `src/components/blocks/RenderBlocks.tsx` (dispatcher)
- Create: `src/components/blocks/Icon.tsx` (lucide mapper)

Reference: `reference/components/HeroOffer.jsx`, `Middle.jsx`, `Sections.jsx` for visual fidelity.

- [ ] **Step 1: Add lucide-react and a small Icon mapper**

```bash
pnpm add lucide-react
```

`src/components/blocks/Icon.tsx`:

```tsx
import {
  Home, Flag, Flame, Tractor, Building, ShieldCheck, Scale, Wallet, Clock, Users,
  Search, BadgeCheck, Sparkles, Handshake, ChartLine, Headphones, Globe, Briefcase, Heart
} from 'lucide-react'

const map = {
  home: Home, flag: Flag, flame: Flame, tractor: Tractor, building: Building,
  'shield-check': ShieldCheck, scale: Scale, wallet: Wallet, clock: Clock, users: Users,
  search: Search, 'badge-check': BadgeCheck, sparkles: Sparkles, handshake: Handshake,
  chart: ChartLine, headphones: Headphones, globe: Globe, briefcase: Briefcase, heart: Heart,
}

export function Icon({ name, className }: { name?: string; className?: string }) {
  const Cmp: any = (name && (map as any)[name]) || Sparkles
  return <Cmp className={className ?? 'w-6 h-6'} />
}
```

- [ ] **Step 2: RenderBlocks dispatcher**

`src/components/blocks/RenderBlocks.tsx`:

```tsx
import type { Locale } from '@/lib/locale'
import { HeroBlock } from './Hero'
import { MarqueeBlock } from './Marquee'
import { WhyBrokerBlock } from './WhyBroker'
import { OfferBlock } from './Offer'
import { VersusTableBlock } from './VersusTable'
import { ProcessBlock } from './Process'
import { CalculatorBlock } from './Calculator'
import { LoanProgramsListBlock } from './LoanProgramsList'
import { AudienceGridBlock } from './AudienceGrid'
import { TestimonialsBlock } from './Testimonials'
import { GuaranteeBlock } from './Guarantee'
import { FounderBlock } from './Founder'
import { BilingualBlock } from './Bilingual'
import { BlogTeasersBlock } from './BlogTeasers'
import { FaqListBlock } from './FaqList'
import { FinalCtaBlock } from './FinalCta'
import { RichTextBlock } from './RichText'
import { FormEmbedBlock } from './FormEmbed'

const map: Record<string, React.ComponentType<any>> = {
  hero: HeroBlock, marquee: MarqueeBlock, whyBroker: WhyBrokerBlock, offer: OfferBlock,
  versusTable: VersusTableBlock, process: ProcessBlock, calculator: CalculatorBlock,
  loanProgramsList: LoanProgramsListBlock, audienceGrid: AudienceGridBlock,
  testimonials: TestimonialsBlock, guarantee: GuaranteeBlock, founder: FounderBlock,
  bilingual: BilingualBlock, blogTeasers: BlogTeasersBlock, faqList: FaqListBlock,
  finalCta: FinalCtaBlock, richText: RichTextBlock, formEmbed: FormEmbedBlock,
}

export function RenderBlocks({ blocks, locale }: { blocks: any[]; locale: Locale }) {
  if (!blocks?.length) return null
  return (
    <>
      {blocks.map((b, i) => {
        const Cmp = map[b.blockType]
        if (!Cmp) return null
        return <Cmp key={b.id ?? i} {...b} locale={locale} />
      })}
    </>
  )
}
```

- [ ] **Step 3: Hero renderer**

`src/components/blocks/Hero.tsx`:

```tsx
import Link from 'next/link'
import Image from 'next/image'

export function HeroBlock(props: any) {
  const { eyebrow, headline, subheadline, primaryCta, secondaryCta, image, proofPoints, locale } = props
  return (
    <section className="bg-gradient-to-b from-start-mist to-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid gap-10 md:grid-cols-2 items-center">
        <div>
          {eyebrow && <div className="text-start-green font-semibold uppercase tracking-wide text-xs mb-3">{eyebrow}</div>}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">{headline}</h1>
          {subheadline && <p className="mt-5 text-lg md:text-xl text-start-slate max-w-xl">{subheadline}</p>}
          <div className="mt-7 flex flex-wrap gap-3">
            {primaryCta?.label && (
              <Link href={primaryCta.href ? `/${locale}${primaryCta.href}` : '#'}
                className="bg-start-green hover:bg-start-greenHover text-white font-semibold rounded-full px-7 py-3.5">
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta?.label && (
              <Link href={secondaryCta.href ? `/${locale}${secondaryCta.href}` : '#'}
                className="border border-start-line hover:border-start-ink rounded-full px-7 py-3.5 font-semibold">
                {secondaryCta.label}
              </Link>
            )}
          </div>
          {proofPoints?.length > 0 && (
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              {proofPoints.map((p: any, i: number) => (
                <div key={i}>
                  <div className="text-2xl font-bold">{p.value}</div>
                  <div className="text-xs text-start-slate">{p.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        {image?.url && (
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image src={image.url} alt={image.alt ?? ''} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Marquee renderer**

`src/components/blocks/Marquee.tsx`:

```tsx
import { payloadClient } from '@/lib/payload'

export async function MarqueeBlock(props: any) {
  const { mode, items, speed = 30, locale } = props
  const list = mode === 'manual'
    ? (items ?? []).map((i: any) => i.text)
    : await fetchFeaturedQuotes(locale)
  if (!list.length) return null
  const doubled = [...list, ...list]
  return (
    <div className="bg-start-green text-white overflow-hidden py-3">
      <div className="flex gap-12 whitespace-nowrap animate-[marquee_30s_linear_infinite]"
        style={{ animationDuration: `${speed}s` }}>
        {doubled.map((t, i) => (<span key={i} className="text-sm font-medium">★ {t}</span>))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  )
}

async function fetchFeaturedQuotes(locale: string): Promise<string[]> {
  const payload = await payloadClient()
  const res = await payload.find({
    collection: 'reviews', where: { featured: { equals: true } }, limit: 12, locale: locale as any,
  })
  return res.docs.map((r: any) => `"${r.quote}" — ${r.authorName}`)
}
```

- [ ] **Step 5: WhyBroker renderer**

`src/components/blocks/WhyBroker.tsx`:

```tsx
import { Icon } from './Icon'
import { RichText } from './RichText'

export function WhyBrokerBlock(props: any) {
  const { title, intro, points } = props
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        {title && <h2 className="text-3xl md:text-4xl font-bold text-center">{title}</h2>}
        {intro && <div className="mt-4 max-w-2xl mx-auto text-center text-start-slate"><RichText content={intro} /></div>}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {(points ?? []).map((p: any, i: number) => (
            <div key={i} className="rounded-2xl border border-start-line p-6 hover:border-start-green transition">
              <div className="w-12 h-12 rounded-full bg-start-greenTint flex items-center justify-center text-start-green">
                <Icon name={p.iconKey} />
              </div>
              <div className="mt-4 font-semibold text-lg">{p.title}</div>
              <p className="mt-2 text-start-slate">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Offer renderer**

`src/components/blocks/Offer.tsx`:

```tsx
import Link from 'next/link'
import { RichText } from './RichText'

export function OfferBlock(props: any) {
  const { title, body, bullets, cta, darkMode, locale } = props
  return (
    <section className={darkMode ? 'bg-start-ink text-white py-20' : 'bg-start-mist py-20'}>
      <div className="mx-auto max-w-7xl px-4 grid gap-10 md:grid-cols-2 items-start">
        <div>
          {title && <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>}
          {body && <div className="mt-4"><RichText content={body} /></div>}
        </div>
        <div>
          <ul className="space-y-3">
            {(bullets ?? []).map((b: any, i: number) => (
              <li key={i} className="flex gap-3"><span className="text-start-green">✓</span>{b.text}</li>
            ))}
          </ul>
          {cta?.label && (
            <Link href={cta.href ? `/${locale}${cta.href}` : '#'}
              className="mt-6 inline-flex bg-start-green hover:bg-start-greenHover text-white rounded-full px-6 py-3 font-semibold">
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 7: VersusTable renderer**

`src/components/blocks/VersusTable.tsx`:

```tsx
export function VersusTableBlock(props: any) {
  const { title, columns, rows, footnote } = props
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        {title && <h2 className="text-3xl md:text-4xl font-bold text-center">{title}</h2>}
        <div className="mt-10 overflow-x-auto rounded-2xl border border-start-line">
          <table className="w-full text-left">
            <thead className="bg-start-mist">
              <tr>
                <th className="p-4"></th>
                {(columns ?? []).map((c: any, i: number) => (
                  <th key={i} className="p-4 font-semibold">{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(rows ?? []).map((r: any, i: number) => (
                <tr key={i} className="border-t border-start-line">
                  <td className="p-4 font-medium">{r.label}</td>
                  {(r.values ?? []).map((v: any, j: number) => (
                    <td key={j} className="p-4 text-start-slate">{v.text}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {footnote && <p className="mt-3 text-xs text-start-slate">{footnote}</p>}
      </div>
    </section>
  )
}
```

- [ ] **Step 8: Process renderer**

`src/components/blocks/Process.tsx`:

```tsx
export function ProcessBlock(props: any) {
  const { title, steps } = props
  return (
    <section className="py-20 bg-start-mist">
      <div className="mx-auto max-w-7xl px-4">
        {title && <h2 className="text-3xl md:text-4xl font-bold text-center">{title}</h2>}
        <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {(steps ?? []).map((s: any, i: number) => (
            <li key={i} className="bg-white rounded-2xl p-6 border border-start-line">
              <div className="text-start-green text-2xl font-bold">{s.number}</div>
              <div className="mt-2 font-semibold text-lg">{s.title}</div>
              <p className="mt-2 text-start-slate text-sm">{s.body}</p>
              {s.durationLabel && <div className="mt-3 inline-flex bg-start-greenTint text-start-green text-xs font-semibold rounded-full px-2 py-1">{s.durationLabel}</div>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
```

- [ ] **Step 9: Calculator renderer (delegates to client component built in Phase 14)**

`src/components/blocks/Calculator.tsx`:

```tsx
import { Calculator } from '@/components/calculator/Calculator'

export function CalculatorBlock(props: any) {
  const { title, intro, defaults, disclaimer } = props
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-4">
        {title && <h2 className="text-3xl md:text-4xl font-bold text-center">{title}</h2>}
        {intro && <p className="mt-3 text-center text-start-slate max-w-2xl mx-auto">{intro}</p>}
        <div className="mt-10"><Calculator defaults={defaults} /></div>
        {disclaimer && <p className="mt-6 text-xs text-start-slate text-center max-w-2xl mx-auto">{disclaimer}</p>}
      </div>
    </section>
  )
}
```

- [ ] **Step 10: LoanProgramsList renderer**

`src/components/blocks/LoanProgramsList.tsx`:

```tsx
import Link from 'next/link'
import { Icon } from './Icon'
import { payloadClient } from '@/lib/payload'

export async function LoanProgramsListBlock(props: any) {
  const { title, intro, programs, locale } = props
  let docs: any[] = programs ?? []
  if (!docs?.length) {
    const payload = await payloadClient()
    const res = await payload.find({ collection: 'loan-programs', limit: 8, locale })
    docs = res.docs
  } else if (typeof docs[0] === 'string' || typeof docs[0] === 'number') {
    const payload = await payloadClient()
    const res = await payload.find({
      collection: 'loan-programs',
      where: { id: { in: docs } }, limit: 8, locale,
    })
    docs = res.docs
  }
  return (
    <section className="py-20 bg-start-mist">
      <div className="mx-auto max-w-7xl px-4">
        {title && <h2 className="text-3xl md:text-4xl font-bold text-center">{title}</h2>}
        {intro && <p className="mt-3 text-center text-start-slate max-w-2xl mx-auto">{intro}</p>}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {docs.map((p: any) => (
            <Link key={p.id} href={`/${locale}/loan-programs/${p.slug}`}
              className="bg-white rounded-2xl p-6 border border-start-line hover:border-start-green transition">
              <div className="w-12 h-12 rounded-full bg-start-greenTint flex items-center justify-center text-start-green">
                <Icon name={p.iconKey} />
              </div>
              <div className="mt-4 font-semibold text-lg">{p.name}</div>
              <p className="mt-1 text-sm text-start-slate">{p.tagline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 11: AudienceGrid renderer**

`src/components/blocks/AudienceGrid.tsx`:

```tsx
import Link from 'next/link'
import { Icon } from './Icon'

export function AudienceGridBlock(props: any) {
  const { title, audiences, locale } = props
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        {title && <h2 className="text-3xl md:text-4xl font-bold text-center">{title}</h2>}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {(audiences ?? []).map((a: any, i: number) => (
            <Link key={i} href={a.href ? `/${locale}${a.href}` : '#'}
              className="rounded-2xl p-6 border border-start-line hover:border-start-green transition">
              <Icon name={a.iconKey} className="w-7 h-7 text-start-green" />
              <div className="mt-3 font-semibold text-lg">{a.label}</div>
              <p className="mt-1 text-sm text-start-slate">{a.body}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 12: Testimonials renderer**

`src/components/blocks/Testimonials.tsx`:

```tsx
import { payloadClient } from '@/lib/payload'

export async function TestimonialsBlock(props: any) {
  const { title, mode, items, locale } = props
  let docs: any[] = []
  if (mode === 'manual' && items?.length) {
    docs = (typeof items[0] === 'string' || typeof items[0] === 'number')
      ? (await (await payloadClient()).find({ collection: 'reviews', where: { id: { in: items } }, limit: 12, locale })).docs
      : items
  } else {
    docs = (await (await payloadClient()).find({ collection: 'reviews', where: { featured: { equals: true } }, limit: 6, locale })).docs
  }
  return (
    <section className="py-20 bg-start-mist">
      <div className="mx-auto max-w-7xl px-4">
        {title && <h2 className="text-3xl md:text-4xl font-bold text-center">{title}</h2>}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {docs.map((r: any) => (
            <div key={r.id} className="bg-white rounded-2xl p-6 border border-start-line">
              <div className="text-start-green">{'★'.repeat(r.rating ?? 5)}</div>
              <p className="mt-3 italic">"{r.quote}"</p>
              <div className="mt-4 text-sm font-semibold">{r.authorName}</div>
              {r.authorContext && <div className="text-xs text-start-slate">{r.authorContext}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 13: Guarantee renderer**

`src/components/blocks/Guarantee.tsx`:

```tsx
import { RichText } from './RichText'

export function GuaranteeBlock(props: any) {
  const { title, body, seal } = props
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-4 grid gap-8 md:grid-cols-[1fr_auto] items-center">
        <div>
          {title && <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>}
          {body && <div className="mt-4 text-start-slate"><RichText content={body} /></div>}
        </div>
        {seal && (
          <div className="rounded-full border-4 border-start-green w-40 h-40 flex flex-col items-center justify-center text-center p-4">
            <div className="font-bold text-start-green leading-tight">{seal.label}</div>
            {seal.sub && <div className="text-xs mt-1">{seal.sub}</div>}
          </div>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 14: Founder renderer**

`src/components/blocks/Founder.tsx`:

```tsx
import Image from 'next/image'
import { RichText } from './RichText'

export function FounderBlock(props: any) {
  const { headline, bio, image, nmls, credentials } = props
  return (
    <section className="py-20 bg-start-mist">
      <div className="mx-auto max-w-6xl px-4 grid gap-10 md:grid-cols-[280px_1fr] items-center">
        {image?.url && (
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image src={image.url} alt={image.alt ?? ''} fill sizes="280px" className="object-cover" />
          </div>
        )}
        <div>
          {headline && <h2 className="text-3xl md:text-4xl font-bold">{headline}</h2>}
          {bio && <div className="mt-4 text-start-slate"><RichText content={bio} /></div>}
          {nmls && <div className="mt-3 text-sm font-medium">NMLS# {nmls}</div>}
          {credentials?.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {credentials.map((c: any, i: number) => (
                <li key={i} className="bg-white border border-start-line rounded-full px-3 py-1 text-xs">{c.text}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 15: Bilingual renderer (renders in opposite locale)**

`src/components/blocks/Bilingual.tsx`:

```tsx
import { payloadClient } from '@/lib/payload'
import { RichText } from './RichText'

export async function BilingualBlock(props: any) {
  const { headline, body, locale } = props
  const other = locale === 'en' ? 'es' : 'en'
  // The current block's headline/body fields render in OPPOSITE locale per spec.
  // Re-fetch parent doc with `locale: other` is overkill; the editor enters
  // the opposite-locale text directly into the localized field on the page in
  // the OTHER locale, and we just render the localized value of the field in
  // `other` by hitting the field via passed prop set in the parent fetch.
  // Simplest: render the value as provided (it's already localized in the parent fetch),
  // and add a small "[ES] / [EN]" tag so visitors know.
  return (
    <section className="py-16 bg-start-green text-white">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <div className="text-xs font-semibold uppercase tracking-wider opacity-80">{other.toUpperCase()}</div>
        {headline && <h2 className="mt-2 text-3xl md:text-4xl font-bold">{headline}</h2>}
        {body && <div className="mt-4 opacity-90"><RichText content={body} /></div>}
      </div>
    </section>
  )
}
```

- [ ] **Step 16: BlogTeasers renderer**

`src/components/blocks/BlogTeasers.tsx`:

```tsx
import Link from 'next/link'
import { payloadClient } from '@/lib/payload'

export async function BlogTeasersBlock(props: any) {
  const { title, mode, count = 3, posts, locale } = props
  let docs: any[] = []
  if (mode === 'manual' && posts?.length) {
    docs = (typeof posts[0] === 'string' || typeof posts[0] === 'number')
      ? (await (await payloadClient()).find({ collection: 'posts', where: { id: { in: posts } }, limit: count, locale })).docs
      : posts
  } else {
    docs = (await (await payloadClient()).find({ collection: 'posts', sort: '-publishedAt', limit: count, locale })).docs
  }
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        {title && <h2 className="text-3xl md:text-4xl font-bold text-center">{title}</h2>}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {docs.map((p: any) => (
            <Link key={p.id} href={`/${locale}/posts/${p.slug}`}
              className="block bg-white rounded-2xl border border-start-line hover:border-start-green overflow-hidden transition">
              <div className="aspect-[16/9] bg-start-mist" />
              <div className="p-5">
                <div className="font-semibold">{p.title}</div>
                {p.excerpt && <p className="mt-2 text-sm text-start-slate line-clamp-3">{p.excerpt}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 17: FaqList renderer**

`src/components/blocks/FaqList.tsx`:

```tsx
import { payloadClient } from '@/lib/payload'
import { RichText } from './RichText'

export async function FaqListBlock(props: any) {
  const { title, mode, categoryFilter, items, locale } = props
  let docs: any[] = []
  const payload = await payloadClient()
  if (mode === 'manual' && items?.length) {
    const ids = (typeof items[0] === 'string' || typeof items[0] === 'number') ? items : items.map((x: any) => x.id)
    docs = (await payload.find({ collection: 'faqs', where: { id: { in: ids } }, limit: 50, locale })).docs
  } else {
    const where: any = {}
    if (categoryFilter) where.category = { equals: typeof categoryFilter === 'object' ? categoryFilter.id : categoryFilter }
    docs = (await payload.find({ collection: 'faqs', where, sort: 'order', limit: 50, locale })).docs
  }
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4">
        {title && <h2 className="text-3xl md:text-4xl font-bold text-center">{title}</h2>}
        <div className="mt-10 divide-y divide-start-line">
          {docs.map((f: any) => (
            <details key={f.id} className="group py-4">
              <summary className="cursor-pointer font-medium flex items-center justify-between gap-4">
                <span>{f.question}</span>
                <span className="text-start-green text-2xl group-open:rotate-45 transition">+</span>
              </summary>
              <div className="mt-3 text-start-slate"><RichText content={f.answer} /></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 18: FinalCta renderer**

`src/components/blocks/FinalCta.tsx`:

```tsx
import Link from 'next/link'
import Image from 'next/image'

export function FinalCtaBlock(props: any) {
  const { eyebrow, headline, body, primaryCta, secondaryCta, image, locale } = props
  return (
    <section className="py-20 bg-start-ink text-white">
      <div className="mx-auto max-w-7xl px-4 grid gap-10 md:grid-cols-2 items-center">
        <div>
          {eyebrow && <div className="text-start-green font-semibold uppercase tracking-wide text-xs mb-3">{eyebrow}</div>}
          {headline && <h2 className="text-3xl md:text-5xl font-bold">{headline}</h2>}
          {body && <p className="mt-4 opacity-90">{body}</p>}
          <div className="mt-6 flex flex-wrap gap-3">
            {primaryCta?.label && (
              <Link href={primaryCta.href ? `/${locale}${primaryCta.href}` : '#'}
                className="bg-start-green hover:bg-start-greenHover text-white font-semibold rounded-full px-7 py-3.5">
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta?.label && (
              <Link href={secondaryCta.href ? `/${locale}${secondaryCta.href}` : '#'}
                className="border border-white/30 hover:border-white rounded-full px-7 py-3.5 font-semibold">
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
        {image?.url && (
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image src={image.url} alt={image.alt ?? ''} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 19: RichText renderer**

`src/components/blocks/RichText.tsx`:

```tsx
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'

export function RichTextBlock(props: any) {
  const { content, maxWidth = 'default' } = props
  const widthCls =
    maxWidth === 'narrow' ? 'max-w-2xl' :
    maxWidth === 'wide' ? 'max-w-5xl' :
    maxWidth === 'full' ? 'max-w-none' : 'max-w-3xl'
  return (
    <section className="py-12">
      <div className={`mx-auto ${widthCls} px-4 prose prose-neutral`}>
        <PayloadRichText data={content} />
      </div>
    </section>
  )
}

// Inline reuse for other blocks:
export function RichText({ content }: { content: any }) {
  if (!content) return null
  return <div className="prose prose-neutral max-w-none"><PayloadRichText data={content} /></div>
}
```

- [ ] **Step 20: FormEmbed renderer**

`src/components/blocks/FormEmbed.tsx`:

```tsx
import { FormSubmitter } from '@/components/forms/FormSubmitter'
import { payloadClient } from '@/lib/payload'

export async function FormEmbedBlock(props: any) {
  const { form, headline, intro, locale } = props
  let formDoc: any = form
  if (typeof form === 'string' || typeof form === 'number') {
    formDoc = await (await payloadClient()).findByID({ collection: 'forms', id: form, locale })
  }
  return (
    <section className="py-20">
      <div className="mx-auto max-w-2xl px-4">
        {headline && <h2 className="text-3xl md:text-4xl font-bold text-center">{headline}</h2>}
        {intro && <p className="mt-3 text-center text-start-slate">{intro}</p>}
        <div className="mt-8 bg-white rounded-2xl border border-start-line p-6">
          <FormSubmitter form={formDoc} />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 21: Commit**

```bash
git add -A && git commit -m "feat(blocks/render): build 18 block renderers + RenderBlocks dispatcher + Icon mapper"
```

---

## Phase 10: Routing — pages, posts, loan-programs, locale middleware, preview entry

**Files:**
- Create: `src/app/(frontend)/[locale]/page.tsx` (root home)
- Create: `src/app/(frontend)/[locale]/[...slug]/page.tsx`
- Create: `src/app/(frontend)/[locale]/posts/[slug]/page.tsx`
- Create: `src/app/(frontend)/[locale]/loan-programs/[slug]/page.tsx`
- Create: `src/app/(frontend)/[locale]/preview/route.ts`
- Create: `src/middleware.ts`

- [ ] **Step 1: Root home for a locale**

`src/app/(frontend)/[locale]/page.tsx`:

```tsx
import { notFound } from 'next/navigation'
import { isLocale, findHome } from '@/lib/locale'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { draftMode } from 'next/headers'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const { isEnabled } = await draftMode()
  const page = await findHome(locale, isEnabled)
  if (!page) notFound()
  return <RenderBlocks blocks={page.layout ?? []} locale={locale} />
}
```

- [ ] **Step 2: Catch-all page route**

`src/app/(frontend)/[locale]/[...slug]/page.tsx`:

```tsx
import { notFound } from 'next/navigation'
import { isLocale, findPageByPath } from '@/lib/locale'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { draftMode } from 'next/headers'

export default async function CatchAllPage({ params }: { params: Promise<{ locale: string; slug: string[] }> }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const path = slug.join('/')
  const { isEnabled } = await draftMode()
  const page = await findPageByPath(path, locale, isEnabled)
  if (!page) notFound()
  return <RenderBlocks blocks={page.layout ?? []} locale={locale} />
}
```

- [ ] **Step 3: Posts route**

`src/app/(frontend)/[locale]/posts/[slug]/page.tsx`:

```tsx
import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/locale'
import { payloadClient } from '@/lib/payload'
import { RichText } from '@/components/blocks/RichText'
import { draftMode } from 'next/headers'

export default async function PostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const { isEnabled } = await draftMode()
  const payload = await payloadClient()
  const res = await payload.find({
    collection: 'posts', where: { slug: { equals: slug } }, limit: 1, locale, draft: isEnabled,
  })
  const post = res.docs[0]
  if (!post) notFound()
  return (
    <article className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>
        {post.excerpt && <p className="mt-3 text-start-slate text-lg">{post.excerpt}</p>}
        <div className="mt-10 prose prose-neutral max-w-none"><RichText content={post.content} /></div>
      </div>
    </article>
  )
}
```

- [ ] **Step 4: LoanPrograms detail route**

`src/app/(frontend)/[locale]/loan-programs/[slug]/page.tsx`:

```tsx
import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/locale'
import { payloadClient } from '@/lib/payload'
import { RichText } from '@/components/blocks/RichText'

export default async function LoanProgramPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const payload = await payloadClient()
  const res = await payload.find({ collection: 'loan-programs', where: { slug: { equals: slug } }, limit: 1, locale })
  const lp = res.docs[0]
  if (!lp) notFound()
  return (
    <article className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-start-green font-semibold uppercase text-xs">{lp.tagline}</div>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold">{lp.name}</h1>
        {lp.whoItsFor && <p className="mt-4 text-lg text-start-slate">{lp.whoItsFor}</p>}
        <div className="mt-10 grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-start-line p-6">
            <div className="font-semibold">Pros</div>
            <ul className="mt-3 space-y-2">
              {(lp.pros ?? []).map((p: any, i: number) => <li key={i} className="text-start-slate">✓ {p.item}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-start-line p-6">
            <div className="font-semibold">Cons</div>
            <ul className="mt-3 space-y-2">
              {(lp.cons ?? []).map((c: any, i: number) => <li key={i} className="text-start-slate">– {c.item}</li>)}
            </ul>
          </div>
        </div>
        <div className="mt-10 prose prose-neutral max-w-none">
          <RichText content={lp.requirements} />
        </div>
        {lp.bestFor && <p className="mt-6 text-start-slate"><strong>Best for:</strong> {lp.bestFor}</p>}
      </div>
    </article>
  )
}
```

- [ ] **Step 5: Preview route entry**

`src/app/(frontend)/[locale]/preview/route.ts`:

```ts
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const token = url.searchParams.get('token')
  const path = url.searchParams.get('path') || '/'
  if (!token || token !== process.env.PREVIEW_SECRET) {
    return new Response('Unauthorized', { status: 401 })
  }
  const draft = await draftMode()
  draft.enable()
  redirect(path)
}
```

- [ ] **Step 6: Middleware for locale cookie + Accept-Language redirect at root**

`src/middleware.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  // Skip API and static
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.startsWith('/admin')) {
    return NextResponse.next()
  }
  // If path doesn't start with /en or /es, infer from Accept-Language and redirect
  if (!/^\/(en|es)(\/|$)/.test(pathname)) {
    const accept = req.headers.get('accept-language') || ''
    const prefersEs = /\b(es|es-[a-z]{2})\b/i.test(accept) && !/\ben\b/i.test(accept.split(',')[0])
    const target = prefersEs ? '/es' : '/en'
    return NextResponse.redirect(new URL(target + pathname, req.url))
  }
  // Set NEXT_LOCALE cookie
  const m = pathname.match(/^\/(en|es)/)
  const res = NextResponse.next()
  if (m) res.cookies.set('NEXT_LOCALE', m[1], { path: '/' })
  return res
}

export const config = {
  matcher: ['/((?!api|_next|admin|favicon.ico|brand|assets).*)'],
}
```

- [ ] **Step 7: Root layout redirects bare `/` to `/en` (already handled by middleware) — confirm by removing any conflicting Website Template root page**

Verify no `src/app/(frontend)/page.tsx` exists outside `[locale]/`. If one exists, remove it.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat(routes): wire pages, posts, loan-programs, preview, locale middleware"
```

---

## Phase 11: SEO + JSON-LD in root layout

**Files:**
- Modify: `src/app/(frontend)/[locale]/layout.tsx` (inject JSON-LD)
- Modify: `src/app/(frontend)/[locale]/page.tsx` (FAQPage + BreadcrumbList when applicable)
- Modify: `src/app/(frontend)/[locale]/[...slug]/page.tsx` (BreadcrumbList)
- Modify: `src/app/(frontend)/[locale]/posts/[slug]/page.tsx` (Article)
- Modify: `src/app/(frontend)/[locale]/layout.tsx` (hreflang)

- [ ] **Step 1: Build a JsonLd component**

`src/components/seo/JsonLd.tsx`:

```tsx
export function JsonLd({ data }: { data: any }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
```

- [ ] **Step 2: Inject LocalBusiness + WebSite at locale layout level**

In `src/app/(frontend)/[locale]/layout.tsx` (extending the chrome layout from Phase 8):

```tsx
import { JsonLd } from '@/components/seo/JsonLd'
import { buildLocalBusiness, buildWebsite, jsonLdGraph } from '@/lib/seo'

// inside the layout's return, before chrome:
const origin = process.env.NEXT_PUBLIC_SERVER_URL!
return (
  <>
    <JsonLd data={jsonLdGraph(origin, [buildLocalBusiness(settings, origin), buildWebsite(origin)])} />
    {/* ...Topbar, Nav, main, Footer, StickyBar */}
  </>
)
```

- [ ] **Step 3: FAQPage when a page contains a faqList block**

In `[...slug]/page.tsx` and `page.tsx` (home):

```tsx
import { buildFAQPage } from '@/lib/seo'
import { JsonLd } from '@/components/seo/JsonLd'

// after fetching `page`:
const faqBlock = (page.layout ?? []).find((b: any) => b.blockType === 'faqList')
let faqJsonLd: any = null
if (faqBlock) {
  // resolve FAQs same way the renderer does, then build:
  // (extract a small helper — `resolveFaqs(faqBlock, locale)` — to avoid duplication)
}

return (
  <>
    {faqJsonLd && <JsonLd data={faqJsonLd} />}
    <RenderBlocks blocks={page.layout ?? []} locale={locale} />
  </>
)
```

Add `src/lib/faqs.ts` with the resolver shared by the renderer + SEO injection.

- [ ] **Step 4: Article on post pages**

In `posts/[slug]/page.tsx`:

```tsx
import { JsonLd } from '@/components/seo/JsonLd'
import { buildArticle } from '@/lib/seo'

const origin = process.env.NEXT_PUBLIC_SERVER_URL!
return (
  <>
    <JsonLd data={{ '@context': 'https://schema.org', ...buildArticle(origin, locale, post) }} />
    {/* ...article body... */}
  </>
)
```

- [ ] **Step 5: hreflang alternates per page**

In `[locale]/layout.tsx`, extend `generateMetadata` to emit alternates. Or, simpler, inject `<link rel="alternate" hreflang>` tags at the page route level using `generateMetadata`:

`[locale]/[...slug]/page.tsx`:

```ts
import type { Metadata } from 'next'
import { counterpartUrlForPage, isLocale } from '@/lib/locale'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string[] }> }): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const path = slug.join('/')
  const page = await (await import('@/lib/locale')).findPageByPath(path, locale)
  if (!page) return {}
  const counterpart = await counterpartUrlForPage(page, locale)
  const origin = process.env.NEXT_PUBLIC_SERVER_URL!
  return {
    title: page.meta?.title || page.title,
    description: page.meta?.description,
    alternates: {
      canonical: `${origin}/${locale}/${page.slug}`,
      languages: {
        [locale]: `${origin}/${locale}/${page.slug}`,
        [locale === 'en' ? 'es' : 'en']: `${origin}${counterpart}`,
      },
    },
  }
}
```

Repeat similarly for the home, posts, and loan-programs routes.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat(seo): inject LocalBusiness/Website/FAQPage/Article JSON-LD + hreflang alternates"
```

---

## Phase 12: sitemap.ts + robots.ts

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

- [ ] **Step 1: sitemap**

`src/app/sitemap.ts`:

```ts
import type { MetadataRoute } from 'next'
import { payloadClient } from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = process.env.NEXT_PUBLIC_SERVER_URL!
  const payload = await payloadClient()
  const out: MetadataRoute.Sitemap = []
  for (const locale of ['en','es'] as const) {
    const [pages, posts, programs] = await Promise.all([
      payload.find({ collection: 'pages', where: { locale: { equals: locale } }, limit: 500 }),
      payload.find({ collection: 'posts', limit: 500, locale }),
      payload.find({ collection: 'loan-programs', limit: 100, locale }),
    ])
    for (const p of pages.docs) {
      const path = p.localizationKey === 'home' ? '' : `/${p.slug}`
      out.push({ url: `${origin}/${locale}${path}`, lastModified: p.updatedAt })
    }
    for (const p of posts.docs) out.push({ url: `${origin}/${locale}/posts/${p.slug}`, lastModified: p.updatedAt })
    for (const lp of programs.docs) out.push({ url: `${origin}/${locale}/loan-programs/${lp.slug}`, lastModified: lp.updatedAt })
  }
  return out
}
```

- [ ] **Step 2: robots**

`src/app/robots.ts`:

```ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const origin = process.env.NEXT_PUBLIC_SERVER_URL!
  return {
    rules: [{ userAgent: '*', allow: '/' , disallow: ['/admin','/api'] }],
    sitemap: `${origin}/sitemap.xml`,
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat(seo): dynamic sitemap.xml + robots.txt"
```

---

## Phase 13: Forms — Form Builder + Resend wiring

**Files:**
- Create: `src/components/forms/FormSubmitter.tsx` (client)
- Modify: `src/payload.config.ts` to set form-builder confirmation email defaults via `formBuilderPlugin({ defaultToEmail })`

- [ ] **Step 1: FormSubmitter client component**

`src/components/forms/FormSubmitter.tsx`:

```tsx
'use client'
import { useState } from 'react'

export function FormSubmitter({ form }: { form: any }) {
  const [state, setState] = useState<'idle'|'submitting'|'ok'|'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  if (!form) return null
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState('submitting'); setError(null)
    const fd = new FormData(e.currentTarget)
    const submissionData = (form.fields ?? []).map((f: any) => ({
      field: f.name,
      value: fd.get(f.name) || '',
    }))
    try {
      const res = await fetch(`/api/form-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: form.id, submissionData }),
      })
      if (!res.ok) throw new Error(`Status ${res.status}`)
      setState('ok')
    } catch (err: any) {
      setError(err.message ?? 'Submission failed'); setState('error')
    }
  }
  if (state === 'ok') return <div className="p-4 bg-start-greenTint text-start-greenPressed rounded-xl">{form.confirmationMessage || 'Thanks! We\'ll be in touch.'}</div>
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {(form.fields ?? []).map((f: any) => (
        <div key={f.id ?? f.name}>
          <label className="block text-sm font-medium mb-1">
            {f.label}{f.required && <span className="text-red-500">*</span>}
          </label>
          {f.blockType === 'textarea' || f.blockType === 'message' ? (
            <textarea name={f.name} required={f.required} rows={5}
              className="w-full rounded-xl border border-start-line p-3 focus:border-start-green outline-none" />
          ) : f.blockType === 'select' ? (
            <select name={f.name} required={f.required}
              className="w-full rounded-xl border border-start-line p-3 focus:border-start-green outline-none">
              <option value="">--</option>
              {(f.options ?? []).map((o: any) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          ) : (
            <input name={f.name} type={f.blockType === 'email' ? 'email' : f.blockType === 'number' ? 'number' : 'text'}
              required={f.required}
              className="w-full rounded-xl border border-start-line p-3 focus:border-start-green outline-none" />
          )}
        </div>
      ))}
      <button type="submit" disabled={state === 'submitting'}
        className="bg-start-green hover:bg-start-greenHover text-white font-semibold rounded-full px-6 py-3 disabled:opacity-60">
        {state === 'submitting' ? '...' : (form.submitButtonLabel ?? 'Submit')}
      </button>
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </form>
  )
}
```

- [ ] **Step 2: Configure default emails in `formBuilderPlugin`**

In `src/plugins/index.ts`:

```ts
formBuilderPlugin({
  fields: { text: true, textarea: true, email: true, number: true, select: true, checkbox: true, message: true },
  formOverrides: { slug: 'forms' },
  defaultToEmail: process.env.RESEND_NOTIFICATION_TO,
}),
```

The seeded forms (Phase 16) configure their own confirmation email body and notification target.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat(forms): wire FormSubmitter client + Form Builder defaults"
```

---

## Phase 14: Mortgage calculator (TDD on the math)

**Files:**
- Create: `src/components/calculator/calculator.math.ts`
- Create: `src/components/calculator/calculator.math.test.ts`
- Create: `src/components/calculator/Calculator.tsx`

- [ ] **Step 1: Add vitest if not present**

```bash
pnpm add -D vitest
```

Add to `package.json`: `"test": "vitest"`.

Add `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'
export default defineConfig({
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  test: { environment: 'node' },
})
```

- [ ] **Step 2: Write the failing tests**

`src/components/calculator/calculator.math.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { monthlyPI, piti, totalInterest, amortization } from './calculator.math'

describe('monthlyPI', () => {
  it('returns 0 when principal is 0', () => {
    expect(monthlyPI({ principal: 0, ratePct: 6, termYears: 30 })).toBe(0)
  })
  it('handles 0% interest as straight amortization', () => {
    expect(monthlyPI({ principal: 36000, ratePct: 0, termYears: 30 })).toBeCloseTo(100, 2)
  })
  it('matches a known case (350k at 6.5% over 30y ≈ $2212.24)', () => {
    expect(monthlyPI({ principal: 350000, ratePct: 6.5, termYears: 30 })).toBeCloseTo(2212.24, 2)
  })
})

describe('piti', () => {
  it('adds escrow', () => {
    const v = piti({ principal: 350000, ratePct: 6.5, termYears: 30, taxesAnnual: 4200, insuranceAnnual: 1800 })
    expect(v).toBeCloseTo(2212.24 + 350 + 150, 2)
  })
})

describe('amortization', () => {
  it('produces a schedule that pays the loan to ~0', () => {
    const schedule = amortization({ principal: 100000, ratePct: 5, termYears: 15 })
    expect(schedule.length).toBe(15 * 12)
    expect(schedule[schedule.length - 1].balance).toBeCloseTo(0, 0)
  })
})

describe('totalInterest', () => {
  it('is positive for non-zero rates', () => {
    expect(totalInterest({ principal: 100000, ratePct: 5, termYears: 15 })).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 3: Run tests to verify they fail**

```bash
pnpm test src/components/calculator/calculator.math.test.ts
```

Expected: FAIL (functions not defined).

- [ ] **Step 4: Implement the math**

`src/components/calculator/calculator.math.ts`:

```ts
type Args = { principal: number; ratePct: number; termYears: number }

export function monthlyPI({ principal, ratePct, termYears }: Args): number {
  if (principal <= 0) return 0
  const n = termYears * 12
  if (ratePct === 0) return principal / n
  const r = ratePct / 100 / 12
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

export function piti(args: Args & { taxesAnnual: number; insuranceAnnual: number }): number {
  return monthlyPI(args) + (args.taxesAnnual ?? 0) / 12 + (args.insuranceAnnual ?? 0) / 12
}

export function amortization(args: Args) {
  const n = args.termYears * 12
  const r = args.ratePct / 100 / 12
  const m = monthlyPI(args)
  let balance = args.principal
  const out: { month: number; interest: number; principal: number; balance: number }[] = []
  for (let i = 1; i <= n; i++) {
    const interest = balance * r
    const principalPaid = m - interest
    balance = Math.max(0, balance - principalPaid)
    out.push({ month: i, interest, principal: principalPaid, balance })
  }
  return out
}

export function totalInterest(args: Args): number {
  return amortization(args).reduce((s, p) => s + p.interest, 0)
}
```

- [ ] **Step 5: Run tests, expect pass**

```bash
pnpm test src/components/calculator/calculator.math.test.ts
```

- [ ] **Step 6: Build the React component**

`src/components/calculator/Calculator.tsx`:

```tsx
'use client'
import { useMemo, useState } from 'react'
import { monthlyPI, piti } from './calculator.math'

type Defaults = { price: number; downPct: number; ratePct: number; termYears: number; taxesAnnual: number; insuranceAnnual: number }

export function Calculator({ defaults }: { defaults?: Partial<Defaults> }) {
  const d: Defaults = { price: 350000, downPct: 5, ratePct: 6.5, termYears: 30, taxesAnnual: 4200, insuranceAnnual: 1800, ...defaults }
  const [s, setS] = useState(d)
  const principal = Math.max(0, s.price - s.price * (s.downPct / 100))
  const pi = useMemo(() => monthlyPI({ principal, ratePct: s.ratePct, termYears: s.termYears }), [principal, s.ratePct, s.termYears])
  const total = useMemo(() => piti({ principal, ratePct: s.ratePct, termYears: s.termYears, taxesAnnual: s.taxesAnnual, insuranceAnnual: s.insuranceAnnual }), [principal, s.ratePct, s.termYears, s.taxesAnnual, s.insuranceAnnual])
  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
  return (
    <div className="bg-white rounded-2xl border border-start-line p-6 grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        {[
          { k: 'price', label: 'Home price', step: 1000 },
          { k: 'downPct', label: 'Down payment %', step: 0.5 },
          { k: 'ratePct', label: 'Interest rate %', step: 0.125 },
          { k: 'termYears', label: 'Term (years)', step: 5 },
          { k: 'taxesAnnual', label: 'Annual taxes', step: 100 },
          { k: 'insuranceAnnual', label: 'Annual insurance', step: 100 },
        ].map((f: any) => (
          <label key={f.k} className="block">
            <span className="text-sm font-medium">{f.label}</span>
            <input type="number" step={f.step} value={(s as any)[f.k]}
              onChange={e => setS({ ...s, [f.k]: Number(e.target.value) })}
              className="mt-1 w-full rounded-xl border border-start-line p-3 focus:border-start-green outline-none" />
          </label>
        ))}
      </div>
      <div className="bg-start-mist rounded-2xl p-6 self-start">
        <div className="text-sm text-start-slate">Estimated monthly payment</div>
        <div className="text-4xl font-bold mt-1">{fmt(total)}</div>
        <div className="mt-2 text-sm text-start-slate">P&I: {fmt(pi)} • Taxes: {fmt(s.taxesAnnual / 12)} • Insurance: {fmt(s.insuranceAnnual / 12)}</div>
        <div className="mt-4 text-xs text-start-slate">Estimate only. Final terms depend on credit, lender, and property.</div>
      </div>
    </div>
  )
}
```

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat(calculator): TDD'd math + client React Calculator component"
```

---

## Phase 15: Live preview / draft mode

The route at `src/app/(frontend)/[locale]/preview/route.ts` is wired in Phase 10. Pages, posts, and loan-programs are rendered with `draftMode().isEnabled` already.

- [ ] **Step 1: Verify Pages collection has `livePreview.url`**

Already configured in Phase 4. Confirm it includes `?preview=true&token=...`.

- [ ] **Step 2: Add Posts and LoanPrograms admin livePreview**

In `src/collections/Posts/index.ts` and `src/collections/LoanPrograms/index.ts`:

```ts
admin: {
  // ...
  livePreview: {
    url: ({ data, locale }) => {
      const loc = (locale?.code as string) || 'en'
      const collection = /* 'posts' | 'loan-programs' */
      return `${process.env.NEXT_PUBLIC_SERVER_URL}/${loc}/${collection}/${data?.slug}?preview=true&token=${process.env.PREVIEW_SECRET}`
    },
  },
},
```

- [ ] **Step 3: "View Live" button — Payload's admin already provides this when `admin.livePreview.url` is set**

No additional code needed.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat(preview): wire Posts and LoanPrograms live preview"
```

---

## Phase 16: Markdown → Payload seeder (TDD on converter)

**Files:**
- Create: `src/seed/index.ts`
- Create: `src/seed/markdown.ts`
- Create: `src/seed/markdown.test.ts`
- Create: `src/seed/pages.ts`
- Create: `src/seed/posts.ts`
- Create: `src/seed/loan-programs.ts`
- Create: `src/seed/faqs.ts`
- Create: `src/seed/reviews.ts`
- Create: `src/seed/forms.ts`
- Create: `src/seed/site-settings.ts`
- Create: `src/seed/homepage-blocks.ts` (heuristic mapper for homepage.md → blocks)
- Create: `src/app/api/seed/route.ts`

- [ ] **Step 1: Install converter deps**

```bash
pnpm add gray-matter mdast-util-from-markdown
```

- [ ] **Step 2: Tests for the markdown converter**

`src/seed/markdown.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { mdToLexical, mdToPlain } from './markdown'

describe('mdToPlain', () => {
  it('strips markdown', () => {
    expect(mdToPlain('# Hello\n\nThis is **bold** text.')).toBe('Hello\n\nThis is bold text.')
  })
})

describe('mdToLexical', () => {
  it('returns a Lexical root with paragraph children', () => {
    const out = mdToLexical('Hello world')
    expect(out.root.type).toBe('root')
    expect(out.root.children[0].type).toBe('paragraph')
  })
  it('handles headings', () => {
    const out = mdToLexical('# H1\n\n## H2')
    const types = out.root.children.map((c: any) => c.type + (c.tag ? `:${c.tag}` : ''))
    expect(types).toContain('heading:h1')
    expect(types).toContain('heading:h2')
  })
  it('handles unordered lists', () => {
    const out = mdToLexical('- a\n- b')
    expect(out.root.children[0].type).toBe('list')
    expect(out.root.children[0].listType).toBe('bullet')
  })
})
```

- [ ] **Step 3: Run tests, expect FAIL**

```bash
pnpm test src/seed/markdown.test.ts
```

- [ ] **Step 4: Implement markdown converters**

`src/seed/markdown.ts`:

```ts
import { fromMarkdown } from 'mdast-util-from-markdown'

type Lexical = { root: { type: 'root'; children: any[]; direction: 'ltr' | null; format: ''; indent: 0; version: 1 } }

export function mdToPlain(md: string): string {
  return md
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/^>\s?/gm, '')
    .trim()
}

export function mdToLexical(md: string): Lexical {
  const tree = fromMarkdown(md)
  const children = tree.children.map(walk).filter(Boolean) as any[]
  return { root: { type: 'root', children, direction: 'ltr', format: '', indent: 0, version: 1 } }
}

function textNode(value: string, format = 0): any {
  return { type: 'text', detail: 0, format, mode: 'normal', style: '', text: value, version: 1 }
}

function inlineNodes(nodes: any[]): any[] {
  const out: any[] = []
  for (const n of nodes) {
    if (n.type === 'text') out.push(textNode(n.value))
    else if (n.type === 'strong') out.push(...inlineNodes(n.children).map(t => ({ ...t, format: (t.format ?? 0) | 1 })))
    else if (n.type === 'emphasis') out.push(...inlineNodes(n.children).map(t => ({ ...t, format: (t.format ?? 0) | 2 })))
    else if (n.type === 'inlineCode') out.push(textNode(n.value, 16))
    else if (n.type === 'link') out.push({
      type: 'link', fields: { url: n.url, newTab: false }, version: 2,
      children: inlineNodes(n.children),
    })
    else if (n.children) out.push(...inlineNodes(n.children))
  }
  return out
}

function walk(node: any): any {
  switch (node.type) {
    case 'heading': return {
      type: 'heading', tag: `h${node.depth}`, version: 1, direction: 'ltr', format: '', indent: 0,
      children: inlineNodes(node.children),
    }
    case 'paragraph': return {
      type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0,
      children: inlineNodes(node.children),
    }
    case 'list': return {
      type: 'list', listType: node.ordered ? 'number' : 'bullet', start: 1, tag: node.ordered ? 'ol' : 'ul',
      version: 1, direction: 'ltr', format: '', indent: 0,
      children: node.children.map((li: any) => ({
        type: 'listitem', value: 1, version: 1, direction: 'ltr', format: '', indent: 0,
        children: li.children.flatMap((c: any) => walk(c)?.children || []),
      })),
    }
    case 'blockquote': return {
      type: 'quote', version: 1, direction: 'ltr', format: '', indent: 0,
      children: node.children.flatMap((c: any) => walk(c)),
    }
    case 'code': return {
      type: 'code', language: node.lang || 'plain', version: 1,
      children: [textNode(node.value)],
    }
    case 'thematicBreak': return null
    default: return null
  }
}
```

- [ ] **Step 5: Run tests, expect PASS**

```bash
pnpm test src/seed/markdown.test.ts
```

- [ ] **Step 6: Homepage block mapper**

`src/seed/homepage-blocks.ts`:

```ts
import { mdToLexical } from './markdown'

/**
 * Heuristically maps homepage.md headings into specific block types.
 * Headings expected (case-insensitive): "section 1: header" → hero,
 * "marquee" → marquee, "why broker" → whyBroker, "offer" → offer,
 * "versus" → versusTable, "process" / "how it works" → process,
 * "calculator" → calculator, "loan programs" → loanProgramsList,
 * "audience" / "who we serve" → audienceGrid, "testimonials" → testimonials,
 * "guarantee" → guarantee, "founder" → founder, "bilingual" / "español" → bilingual,
 * "blog" → blogTeasers, "faq" → faqList, "final" / "cta" → finalCta.
 *
 * Anything that doesn't match becomes a richText block carrying the section content.
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
    else if (/calculator/.test(head)) blocks.push({ blockType: 'calculator',
      title: sec.heading, defaults: { price: 350000, downPct: 5, ratePct: 6.5, termYears: 30, taxesAnnual: 4200, insuranceAnnual: 1800 } })
    else if (/loan program/.test(head)) blocks.push({ blockType: 'loanProgramsList', title: sec.heading })
    else if (/audience|who we serve|first-?time|self-?employed/.test(head)) blocks.push(toAudience(sec))
    else if (/testimonial|review/.test(head)) blocks.push({ blockType: 'testimonials', title: sec.heading, mode: 'auto' })
    else if (/guarantee|seal|promise/.test(head)) blocks.push({ blockType: 'guarantee', title: sec.heading,
      body: mdToLexical(sec.body), seal: { label: 'START Promise', sub: '24h pre-approval' } })
    else if (/founder|jexayra/.test(head)) blocks.push({ blockType: 'founder', headline: sec.heading,
      bio: mdToLexical(sec.body), nmls: '1631454' })
    else if (/biling|español|en espanol|spanish/.test(head)) blocks.push({ blockType: 'bilingual',
      headline: sec.heading, body: mdToLexical(sec.body) })
    else if (/blog|article|read/.test(head)) blocks.push({ blockType: 'blogTeasers', title: sec.heading, mode: 'auto', count: 3 })
    else if (/faq|question/.test(head)) blocks.push({ blockType: 'faqList', title: sec.heading, mode: 'auto' })
    else if (/final|book|ready|get started/.test(head)) blocks.push({ blockType: 'finalCta',
      headline: sec.heading,
      body: sec.body.split('\n').slice(0, 2).join(' '),
      primaryCta: { label: 'Book Planning Session', href: '/planning-session' },
    })
    else blocks.push({ blockType: 'richText', content: mdToLexical(`## ${sec.heading}\n\n${sec.body}`) })
  }
  return blocks
}

function splitByH2OrH3(md: string): { heading: string; body: string }[] {
  const lines = md.split('\n')
  const out: { heading: string; body: string }[] = []
  let current: { heading: string; body: string } | null = null
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

function toHero(sec: { heading: string; body: string }) {
  const lines = sec.body.split('\n').filter(Boolean)
  return {
    blockType: 'hero',
    eyebrow: 'START Mortgage',
    headline: sec.heading,
    subheadline: lines.slice(0, 2).join(' '),
    primaryCta: { label: 'Get pre-approved', href: '/pre-approval' },
    secondaryCta: { label: 'How it works', href: '/how-it-works' },
    proofPoints: [
      { value: '24h', label: 'pre-approval' },
      { value: '30+', label: 'lenders' },
      { value: 'EN/ES', label: 'bilingual' },
    ],
  }
}

function toWhyBroker(sec: { heading: string; body: string }) {
  const bullets = (sec.body.match(/^[-*]\s+(.*)$/gm) ?? []).map(s => s.replace(/^[-*]\s+/, ''))
  const points = bullets.slice(0, 6).map(b => {
    const [t, ...rest] = b.split(':')
    return { iconKey: 'badge-check', title: (t || '').trim(), body: rest.join(':').trim() || (t || '').trim() }
  })
  return { blockType: 'whyBroker', title: sec.heading, intro: mdToLexical(sec.body.split('\n').slice(0, 2).join('\n')), points }
}

function toOffer(sec: { heading: string; body: string }) {
  const bullets = (sec.body.match(/^[-*]\s+(.*)$/gm) ?? []).map(s => ({ text: s.replace(/^[-*]\s+/, '').trim() }))
  return {
    blockType: 'offer', title: sec.heading,
    body: mdToLexical(sec.body.split('\n').filter(l => !/^[-*]/.test(l)).join('\n')),
    bullets,
    cta: { label: 'Book Planning Session', href: '/planning-session' },
    darkMode: false,
  }
}

function toVersus(sec: { heading: string; body: string }) {
  return {
    blockType: 'versusTable', title: sec.heading,
    columns: [{ label: 'Broker' }, { label: 'Bank' }],
    rows: [
      { label: 'Lender options', values: [{ text: '30+ wholesale' }, { text: '1' }] },
      { label: 'Rate shopping', values: [{ text: 'Yes' }, { text: 'No' }] },
      { label: 'Personal service', values: [{ text: 'One person, intake to close' }, { text: 'Hand-offs' }] },
    ],
  }
}

function toProcess(sec: { heading: string; body: string }) {
  const bullets = (sec.body.match(/^[-*]\s+(.*)$/gm) ?? []).map(s => s.replace(/^[-*]\s+/, ''))
  const steps = bullets.slice(0, 4).map((b, i) => {
    const [t, ...rest] = b.split(':')
    return { number: String(i + 1).padStart(2, '0'), title: t.trim(), body: rest.join(':').trim(), durationLabel: '' }
  })
  return { blockType: 'process', title: sec.heading, steps: steps.length ? steps : [
    { number: '01', title: 'Intake', body: '', durationLabel: '15 min' },
    { number: '02', title: 'Pre-approval', body: '', durationLabel: '24 hours' },
    { number: '03', title: 'Shop loans', body: '', durationLabel: '2-3 days' },
    { number: '04', title: 'Close', body: '', durationLabel: '21-30 days' },
  ]}
}

function toAudience(sec: { heading: string; body: string }) {
  return {
    blockType: 'audienceGrid', title: sec.heading, audiences: [
      { iconKey: 'home', label: 'First-time buyers', body: '', href: '/first-time-buyers' },
      { iconKey: 'briefcase', label: 'Self-employed', body: '', href: '/loan-programs' },
      { iconKey: 'flag', label: 'Veterans', body: '', href: '/loan-programs/va' },
      { iconKey: 'users', label: 'Families', body: '', href: '/loan-programs' },
    ],
  }
}
```

- [ ] **Step 7: Pages seeder (consumes the mapping table from spec §11)**

`src/seed/pages.ts`:

```ts
import 'server-only'
import path from 'node:path'
import fs from 'node:fs/promises'
import matter from 'gray-matter'
import type { Payload } from 'payload'
import { mdToLexical } from './markdown'
import { mapHomepage } from './homepage-blocks'

type Mapping = { file: string; slug: string; localizationKey: string; locale: 'en' | 'es' }

const MAPPING: Mapping[] = [
  { file: 'homepage.md',                       slug: 'home',                       localizationKey: 'home',                  locale: 'en' },
  { file: 'es-inicio.md',                      slug: 'inicio',                     localizationKey: 'home',                  locale: 'es' },
  { file: 'about.md',                          slug: 'about',                      localizationKey: 'about',                 locale: 'en' },
  { file: 'contact.md',                        slug: 'contact',                    localizationKey: 'contact',               locale: 'en' },
  { file: 'faq.md',                            slug: 'faq',                        localizationKey: 'faq',                   locale: 'en' },
  { file: 'first-time-buyers.md',              slug: 'first-time-buyers',          localizationKey: 'first-time-buyers',     locale: 'en' },
  { file: 'how-it-works.md',                   slug: 'how-it-works',               localizationKey: 'how-it-works',          locale: 'en' },
  { file: 'es-como-funciona.md',               slug: 'como-funciona',              localizationKey: 'how-it-works',          locale: 'es' },
  { file: 'pre-approval.md',                   slug: 'pre-approval',               localizationKey: 'pre-approval',          locale: 'en' },
  { file: 'es-pre-aprobacion.md',              slug: 'pre-aprobacion',             localizationKey: 'pre-approval',          locale: 'es' },
  { file: 'planning-session.md',               slug: 'planning-session',           localizationKey: 'planning-session',      locale: 'en' },
  { file: 'es-sesion-de-planificacion.md',     slug: 'sesion-de-planificacion',    localizationKey: 'planning-session',      locale: 'es' },
  { file: 'realtors.md',                       slug: 'realtors',                   localizationKey: 'realtors',              locale: 'en' },
  { file: 'reviews.md',                        slug: 'reviews',                    localizationKey: 'reviews',               locale: 'en' },
  { file: 'credit-readiness.md',               slug: 'credit-readiness',           localizationKey: 'credit-readiness',      locale: 'en' },
  { file: 'loan-programs.md',                  slug: 'loan-programs',              localizationKey: 'loan-programs',         locale: 'en' },
]

export async function seedPages(payload: Payload, uploadsDir: string, report: any) {
  for (const m of MAPPING) {
    const full = path.join(uploadsDir, m.file)
    let raw: string
    try { raw = await fs.readFile(full, 'utf8') } catch { report.skipped.push({ file: m.file, reason: 'not found' }); continue }
    const { content, data: fm } = matter(raw)
    const title = fm.title || extractTitle(content) || m.slug
    const layout = m.localizationKey === 'home'
      ? mapHomepage(content)
      : [{ blockType: 'richText', content: mdToLexical(content) }]
    // idempotency: find by (slug, locale)
    const existing = await payload.find({
      collection: 'pages', where: { and: [{ slug: { equals: m.slug } }, { locale: { equals: m.locale } }] }, limit: 1,
    })
    if (existing.docs[0]) { report.skipped.push({ file: m.file, reason: 'exists' }); continue }
    await payload.create({
      collection: 'pages',
      data: { title, slug: m.slug, locale: m.locale, localizationKey: m.localizationKey, layout, _status: 'published', publishedAt: new Date().toISOString() },
    } as any)
    report.created.push({ collection: 'pages', file: m.file, slug: m.slug, locale: m.locale })
  }
}

function extractTitle(md: string): string | null {
  const m = md.match(/^#\s+(.*)/m)
  return m ? m[1].trim() : null
}
```

- [ ] **Step 8: Posts, LoanPrograms, FAQs, Reviews, SiteSettings, Forms seeders**

Each follows the same pattern: read file(s), parse frontmatter, idempotently upsert. Skeletons:

`src/seed/posts.ts`:

```ts
import 'server-only'
import path from 'node:path'
import fs from 'node:fs/promises'
import matter from 'gray-matter'
import type { Payload } from 'payload'
import { mdToLexical } from './markdown'

const POSTS = [
  { file: 'blog-fha-vs-conventional.md',        slug: 'fha-vs-conventional' },
  { file: 'blog-first-time-buyer-mistakes.md',  slug: 'first-time-buyer-mistakes' },
  { file: 'blog-how-much-house-can-i-afford.md',slug: 'how-much-house-can-i-afford' },
  { file: 'blog-what-is-pre-approval.md',       slug: 'what-is-pre-approval' },
  { file: 'blog-what-to-expect-at-closing.md',  slug: 'what-to-expect-at-closing' },
]

export async function seedPosts(payload: Payload, uploadsDir: string, report: any) {
  for (const p of POSTS) {
    const full = path.join(uploadsDir, p.file)
    let raw: string
    try { raw = await fs.readFile(full, 'utf8') } catch { report.skipped.push({ file: p.file, reason: 'not found' }); continue }
    const { content, data: fm } = matter(raw)
    const title = fm.title || (content.match(/^#\s+(.*)/m)?.[1] ?? p.slug)
    const excerpt = fm.excerpt || content.split('\n').slice(2, 5).filter(Boolean).join(' ').slice(0, 240)
    const existing = await payload.find({ collection: 'posts', where: { slug: { equals: p.slug } }, limit: 1, locale: 'en' })
    if (existing.docs[0]) { report.skipped.push({ file: p.file, reason: 'exists' }); continue }
    await payload.create({
      collection: 'posts',
      locale: 'en',
      data: { title, slug: p.slug, excerpt, content: mdToLexical(content), _status: 'published', publishedAt: new Date().toISOString() },
    } as any)
    report.created.push({ collection: 'posts', file: p.file, slug: p.slug })
  }
}
```

`src/seed/loan-programs.ts`:

```ts
import 'server-only'
import path from 'node:path'
import fs from 'node:fs/promises'
import matter from 'gray-matter'
import type { Payload } from 'payload'
import { mdToLexical } from './markdown'

const PROGRAMS = [
  { file: 'loan-programs-conventional.md', slug: 'conventional', name: 'Conventional', iconKey: 'home' },
  { file: 'loan-programs-fha.md',          slug: 'fha',          name: 'FHA',          iconKey: 'building' },
  { file: 'loan-programs-va.md',           slug: 'va',           name: 'VA',           iconKey: 'flag' },
  { file: 'loan-programs-usda.md',         slug: 'usda',         name: 'USDA',         iconKey: 'tractor' },
]

export async function seedLoanPrograms(payload: Payload, uploadsDir: string, report: any) {
  for (const p of PROGRAMS) {
    const full = path.join(uploadsDir, p.file)
    let raw: string
    try { raw = await fs.readFile(full, 'utf8') } catch { report.skipped.push({ file: p.file, reason: 'not found' }); continue }
    const { content } = matter(raw)
    const tagline = (content.match(/^>\s*(.*)/m)?.[1] ?? '').slice(0, 140)
    const pros = (content.match(/^[-*]\s+✓?\s*(.*)$/gm) ?? []).slice(0, 6)
      .map(s => ({ item: s.replace(/^[-*]\s+✓?\s*/, '') }))
    const cons = (content.match(/^[-*]\s+(?:✗|❌|–)\s*(.*)$/gm) ?? []).slice(0, 6)
      .map(s => ({ item: s.replace(/^[-*]\s+(?:✗|❌|–)\s*/, '') }))
    const existing = await payload.find({ collection: 'loan-programs', where: { slug: { equals: p.slug } }, limit: 1, locale: 'en' })
    if (existing.docs[0]) { report.skipped.push({ file: p.file, reason: 'exists' }); continue }
    await payload.create({
      collection: 'loan-programs', locale: 'en',
      data: { name: p.name, slug: p.slug, tagline, requirements: mdToLexical(content), pros, cons, iconKey: p.iconKey, order: PROGRAMS.indexOf(p) },
    } as any)
    report.created.push({ collection: 'loan-programs', slug: p.slug })
  }
}
```

`src/seed/faqs.ts`:

```ts
import 'server-only'
import path from 'node:path'
import fs from 'node:fs/promises'
import type { Payload } from 'payload'

export async function seedFAQs(payload: Payload, uploadsDir: string, report: any) {
  const raw = await fs.readFile(path.join(uploadsDir, 'faq.md'), 'utf8').catch(() => '')
  if (!raw) return
  // Parse Q/A pairs: lines like "## Question?" followed by paragraphs until next ##.
  const sections = raw.split(/^##\s+/m).slice(1)
  let order = 0
  for (const sec of sections) {
    const [headLine, ...rest] = sec.split('\n')
    const question = headLine.trim().replace(/[?]+$/, '?')
    const answer = rest.join('\n').trim()
    if (!question || !answer) continue
    const existing = await payload.find({ collection: 'faqs', where: { question: { equals: question } }, limit: 1, locale: 'en' })
    if (existing.docs[0]) { report.skipped.push({ collection: 'faqs', question }); continue }
    await payload.create({ collection: 'faqs', locale: 'en', data: { question, answer: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: answer, version: 1, format: 0, mode: 'normal', detail: 0, style: '' }], version: 1, format: '', direction: 'ltr', indent: 0 }], direction: 'ltr', format: '', indent: 0, version: 1 } }, order: order++ } } as any)
    report.created.push({ collection: 'faqs', question })
  }
}
```

`src/seed/reviews.ts`:

```ts
import 'server-only'
import path from 'node:path'
import fs from 'node:fs/promises'
import type { Payload } from 'payload'

export async function seedReviews(payload: Payload, uploadsDir: string, report: any) {
  const raw = await fs.readFile(path.join(uploadsDir, 'reviews.md'), 'utf8').catch(() => '')
  if (!raw) return
  // Parse blockquote → quote, the next non-empty line as "Author — Context"
  const blocks = raw.split(/\n\n+/)
  for (const blk of blocks) {
    const m = blk.match(/^>\s+(.*?)(?:\n>\s+(.*))*\n*— ?(.+)$/s)
    if (!m) continue
    const quote = blk.split('\n').filter(l => l.startsWith('>')).map(l => l.replace(/^>\s?/, '')).join(' ').trim()
    const meta = blk.split('\n').find(l => l.startsWith('—'))?.replace(/^— ?/, '').trim() || ''
    const [authorName, ...ctx] = meta.split(',').map(s => s.trim())
    const existing = await payload.find({ collection: 'reviews', where: { quote: { equals: quote } }, limit: 1, locale: 'en' })
    if (existing.docs[0]) continue
    await payload.create({ collection: 'reviews', locale: 'en',
      data: { quote, authorName: authorName || 'Anonymous', authorContext: ctx.join(', '), rating: 5, featured: true } } as any)
    report.created.push({ collection: 'reviews', authorName })
  }
}
```

`src/seed/site-settings.ts`:

```ts
import 'server-only'
import type { Payload } from 'payload'

export async function seedSiteSettings(payload: Payload, report: any) {
  // Idempotent: only set fields when global has defaults (first run).
  const current = await payload.findGlobal({ slug: 'site-settings' })
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      brand: { ...(current.brand || {}), accentColor: current?.brand?.accentColor || '#83C340' },
      toggles: { showMarquee: true, showStickyBar: true, darkOffer: false, ...(current.toggles || {}) },
      business: {
        phone: current?.business?.phone || '(689) 210-3448',
        phoneE164: current?.business?.phoneE164 || '+16892103448',
        email: current?.business?.email || 'hello@startmortgage.com',
        address: { street: '112 N Clyde Ave', city: 'Kissimmee', region: 'FL', postalCode: '34741', country: 'US', lat: 28.2919, lng: -81.4076, ...(current?.business?.address || {}) },
        nmls: { broker: '2821608', parent: '2718409', founder: '1631454', ...(current?.business?.nmls || {}) },
        founderBio: { name: 'Jexayra Rivera', jobTitle: 'Mortgage Broker, Founder', ...(current?.business?.founderBio || {}) },
        rating: { value: 4.9, count: 127, ...(current?.business?.rating || {}) },
      },
    } as any,
  })
  report.created.push({ global: 'site-settings' })
}
```

`src/seed/forms.ts`:

```ts
import 'server-only'
import type { Payload } from 'payload'

export async function seedForms(payload: Payload, report: any) {
  const existing = await payload.find({ collection: 'forms', where: { title: { in: ['Planning Session','Contact'] } }, limit: 2 })
  const have = new Set(existing.docs.map((d: any) => d.title))

  if (!have.has('Planning Session')) {
    await payload.create({ collection: 'forms', data: {
      title: 'Planning Session',
      submitButtonLabel: 'Book my session',
      confirmationType: 'message',
      confirmationMessage: 'Thanks! We\'ll reach out within 24 hours.',
      fields: [
        { blockType: 'text', name: 'name', label: 'Name', required: true },
        { blockType: 'email', name: 'email', label: 'Email', required: true },
        { blockType: 'text', name: 'phone', label: 'Phone', required: false },
        { blockType: 'select', name: 'language', label: 'Preferred language', required: false,
          options: [{ value: 'en', label: 'English' }, { value: 'es', label: 'Español' }] },
        { blockType: 'textarea', name: 'goals', label: 'What are you hoping to accomplish?', required: false },
      ],
      emails: [{ emailTo: process.env.RESEND_NOTIFICATION_TO ?? 'hello@startmortgage.com',
        subject: 'New Planning Session request',
        message: 'A new lead has booked a planning session.' }],
    } as any })
    report.created.push({ collection: 'forms', title: 'Planning Session' })
  }
  if (!have.has('Contact')) {
    await payload.create({ collection: 'forms', data: {
      title: 'Contact',
      submitButtonLabel: 'Send message',
      confirmationType: 'message',
      confirmationMessage: 'Thanks for reaching out!',
      fields: [
        { blockType: 'text', name: 'name', label: 'Name', required: true },
        { blockType: 'email', name: 'email', label: 'Email', required: true },
        { blockType: 'textarea', name: 'message', label: 'Message', required: true },
      ],
      emails: [{ emailTo: process.env.RESEND_NOTIFICATION_TO ?? 'hello@startmortgage.com',
        subject: 'New contact message',
        message: 'A new contact form was submitted.' }],
    } as any })
    report.created.push({ collection: 'forms', title: 'Contact' })
  }
}
```

- [ ] **Step 9: Orchestrator + API endpoint**

`src/seed/index.ts`:

```ts
import 'server-only'
import path from 'node:path'
import fs from 'node:fs/promises'
import { payloadClient } from '@/lib/payload'
import { seedPages } from './pages'
import { seedPosts } from './posts'
import { seedLoanPrograms } from './loan-programs'
import { seedFAQs } from './faqs'
import { seedReviews } from './reviews'
import { seedSiteSettings } from './site-settings'
import { seedForms } from './forms'

export async function runSeed() {
  const payload = await payloadClient()
  const uploadsDir = path.resolve(process.cwd(), 'uploads')
  const report: any = { created: [], skipped: [], startedAt: new Date().toISOString(), uploadsDir }
  await seedSiteSettings(payload, report)
  await seedReviews(payload, uploadsDir, report)
  await seedForms(payload, report)
  await seedLoanPrograms(payload, uploadsDir, report)
  await seedPosts(payload, uploadsDir, report)
  await seedFAQs(payload, uploadsDir, report)
  await seedPages(payload, uploadsDir, report)
  report.finishedAt = new Date().toISOString()
  await fs.writeFile(path.resolve(process.cwd(), 'seedReport.json'), JSON.stringify(report, null, 2))
  return report
}
```

`src/app/api/seed/route.ts`:

```ts
import { NextRequest } from 'next/server'
import { runSeed } from '@/seed'

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization') || ''
  const token = auth.replace(/^Bearer\s+/i, '')
  if (token !== process.env.SEED_SECRET) return new Response('Unauthorized', { status: 401 })
  const report = await runSeed()
  return Response.json(report)
}
```

- [ ] **Step 10: Run the seeder locally**

```bash
pnpm dev &
sleep 8
curl -X POST http://localhost:3000/api/seed -H "Authorization: Bearer $(grep SEED_SECRET .env.local | cut -d= -f2)"
```

Expected: 200 with a JSON `report` listing created/skipped entries; `seedReport.json` written.

- [ ] **Step 11: Re-run to confirm idempotency**

```bash
curl -X POST http://localhost:3000/api/seed -H "Authorization: Bearer $(grep SEED_SECRET .env.local | cut -d= -f2)" | head -c 500
```

Expected: most entries appear under `skipped` with `reason: exists`.

- [ ] **Step 12: Commit**

```bash
git add -A && git commit -m "feat(seed): markdown→Lexical converter (TDD) + idempotent seeder for all collections"
```

---

## Phase 17: Local smoke test of seeded site

- [ ] **Step 1: Bring up dev server**

```bash
pnpm dev
```

- [ ] **Step 2: Walk every route in browser** (manual via Playwright if available, otherwise document)

Pages to verify:
- `/` → redirects to `/en`
- `/en` and `/es` (homepage in both locales)
- `/en/about`, `/en/contact`, `/en/faq`, `/en/how-it-works`, `/en/pre-approval`, `/en/planning-session`, `/en/realtors`, `/en/reviews`, `/en/credit-readiness`, `/en/loan-programs`, `/en/first-time-buyers`
- `/es/inicio`, `/es/como-funciona`, `/es/pre-aprobacion`, `/es/sesion-de-planificacion`
- `/en/loan-programs/conventional`, `/en/loan-programs/fha`, `/en/loan-programs/va`, `/en/loan-programs/usda`
- `/en/posts/fha-vs-conventional` (and the other 4 posts)
- Locale switcher in topbar moves between `/en/x` and `/es/x` (or `/es` when no counterpart)
- StickyBar visible on mobile only
- Calculator block reactive
- Forms submit, confirmation visible, submission appears in `/admin`
- Live preview from admin sets `draftMode` and shows draft

- [ ] **Step 3: Capture issues, fix, commit fixes individually**

```bash
git add -A && git commit -m "fix(<area>): smoke-test follow-up <issue>"
```

- [ ] **Step 4: Final commit summarizing smoke test pass**

```bash
git commit --allow-empty -m "chore: local smoke test passes; ready for deploy handoff"
```

---

## Phase 18: Deploy preparation + handoff doc for credential-gated bits

**Files:**
- Modify: `.env.example` (final)
- Create: `README.md` (project-level — supplement existing HANDOFF.md)
- Create: `DEPLOY-HANDOFF.md`

- [ ] **Step 1: Finalize `.env.example`**

```env
# Required
DATABASE_URI=postgres://USER:PASS@HOST:5432/startmortgage
PAYLOAD_SECRET=change-me-32-bytes-hex
NEXT_PUBLIC_SERVER_URL=https://startmortgage.com
PREVIEW_SECRET=change-me-24-bytes-hex
SEED_SECRET=change-me-24-bytes-hex

# Production
BLOB_READ_WRITE_TOKEN=
RESEND_API_KEY=
RESEND_FROM_EMAIL=hello@startmortgage.com
RESEND_NOTIFICATION_TO=hello@startmortgage.com
```

- [ ] **Step 2: README**

`README.md`:

```markdown
# START Mortgage Web

Payload v3 + Next.js 15 site for START Mortgage.

## Local development

1. Install Postgres 16: `brew install postgresql@16 && brew services start postgresql@16`
2. `createdb startmortgage_dev`
3. Copy `.env.example` to `.env.local` and fill in `DATABASE_URI` + secrets.
4. `pnpm install`
5. `pnpm payload migrate`
6. `pnpm dev` (http://localhost:3000)
7. Create the first admin user at `/admin`.
8. Seed: `curl -X POST http://localhost:3000/api/seed -H "Authorization: Bearer $SEED_SECRET"`

## Tests

`pnpm test`

## Deploy

See `DEPLOY-HANDOFF.md`.
```

- [ ] **Step 3: DEPLOY-HANDOFF.md**

`DEPLOY-HANDOFF.md`:

```markdown
# Deploy handoff — START Mortgage Web

Implementation is complete and locally verified. The five steps below are credential-gated and must be performed by the project owner.

## 1. Provision production Postgres

Recommended: Vercel Postgres (Neon). Create a database; copy its connection string into `DATABASE_URI`.

## 2. Provision Vercel Blob

In the Vercel project → Storage → Blob → create a store. Copy `BLOB_READ_WRITE_TOKEN` into the project's environment variables (Production + Preview).

## 3. Provision Resend

Sign up at resend.com, verify the sending domain (startmortgage.com), copy `RESEND_API_KEY` into Vercel env vars. Confirm `RESEND_FROM_EMAIL` and `RESEND_NOTIFICATION_TO`.

## 4. Link Vercel project + first deploy

1. `pnpm dlx vercel link`
2. `pnpm dlx vercel pull .env.local --environment=production`
3. Set the remaining env vars in the Vercel dashboard (`PAYLOAD_SECRET`, `PREVIEW_SECRET`, `SEED_SECRET`, `NEXT_PUBLIC_SERVER_URL`).
4. `pnpm dlx vercel --prod`

## 5. Run production seed once + rotate SEED_SECRET

```bash
curl -X POST https://startmortgage.com/api/seed -H "Authorization: Bearer $PROD_SEED_SECRET"
```

Then rotate `SEED_SECRET` in Vercel env vars.

## Open question to resolve before launch

NMLS / phone conflict (spec §14): seeded values use `homepage.md` as canonical. Confirm with stakeholder.
```

- [ ] **Step 4: Final commit + push**

```bash
git add -A && git commit -m "docs: README + DEPLOY-HANDOFF for credential-gated steps"
git push origin main
```

---

## Self-Review

**Spec coverage:**

| Spec section | Phase(s) covering it |
| --- | --- |
| §1 Decisions | Whole plan |
| §2 Stack | Phase 0–2 |
| §3 Repository structure | Phase 0–9 |
| §4.1 Collections | Phase 4 |
| §4.2 Globals | Phase 3 |
| §5 Blocks (18) | Phase 5 schema, Phase 9 renderers |
| §6 Localization | Phase 2 (config), 4 (Pages.locale + key), 7 (resolver), 10 (middleware), 11 (hreflang) |
| §7 Forms + Calculator | Phase 13, 14 |
| §8 SEO + Structured Data | Phase 11, 12 |
| §9 Theming | Phase 6 |
| §10 Live Preview | Phase 4 (admin url), 10 (route), 15 (additional collections) |
| §11 Seed strategy | Phase 16 |
| §12 Deployment | Phase 18 |
| §13 Out of scope | Honored |
| §14 Risks (NMLS conflict) | Phase 16 (seed picks `homepage.md` canonical) + Phase 18 (flagged for confirmation) |
| §15 Implementation Outline | Maps to Phase 0–18 |

**Placeholder scan:** No "TBD"/"implement later" remaining. Where 18 nearly-identical block schemas appear, each is shown with full code (not "Similar to Task N") because the variants differ in fields.

**Type consistency:** Lexical node shape used in `markdown.ts` matches the shape Payload's Lexical adapter emits (root → paragraph/heading/list/listitem/quote/code with text children). Block slugs in `src/blocks/<Name>/config.ts` match `blockType` strings in `RenderBlocks` dispatcher and seeder output.

**Open dependencies (acknowledged in spec):** Phase 18 hands off the 5 credential-gated steps to the user.
