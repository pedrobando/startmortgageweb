# Deploy state — START Mortgage Web

**Status: deployed.** The site is live on Vercel against a Vercel-managed
Neon Postgres at <https://startmortgageweb.vercel.app>.

## Live verification (what's working in production)

- `/` → 307 → `/en`
- `/en`, `/es`, `/en/about`, `/en/loan-programs/fha`,
  `/en/posts/fha-vs-conventional`, `/es/inicio` — all 200
- `/admin` — Payload admin loads (200)
- `/sitemap.xml` — 200 (38 URLs across both locales)
- `/robots.txt` — 200
- 33 documents seeded in production (16 Pages × 2 locales, 5 Posts,
  4 LoanPrograms, 5 FAQs, plus the 2 forms + SiteSettings global)

## Vercel config

| Item | Value |
| --- | --- |
| Team | pedro-riveras-projects-91affe53 |
| Project | startmortgageweb |
| Production URL | https://startmortgageweb.vercel.app |
| GitHub repo | https://github.com/pedrobando/startmortgageweb (auto-deploy on push to `main`) |
| Database | Vercel Marketplace Neon — `neon-orange-magnet` (us-east-1) |
| Build command | `pnpm run build` (auto-detected) |
| Node version | 24.x |

### Environment variables set in Vercel

