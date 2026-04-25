# Hooklyne Website - Claude Session Context

**Stack:** Astro 5 + shadcn/ui + Tailwind v4 + TypeScript + MDX
**Template base:** Mainline by Shadcnblocks
**Owner:** Joey (frontend). Tim handles domain connection + Cal.com setup.

---

## Session startup checklist

1. `git -C ~/Desktop/Hooklyne/hooklyne-website pull`
2. Read `DOCS/` for latest handover doc

---

## What this site is

Commercial marketing/landing site for Hooklyne. Static, SEO-optimized. Targets Dutch B2B SMEs (10-50 people, 1-3 sales reps). Separate from the portal - no auth, no Supabase.

**Positioning:** "Not more, smarter" - outreach-ready prospect packages in the sender's voice.
**Tone:** Direct, outcome-focused, plain language. No neural/AI jargon. Never name competitors (Apollo, Lusha, Salesmotion) on site.
**Language:** Dutch-first copy, English secondary. Every page needs NL + EN.

---

## Pages (v1 scope)

- **Home** - hero, problem/solution, how it works, social proof, pricing CTA
- **Pricing** - 4 tiers: Start, Growth, Scale, Enterprise. Monthly/annual toggle (~25% annual discount)
- **FAQ** - 5 objections: Apollo/Lusha, agency, tool fatigue, ChatGPT, data privacy
- **Contact** - "Request access" pilot CTA → Cal.com (Tim to set up link)

Blog/docs: skip for v1.

---

## Non-negotiables

- **Approach first, confirm, then build**
- Never hardcode colors - always CSS vars
- EN + NL versions on every page (inline pattern via `useLang`, no i18n library). NL is **written natively in Dutch, not translated** - never run an EN draft through a translator. Sit down and write the idea fresh in Dutch B2B MKB voice (10-50 employees): 'je' not 'u', short sentences, drop English idioms, no calque grammar. Loanwords OK only where standard (sales, outreach, signal, prospect, pipeline, lead). **Every change ships EN + NL in the same commit.** Both written natively, both reviewed before merge. No "I'll do NL after." See `DOCS/i18n-sync-tracker.md` for which pages are paired.
- No em dashes ever - use ` - ` or rewrite the sentence
- No AI-style writing: no "delve", "dive into", "unleash", "seamlessly", "robust", "leverage", "cutting-edge", "game-changing", "revolutionize", "transformative", "unlock", "empower", "elevate". Write like a direct person, not a press release.
- No typical AI design patterns: no purple/violet gradient hero blobs, no sparkle/star icons as decorative filler, no "magical" positioning language, no floating card stacks as fake social proof, no infinite scroll testimonial carousels with avatar grids. Design should feel product-led and B2B credible.
- No bash comments (zsh errors)
- Surgical edits only

---

## Brand tokens

Always use CSS vars, never hex:
- `--navy: #022f51` - structural elements
- `--blue: #344ca3` - interactive/hover
- `--orange: #ff8c42` - primary CTA accent (use sparingly)
- `--teal: #0d9488` - status/tag accent (use sparingly)
- `--bg: #f1f5f9` - page background
- `--card: #ffffff` - card background
- `--border: #e2e8f0` - borders
- `--text: #0f172a` - primary text
- `--muted: #64748b` - secondary text

Font: DM Sans (same as portal).

---

## CTA strategy

- Primary: "Request access" / "Vraag toegang aan" → Cal.com (link TBD - Tim to provide)
- Secondary: "See how it works" → anchor to how-it-works section
- No self-serve signup - invite-only pilot phase

---

## Deployment

- Platform: Vercel, auto-deploy on push to main
- Repo: `HooklyneDev/hooklyne-website`
- Domain: TBD - Tim to connect
- `git add -A && git commit -m "description" && git push`
