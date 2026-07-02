# Audit learnings: anasantana.me

Read this at the start of every audit (Step 1). Append to it at the end (Step 6).
Where AUDIT-LOG.md tracks findings and their status, this file makes the audit
sharper and quieter each run: site facts already known, environment quirks and the
workaround that beat them, and questions that proved avoidable so they are never
asked again. This file only persists if committed to the repo.

---

## Fixed audit target (resolve from here, never ask)

- Live URL: https://anasantana.me. This is the standing target. When the user says "audit"
  with no other detail, this is the site. Load it and begin.
- Repo: https://github.com/therealcontextlab/anasantana (public, verified 2026-07-02).
  Read pristine source directly from it (clone or the GitHub API). Source-level checks
  run without the browser; live header, console, and render checks still need the live
  URL loaded in the browser.
  Structure: flat root (index.html, assay.html, however-you-got-here.html, resume.html,
  resume.pdf), plus work/vault-and-brawl.html, robots.txt, _headers, self-hosted fonts/,
  and vendor/ (React + Babel). No netlify.toml or _redirects. The committed AUDIT-LOG.md
  and AUDIT-LEARNINGS.md live in this root.

## In flux (do not treat as stable yet, as of 2026-07-02)

- Branding under active reconsideration. Do not treat the current palette (clay #C2602B,
  dark green) as fixed, and do not flag brand-color choices as regressions until the rebrand
  settles. Still flag contrast objectively against AA regardless of the palette chosen.
- Page set is changing: new pages are coming and some existing pages are being removed.
  Re-derive the live page list from the homepage nav and the repo on every run. Do not assume
  the current set. Update the structure notes and the definition of clean once it settles.

## Definition of clean (the standing bar to measure each run against)

The site is "clean" when all of the following hold. Report any that slip as a regression.

- Out of search intact: robots.txt Disallow: /, meta robots noindex on every page, and
  X-Robots-Tag noindex header, all three present and in agreement.
- Zero open Layer 1 fundamentals: no broken links (checked by reading bodies, not status),
  no contrast failures below AA, one H1 per page with no skipped heading levels, no console
  errors on load, no secrets or EXIF exposure, /.git and /.env not served.
- Link previews present: og:title, og:description, and og:image on every page (the site is
  shared by URL, so the card is the first impression).
- Live matches repo: the deployed site reflects the current repo HEAD (no drift).
- Security headers hold: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, HSTS.

## Site facts (known and stable)

- Owner intent: out of search, URL open to anyone who has it. Not a private site.
  As of 2026-07-02 all three signals are correct: robots.txt Disallow: /, meta robots
  noindex on every page, and X-Robots-Tag: noindex served by Netlify. Do not re-litigate
  the intent, just confirm the three signals still agree.
- Stack: domain at Porkbun, hosted on Netlify, auto-deploys from a GitHub repo.
  Owner is not fluent in Git, so handoffs stay dead simple and the GitHub web editor
  is the default deploy path.
- Brand palette accent: clay #C2602B (rgb 194,96,43). It fails AA for small text on both
  light and dark-green backgrounds, passing only at large sizes. Any contrast fix is a
  color-value change, verified against 4.5:1 before committing.
- Headshot is already EXIF-clean (no GPS, no camera data). Re-check only if the image changes.
- Not purely static HTML/CSS. vendor/ ships React and in-browser Babel, so at least one
  page transpiles JSX at runtime. This is why any Content-Security-Policy must account for
  inline scripts and Babel (needs 'unsafe-eval'), and why a naive CSP will break the site.
- _headers currently sets X-Frame-Options DENY, X-Content-Type-Options nosniff,
  Referrer-Policy, and X-Robots-Tag noindex. It does NOT set Content-Security-Policy or
  Permissions-Policy. That absence is the source, not a mystery: those two headers simply
  are not in the file.
- Internal links are relative (assay.html, work/vault-and-brawl.html), not root-absolute.

## Environment quirks and workarounds

- The tool output filter blocks anything URL or query-string shaped. Return booleans and
  short flags, sanitize hrefs to path tails, never dump raw header values or full outerHTML.
  Extract the head as structured fields, not as raw HTML.
- resize_window does not shrink the CSS viewport in this environment (innerWidth stays wide),
  so 375px phone width cannot be observed directly. Judge responsiveness from the viewport
  meta and CSS breakpoints, and flag true phone width as a glance-item, do not claim it.
- A status-only fetch of a missing route can report 200 while the body is the 404 page
  (soft-404 flap). Always read the response body to judge a link, never trust status alone.
- Network and console capture start on the first tool call. Reload the page after starting
  capture, or load-time errors are missed.

## Retired questions (never ask these again)

- "Which fix do you want to start with." Go in severity order.
- "Where does the site live." The target is fixed above. On a bare "audit," load it and begin.

## Genuine forks that still need the owner (frame as a default, not an open question)

- Committing a brand-color change. Recommend the exact verified hex, take it on a yes.

## Vault & Brawl: RESOLVED 2026-07-02

- The page was never missing. Source exists at work/vault-and-brawl.html (real, ~434 lines),
  reachable live at /work/vault-and-brawl, and the homepage links to it correctly.
- The 404 seen during the audit was live-vs-repo deploy drift. A later deploy brought the
  live site current, and the owner confirmed the homepage Vault link now lands on the page.
  Closed. Kept here only as the worked example of the soft-404 / drift pattern.

## v2 direction (roadmap, discussed 2026-07-02, not yet built)

The elevation is one structural move: a small static build step (for example 11ty), keeping
the site static, fast, untracked, and out of search. That single change unlocks the rest:

- Design tokens: palette, spacing, and type as CSS custom properties in one place, so a
  rebrand or a contrast fix is a one-line edit instead of hunting hex across pages.
- Shared layout partials: header, nav, footer, and meta defined once, so adding and removing
  pages cannot drift them out of sync.
- Precompile JSX at build and drop in-browser Babel, so visitors stop downloading a transpiler
  and pages get lighter and faster.
- Build-time meta and Open Graph so every page gets title, description, and og:image
  automatically. Fixes the current gaps and prevents new ones.
- The definition of clean, run as a pre-deploy check on every Netlify build, so regressions
  are caught before they reach the live site.

Do NOT jump to a heavy SPA framework. It would slow the site and add tracking and complexity
surface. Keep it static. This is a weekend-sized project, not a toggle.

---

## Run history

### 2026-07-02
- First run. Seeded this file. Live audit of homepage plus 4 subpages.
- Later same day: repo verified public and cloned. Confirmed _headers, robots.txt, no secrets,
  self-hosted fonts, vendored React/Babel. Added the fixed target, the definition of clean,
  and structural facts.
- Vault & Brawl closed: was deploy drift, owner confirmed the live link now works.
- Owner signaled a rebrand and page-set changes incoming (see In flux), and asked for a v2
  direction (recorded above).
- Recurring-to-watch: contrast on the accent color (fundamental, open, but hold brand-color
  changes until the rebrand settles). og:image still missing sitewide. Heading skip on the
  homepage and missing H1 on /resume and /assay still open.
