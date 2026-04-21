# Hooklyne Website - Handover S1
**Date:** 2026-04-15
**Status:** Pre-build - template chosen, repo exists, not yet built out.

---

## Repo & Deployment

| | |
|---|---|
| GitHub | https://github.com/HooklyneDev/hooklyne-website |
| Local | `~/Desktop/Hooklyne/hooklyne-website` |
| Deploy | Vercel - connect via vercel.com/hooklyne-dev |

**Always pull before starting (Tim also has access):**
```bash
cd ~/Desktop/Hooklyne/hooklyne-website
git pull
```

---

## Template

**Mainline by Shadcnblocks - free, open source**
- GitHub: https://github.com/shadcnblocks/mainline-astro-template
- Demo: https://astro.build/themes/details/mainline/
- Stack: Astro 5, shadcn/ui, Tailwind 4, TypeScript, MDX
- License: Open source, MIT, fully customisable

---

## Pages (v1)

1. **Home** - hero, problem/solution, how it works, social proof, pricing CTA
2. **Pricing** - 4 tiers: Start, Growth, Scale, Enterprise. Monthly/annual toggle.
3. **FAQ** - objection handling
4. **Contact / Request access** - pilot CTA

Blog and docs: skip for v1, add later.

---

## Plan Tiers

| Display | Slug |
|---|---|
| Start | `start` |
| Growth | `growth` |
| Scale | `scale` |
| Enterprise | `enterprise` |

Credit costs per prospect: TBD (Joey + Tim to confirm before pricing page is final).
Billing: monthly or annual. Annual = ~25% discount.

---

## Positioning

- **Core value prop:** "Not more, smarter" - outreach-ready prospect packages in the sender's voice
- **USP:** Writes the outreach, supports Dutch, serves SMEs, no interpretation needed
- **Target:** Dutch + UK B2B SMEs, 10-50 people, 1-3 sales reps
- **Tone:** Direct, outcome-focused, plain language. No AI jargon.
- **Language:** NL + EN. Site should support both.
- **CTA:** "Request access" - links to Cal.com (Tim to set up)
- **No self-serve signup yet** - invite-only pilot phase

---

## Key Objections to Address (FAQ)

1. "We already use Apollo/Lusha"
2. "We use an agency"
3. "Tool fatigue - too many tools already"
4. "Can't ChatGPT do this?"
5. "What about data privacy / GDPR?"

---

## Brand Tokens
```css
--navy: #022f51 --blue: #344ca3 --orange: #ff8c42
--teal: #0d9488 --bg: #f1f5f9 --card: #ffffff
--border: #e2e8f0 --text: #0f172a --muted: #64748b
```
Font: DM Sans. Always CSS vars, never hardcoded hex.

---

## Setup Steps for S1

1. `cd ~/Desktop/Hooklyne/hooklyne-website && git pull`
2. Check what Tim has already added to the repo
3. If template not yet installed - clone Mainline into the repo
4. Connect to Vercel if not already done
5. Swap in Hooklyne brand tokens + DM Sans
6. Build sections with Hooklyne copy

---

## Dev Rules (same as portal)
- Approach first, confirm, then build
- Never hardcode colors
- No em dashes - use ` - ` instead
- EN + NL on every page
- Always `git pull` before starting - Tim also pushes here

---

## To Resume S1

Upload this file and say: **"Start Hooklyne website - session 1"**

Also pull first and check what Tim has already built:
```bash
cd ~/Desktop/Hooklyne/hooklyne-website
git pull
ls src/
```
