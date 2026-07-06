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
  Read pristine source directly from it. raw.githubusercontent.com/.../main/<path> works
  from a restricted network; the GitHub contents/tree API was rate-limited on a shared IP,
  so prefer raw HEAD/GET over the API. Source-level checks run without a browser; live
  header, console, and render checks still need the live URL loaded.
  Structure (as of 2026-07-05): flat root with index.html and assay.html as the live set,
  robots.txt, _headers, og.png, ana-headshot.jpg, self-hosted fonts/, vendor/ (React + Babel).
  resume.html, resume.pdf, however-you-got-here.html, and work/vault-and-brawl.html were
  orphaned by the homepage rebuild and are being deleted. No netlify.toml or _redirects.
  The committed AUDIT-LOG.md and AUDIT-LEARNINGS.md live in this root.

## Settled 2026-07-05 (was "in flux")

- Page set settled: the intended live set is index.html + assay.html. The other four pages
  are being removed. Re-derive from the homepage on each run anyway, but this is the target.
- Homepage rebuilt to thesis A ("The next phase of AI runs on judgment. That is the part I am
  built for."). Single flagship receipt (Assay); "However You Got Here" and "Vault & Brawl"
  cut from the homepage. A quiet one-line teaser for the owner's in-progress AI Academy sits
  near the bottom ("What I'm building now"). Resume and all resume links removed from the site.
- Palette is stable. Cool editorial theme: --paper #EEF2F1, --ink #0E2F2A, clay --rust #C2602B
  with --rust-dark #a84e20. Do not flag these brand choices as regressions. Still flag contrast
  objectively against AA.

## Definition of clean (the standing bar to measure each run against)

The site is "clean" when all of the following hold. Report any that slip as a regression.

- Out of search intact: robots.txt Disallow: /, meta robots noindex on every page, and
  X-Robots-Tag noindex header, all three present and in agreement.
- Zero open Layer 1 fundamentals: no broken links (checked by reading bodies, not status),
  no contrast failures below AA, one H1 per page with no skipped heading levels, no console
  errors on load, no secrets or EXIF exposure, /.git and /.env not served, and no page that
  was removed from the site still served at its URL.
- Link previews present: og:title, og:description, and og:image on every page (the site is
  shared by URL, so the card is the first impression). Homepage meets this; Assay pending.
- Live matches repo: the deployed site reflects the current repo HEAD (no drift).
- Security headers hold: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, HSTS.

## Site facts (known and stable)

- Owner intent: out of search, URL open to anyone who has it. Not a private site. All three
  out-of-search signals confirmed correct across runs. Do not re-litigate the intent; just
  confirm the three signals still agree.
- Purpose (as of 2026-07-05): the site is a front door for the owner's own audience and
  venture, not primarily a recruiter portfolio. The job search is a documented floor.
- Stack: domain at Porkbun, hosted on Netlify, auto-deploys from the GitHub repo. Owner is
  not fluent in Git; handoffs stay dead simple and the GitHub web editor is the default path.
- Two themes, opposite contrast fixes. The homepage is LIGHT (paper #EEF2F1): rust as small
  text fails AA, so the fix is to DARKEN to rust-dark #a84e20 (4.9:1). The Assay page is DARK
  (bg #0B211E, text #EAF3F0): rust as text fails because it is too dark, so the fix is to use
  the page's own lighter --accent2 #E7A77E, NOT to darken. Never blanket-darken the accent
  across the whole site; the right direction depends on the theme. Verify against 4.5:1.
- The Assay page defines two accents: --accent #C2602B (clay, keep for decorative strokes and
  the ::selection highlight) and --accent2 #E7A77E (lighter, use for accent text on the dark bg).
- Assay was built with Claude and ships as a compiled bundle (__bundler/template, data-props).
  Its head (title, meta) is plain HTML and safe to hand-edit; its CSS and body live inside the
  compiled/escaped template and are fragile to hand-edit. Copy and style changes belong in the
  source and a re-publish, not in the deployed file, or a re-publish will overwrite them.
- Headshot is EXIF-clean (no GPS, no camera data). ana-headshot.jpg exists at the repo root and
  renders when served; a "missing headshot" is almost always the delivered HTML opened locally
  (file://) with the image not beside it, not a real break. Re-check only if the image changes.
- Not purely static HTML/CSS. vendor/ ships React and in-browser Babel; the Assay page transpiles
  JSX at runtime. The homepage does NOT (its only script is a vanilla IntersectionObserver reveal).
  Any Content-Security-Policy must account for the Assay page's inline scripts and Babel
  ('unsafe-eval'); a naive CSP breaks that page. CSP is coupled to the parked build rebuild.
- _headers sets X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, and
  X-Robots-Tag noindex. It does NOT set CSP or Permissions-Policy. HSTS was seen live on
  2026-07-02 (Netlify default), not in _headers.
- Internal links are relative (assay.html), not root-absolute. og.png is at the repo root and
  referenced as https://anasantana.me/og.png.

## Environment quirks and workarounds

- This audit environment cannot load the live anasantana.me URL from its shell (not in the
  network allowlist), so a bash-only run is source/repo-only. Live header, console, and render
  checks need a browser tool or a later live run. Say which access the run had.
- The GitHub contents/tree API rate-limits on the shared IP. Use raw.githubusercontent.com
  HEAD/GET per file instead of listing via the API.
- A status-only fetch of a missing route can report 200 while the body is the 404 page
  (soft-404 flap). Always read the response body to judge a link, never trust status alone.
- resize_window does not shrink the CSS viewport here (innerWidth stays wide), so 375px phone
  width cannot be observed directly. Judge responsiveness from the viewport meta and CSS
  breakpoints, and flag true phone width as a glance-item, do not claim it.
- Network and console capture start on the first tool call. Reload the page after starting
  capture, or load-time errors are missed.

## Retired questions (never ask these again)

- "Which fix do you want to start with." Go in severity order.
- "Where does the site live." The target is fixed above. On a bare "audit," load it and begin.
- "Is the headshot broken." Check whether ana-headshot.jpg exists at the repo root (it does) and
  whether the reference matches. If both hold, it renders when served; a local-file preview is
  the usual cause of a blank image. Do not treat it as a site break without a live check.

## Genuine forks that still need the owner (frame as a default, not an open question)

- Deleting a page the homepage no longer links to. Recommend the delete; note that removing it
  from the repo does not touch any copy the owner keeps elsewhere (matters for HYGH/Vault, which
  may feed the venture). Take it on a yes.
- A brand-color change. Recommend the exact verified hex, take it on a yes.

## v2 direction (roadmap, discussed 2026-07-02, still parked as of 2026-07-05)

The elevation is one structural move: a small static build step (for example 11ty), keeping the
site static, fast, untracked, and out of search. That unlocks design tokens (one place for the
palette so a contrast fix is one line), shared layout partials, precompiled JSX (dropping the
in-browser Babel, which also unblocks a real CSP), build-time meta/OG on every page, and the
definition of clean run as a pre-deploy check. Owner's decision (2026-07-05): keep this parked
as a separate weekend project and keep the portfolio and the venture on separate tracks. Do NOT
jump to a heavy SPA framework. Keep it static.

---

## Run history

### 2026-07-02
- First run. Seeded this file. Live audit of homepage plus 4 subpages.
- Later same day: repo verified public and cloned. Confirmed _headers, robots.txt, no secrets,
  self-hosted fonts, vendored React/Babel. Added the fixed target, the definition of clean,
  and structural facts.
- Vault & Brawl closed: was deploy drift, owner confirmed the live link now works.
- Owner signaled a rebrand and page-set changes incoming, and asked for a v2 direction.
- Open at end: accent contrast, homepage heading skip, missing H1 on /resume and /assay,
  og:image missing sitewide.

### 2026-07-05
- Second run, source/repo only (could not load the live URL from this environment).
- Between runs the homepage was rebuilt to thesis A and deployed: single Assay flagship,
  HYGH and Vault cut, Academy teaser added, resume and all resume links removed, og.png added.
- Resolved: homepage contrast (accent labels + primary button to rust-dark), homepage heading
  skip (D's to H3), missing H1 (Assay has one; /resume being removed), homepage og:image.
- New fundamental: four removed-but-served pages (resume.html, resume.pdf,
  however-you-got-here.html, work/vault-and-brawl.html) still return 200 while unlinked.
  Owner agreed to delete all four.
- Assay contrast reframed: the fix is to lighten to --accent2 on the dark theme, not darken.
  Recorded as a standing site fact so the direction is never confused again.
- Assay og + meta description still to add (owner has the snippet); favicon still open;
  CSP deferred (coupled to the parked build).
- Owner confirmed: portfolio and venture stay on separate tracks; v2 build stays parked.
