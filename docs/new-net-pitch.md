# New NET — Internal Software Pitch & Engagement Plan

*Internal working doc for Dean. The replacement for ELD's "Net": Cornerstone's own internal system for running the firm. This is the "pitch for more" after the website essentials.*

*Not legal or tax advice — I'm not a CPA or attorney. The contract/tax section is here so you can negotiate informed; confirm specifics with a professional before signing.*

---

## 1. The opportunity (why now)

The facts line up almost perfectly for this pitch:

- Cornerstone's people came out of **ELD Engineering**, where "**Net**" (eldnet.com) was the internal system that ran the firm — project records, documents, the works.
- ELD is **falling apart** after Eric's passing, owes Cornerstone money, and has **locked Cornerstone out of Net.** They've lost the tool they were trained on.
- Today they're running on **pCloud** with manual folders — a few people keep them beautifully organized, but it's all by hand, with no structure, no search, no permissions, and no accountability.
- **Mitch is the stamp for basically everything.** He's the single P.E./R.P.L.S. seal the whole operation routes through — which means he is also the bottleneck, and nobody has a clean view of what's waiting on him.

The pitch writes itself: **"Let me build you a newer, better Net — one you own, that no one can ever lock you out of, and that's actually built around how the firm works today."**

---

## 2. The vision in one sentence

A single, secure system where **everything attaches to a project** — documents, drawings, surveys, contacts, tasks, and stamps — every person sees exactly what their role should, and nothing important lives only in one person's head or one person's folder.

---

## 3. The name (replacing "Net")

You asked for something clever — anagram, recursive, or a play on the firm's name. My shortlist, strongest first:

**KEYSTONE** *(top pick — metaphor)*
In an arch, the keystone is the single wedge at the top that locks every other stone in place; pull it and the arch collapses. It's the same architectural family as *Cornerstone*, and it's literally what this system is — the piece that holds all the firm's work together. Professional, memorable, and it tells a story in one word.

**DATUM** *(top pick — insider + recursive backronym)*
In surveying, the **datum** is the agreed reference point that *every* measurement is taken from. The system is the firm's single source of truth — the datum everything references. Surveyors will respect it instantly. And it backronyms cleanly to describe the product itself:
> **DATUM — Documents, Assets, Tasks & Users, Managed.**

**BENCHMARK** *(strong — double meaning)*
A benchmark is a surveyor's permanent reference marker of known elevation — everything is measured against it. It *also* means "the standard of excellence." Perfect double meaning for a survey firm's flagship system.

**CORE** *(clean + recursive backronym)*
Foundation theme (cornerstone → core), short and modern:
> **CORE — Cornerstone Operations & Records Engine.**

**Keep the "Net" lineage** *(if Mitch is sentimental about beating ELD at their own game)*
Make the name *theirs*: **CornerNet**, **CES-Net**, or a GNU-style recursive wink — **"NET — NET's the Engineering Toolkit."** A quiet flag planted on the thing ELD locked them out of.

My recommendation: **Keystone** as the product name, or **Datum** if you want the surveyor in-joke. Either can carry a tagline like *"Everything the firm is built on, in one place."*

---

## 4. What it does (feature brainstorm — go wide, then phase it)

Grouped by tier so you can hand Mitch the whole vision and still scope a sane first build.

### Tier 1 — MVP: "the new Net" (the must-haves)

- **Secure sign-in** for every employee; no more shared folders.
- **Roles & permissions** — Principal/Admin, P.E., R.P.L.S., EIT, Survey Tech, Admin staff, read-only. People see what their role should and nothing more.
- **Project / Job records** — the spine of the system. Job number, client, site location, project type (civil / survey), status, assigned team, key dates, and value. *Everything else hangs off this.*
- **Document management per project** — upload, preview, and **version** files; the system auto-creates a *consistent* folder structure for every new job, so organization stops depending on which person touched it. This is the direct pCloud replacement.
- **Global search** across projects and documents — by job number, client, location, or filename. The thing manual folders can never do well.
- **Client & contact directory** — a lightweight CRM so contacts live with their projects.
- **Activity log** — who uploaded/changed what, and when.

### Tier 2 — the engineering-firm power features (the real differentiators)

