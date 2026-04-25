# i18n Sync Tracker

**Owner:** Joey
**Last reviewed:** 25 April 2026

This file tracks which pages have a paired Dutch version, when they were last synced, and what's drifting. **The rule:** every copy change ships EN + NL in the same commit. This file is the safety net when the rule slips.

---

## Voice rules for NL

NL copy is **transcreation, not translation**. Rewrite the idea as if originally written by a Dutch B2B copywriter for MKB (10-50 employees).

- Tone: direct, peer-to-peer, "je" not "u", short sentences, no English sentence structures
- Drop English idioms entirely. Use MKB terminology
- Loanwords OK only where standard: sales, outreach, signal, prospect, pipeline, lead
- One Dutch native must eyeball each page before merge (Tim)

The reference voice baseline is in `src/components/blocks/built-for.tsx` (NL strings) - match that tone everywhere.

---

## Page status

| Path | EN | NL | Last synced | Notes |
|---|---|---|---|---|
| `/` | ✅ | ❌ | - | Home. NL strings exist in some child components (`what-you-get`, `built-for`); others still EN-only |
| `/nl` | n/a | ✅ | 2026-04-25 | Standalone Dutch landing page (not a 1:1 mirror of `/`) |
| `/product` | ✅ | ❌ | - | Multiple components, large translation scope |
| `/how-it-works` | ✅ | ❌ | - | |
| `/pricing` | ✅ | ❌ | - | |
| `/faq` | ✅ | ❌ | - | |
| `/contact` | ✅ | ❌ | - | Form labels also need NL |
| `/about` | ✅ | ❌ | - | |
| `/blog` | ✅ | ❌ | - | Hub page; blog **posts** are EN-only by design - write Dutch posts separately for Dutch SEO |
| `/blog/*` | ✅ | n/a | - | Posts are EN-first. Don't transcreate. Original Dutch posts get their own slugs |
| `/privacy` | ✅ | ❌ | - | Stable legal copy - safe to translate any time |
| `/cookies` | ✅ | ❌ | - | Stable legal copy |
| `/disclaimer` | ✅ | ❌ | - | Stable legal copy |
| `/resources` | ✅ | ❌ | - | |
| `/resources/support` | ✅ | ❌ | - | |
| `/404` | ✅ | ❌ | - | One-time, never changes |

---

## Components with NL strings already wired

These use the inline `EN`/`NL` pattern via `useLang()`:

- `src/components/blocks/built-for.tsx` ✅
- `src/components/blocks/what-you-get.tsx` ✅
- `src/components/blocks/ways-to-start.tsx` ⚠️ (uses `useLang` but check NL strings)

All other components are EN-only and need NL strings added before their parent pages can be paired.

---

## Workflow when changing copy

1. Edit EN
2. Run the transcreation prompt against the new EN text:
   > You are a Dutch B2B SaaS copywriter for MKB (10-50 employees). Voice: direct, peer-to-peer, 'je' not 'u', short sentences, no English sentence structures. Here is an English page for CONTEXT ONLY. Do not translate it. Rewrite the same idea as if originally written in Dutch for a Dutch sales lead. Drop English idioms. Use MKB terminology. Keep loanwords only where standard (sales, outreach, signal, prospect, pipeline, lead).
3. Edit NL with the rewritten output
4. Tim does a 5-min native review
5. Update this tracker's "Last synced" column for the page touched
6. Single commit: `Update [page]: [change] (EN + NL)`

---

## Drift policy

If "Last synced" is more than 14 days old AND EN has been touched since, that page has drift risk. Run the transcreation prompt against current EN, diff against current NL, fix.
