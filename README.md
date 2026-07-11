# anasantana.me

My site. One person, one voice, across two pages and the repo you are reading now.

- **`/`** the person. The thesis, the record, how I think, and where the work resolves.
- **`/fluency/`** the flagship. Fluency is my adoption method, made real: nine phases,
  three beats, one wheel that turns higher each pass. It is proof of how I think, not a
  product to buy. Concept, model, build, all mine.

## Stack

Static HTML, CSS, and vanilla JavaScript. No framework, no build step. Self-hosted fonts.
Hosted on Cloudflare Pages, auto-deployed from `main`. Kept out of search on purpose
(`robots.txt`, `noindex`, and an `X-Robots-Tag` header all agree).

## Structure

```
index.html            home
fluency/index.html    the flagship, served at /fluency/
assets/
  styles.css          the whole design system, one stylesheet
  app.js              reveal, nav, and the wheel
  fonts/              self-hosted woff2 (Fraunces, Instrument Sans, IBM Plex Mono)
og/                   social cards
docs/                 audit history, kept out of the way
_headers _redirects   Cloudflare config
favicon.svg robots.txt
```

## Design system

One accent, held. Deep green on near-black ink, warm ivory for text. Fraunces sets the
display voice, its italic is the accent; Instrument Sans carries the prose; IBM Plex Mono
labels the data. The tokens live once, at the top of `assets/styles.css`. Scale and
restraint do the work, not more color.

## Run it locally

Any static server from the repo root. For example:

```
python -m http.server 8787
```

Then open `http://127.0.0.1:8787/`. The pages use root-absolute asset paths, so they need
to be served from the root, not opened as files.