- **Stamp / Seal queue** *(the killer feature).* Because Mitch stamps everything, give him a single queue of deliverables awaiting his seal: drafted → in review → ready to stamp → stamped → delivered, with priority and a permanent record of what was sealed and when. This turns the firm's biggest bottleneck into something visible and managed — and creates a compliance trail for the TX Board.
- **Deliverable / submittal tracking** with due dates and jurisdictions.
- **Drawing / sheet register** with revision control.
- **Project pipeline board** (Kanban) — proposal → active → on hold → complete → archived.
- **Time tracking per project** — for billing and to see who's over/under-loaded.
- **Survey job board / field-crew scheduling.**
- **Permit & plat tracking** by jurisdiction, with status.

### Tier 3 — growth & automation (the "wow, this replaced three tools" phase)

- **Client portal** — clients log in to see their project status and download finished deliverables. Massive professionalism win, and it kills the "where's my survey?" phone calls.
- **Notifications** — email/in-app alerts when a stamp is needed, a status changes, or a deadline is near.
- **Dashboards & reporting** — active projects, revenue pipeline, utilization, what's stuck in the stamp queue, overdue items.
- **Proposal & letter templates** auto-filled with project data; optional **e-signature**.
- **Accounting hand-off** — export or sync to QuickBooks for invoicing.
- **Field mobile capture** — crews snap photos/notes on site, attached straight to the job.
- **Equipment / instrument register** with calibration dates.
- **Integrations / migration** — a one-time **pCloud import** to lift their existing files into the new structure; later, links to Bluebeam / CAD / GIS.

### One-time service to bundle in
**Data migration** from pCloud into the new project structure — worth pricing as its own line, because it's real work and it's the thing that makes adoption painless.

---

## 5. Recommended tech stack (and why it fits *you*)

Boring, well-trodden, and almost entirely inside the framework you already know — which is exactly what you want for a first solo build you also have to maintain.

| Layer | Choice | Why |
|-------|--------|-----|
| App (front + back) | **Next.js (App Router)** | You know it; one codebase for UI and API. |
| Auth + Database + Permissions | **Supabase** (Postgres + Auth + Row-Level Security) | One vendor covers login, data, *and* role-based access. Huge time-saver for a solo dev. |
| File storage (starter) | **Supabase Storage** (100 GB included) | Fine until file volume grows. |
| File storage (heavy CAD/PDF) | **Cloudflare R2** | $0.015/GB and **no egress fees** — ideal for big engineering files people download often. |
| Hosting | **Vercel** | Native Next.js deploys. |
| Email/notifications | **Resend** (or Supabase) | Simple transactional email. |

The whole thing can be built in one familiar stack. That keeps your build risk low and makes the maintenance contract realistic for one person.

---

## 6. What it costs *Mitch* to run (verified, June 2026 — no surprises)

Set these up under **his** accounts so they're pass-through, there's no markup, and he owns everything.

| Service | What it covers | Cost |
|---------|----------------|------|
| **Vercel Pro** | App hosting, commercial use | **$20/user/mo** (~$24 if billed monthly) |
| **Supabase Pro** | Postgres DB + Auth + RBAC + 100 GB storage | **$25/mo** base (small/medium apps run **$35–75/mo** with usage) |
| **Cloudflare R2** *(if file-heavy)* | Bulk document/CAD storage, free egress | **$0.015/GB/mo** (~$15/mo per TB) |
| **Resend** *(email)* | Notifications | **Free** to ~$20/mo |
| Subdomain (e.g. `app.cornerstone…`) | — | **$0** (uses existing domain) |
| **Estimated total to start** | small-firm internal app | **~$45–95/month**, scaling with storage & users |

**Important so he isn't surprised:** these costs **do not multiply by employee count.** A Vercel "seat" is for whoever deploys/manages the app (you, or one admin) — the ~15 employees *using* New NET are just logged-in users of the site, not paid seats. Likewise Supabase Pro includes 50,000 monthly active users, so 15 staff is a rounding error. The bill scales with **storage and traffic**, not headcount.

Two more honest framing points:
- This is likely **far less** than ELD's "Net" cost to run — and he *owns* it.
- If New NET stores their files, they may be able to **drop pCloud entirely** and partly offset this cost.

---

## 7. The engagement — structuring your first 1099 contract

You want this to land around an **$80k/year** equivalent, as a temp-but-full-time **1099 contractor**. Here's how to think about it honestly.

### First, the thing nobody tells you about 1099 vs. W-2

