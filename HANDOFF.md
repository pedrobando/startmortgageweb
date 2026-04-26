# Handoff — START Mortgage → Payload CMS Port

**Status:** Brainstorming complete. Spec written and approved-pending-review. **No implementation has started.**

## What's in the repo

- `docs/superpowers/specs/2026-04-26-startmortgage-payload-port-design.md` — the design spec. Read this first.
- `uploads/` — 26 Markdown files of editorial content (homepage, about, FAQ, loan programs, blog posts, Spanish pages). The seed script will consume these.
- `design-system/` — original CSS tokens (`colors_and_type.css`) and brand logos (PNG, icon + wordmark, black + white).
- `reference/` — original static React app from the .zip (`index.html`, `site.css`, `tweaks-panel.jsx`, `components/*.jsx`). **Reference only** — to be reimplemented as Payload blocks, not ported verbatim.
- `START Website.zip` — original source artifact (gitignored).

## Decisions locked in (see spec §1)

Stack: Next.js 15 + Payload v3 + Postgres + Vercel + Vercel Blob + Resend. Payload Website Template as starter. Block-based page builder (18 blocks). Hybrid localization (one-doc-per-locale Pages linked by `localizationKey`; field-level `localized: true` on Posts/LoanPrograms/FAQs/Reviews/Globals). Form Builder plugin + client-only mortgage calculator. SEO plugin + server-rendered JSON-LD. Live preview / drafts on. One-shot seeder for content.

## Next steps for the picking-up session

1. Re-read the spec at `docs/superpowers/specs/2026-04-26-startmortgage-payload-port-design.md`.
2. Confirm the spec with the user (or proceed if already approved).
3. Invoke the **superpowers:writing-plans** skill to expand spec §15 (Implementation Outline) into a step-by-step implementation plan.
4. Then invoke **superpowers:executing-plans** to do the work, starting with `pnpm create payload-app -t website`.

## Open question called out in the spec

NMLS / phone number conflict between `reference/index.html` JSON-LD (`+1-407-555-1234`, NMLS `2821608`) and `uploads/homepage.md` (`(689) 210-3448`, NMLS `2718409`). Spec proposes treating `homepage.md` as canonical and storing in `SiteSettings`; needs stakeholder confirmation before launch.
