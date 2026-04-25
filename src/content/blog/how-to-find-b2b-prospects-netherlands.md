---
title: "How to find B2B prospects in the Netherlands without paid tools"
description: "Practical guide to sourcing Dutch B2B prospects using KvK, LinkedIn, and free directories. Where each method works, where it stops scaling, and what to do next."
pubDate: 2026-04-23
authorName: Tim
authorBio: "Tim co-founded Hooklyne after years running outbound at Dutch B2B companies. Writes about what actually works for SME sales teams."
type: guide
readingTime: "12 min"
image: /blog/find-prospects-netherlands-hero.jpg
---

If you sell B2B in the Netherlands and you have not yet committed to a 1,500 EUR per month data tool, you have probably wondered if you can just do this yourself. Pull a list from somewhere. Find the right person on LinkedIn. Send an email. Repeat.

You can. For a while. This post is the honest version of that workflow: what works, what does not, and the point at which the unit economics flip.

We have done this both ways. We started Hooklyne after burning enough hours on the manual route to know exactly where it breaks.

## Who this guide is for

You are a founder, sales lead, or first commercial hire at a Dutch B2B company of 5 to 50 people. You sell to other Dutch (or UK, or EMEA) SMEs. You have not yet bought Apollo, Cognism, Lusha, or Salesmotion. You suspect the manual route should be enough for the volume you actually need.

For the first 50 prospects, you are right.

## The four free routes worth knowing

### 1. KvK (Kamer van Koophandel)

