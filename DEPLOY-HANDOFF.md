# Deploy handoff — START Mortgage Web

**State on the `feat/payload-port` branch:** Phases 0–17 of the
implementation plan are complete and verified locally. The five steps
below are credential-gated and must be performed by the project owner.

## Local verification status (what's working before any deploy)

- Postgres 16 (Homebrew) running with a fresh single migration applied.
- `pnpm install`, `pnpm payload migrate`, `pnpm dev` all clean.
- Admin at `/admin` returns 200; a first user account can be created.
- `POST /api/seed` with the dev `SEED_SECRET` populates 33 documents:
  SiteSettings global, 2 forms, 4 loan programs, 5 blog posts, 5 FAQs,
  16 Pages across `en` + `es`. Re-runs are idempotent (30 skipped, 1
  SiteSettings update on second run, 0 errors).
- `pnpm test` runs 17 unit tests (9 calculator math + 8 markdown
  converter) — all green.
- 10-route smoke probe: `/` 307→`/en`, `/en`, `/es`, `/en/about`,
  `/en/loan-programs/fha`, `/en/loan-programs/usda`,
  `/en/posts/fha-vs-conventional`, `/es/inicio`, `/es/como-funciona`,
  `/admin` — all 200.
- `/sitemap.xml` returns 38 URLs across both locales; `/robots.txt`
  allows `/` and disallows `/admin`+`/api`.

## What's intentionally deferred / known limitations

Documented here so they don't surprise reviewers:

1. **Block visual fidelity is "serviceable, not pixel-perfect."** The
   18 renderers in `RenderBlocks.tsx` use Tailwind utilities and the
   START accent token, but they don't yet match every pixel of
   `reference/components/Sections.jsx`. Editors can refine in admin
   without code changes for most things.
2. **The homepage block heuristic in `seed/homepage-blocks.ts` mostly
   produces `richText` fallbacks** because `homepage.md` uses literal
   layout headings like `## SECTION 2: Hero` rather than user-facing
   copy. The seeded homepage is structurally complete (16 layout blocks)
   but reads as a layout spec until an editor swaps the richText blocks
   for the matching block types in admin.
3. **Spanish blog posts are not seeded** because the source `.zip` does
   not include them — same call as spec §13. The `blogTeasers` block on
   Spanish pages will render the English posts.
4. **NMLS / phone-number conflict (spec §14):** the seeder treats
   `homepage.md` as canonical (phone `(689) 210-3448`, broker NMLS
   `2821608`, parent NMLS `2718409`, founder NMLS `1631454`) and seeds
   those into SiteSettings. The `index.html` JSON-LD's older numbers
   (`+1-407-555-1234`) are NOT used. **Confirm with the broker/owner
   before launch.**
5. **Migrations folder:** the current state is one initial migration.
   When you change a collection schema, run
   `pnpm payload migrate:create <name>` and commit the resulting
   `*.json` + `*.ts` files.

## The five credential-gated steps you (the owner) need to run

### 1. Provision production Postgres

Pick one of:

- **Vercel Postgres / Neon** (recommended): Vercel dashboard → Storage
  → Create → Neon. Use a separate branch for preview environments.
- **Self-hosted / managed Postgres elsewhere**: any reachable Postgres
  16 instance with a connection string.

Copy the connection string to Vercel as `DATABASE_URI` and
`DATABASE_URL` (some Payload code paths still read the older name —
keep both in sync).

### 2. Provision Vercel Blob

In the Vercel project → **Storage → Blob → Create store**.
Vercel auto-injects `BLOB_READ_WRITE_TOKEN` into the project's env vars
on the next deploy. Confirm it's present.

The Payload config gates the Blob storage adapter on this token: when
absent, Payload falls back to its default disk storage in
`public/media/` (fine for local dev, not for production).

### 3. Provision Resend

1. Sign up at resend.com.
2. Verify the sending domain `startmortgage.com`.
3. Copy the API key to Vercel as `RESEND_API_KEY`.
4. Confirm `RESEND_FROM_EMAIL` (default: `hello@startmortgage.com`)
   and `RESEND_NOTIFICATION_TO` (where new form submissions land).

The Payload config gates the Resend adapter on `RESEND_API_KEY`.

### 4. Link the Vercel project + first deploy

```bash
pnpm dlx vercel link
pnpm dlx vercel pull .env.local --environment=production
# Make sure these are set in the Vercel dashboard:
#   PAYLOAD_SECRET, PREVIEW_SECRET, SEED_SECRET, CRON_SECRET,
#   NEXT_PUBLIC_SERVER_URL=https://startmortgage.com
pnpm dlx vercel --prod
```

The build runs `next build`. Migrations are NOT auto-applied — see
spec §12 if you want a prebuild migration step.

### 5. Run production seed once + rotate `SEED_SECRET`

```bash
curl -X POST https://startmortgage.com/api/seed \
  -H "Authorization: Bearer $PROD_SEED_SECRET"
```

Inspect the returned report. Then rotate `SEED_SECRET` in the Vercel
dashboard so the endpoint is no longer reachable with the old token.

(Alternative: temporarily remove `SEED_SECRET` from the env vars to
disable the route entirely, since the route returns 401 when the env
var is unset.)

## Post-deploy smoke list

After the first production deploy + seed, verify:

- [ ] `/` redirects to the appropriate locale.
- [ ] `/admin` loads and login works.
- [ ] `/en` and `/es` homepages render.
- [ ] `/en/loan-programs/fha` (and the other three programs) render.
- [ ] `/en/posts/fha-vs-conventional` (and the other four posts) render.
- [ ] Submit the Planning Session form on `/en/planning-session` — a
      submission appears in `/admin/collections/form-submissions` and
      Resend logs a successful send to `RESEND_NOTIFICATION_TO`.
- [ ] `/sitemap.xml` returns the expected URLs.
- [ ] Live preview works: edit a page in admin → click View Live →
      `?preview=true&token=…` enables `draftMode` and renders the draft.

## Open question to resolve before public launch

**NMLS / phone-number canonicalization** (spec §14, item 4 above).
The site is currently shipping with `homepage.md` values. Confirm with
Jexayra Rivera + Lend Labs LLC compliance.

---

If you need to roll back or troubleshoot, the implementation plan at
`docs/superpowers/plans/2026-04-26-startmortgage-payload-port-implementation.md`
documents every phase commit-by-commit, and the spec at
`docs/superpowers/specs/2026-04-26-startmortgage-payload-port-design.md`
holds the locked decisions.
