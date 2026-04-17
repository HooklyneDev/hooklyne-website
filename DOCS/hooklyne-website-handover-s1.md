# Hooklyne Website — Handover S1
**Date:** 2026-04-12
**Status:** Pre-build — template chosen, ready to start.

---

## What We're Building

A commercial marketing/landing site for Hooklyne — separate from the portal. Static, fast, SEO-optimized. Targets Dutch B2B SMEs (10-50 people, 1-3 sales reps).

---

## Template

**Mainline by Shadcnblocks**
- GitHub: https://github.com/shadcnblocks/mainline-astro-template
- Demo: https://astro.build/themes/details/mainline/
- Stack: Astro 5, shadcn/ui, Tailwind 4, TypeScript, MDX
- License: Open source, free, fully customisable
- Why: Best free Astro SaaS template available. Same aesthetic as Lumen/Cosmic (same team). shadcn/ui means all code is owned — nothing locked.

---

## Deployment

- Platform: Vercel (free tier)
- Separate project from portal (`hooklyne-portal`)
- New repo: `HooklyneDev/hooklyne-website` (to be created)
- Domain: TBD — Tim to connect once live
- Auto-deploy on push to main

---

## Brand Tokens

```css
--navy:   #022f51
--blue:   #344ca3
--orange: #ff8c42
--teal:   #0d9488
--bg:     #f1f5f9
--card:   #ffffff
--border: #e2e8f0
--text:   #0f172a
--muted:  #64748b
```

Font: DM Sans (same as portal)
Always use CSS vars, never hardcoded hex.

---

## Pages Needed (v1)

1. **Home** — hero, problem/solution, how it works, social proof, pricing CTA
2. **Pricing** — 4 tiers: Start, Growth, Scale, Enterprise. Monthly/annual toggle.
3. **FAQ** — objection handling
4. **Contact / Request access** — pilot CTA (links to Cal.com once Tim sets it up)

Blog and docs are lower priority — skip for v1.

---

## Plan Tiers (for pricing page)

| Tier | Slug |
|---|---|
| Start | `start` |
| Growth | `growth` |
| Scale | `scale` |
| Enterprise | `enterprise` |

Credit costs per prospect TBD — Joey and Tim to confirm before pricing page is finalised.
Billing: monthly or annual. Annual = ~25% discount.

---

## Key Positioning (from strategy doc)

- **Core value prop:** "Not more, smarter" — outreach-ready prospect packages in the sender's voice
- **USP:** Writes the outreach, supports Dutch, serves SMEs under €500/month, no interpretation needed
- **Target:** Dutch B2B SMEs, 10-50 people, 1-3 sales reps
- **Competitors referenced internally:** Apollo, Lusha, Salesmotion — but never name them on site
- **Tone:** Direct, outcome-focused, plain language. No neural/AI jargon.
- **Language:** Dutch-first copy, English secondary. Site should support both (NL default).

---

## CTA Strategy

- Primary CTA: "Request access" or "Vraag toegang aan" → links to Cal.com (Tim to set up)
- Secondary CTA: "See how it works" → anchors to how-it-works section
- No self-serve signup yet — invite-only pilot phase

---

## Objection Handling (for FAQ page)

Five key objections to address:
1. "We already use Apollo/Lusha"
2. "We use an agency"
3. "Tool fatigue — we have too many tools"
4. "Can't ChatGPT do this?"
5. "What about data privacy?"

---

## What Mainline Includes Out of the Box

- Home page with hero, features, testimonials, pricing, FAQ sections
- Pricing page with toggle
- Blog with MDX
- FAQ page
- Contact page
- Responsive, dark/light mode, SEO meta tags

We'll keep: Home, Pricing, FAQ, Contact
We'll skip for v1: Blog (can add later)

---

## Dev Rules (carry over from portal)

- Approach first, confirm, then build
- Never hardcode colors — always CSS vars
- EN + NL translations on every page
- No em dashes - use ` - ` instead
- Surgical edits only
- Output files to ~/Downloads/ with clear names
- Deployment: `git add -A && git commit -m "description" && git push`
- No bash comments (zsh errors)

---

## Setup Steps for S1

1. Clone `shadcnblocks/mainline-astro-template` to `~/Desktop/Hooklyne/hooklyne-website`
2. Create new GitHub repo `HooklyneDev/hooklyne-website`
3. Push to GitHub
4. Connect to Vercel
5. Swap in Hooklyne brand tokens
6. Swap in DM Sans font
7. Start building sections with Hooklyne copy

---

## To Resume S1

Upload this file and say: **"Start Hooklyne website - session 1"**

Optionally also upload the Hooklyne strategy document for copy reference.
