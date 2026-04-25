# Hooklyne UTM Tagging Standards

**Last updated:** 25 April 2026
**Owner:** Joey
**Used by:** Anyone sending links in outbound, social, partnerships

---

## Why this matters

Every link you send in outbound, post on social, or share in a partnership is invisible to GA4 unless you tag it. Untagged links show up as "Direct" traffic, blending real wins (closed deal from outbound email) with random noise (someone typing your URL).

Tagging takes 30 seconds per link and turns that into actionable data: "the Q2 pilot push to ops directors converted 3.4×, the founder-led DM angle didn't."

---

## The five UTM parameters

| Param | What it answers | Required? |
|---|---|---|
| `utm_source` | Where? (the channel/platform) | Always |
| `utm_medium` | What kind of touch? (email, dm, social) | Always |
| `utm_campaign` | Which specific push? | Always |
| `utm_content` | Which variant inside the campaign? | Optional |
| `utm_term` | (search keyword, only for paid ads) | Skip for now |

---

## Naming conventions

**Hard rules: lowercase, underscores, no spaces ever.**

### `utm_source` — the platform

| Value | When to use |
|---|---|
| `outbound` | Cold email from your team |
| `linkedin` | Anything on LinkedIn (post, DM, comment) |
| `twitter` | X / Twitter |
| `partner` | A partner included your link in their content |
| `referral` | A customer or contact shared the link |
| `newsletter` | Recurring newsletter recipients |
| `event` | Conference, meetup, webinar |

### `utm_medium` — the touch type

| Value | When to use |
|---|---|
| `email` | Anything via email |
| `dm` | LinkedIn or X direct message |
| `social_post` | Public social post |
| `social_bio` | Link in profile / bio |
| `qr` | QR code on print or event materials |
| `signature` | Email signature link |
| `cpc` | Paid ads (when you start running them) |

### `utm_campaign` — the specific initiative

Format: `{quarter}_{theme}` or `{month}_{theme}`

Examples:
- `q2_pilot_push` — quarterly pilot drive
- `apr26_launch` — month + event
- `nl_devs_outbound` — segment-specific batch
- `tim_personal_q2` — founder-led personal outreach
- `apollo_displacement` — angle-specific push

Keep it readable. Future-you needs to know what this was 6 months from now.

### `utm_content` — the variant (for A/B testing)

Use when you're testing different angles or sender voices in the same campaign.

Examples:
- `subj_v1` / `subj_v2` — subject line A/B
- `tim_voice` / `joey_voice` — different sender
- `pain_first` / `social_proof_first` — different opening angle
- `short` / `long` — message length variant

---

## Templates by channel

### Outbound email (your main channel)

Homepage CTA:
```
https://www.hooklyne.com/?utm_source=outbound&utm_medium=email&utm_campaign=q2_pilot_push&utm_content=tim_voice
```

Contact form / demo CTA in cold emails:
```
https://www.hooklyne.com/contact?utm_source=outbound&utm_medium=email&utm_campaign=q2_pilot_push
```

Pricing-led emails:
```
https://www.hooklyne.com/pricing?utm_source=outbound&utm_medium=email&utm_campaign=q2_pricing_test&utm_content=growth_anchor
```

### LinkedIn DMs

```
https://www.hooklyne.com/?utm_source=linkedin&utm_medium=dm&utm_campaign=tim_personal_q2
```

### LinkedIn posts (public)

```
https://www.hooklyne.com/blog/why-one-database-isnt-enough?utm_source=linkedin&utm_medium=social_post&utm_campaign=apr26_blog_launch
```

### Email signatures

Set this once per team member, leave it for months:
```
https://www.hooklyne.com/?utm_source=signature&utm_medium=email&utm_campaign=tim_signature
```

### Newsletter

```
https://www.hooklyne.com/blog/post-slug?utm_source=newsletter&utm_medium=email&utm_campaign=apr26_newsletter
```

---

## Hard rules

1. **Lowercase only.** GA4 treats `Email` and `email` as different sources. Pick lowercase and never deviate.
2. **Underscores, never spaces or dashes.** `q2_pilot_push`, not `q2-pilot-push` or `q2 pilot push`.
3. **No PII in UTM params.** Never put email addresses, names, or company IDs in `utm_content`. They show up in GA reports and may leak in referrer headers.
4. **Stay consistent.** A UTM doc that nobody follows is worse than no UTM doc. If a campaign goes out without tags, the data is gone — you can't backfill.
5. **Don't tag internal links.** UTMs on links between your own pages (like nav links) overwrite the real source data and break attribution. Only tag links that come from outside the site.

---

## Campaign log (fill in as you go)

| Date | Campaign | Source | Medium | Content | Description | Sent to | Link |
|---|---|---|---|---|---|---|---|
| YYYY-MM-DD | example_campaign | outbound | email | tim_voice | What this is | Audience size | The full URL |

---

## Where to view results in GA4

After running a campaign for ~24h:

- **Reports → Acquisition → Traffic acquisition** → switch the primary dimension to "Session source / medium" or "Session campaign"
- **Reports → Acquisition → User acquisition** for new vs. returning breakdown
- Cross-reference with the **conversion events** wired in the site (`pilot_request`, `demo_request`, `pricing_tier_click`, `faq_open`) to see which campaigns actually convert, not just drive traffic

---

## Quick UTM builder

Don't handwrite UTMs every time. Use Google's official builder:

**https://ga-dev-tools.google/campaign-url-builder/**

Bookmark it. Paste your URL, fill the fields, copy the output. Takes 20 seconds.

---

## Workflow checklist (run this every time you launch a campaign)

- [ ] Decide your campaign name (use the format above)
- [ ] Open the campaign log in this doc — confirm the name isn't a duplicate
- [ ] Open the UTM builder
- [ ] Build one URL per variant you're testing
- [ ] Paste into the campaign log with date, audience, description
- [ ] Use those tagged URLs in the email / post / DM
- [ ] After 24-48h, check GA4 Acquisition reports
- [ ] After 7 days, mark in the log whether it converted (yes / no / data inconclusive)
