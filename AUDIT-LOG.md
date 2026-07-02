# Audit log, anasantana.me

## 2026-07-02, run 1 (baseline)

Source: private repo therealcontextlab/anasantana, main branch. Source-level only; serving-level items confirmed on live site once deployed.

### Fixed in this batch (pending your deploy)
- [FIXED] Discoverability: no out-of-search signal existed. Added robots.txt (Disallow: /) and noindex meta on all 5 pages. Header-level X-Robots-Tag still pending (see open).
- [FIXED] Correctness: index.html requested fonts by CamelCase names; files are lowercase, so they 404 on Netlify. Lowercased 4 references.
- [FIXED] Responsive: resume.html and assay.html had no viewport meta. Added to both.
- [FIXED] SEO/correctness: resume.html and assay.html shipped with title "Bundled Page". Set to real titles (wording is yours to adjust).
- [FIXED] Cleanup: removed leftover "deploy pipeline test" comment on index.html.

### Open
- [DRAFTED] Security: _headers file written with X-Frame-Options, X-Content-Type-Options, Referrer-Policy, X-Robots-Tag. Deploy with the batch. CSP intentionally held: resume.html and assay.html run Babel in-browser, so a strict CSP breaks them and a loose one adds little. Revisit if those two pages get pre-compiled.
- [CLEAN] Confirm-on-live: /.git returns 404 (not exposed). HTTPS forced by Netlify default. No custom headers were deployed (confirmed: no _headers/netlify.toml in repo); the drafted _headers fixes that.
- [OPEN] Fonts: assay.html and resume.html load IBM Plex Mono from placeholder UUID URLs; the accent font falls back. Recommend re-exporting those two pages with fonts embedded rather than hand-editing the bundle.
- [OPEN] Unused asset: fonts/instrumentsans-b.woff2 is never referenced. Wire in or delete.
- [OPEN] Email exposure: contact email is harvestable in plain source. Your call: leave, form, or obfuscate.

### Accepted as-is
- Headshot has no EXIF/location data (clean).
- All internal links resolve.
- Crisis numbers on However You Got Here are correct.
