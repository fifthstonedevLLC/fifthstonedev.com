# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static multi-page website for Fifth Stone Dev LLC (fifthstonedev.com), a web development and automation consulting company based in Cedar Falls, Iowa. No build tools, bundlers, or frameworks — all HTML, CSS, and vanilla JavaScript served directly.

## Development

There is **no build step**. Edit files directly and deploy. The site runs on Apache-based hosting with `.htaccess` for routing, security headers, compression, and caching.

**Cache busting** is done via query params on CSS/JS references (e.g., `styles.css?v=20260207`). When modifying `styles.css` or `script.js`, update the version string in all HTML files that reference them.

**Contact forms** use EmailJS (client-side, no backend). Configuration details are in `EMAILJS_SETUP.md`. The public keys in the HTML are intentionally client-facing.

## Architecture

### File Organization
- **6 HTML pages**: `index.html`, `about.html`, `services.html`, `portfolio.html`, `contact.html`, `privacy-policy.html`
- **1 CSS file**: `styles.css` (~3800 lines) — all styling including responsive breakpoints
- **1 JS file**: `script.js` (~590 lines) — all client-side behavior
- **`assets/`** — logos, photos, portfolio preview images
- **`.htaccess`** — HTTPS redirect, www canonicalization, security headers, gzip, browser caching
- **`sitemap.xml`** / **`robots.txt`** — SEO configuration

### Subdirectories (separate projects, excluded from sitemap/robots)
- `StepsToSerenityBasic/` and `StepsToSerenityStarter/` — client site templates (Tailwind-based)
- `proposal-survey/` — client proposal form

### Design System (CSS Variables)
```
--stone-slate: #2c3e50    --accent-bronze: #b8956a
--stone-charcoal: #1a252f  --accent-copper: #cd7f32
--stone-river: #5d6d7e    --accent-sage: #7d9d8e
--stone-sand: #bdc3c7     --off-white: #f8f9fa
--stone-light: #ecf0f1
```
Font: Archivo (Google Fonts, async-loaded). CSS classes use kebab-case.

### JavaScript Components (`script.js`)
- Hash navigation with smooth scroll
- Mobile menu toggle
- Modal system (4 form types: web dev, automation, consulting, general contact)
- EmailJS form submission with validation
- Portfolio carousel (responsive: 2 items desktop, 1 mobile)
- Cookie consent with localStorage persistence
- Toast notifications

## SEO & Performance Conventions

This site is heavily SEO-optimized. When modifying pages, preserve:
- JSON-LD structured data blocks (ProfessionalService, FAQPage, BreadcrumbList schemas)
- Open Graph and Twitter Card meta tags
- Canonical URLs
- Semantic heading hierarchy (single h1 per page)
- ARIA labels on interactive elements

Performance patterns already in place:
- Critical CSS inlined in `<head>` to prevent render-blocking
- Google Fonts loaded async via `media="print"` + `onload` swap
- EmailJS script deferred
- Percentage-based carousel transforms (avoids layout thrashing)
- Responsive breakpoint at 768px

## Deployment

Static files deploy directly to Apache hosting. No CI/CD pipeline. When updating:
1. Edit source files
2. Update cache-busting version params if CSS/JS changed
3. Update `sitemap.xml` `<lastmod>` dates for modified pages
