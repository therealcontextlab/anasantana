# Audit log: anasantana.me

Append-only record of site audits. Each run lists findings, severity, and status
(open, resolved, or accepted-as-is). The next run diffs against this to populate
"Since last run." Keep this file in the repo root.

---

## 2026-07-02

Scope: live site. Homepage plus 4 subpages (/resume, /assay, /however-you-got-here,
/vault-and-brawl), audited via rendered DOM, response headers, and direct fetches.
Not verified this run: 375px phone-width layout (could not force viewport),
/favicon.ico existence, external LinkedIn link (cross-origin).

Owner intent confirmed: out of search, URL open to anyone who has it.

### Fundamentals

- [RESOLVED] Broken project link, was deploy drift, not a missing page. The live audit showed
  the homepage "Vault & Brawl" link resolving to /vault-and-brawl and returning the 404 page.
  The repo contained the page at work/vault-and-brawl.html and linked to it correctly, so the
  live 404 was live-vs-repo drift. A later deploy brought the live site current, and the owner
  confirmed the homepage link now lands on the page (reachable at /work/vault-and-brawl).
  Severity: fundamental. Closed 2026-07-02.
- [OPEN] Color contrast. Accent #C2602B (194,96,43) fails AA 4.5:1 for small text in
  21 of 103 text elements. 2.9:1 on dark green, 4.08:1 on light, 4.2:1 for white-on-clay
  CTA buttons. Large headline text passes. Severity: fundamental.
- [OPEN] Heading skip on homepage. H2 "AI was never the problem" is followed by the
  four D's (Delegate/Describe/Discern/Decide) as H4, skipping H3. Severity: fundamental.
- [OPEN] Missing H1. /resume and /assay have zero H1. Home and /however-you-got-here
  each have one. Severity: fundamental.

### Suggestions

- [OPEN] No og:image. og:title/description/type present, image absent. Elevated because
  the site is shared by URL. Add 1200x630 og:image plus twitter:card.
- [OPEN] Meta description missing on /resume and /assay.
- [OPEN] Favicon not declared in head.
- [OPEN] No Content-Security-Policy or Permissions-Policy header (other security headers
  present). CSP needs care due to inline scripts.
- [ACCEPTED] No sitemap.xml. Correct for an out-of-search site.

### Verified clean

- Out-of-search: robots.txt Disallow: /, meta robots noindex on all pages,
  X-Robots-Tag: noindex header served. All three agree. site: search returns nothing.
- Security: no secrets in source, /.git/config and /.env both 404, HTTPS forced (HSTS),
  X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy present.
- Headshot image: 55 KB, no EXIF, no GPS, no camera metadata.
- Structure: landmarks present (header, nav, main, footer), one H1 on homepage,
  all in-page anchors resolve, no mixed content, no console errors on load,
  prefers-reduced-motion respected, on-brand custom 404 page.

---

## 2026-07-05

Scope: repo source, read directly from GitHub raw. Live URL not loaded this run, so
rendered checks (pixel-state contrast on Assay, live response headers, console on load,
375px width) are carried from 2026-07-02 or marked confirm. The homepage was rebuilt and
deployed between runs; repo HEAD confirmed to show the new homepage (thesis A, resume gone).

Owner intent unchanged: out of search, URL open to anyone who has it. The site's purpose
shifted from a recruiter portfolio toward a front door for the owner's own audience; the
job search is now a documented floor, not the site's main job.

### Fundamentals

- [RESOLVED] Homepage contrast. The clay accent used as small text (.eyebrow, .table .k,
  .rc .tag, .range .ct-eyebrow) and the primary contact button moved from #C2602B to
  the existing rust-dark #a84e20, verified 4.9:1 on the #EEF2F1 paper. Bright #C2602B kept
  on the large display line and the SVG, where it passes as large text. Closed 2026-07-05.
- [RESOLVED] Homepage heading skip. The four D's promoted from H4 to H3, and the .d h4 CSS
  rules updated to .d h3. Homepage now runs h1 -> h2 -> h3 with no skip. Closed 2026-07-05.
