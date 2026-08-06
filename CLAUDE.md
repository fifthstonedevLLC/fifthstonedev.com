# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static multi-page website for Fifth Stone Dev LLC (fifthstonedev.com), a web development and automation consulting company based in Cedar Falls, Iowa. No build tools, bundlers, or frameworks — all HTML, CSS, and vanilla JavaScript served directly.

## Development

There is **no build step**. Edit files directly and deploy. The site runs on Apache-based hosting with `.htaccess` for routing, security headers, compression, and caching.

**The site is live.** `origin/main` tracks what is deployed — commit `ee6c9ae` ("updated node statements") is the version currently being served. Local `main` should stay in sync with `origin/main` unless you are actively building something unreleased.

**Cache busting** is done via query params on CSS/JS references. When modifying any CSS or JS file, update its version string in **every** HTML file that references it. Current versions (uniform across all pages):
- `styles.css?v=20260714a`, `portfolio.css?v=20260714a`, `fsd-refresh.css?v=20260714a`
- `script.js?v=20260607`, `portfolio.js?v=20260607`

> Note: Query string cache busting only works over HTTP (Apache hosting). When previewing locally via `file://`, it has no effect — use a hard refresh (`Ctrl+Shift+R`) instead. Extensionless links (`href="contact"`) also 404 under `file://`, since they depend on the `.htaccess` rewrite; that is expected locally, not a broken link.

For cache busting to work in production, the HTML itself must never be cached — the version strings live inside it. `.htaccess` enforces this with `ExpiresByType text/html "access plus 0 seconds"` plus a `Cache-Control: no-cache, must-revalidate` header on `.html`. Do not add a long expiry for HTML; it silently pins visitors to stale CSS/JS.

**Contact forms** use EmailJS (client-side, no backend). Configuration details are in `EMAILJS_SETUP.md`. The public keys in the HTML are intentionally client-facing.

## Architecture

### File Organization
- **6 HTML pages**: `index.html`, `about.html`, `services.html`, `portfolio.html`, `contact.html`, `privacy-policy.html`
- **CSS** (3 files, cascade order matters):
  - `styles.css` (~3700 lines) — base site styles, shared components, cookie banner, responsive breakpoints. Loaded by every page.
  - `fsd-refresh.css` (~800 lines) — landing-page refresh layer (display serif, hero/nav/services overrides). **`index.html` only**, loaded after `styles.css`.
  - `portfolio.css` (~675 lines) — portfolio redesign layer. **`portfolio.html` only**, loaded after `styles.css`; wins on specificity for portfolio elements.
- **JS** (2 files):
  - `script.js` (~560 lines) — shared behavior, loaded by every page.
  - `portfolio.js` (~225 lines) — portfolio page only; IIFE-scoped, loaded after `script.js`.
- **`assets/`** — logos, photos, portfolio preview images (~23 files)
- **`.htaccess`** — HTTPS redirect, www canonicalization, security headers, gzip, browser caching
- **`sitemap.xml`** / **`robots.txt`** — SEO configuration
- **`SEO_ENHANCEMENT_PLAN.md`**, **`EMAILJS_SETUP.md`** — planning/setup notes, not shipped content

### Subdirectories
- `live-site/` — reference snapshot of the previously deployed `styles.css`, `script.js`, and assets. **Not served; do not edit.** Useful for diffing against what production looked like.
- `proposal-survey/` — standalone client proposal form, excluded from sitemap/robots. Contains an `index-DESKTOP-K59D2AU.html` merge artifact alongside the real `index.html`.

Note: `robots.txt` still disallows `/StepsToSerenityBasic/` and `/StepsToSerenityStarter/`, which no longer exist in the repo. Harmless, but stale.

### Design System (CSS Variables)

Core stone/accent palette (`styles.css`, re-declared in `portfolio.css`):
```
--stone-slate: #2c3e50    --accent-bronze: #b8956a
--stone-charcoal: #1a252f  --accent-copper: #cd7f32
--stone-river: #5d6d7e    --accent-sage: #7d9d8e
--stone-sand: #bdc3c7     --off-white: #f8f9fa
--stone-light: #ecf0f1
```

`portfolio.css` adds an editorial layer on top: `--paper: #f1ede4`, `--paper-soft`, `--card`, `--ink`, `--ink-soft`, `--hairline`, plus `--shell` / `--gutter` layout tokens and `--ease: cubic-bezier(0.22, 1, 0.36, 1)`.

`fsd-refresh.css` uses its own `--fsd-*` namespace (`--fsd-paper: #eef1f5`, `--fsd-ink: #14202b`, `--fsd-bronze: #9a6b34`, …) to avoid colliding with the base sheet.

**Fonts**: Archivo (sans, body) + Newsreader (serif display, used by the portfolio and landing refresh). Both from Google Fonts, async-loaded. CSS classes use kebab-case.

### JavaScript Components

`script.js` (all pages):
- Hash navigation with smooth scroll
- Masthead scroll state
- Mobile menu toggle
- Modal system (4 form types: web dev, automation, consulting, general contact)
- EmailJS form submission with validation
- Portfolio carousel (responsive: 2 items desktop, 1 mobile) with auto-advance
- Portfolio filter system
- Scroll animations
- Cookie consent with localStorage persistence — **gates the Google Analytics `gtag` load**
- Toast notifications

`portfolio.js` (portfolio page only):
- `CASES` object holding all case-study content (copy, media, outcomes, tags) as data
- Case-study reader overlay rendered from `CASES`
- Masthead scroll state and scroll reveals
- A tweaks-panel hook that applies CSS variable changes posted in via `postMessage` (dev affordance)

## SEO & Performance Conventions

This site is heavily SEO-optimized. When modifying pages, preserve:
- JSON-LD structured data blocks (ProfessionalService, FAQPage, BreadcrumbList schemas)
- Open Graph and Twitter Card meta tags
- Canonical URLs
- Semantic heading hierarchy (single h1 per page)
- ARIA labels on interactive elements

Performance patterns already in place:
- Critical CSS inlined in `<head>` to prevent render-blocking
- `styles.css` loaded via `rel="preload"` + `onload` swap, with a `<noscript>` fallback
- Google Fonts loaded async, with `<noscript>` fallback
- EmailJS script deferred
- Percentage-based carousel transforms (avoids layout thrashing)
- Responsive breakpoint at 768px

## Deployment

Static files deploy directly to Apache hosting. No CI/CD pipeline — uploads are manual. Deploy steps:
1. Edit source files
2. Update cache-busting version params in all HTML files if any CSS/JS changed
3. Update `sitemap.xml` `<lastmod>` dates for modified pages
4. Upload changed files to Apache hosting
5. Push to `origin/main` so the remote continues to reflect what is live