Every company registered in the Netherlands sits in the [KvK Handelsregister](https://www.kvk.nl/zoeken/handelsregister/). It is a public database with structured filters: SBI code (industry classification), region, company size, founding date.

**What it is good for:**
- Building a clean list of, for example, all Dutch SaaS companies in Noord-Holland with 10 to 50 employees
- Verifying whether a company actually exists and is active
- Getting the registered name, address, and KvK number for compliance and invoicing
- Spotting companies founded in the last 12 months (founder-led ICP signal)

**Practical workflow:**
1. Go to the [Handelsregister advanced search](https://www.kvk.nl/zoeken/)
2. Filter by SBI code (`62.01` for software development, `70.22` for management consulting, etc.) and by region
3. Export to CSV (paid extract, around 7 EUR per 100 records via the KvK API or 1.83 EUR per company for a full uittreksel)
4. The free search will show you company names and basic info; for structured bulk export you need a paid extract or one of the data resellers (Company.info, Graydon, Altares)

**Where it stops scaling:**
- KvK gives you the company. It does not give you a person, a contact email, a job title, or a buying signal. Those are the four things you actually need.
- The free search caps at a small number of results per query. For real volume, you are paying per record anyway.
- Industry classification (SBI codes) is self-reported and often out of date. A company registered as "consulting" in 2018 might be a SaaS product company by 2026.

For a list of 30 target companies you want to research deeply, KvK is excellent. For a list of 500 companies you want to outreach, it is the start of a project, not the end.

### 2. LinkedIn (free + Sales Navigator trial)

LinkedIn is where the people are. Specifically, the decision-makers in your ICP.

**What it is good for:**
- Searching by job title, company size, region, and recent activity
- Finding the actual person at a target company who handles your category
- Spotting trigger events (job changes, promotions, posts about hiring)
- Manual personalisation: reading their last 3 posts before you draft an email

**Practical workflow:**
1. Sign up for a [LinkedIn Sales Navigator free trial](https://business.linkedin.com/sales-solutions/sales-navigator) (30 days, no charge, full access)
2. Build a saved search: industry + headcount + seniority + geography
3. Save the leads to a list. Sales Navigator can show you 25 results per page, up to 2,500 results per saved search
4. Export the leads via [Apollo's free tier (10,000 credits/month for limited usage)](https://www.apollo.io/) or via Phantombuster, Evaboot, or Findymail to enrich with email addresses

**Where it stops scaling:**
- The free trial ends after 30 days. After that, Sales Navigator is 99 EUR per month. Useful, but no longer free.
- LinkedIn aggressively rate-limits bulk scraping. You will get warnings, then restrictions, then a temporary ban. Anyone selling you "unlimited LinkedIn scraping" for 19 EUR per month is one update away from breaking.
- Email addresses are the hard part. LinkedIn does not show you emails. Every workflow that "exports emails from LinkedIn" is using a third-party enrichment provider (Apollo, RocketReach, ContactOut), and accuracy varies wildly by region.

For Dutch and UK contacts, the email match rate from LinkedIn-only enrichment sits between 40 and 65 percent. The other 35 to 60 percent of your list is unusable without a second provider.

### 3. Google operators

This is the underrated one. A handful of search operators will surface a surprising amount.

**Useful queries:**

```
site:nl "we zijn op zoek naar" "sales manager"
```
Finds Dutch companies actively hiring sales managers. Hiring is a buying signal for adjacent products.

```
site:linkedin.com/in "head of growth" "amsterdam" "scaleup"
```
Finds growth leaders at Amsterdam scale-ups, indexed by Google.

```
"powered by [competitor product]" site:nl
```
Finds Dutch sites running a competitor's tech (works for SaaS, payments, e-commerce platforms).

```
"published a job" "netherlands" "founder" 2026
```
Press releases and announcements that mention founders or hiring.

```
filetype:pdf site:overheid.nl "aanbesteding" "software"
```
Public tender documents with software requirements (works for govtech sales).

**What it is good for:**
- Free, no quota, no rate limit
- Surfaces public signals that paid tools do not always index
- Confirms a company actually does what their website claims

**Where it stops scaling:**
- Manual. You can run 20 searches in an afternoon. You cannot run 2,000.
- Quality varies massively by query. You will spend half your time tuning the operator before the result set is useful.
- No structured output. You get a list of URLs. You still have to click through each one and figure out who to talk to.

For one-off research on a specific account, Google operators are the best free tool nobody mentions. For ongoing prospecting, they are not a workflow.

### 4. Local directories and association lists

Industry associations and regional directories are underrated for vertical sales.

**Where to look:**
- [NLdigital](https://www.nldigital.nl/) for Dutch IT and software companies
- [Dutch Startup Association](https://dutchstartup.org/) for early-stage founders
- [MKB-Nederland](https://www.mkbnl.nl/) for general SME directories
- Branch-specific guilds (BOVAG for automotive, Koninklijke Horeca Nederland for hospitality, etc.)
- Regional chambers (BOM in Brabant, Oost NL in Gelderland)

**What it is good for:**
- Pre-qualified lists. If a company joined NLdigital, they identify as a Dutch IT company. That is more reliable than an SBI code.
- Often includes contact details for the right person (membership directories list a primary contact)
- Free or cheap to access (most are free; some paid memberships unlock the directory)

**Where it stops scaling:**
- Coverage is partial. Not every relevant company joins these.
- The "primary contact" listed is often someone in marketing or operations, not the buyer of your product.
- Manual extraction. No bulk export.

This is the route most Dutch sales teams underuse. For a vertical-specific outbound campaign (selling to Dutch IT consultancies, for example), starting from NLdigital's member list is faster and cleaner than any database.

## The honest unit economics

Here is the calculation we ran on ourselves before building Hooklyne.

**Manual route, 50 prospects per month:**
- KvK extracts: 30 EUR per month for occasional pulls
- Sales Navigator: 99 EUR per month after the free trial
- Email enrichment (Findymail or similar): 49 EUR per month entry plan
- Time: roughly 4 hours per week to source, enrich, verify, and prepare 50 prospects. At 75 EUR/hour fully loaded, that is 1,200 EUR per month of your time.

**Total real cost: ~1,378 EUR per month for 50 prospects** (178 EUR in tools + 1,200 EUR in time).

**Manual route, 200 prospects per month:**
- Same tools: 178 EUR
- Time: 16 hours per week. That is half a full-time hire. ~4,800 EUR per month.

**Total: ~4,978 EUR per month for 200 prospects.**

The crossover point at which a managed service becomes cheaper than your own time, for most teams, sits around 80 to 120 prospects per month. Below that, manual is fine. Above it, you are paying for the time of someone you could be using on calls.

## Where the manual route quietly fails (the parts nobody warns you about)

After roughly 6 to 8 weeks of manual prospecting, three things happen in this order:

**1. The list goes stale.** People you researched in week 1 have changed roles by week 6. About 4 percent of B2B contacts change jobs every month. Your "verified" list is 25 percent stale within six months. Manual maintenance is unrealistic.

**2. The signals dry up.** You will exhaust the obvious triggers (recent funding, new hires) on your initial list within a month. After that, the prospects sit there with no new reason to reach out. You either spam them with re-touches or drop them.

**3. The voice flattens.** When one person researches and writes 50 emails per week, the patterns repeat. By month two, every email starts to sound the same. Reply rates drop, and you do not notice for another month because the volume hides it.

These are not problems you fix with better discipline. They are problems that compound until you stop doing outbound entirely or you build a system around them.

## What a managed workflow does differently

The shortest version: it does the parts that do not get easier with practice.

Cross-referenced data across 20+ sources so the contact you research is actually still in their role. [Hooklyne](/how-it-works) checks each record against multiple providers and flags conflicts before you waste a touch.

Structured signal detection (funding, hiring, leadership moves, tech stack changes, job postings) running continuously, not just when you remember to look. Verifiable triggers, not LLM-paraphrased "they posted about scaling."

Voice modelling so the email actually reads in your rep's writing style, not a generic template that sounds like every other outbound email in the inbox.

Compliance and suppression infrastructure so the prospect who unsubscribed three months ago does not get re-emailed.

None of these are exciting. All four are the difference between outbound that compounds and outbound that quietly stops working.

## When to stay manual

To be clear, we do not think every team should buy a tool. The manual route is the right answer when:

- You have **fewer than 30 prospects per month** (the time cost is below the tool cost)
- You sell into **a tight TAM of under 200 companies** (you can handpick and never need bulk)
- You are **the founder doing handpicked outreach** to dream accounts (the time you spend researching the prospect is itself part of the deal)
- You are **testing a new market or ICP** and need to learn what works before paying for scale

For everyone else, the manual route eventually costs more than it saves.

## The practical checklist

If you are a Dutch SME starting B2B outbound this month, here is the order:

- [ ] **Define the ICP first.** Industry, headcount, region, role of the buyer. Without this, no tool helps.
- [ ] **Start with KvK or NLdigital** to build a list of 50 target companies. Free, fast, accurate at the company level.
- [ ] **Get the LinkedIn Sales Navigator trial** for 30 days. Find the actual person at each company. Save as a list.
- [ ] **Use Google operators** to verify each prospect has a recent signal worth referencing. If they do not, drop them.
- [ ] **Enrich emails manually** for the first 30. Use Hunter, Findymail, or RocketReach free tiers. Skip anyone you cannot verify.
- [ ] **Send 30 highly personalised emails.** Track replies for 14 days.
- [ ] **Review the unit economics.** If you spent more than 8 hours on this, the manual route is already too expensive.

If you reach step 7 and the math does not work, that is when [a managed service like Hooklyne](/contact) starts to make sense. We will tell you honestly whether your volume justifies it. For some teams it does not, and we say so.

## Related reading

- [Apollo vs Cognism vs Lusha for Dutch and UK B2B SMEs](/blog/apollo-vs-cognism-vs-lusha-dutch-uk-smes) - if you have decided you need a paid tool, here is how the three big options actually compare
- [Building your own AI lead-gen agent: what breaks at scale](/blog/build-your-own-ai-lead-generation-agent) - the third option people increasingly try, and where it stops working
- [How Hooklyne works](/how-it-works) - the workflow we built after running into the limits of the manual route ourselves