- [RESOLVED] Missing H1. /resume is being removed. /assay has one H1 ("Own what happens
  next."). Homepage remains single-H1. Closed 2026-07-05.
- [ACCEPTED, pending owner action] Removed-but-served pages. resume.html, resume.pdf,
  however-you-got-here.html, and work/vault-and-brawl.html all return 200 but are unlinked
  from the deployed homepage (verified: zero references). The resume the owner asked to pull
  and the sensitive "However You Got Here" venture page are both still reachable by URL.
  noindex hides them from search, not from anyone with the address. Fix: delete all four
  from the repo. Owner agreed 2026-07-05. Closes when the deletions land.
- [ACCEPTED, pending owner action] Assay contrast. Three `color:var(--accent)` rules paint
  clay #C2602B as text on the dark Assay theme (bg #0B211E), ~4:1 or below. The page already
  defines a lighter --accent2 #E7A77E and uses it as text 6 times (~8:1 on the same bg).
  Fix is to repoint the three outliers to --accent2, NOT to darken (darkening drops to ~1.8:1;
  the homepage fix direction is reversed here because Assay is dark-themed). Owner agreed
  2026-07-05. Lives in the Assay source (compiled bundle); closes on re-publish.

### Suggestions

- [RESOLVED] Homepage og:image. Added, with og.png (1200x630, on-palette clay/teal card)
  committed at the repo root. Homepage now carries the full title/description/image card.
  Closed 2026-07-05.
- [PROPOSED, owner has the snippet] Assay og + meta description. The Assay head has a title
  and robots meta only. Add og:title/description/image (reusing /og.png) and a meta
  description in the Assay source. Last page short of the "preview card on every page" bar.
- [OPEN] Favicon. No favicon file at the root (favicon.ico and favicon.svg both 404) and
  none declared in any head. Optional; browsers show a blank default tab icon.
- [DEFERRED] CSP / Permissions-Policy. Still absent from _headers. Coupled to the parked
  static-build rebuild: the Assay page transpiles in-browser, so a naive CSP breaks it.
  Revisit only once in-browser Babel is gone.
- [ACCEPTED] No sitemap.xml. Correct for an out-of-search site.

### Verified clean (re-checked from source this run)

- Out of search intact: robots.txt Disallow: /, _headers X-Robots-Tag: noindex, and meta
  robots noindex on both index.html and assay.html. All three agree.
- Homepage: no links to removed pages, exactly one H1, no heading skip, full OG card,
  reveal animation is vanilla IntersectionObserver JS (no Babel needed on the homepage).
- _headers still sets X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy,
  X-Robots-Tag noindex.

### Not verified this run (no live load)

- Live response headers (HSTS and the rest), console on load, 375px phone width, and the
  exact rendered contrast counts on the Assay page. Carry forward or confirm on a live run.
- Live-vs-repo drift: repo HEAD has the new homepage; confirm the deployed site matches.

## 2026-07-06

Scope: repo source, read from a fresh GitHub clone at HEAD. Live URL not loaded this
run, so live and rendered checks (served headers, console on load, 375px width, and
whether the four deleted URLs still return 200) carry forward or are marked confirm.

Owner intent unchanged: out of search, URL open to anyone who has it.

### Fundamentals

- [RESOLVED in repo] Removed-but-served pages. resume.html, resume.pdf,
  however-you-got-here.html, and work/vault-and-brawl.html are all gone from HEAD
  (last commit deletes however-you-got-here.html). Closes the repo side of the item
  the owner agreed to on 2026-07-05. Live confirm pending: verify the four URLs no
  longer return 200 once the deploy has propagated.
- [OPEN, source re-publish] Assay accent contrast, sharpened from three failures to two.
  Clay --accent #C2602B on the Assay bg #0B211E measures 4.0:1 (computed). Three spans
  paint it as text. Only two fail AA: the rank number (16px bold) and the band glyph
  (11px), both small text needing 4.5:1. The third, the H1 word "next." (28-42px bold),
  is large text and clears the 3:1 bar, so it is not a failure and keeps the clay hero
  accent. Fix: repoint the two small-text spans to --accent2 #E7A77E (8.18:1) in the
  Assay artifact and re-export. Prior runs recorded "three outliers"; corrected to two.

### Suggestions

- [OPEN, safe head edit] Assay preview card. The Assay head still carries title and
  robots only. A ready-to-paste og + twitter + description block (reusing /og.png) was
  provided this run; owner to place it in the head and may swap in their own snippet.
- [OPEN] Favicon. None at the root, none declared in either head. Optional.
- [DEFERRED] CSP / Permissions-Policy. Unchanged, still coupled to the parked build.
- [ACCEPTED] No sitemap.xml. Correct for an out-of-search site.

### Verified clean (from source this run)

- Out of search intact: robots.txt Disallow: /, _headers X-Robots-Tag: noindex, nofollow,
  and meta robots noindex on both index.html and assay.html. All three agree.
- Homepage: one H1, h1 -> h2 -> h3 with no skip, the AA contrast override sits outside
  both media queries so it holds at every width, full OG card, zero links to removed
  pages, portrait has alt text and set width/height, reveal is vanilla IntersectionObserver.
- Security headers in _headers: X-Frame-Options DENY, X-Content-Type-Options nosniff,
  Referrer-Policy, X-Robots-Tag.
- No secrets in source. Headshot re-checked: no EXIF block present.

### Not verified this run (no live load)

- Served response headers including HSTS, console on load, 375px phone width,
  live-vs-repo drift, and whether the four deleted URLs still 200 until the deploy
  propagates.

## 2026-07-06 (migration and fixes, not a standard audit run)

Scope: not an audit pass. Record of a host/DNS migration and a batch of owner fixes shipped
this session, so the next audit diffs against reality.

Owner intent unchanged: out of search, URL open to anyone who has it.

### Environment change
- [DONE] Moved off Netlify to Cloudflare Pages (Netlify free-tier credits capped and paused the
  site; no charge). Nameservers moved Porkbun -> Cloudflare; site auto-deploys from GitHub main.
  All Proton email records verified in Cloudflare before the flip; mail did not drop. DKIM CNAMEs
  set DNS-only. Netlify project to be deleted.
- [DONE] Email DNS de-duplicated: one SPF (Proton include), one DMARC (p=quarantine). Was two of each.

### Fundamentals
- [RESOLVED] Assay accent contrast. The two small-text spans (rank number, band glyph) repointed
  from --accent #C2602B to --accent2 #E7A77E on the dark bg. Committed directly to assay.html.
- [INCIDENT, resolved] vendor/ deleted on a false "unused" read, broke Assay live (bundle error),
  restored same day. Recorded as do-not-delete in AUDIT-LEARNINGS.md.

### Suggestions
- [RESOLVED] Assay preview card. og:title/description/image + twitter tags + meta description added
  to the Assay head, reusing /og.png.
- [RESOLVED] Favicon. favicon.svg added at root, linked from index.html and assay.html.
- [DEFERRED] CSP / Permissions-Policy. Unchanged, still coupled to the parked build.
- [ACCEPTED] No sitemap.xml. Correct for an out-of-search site.

### Also shipped (owner content)
- Homepage contact email -> hello@anasantana.me. Homepage repositioned to "Team Leadership · Voice
  of Customer · AI Solutions" across title, og, eyebrow, kick, and JSON-LD.

### Not verified this run (no live load)
- Served HSTS on Cloudflare (likely absent now that the host changed), the four deleted URLs no
  longer 200, live-vs-repo drift, console on load, 375px width.

## 2026-07-06 (run 4)

Scope: repo source, fresh clone at HEAD 979e278. Live URL not loadable from this
environment (not in the network allowlist), so served headers, console on load, 375px
width, and whether the four deleted URLs still 200 carry forward as confirm-on-live.

Owner intent unchanged: out of search, URL open to anyone who has it.

### Fundamentals
- [NONE OPEN] The full definition of clean holds against HEAD. Out-of-search: three
  signals agree (robots Disallow /, meta noindex both pages, X-Robots-Tag noindex).
  Orphan pages absent from git ls-files. Homepage one H1, h1->h2->h3 no skip; Assay one H1.
  Assay contrast in place: color:var(--accent) appears once (the large-text H1 word "next.",
  passes 3:1); the two small-text spans on --accent2 (8.18:1); accent2 used 8x. Security
  headers present. No secrets, no EXIF on ana-headshot.jpg or og.png. OG+twitter card on both
  pages. Homepage links only to assay.html and /favicon.svg. All four mailto on hello@anasantana.me.

### Suggestions
- [DEFERRED] CSP / Permissions-Policy. Unchanged, still coupled to the parked build.
- [ACCEPTED] No sitemap.xml. Correct for an out-of-search site.

### Not verified this run (no live load)
- Served HSTS on Cloudflare (likely absent; not in _headers, Cloudflare omits by default),
  the four deleted URLs no longer 200, live-vs-repo drift, console on load, 375px width.

### No files changed
- Source fully clean; the audit changed nothing beyond this log and the learnings update.
