# Cornerstone Engineering & Surveying — Website Scope & Plan

*Internal planning document. Prepared for Dean. Not the client-facing email.*
*Status: draft — pricing and timelines below are placeholders to be confirmed.*

---

## 1. Where the site is today

The site is a **Next.js 14 (App Router) + TypeScript + Tailwind CSS** application. It has four pages — Home, Services, About (team), and Contact — and a clean, on-brand design system already defined in `tailwind.config.ts` (navy `#1a2332`, gold `#c8913a`, heritage maroon `#651212`; Outfit headings + Inter body).

The foundation is good. This is a **polish-and-extend** engagement, not a rebuild. Three issues shape the work below:

1. **All content is hardcoded** inside React components — there is no database, CMS, or login. Editing anything today means a code change (which is exactly the problem the owner is paying per-change to solve).
2. **There is no business address or structured data anywhere on the site** — the largest gap for getting found in local search.
3. **There's leftover template/dead code** (unused components, Lorem ipsum, stock photos) that should be cleared before this is called "elite."

The three phases below are independent and can be sold separately or together.

---

## 2. Phase 1 — Visual Redesign

**Goal:** Make the site read instantly as a credible, established engineering firm — clean, confident, and consistent on every page and screen size.

### Work items

| Area | What gets done | Notes |
|---|---|---|
| Global footer | Move `Footer` from the homepage into `layout.tsx` so it appears on every page. | Today Services / About / Contact have **no footer** and lose the registration numbers. |
| Dead-code cleanup | Remove unused components (`HeroTwo`, `Blog`, `Values`, `LogoCloud`, `Carousel`, `Content`) and their imports. | `HeroTwo` still contains Lorem ipsum and stock Unsplash photos — a liability if it ever ships. |
| Font consolidation | Drop Montserrat (loaded only in the Hero); standardize on Outfit + Inter sitewide. | Faster load, consistent type. |
| Hero | Stronger headline hierarchy, refined overlay/contrast, a clear primary call-to-action (Contact / Call). | Current hero has its CTA commented out. |
| Services & Why-Choose-Us | Tighten spacing, card rhythm, and the awkward intro paragraph in `OurServices`. | Keep the existing card pattern — it's good. |
| Contact page | Add the firm's physical address, a working contact form, and an embedded map. | Today it's just an email + phone; no form, no address. |
| Projects / Portfolio (optional) | A simple project gallery or "Selected Work" section. | Engineering firms win trust by showing built work. Optional add-on. |
| Responsive + accessibility QA | Full mobile/tablet/desktop pass; color-contrast and alt-text check; fix the logo `<img>` (no width set → layout shift). | Accessibility also helps SEO (Phase 2). |
| Brand polish | Custom favicon + social share (OG) image. | Currently default favicon, no OG image. |

### Deliverables
A redesigned, fully responsive site across all four pages, dead code removed, consistent typography, a real contact section, and brand polish (favicon/OG). Reviewable on a preview deployment before going live.

### Estimate (placeholder)
**$XXX · ~X days.** *Add-on: projects/portfolio section, +$XX.*

---

## 3. Phase 2 — SEO

**Goal:** Maximize how findable Cornerstone is — both in classic search and, critically, in **local** search where an engineering/surveying firm gets most of its leads.

### 3a. Technical fixes (quick, high-value)

| Issue today | Fix |
|---|---|
| `robots.ts` points to the wrong domain (`cornerstone.com/sitemap.xml`). | Point it at the real production domain. |
| No `metadataBase` in `layout.tsx`. | Set it so canonical + OG URLs resolve correctly. |
| Only the homepage has rich metadata. | Add per-page titles, descriptions, canonicals, and OpenGraph for Services / About / Contact. |
| `sitemap.ts` uses a hardcoded domain. | Centralize the domain in one config value. |

### 3b. Local SEO — the biggest win

