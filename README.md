# START Mortgage Web

Payload v3 + Next.js 16 site for **START Mortgage** (Lend Labs LLC) —
boutique bilingual mortgage brokerage in Kissimmee, FL.

Built from the official Payload Website Template, customized for:

- Postgres (`@payloadcms/db-postgres`) instead of MongoDB
- EN/ES localization (one-doc-per-locale Pages with a `localizationKey`
  field; field-level localization on Posts / LoanPrograms / FAQs /
  Reviews / Globals)
- 18 page-builder blocks mirroring the source `Sections.jsx`
- Brand: Poppins, START accent (`#83C340`), START palette via Tailwind
  v4 `@theme` tokens with a runtime-overridable `--accent` CSS variable
- Idempotent Markdown → Payload seeder for the 26 `.md` files in
  `uploads/`
- Server-rendered JSON-LD (LocalBusiness / MortgageBroker / WebSite /
  Article) and a locale-aware sitemap

## Local development

### Prereqs
- Node 20+
- pnpm 10+
- Postgres 16

```bash
brew install postgresql@16 && brew services start postgresql@16
createdb startmortgage_dev
```

### Setup

```bash
cp .env.example .env
# edit .env — set DATABASE_URI to your local Postgres URL and generate
# 32-byte secrets for PAYLOAD_SECRET / PREVIEW_SECRET / SEED_SECRET /
# CRON_SECRET via:
#   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

pnpm install --ignore-workspace
pnpm payload migrate
pnpm dev
```

Open http://localhost:3000 — the proxy redirects to `/en` based on
Accept-Language. Sign in to the admin at `/admin` and create the first
user.

### Seeding content

The seeder turns the 26 Markdown files in `uploads/` into Payload docs
across `pages` (en + es), `posts`, `loan-programs`, `faqs`, `reviews`,
`forms`, plus the `site-settings` global. It is idempotent — every
upsert is keyed by `(collection, slug, locale)`.

```bash
SEED=$(grep "^SEED_SECRET=" .env | cut -d= -f2)
curl -X POST http://localhost:3000/api/seed -H "Authorization: Bearer $SEED"
```

`seedReport.json` is written at the repo root with `created`,
`skipped`, and `errors` arrays.

### Tests

```bash
pnpm test        # unit tests (calculator math, markdown→Lexical)
pnpm test:e2e    # Playwright end-to-end (template-supplied)
```

## Routing

| URL                                | Resolves to                                            |
| ---------------------------------- | ------------------------------------------------------ |
| `/`                                | 307 → `/en` (or `/es` per Accept-Language)             |
| `/en` / `/es`                      | Pages with `(localizationKey='home', locale=…)`        |
| `/[locale]/[…slug]`                | (slug, locale) first; then (localizationKey, locale)   |
| `/[locale]/posts/[slug]`           | Single localized Post doc                              |
| `/[locale]/loan-programs/[slug]`   | Single localized LoanProgram doc                       |
| `/admin`                           | Payload admin UI                                       |
| `/api/*`                           | Payload REST + GraphQL                                 |
| `/api/seed`                        | Idempotent seeder, gated by `SEED_SECRET` bearer       |
| `/sitemap.xml`, `/robots.txt`      | Generated on demand                                    |

## Project layout (the parts you actually touch)

```
src/
  app/(frontend)/[locale]/        — public site routes
  app/(payload)/                  — admin + REST + /api/seed
  blocks/StartBlocks/             — 18 block configs (interfaceName matches
                                    blockType in the renderer dispatcher)
  collections/                    — Pages, Posts, LoanPrograms, FAQs,
                                    Reviews, Categories, Media, Users
  globals/SiteSettings/           — brand, toggles, business, NMLS, founder
  components/blocks/RenderBlocks  — single-file dispatcher → 18 renderers
  components/calculator/          — TDD'd math + 'use client' Calculator
  components/chrome/StartChrome   — Topbar, Nav, Footer, StickyBar
  components/forms/FormSubmitter  — generic Payload form submitter
  components/seo/JsonLd           — JSON-LD <script> wrapper
  lib/payload.ts                  — server-only Payload client
  lib/locale.ts                   — Locale type, findPageByPath, findHome
  lib/seo.ts                      — JSON-LD builders
  seed/                           — markdown converter + per-collection
                                    seeders + orchestrator
  proxy.ts                        — locale prefix middleware (Next 16 rename)
uploads/                          — 26 source Markdown files (committed)
reference/                        — original static React app (visual ref only)
docs/superpowers/specs/           — design spec
docs/superpowers/plans/           — implementation plan
```

## Spec + plan

- `docs/superpowers/specs/2026-04-26-startmortgage-payload-port-design.md`
- `docs/superpowers/plans/2026-04-26-startmortgage-payload-port-implementation.md`

## Deploy

See `DEPLOY-HANDOFF.md` — the five credential-gated steps that the
project owner needs to run.
