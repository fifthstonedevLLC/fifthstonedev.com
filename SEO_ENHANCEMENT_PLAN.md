# SEO Enhancement Plan: Service-Based Search Discovery

## Context

Fifth Stone Dev's website has strong technical SEO (structured data, canonical URLs, meta tags, performance optimization) but is not showing up for service-intent searches like "web developer Cedar Falls", "website design Iowa", or "process automation Iowa". The site only appears for brand-name searches. The root cause: on-page content is optimized for branding/mission ("Build with purpose") rather than for the keywords consumers actually search. Google uses H1s, H2s, and body content to understand what a page is about — and right now, the most prominent text doesn't tell Google this is a web development company.

**Target area**: All of Iowa + nationwide remote clients. Google Business Profile is already set up.

---

## Changes by File

### 1. `index.html` — Homepage (highest priority)

**H1 rewrite** (line 362): Change from brand-focused to keyword-rich while preserving visual design:
- Current: `Build with <strong>purpose.</strong>`
- New: `Custom Web Development & Automation in <strong>Cedar Falls, Iowa</strong>`

**Hero paragraph** (lines 363-368): Weave in service keywords naturally:
- Rewrite to include "web development", "process automation", "small business", "Iowa" while keeping the brand voice

**Services H2** (line 394): Add service keywords:
- Current: `Services Built for Impact`
- New: `Web Development & Automation Services`

**Internal link anchor text** (lines 415-417, 433-435, 452-454): Replace generic "Learn More" with keyword-rich text:
- "Explore Web Development" / "Explore Process Automation" / "Explore Digital Consulting"

**Footer enhancement** (lines 557-561): Add email and expand location text:
- Add email address to contact section
- Add a brief service area line: "Serving Cedar Falls, Waterloo, Cedar Rapids, and clients across Iowa"

**Schema fix** (line 133): Note sameAs is empty — leave as-is since no social profiles yet. No change needed.

---

### 2. `about.html` — About Page

**Title tag** (line 6): Add service keywords:
- Current: `About Fifth Stone Dev | Web Developer in Cedar Falls, Iowa`
- New: `About Fifth Stone Dev | Web Development & Automation | Cedar Falls, Iowa`

**H1** (line 243): Keep as-is — "About Fifth Stone Dev" is appropriate for the about page.

**Add services-focused H2** to the "Why Choose" section (line 336):
- Current: `Why Choose <strong>Fifth Stone Dev</strong>`
- New: `Why Choose Fifth Stone Dev for Web Development in Iowa`

**Phil's bio paragraph** (lines 304-309): Add a sentence explicitly naming services and service area for keyword density.

---

### 3. `services.html` — Services Page

**H1** (line 283): Add location keyword:
- Current: `Our <strong>Services</strong>`
- New: `Web Development & Automation <strong>Services in Iowa</strong>`

**Service descriptions**: Add location-keyword sentences at the end of each service detail:
- Web Development (after line 300): Add sentence about serving Iowa businesses
- Process Automation (after line 324): Add sentence about Iowa + remote
- Consulting (after line 348): Add sentence about Iowa small businesses

**Schema areaServed** (lines 115-118, 138-141, 151-154): Expand from just "Iowa" to include "United States" for all three services.

**CTA H2** (line 397): Add location:
- Current: `Not Sure Which Service You Need?`
- New: `Not Sure Which Service You Need? Let's Talk.`
  (Keep this one — it's good conversational SEO. Or slightly enhance.)

---

### 4. `contact.html` — Contact Page

**H1** (line 290): Add service context:
- Current: `Let's <strong>Connect</strong>`
- New: `Get a Free <strong>Web Development Consultation</strong>`

**Expand FAQs** (lines 414-431): Add 2-3 search-intent-targeted FAQs:
- "How much does a website cost in Iowa?" — targets pricing searches
- "What areas do you serve?" — targets local service area searches
- "Why hire a local web developer instead of a freelancer marketplace?" — targets "hire web developer" searches

**Update FAQ schema** (lines 149-187): Add the new FAQs to the JSON-LD FAQPage structured data to match.

---

### 5. `portfolio.html` — Portfolio Page

**H1** (line 282): Add service context:
- Current: `Our <strong>Portfolio</strong>`
- New: `Web Development & Automation <strong>Portfolio</strong>`

**Page header subtitle** (line 283): Add Iowa reference:
- Current: `A selection of projects we've built for businesses, organizations, and mission-driven ventures.`
- New: `Custom websites, automation tools, and digital solutions built for businesses and organizations across Iowa and beyond.`

---

### 6. `sitemap.xml`

- Update `<lastmod>` dates for all modified pages to today's date.

---

## What This Plan Does NOT Include (and why)

- **No new pages**: Creating industry-specific landing pages (e.g., "Web Development for Nonprofits") would be valuable long-term but is beyond the scope of enhancing existing SEO.
- **No social profiles**: User doesn't have them yet. sameAs array stays empty.
- **No review/testimonial additions**: Would require actual client testimonials which are content, not code changes.
- **No Google Business Profile changes**: Already set up; that's managed separately in Google's dashboard.

---

## Verification

After making changes:
1. Validate all HTML files still load correctly in a browser (no broken tags)
2. Validate JSON-LD structured data using Google's Rich Results Test for each page
3. Check heading hierarchy remains valid (single H1 per page, logical H2/H3 nesting)
4. Verify all internal links still resolve correctly
5. Update `sitemap.xml` lastmod dates