| Item | What gets done |
|---|---|
| **`LocalBusiness` / `ProfessionalService` JSON-LD** | Structured data with the firm's Name, Address, Phone (NAP), geo-coordinates, hours, service area, and services. This is how Google understands and ranks a local firm. **Currently absent.** |
| NAP consistency | Put the real address + phone in the footer and Contact page, matching the Google Business Profile exactly. |
| Embedded map | Google Map on the Contact page reinforces location signals. |
| Google Business Profile alignment | Make sure the site matches the GBP (will need owner's GBP access or details). |

### 3c. Content & on-page

Expand each service into its own keyword-targeted section/page (civil engineering, land surveying, project management, sustainable design), with proper heading structure, descriptive alt text, and internal linking. Thin content ranks poorly; depth on each service is what earns rankings.

### 3d. Performance (Core Web Vitals)

Convert remaining `<img>` tags to `next/image`, ensure correct image sizing, and confirm font-load strategy. Google uses page-speed as a ranking signal.

### 3e. Measurement

Set up Google Analytics 4 and Google Search Console, submit the corrected sitemap, and confirm indexing.

### Deliverables
A technically clean, fully indexed site with local structured data, expanded service content, passing Core Web Vitals, and analytics in place — plus a short report of what was changed and what to monitor.

### Estimate (placeholder)
**$XXX · ~X days.** *Requires: business address, live domain, Google Business Profile access.*

---

## 4. Phase 3 — Admin Dashboard

**Goal:** Let the owner update the site himself — no more paying per change.

### What becomes editable
Team roster (add/remove/edit people and roles), services (titles + descriptions), contact info, hero text, licensing/registration numbers, and images (via the existing Cloudinary setup, currently unused).

### The core decision: how to store editable content

This phase needs three new pieces the site doesn't have today: **authentication** (a secure login), a **data store**, and the **wiring** that makes content editable. The biggest choice is the data store:

| Option | What it is | Pros | Cons | Best when |
|---|---|---|---|---|
| **A. Headless CMS** (e.g., Sanity, Payload, Contentful) | A hosted editing UI + content API the site reads from. | Polished owner-facing editor out of the box; least custom code; image handling included. | Monthly cost at scale; another vendor account. | You want the owner to have the smoothest editing experience fastest. **Recommended.** |
| **B. Custom admin + database** (e.g., Next.js admin + Supabase/Postgres) | A bespoke `/admin` you build, backed by a database. | Full control; fully in your stack; no per-seat CMS fees. | Most build time; you maintain the auth + UI long-term. | You want everything self-contained and are fine owning more code. |
| **C. Git/JSON or MDX-based** | Content lives in repo files edited through a lightweight gated UI. | Cheapest; version-controlled. | Clunkiest for a non-technical owner; deploy step on each edit. | Budget is tight and edits are infrequent. |

**Recommendation:** **Option A (headless CMS)** gives the owner the best experience with the least long-term maintenance burden on Dean — which matches the goal of handing him independence. Final pick can flex on budget.

### Also included
Secure login for the owner, role-appropriate edit screens, image upload via Cloudinary, and a short training handoff (or a one-page guide / Loom) so he's comfortable using it.

### Scope boundaries
In scope: editing the existing content types above. Out of scope (unless added): blog/news system, multi-user roles, e-commerce, form-submission inbox beyond email forwarding.

### Deliverables
A working, secured admin area; the site reading live from the new content store; the owner trained to use it.

### Estimate (placeholder)
**$XXX · ~1 week.** *Largest of the three; realistic at a week given auth + data store + content wiring.*

---

## 5. Inputs needed before/while building

| Input | Needed for | Status |
|---|---|---|
| Business physical address | Contact page, footer, local SEO / JSON-LD | **Dean to provide** |
| Live production domain | robots/sitemap fix, canonicals, deploy | **Dean to provide** |
| Logo / brand assets (high-res) | Header, favicon, OG image | **Dean to provide** |
| Google Business Profile access (or details) | Local SEO alignment | Needed for Phase 2 |
| Office hours, service area | JSON-LD, contact page | Nice to have for Phase 2 |
| Project photos / list (optional) | Portfolio section | Optional, Phase 1 add-on |

---

## 6. Pricing summary (placeholder — for the client email)

*Format mirrors Dean's example. Replace figures before sending.*

| Service | Price | Estimated delivery |
|---|---|---|
| Advanced SEO optimization | $XXX | X–X days |
| Admin dashboard | $XXX | ~1 week |
| Visual redesign | $XXX | X–X days |

> Note: the dollar figures and timelines in the project brief were explicitly placeholders showing the desired table format — real numbers go here once Dean sets them.

---

## 7. Recommended sequence

**Phase 1 (redesign) → Phase 2 (SEO) → Phase 3 (dashboard).** The redesign sets the polished surface; SEO is mostly additive and low-risk; the dashboard is the heavy build and benefits from the first two being settled. Phases are independent, so the owner can also pick any subset.