A 1099 dollar is **not** a W-2 dollar. As an independent contractor you pay:

- **Self-employment tax (~15.3%)** — both the employee *and* employer halves of Social Security + Medicare. A W-2 employee only pays half; the employer covers the rest.
- **Your own benefits** — no employer health insurance, no PTO, no 401(k) match, no paid holidays.
- **Quarterly estimated taxes** — you set money aside and pay the IRS four times a year.

Rule of thumb: to *net* what an $80k salaried employee nets, a 1099 rate usually needs to be **~25–40% higher** (~$100k–$112k). So if Mitch's budget is a flat $80k, know going in that it's roughly equivalent to a **~$60–64k W-2 job** once SE tax and missing benefits are accounted for. That's not a reason to walk — it's a reason to negotiate with your eyes open, and to keep the door open to converting to W-2 later (which you actually want anyway).

### The $80k, broken down every way you might quote it

| Period | Amount |
|--------|--------|
| Annual | **$80,000** |
| Monthly | **$6,667** |
| Biweekly (26×) | **$3,077** |
| Weekly (52×) | **$1,538** |
| Hourly @ 2,080 hrs | **$38.46/hr** |
| Day rate (8 hrs) | **~$308/day** |

If you want the contract to *truly* match an $80k take-home, quote nearer **$100k** (~$8,333/mo, ~$48/hr) and explain the SE-tax reason — a fair, professional ask.

### Three ways to structure it

- **A. Monthly retainer (recommended for a first gig).** A flat $6,667/mo for a defined term (say 6 or 12 months). Predictable for both sides, feels salary-like, simplest to invoice. Pair with a clear scope and a 30-day notice / renewal clause.
- **B. Fixed build fee + maintenance retainer.** A milestone-based price for building New NET, then a smaller monthly retainer once it's live. Better if the build has a clear finish line and he doesn't want an open-ended commitment.
- **C. Hourly with a monthly cap.** $38–48/hr, not-to-exceed a set monthly number. Most flexible, least predictable — fine if scope is fuzzy early.

For *this* situation — trusted client, full-time-ish, your first real freelance gig, and a relationship you'd like to turn into a job — **Option A (monthly retainer for a fixed term)** is the cleanest and friendliest.

### The 1099 starter checklist (confirm details with a CPA/attorney)

- **Put it in writing** — a simple contract / SOW: scope, term, pay schedule, **IP ownership** (assign all work product to Cornerstone *on payment*), a kill/early-termination clause, and how pass-through costs are handled.
- **Pass through hosting/software** on *his* accounts so they aren't your taxable income.
- **Invoice monthly**; send Mitch a **W-9**, expect a **1099-NEC** at year end.
- **Set aside ~25–30%** of every payment for taxes; pay **quarterly estimateds**.
- **Consider an LLC** for liability and professionalism (ask a CPA whether it's worth it yet).
- **Budget your own health insurance** — it's on you now; factor it into the number.

> Reminder: this is factual guidance to help you decide, not tax or legal advice. Run the SE-tax math and the contract past a CPA and/or attorney before you sign — especially the IP-assignment and termination terms.

---

## 8. Suggested roadmap (how to phase the build)

1. **Phase 0 — Discovery (paid, ~1 week).** Sit with Mitch and 2–3 power users, map how a job actually flows from intake to stamped deliverable, and inventory the pCloud structure. This de-risks everything and is itself billable.
2. **Phase 1 — MVP (Tier 1).** Auth, roles, project records, document management, search. The day this replaces pCloud, you've earned the contract.
3. **Phase 2 — Power features (Tier 2).** Lead with the **stamp/seal queue** — it's the most visible win and the one Mitch will feel personally.
4. **Phase 3 — Growth (Tier 3).** Client portal, dashboards, integrations — the features that make people say it replaced three tools.

Phasing also lets the retainer renew naturally at each milestone, and gives Mitch obvious off-ramps so the commitment never feels open-ended.

---

## 9. What I need from Mitch to scope this properly

- Roughly how many employees and what roles will use it (the team page suggests ~15).
- A walkthrough of how one real job flows today, start to finish.
- What's in pCloud now — rough size and how files are organized.
- What ELD's "Net" did well and what it did badly (steal the good, fix the bad).
- Whether he wants clients to ever log in (decides if the client portal is in or out of early scope).
- His budget reality and whether this could become a W-2 role down the line.
