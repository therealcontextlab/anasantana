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