Production + Development:
- `DATABASE_URL` (Neon-injected pooler URL with `sslmode=require`)
- `DATABASE_URI` (mirror of `DATABASE_URL` so Payload's `DATABASE_URI \|\| DATABASE_URL` lookup succeeds even if the spec name changes)
- `PAYLOAD_SECRET`, `PREVIEW_SECRET`, `SEED_SECRET`, `CRON_SECRET`
- `NEXT_PUBLIC_SERVER_URL` = `https://startmortgageweb.vercel.app`

Plus the standard set Neon's marketplace integration injects automatically:
`PG{HOST,USER,PASSWORD,DATABASE}`, `POSTGRES_*` aliases, `NEON_PROJECT_ID`,
`VERCEL_OIDC_TOKEN`.

Preview env: secrets were not added because Vercel's `vercel env add` for
Preview requires a specific Git branch name (no wildcard support). The
production deploy is what's live; preview branches will need their own
secret set if used.

## Two issues fixed during the deploy that you should be aware of

1. **`"type": "module"` in `package.json`** triggered `ERR_REQUIRE_ESM`
   when Vercel's CJS launcher (`___next_launcher.cjs`) tried to load the
   emitted page bundles. **Fix:** dropped `"type": "module"` from
   `package.json`. Local build and runtime both still work.
2. **Static prerender of `/`** evaluated the root layout, which (before
   the fix) called `getPayload({ config })` to read SiteSettings and
   tried to open a Postgres connection at build time. **Fix:** the root
   layout no longer touches Payload — it sets the default `--accent`
   only. The locale layout still loads SiteSettings on every render
   (acceptable, as those layouts are dynamic).
3. **Seed report write** failed with `EROFS` on Vercel's read-only
   filesystem. **Fix:** the `fs.writeFile` for `seedReport.json` is now
   best-effort — swallowed when `code === 'EROFS'`. The seed itself
   still completes and returns its report in the HTTP response.

## What still needs human action

### 1. Rotate `SEED_SECRET` (recommended, not blocking)

The seed endpoint at `/api/seed` is gated by `SEED_SECRET`. The seed has
already run successfully against production, so you can rotate the
secret to disable re-seeding (or remove the env var entirely):

```bash
vercel env rm SEED_SECRET production --yes
# or set a new value:
vercel env add SEED_SECRET production --value "$(node -e "console.log(require('crypto').randomBytes(24).toString('hex'))")" --yes
```

Then redeploy: `vercel --prod --yes`.

### 2. Provision Vercel Blob (needed for media uploads)

The build emits this warning:
> Collections with uploads enabled require a storage adapter when
> deploying to Vercel. Collection(s) without storage adapters: media.

Without this, any image uploaded through the admin will fail in prod
(local fs is read-only). To fix:

```bash
# In the Vercel dashboard: Project → Storage → Blob → Create store
# That auto-injects BLOB_READ_WRITE_TOKEN into the project's env vars.
vercel --prod --yes   # redeploy to pick up the token
```

The Payload config already gates the `vercelBlobStorage` adapter on
`BLOB_READ_WRITE_TOKEN`, so once the token is present the adapter
activates automatically.

### 3. Provision Resend (needed for form notifications)

Without Resend, the Planning Session and Contact forms still SAVE
submissions to the `form-submissions` collection (visible in admin),
but no email is sent on submit.

```bash
# Sign up at resend.com, verify the sending domain, then:
vercel env add RESEND_API_KEY production --value re_xxx --yes
vercel env add RESEND_FROM_EMAIL production --value hello@startmortgage.com --yes
vercel env add RESEND_NOTIFICATION_TO production --value hello@startmortgage.com --yes
vercel --prod --yes
```

### 4. Custom domain

Currently the site is at `https://startmortgageweb.vercel.app`. To
point `startmortgage.com` (or any other domain) at it:

```bash
vercel domains add startmortgage.com
# Follow the DNS instructions Vercel prints. Once verified:
vercel alias https://startmortgageweb.vercel.app startmortgage.com
```

Then update `NEXT_PUBLIC_SERVER_URL` to the new origin and redeploy:

```bash
vercel env rm NEXT_PUBLIC_SERVER_URL production --yes
vercel env add NEXT_PUBLIC_SERVER_URL production --value https://startmortgage.com --yes
vercel --prod --yes
```

This affects JSON-LD URLs, the sitemap, and `og:url` tags.

### 5. NMLS / phone-number stakeholder confirmation

The seeded `SiteSettings` global uses values from `homepage.md` (phone
`(689) 210-3448`, broker NMLS `2821608`, parent NMLS `2718409`, founder
NMLS `1631454`). The `index.html` JSON-LD's older numbers are NOT used.
Confirm with Jexayra Rivera + Lend Labs LLC compliance before any
public marketing push.

## Known limitations carried over from the build

These are intentional tradeoffs from the implementation plan, not bugs:

1. **Block visual fidelity is "serviceable, not pixel-perfect."** The 18
   block renderers in `src/components/blocks/RenderBlocks.tsx` use
   Tailwind utilities and the START accent token, but they don't yet
   match every pixel of `reference/components/Sections.jsx`. Edit in
   admin to refine.
2. **The homepage block heuristic mostly produces `richText` fallbacks**
   because `homepage.md` uses literal layout headings like
   `## SECTION 2: Hero` rather than user-facing copy. The seeded
   homepage is structurally complete (16 layout blocks) but reads as a
   layout spec until an editor swaps the richText blocks for the
   matching block types in admin.
3. **Spanish blog posts are not seeded** — the source `.zip` doesn't
   include them. The `blogTeasers` block on Spanish pages will render
   the English posts.

## Useful local commands now

```bash
# Pull production env locally (for migrations etc.)
vercel env pull .env.production.local --environment=production --yes

# Run a migration locally against the prod Neon DB
DATABASE_URL=$(grep DATABASE_URL= .env.production.local | cut -d= -f2- | tr -d '"') \
DATABASE_URI="$DATABASE_URL" \
pnpm payload migrate

# Tail prod logs (interactive)
vercel logs https://startmortgageweb.vercel.app

# Re-seed (only works while SEED_SECRET is still valid)
SEED=$(grep SEED_SECRET= .env.production.local | cut -d= -f2- | tr -d '"')
curl -X POST https://startmortgageweb.vercel.app/api/seed \
  -H "Authorization: Bearer $SEED"
```

## First admin user

Sign in at <https://startmortgageweb.vercel.app/admin> — the first
sign-in creates the admin account. (No admin user exists in production
yet; seeding creates content but not users.)
