export type QA = { q: string; a: string };
export type Group = { title: string; short: string; items: QA[] };

export const faqGroups: Group[] = [
  {
    title: "How Hooklyne works",
    short: "How it works",
    items: [
      { q: "What does Hooklyne actually do?", a: "A research workflow that ships ready-to-send prospect packages. Verified contacts, a live signal, and a first message in your voice. One portal. Under a minute to review and send." },
      { q: "Is this just another AI prospecting tool?", a: "No. Most are one ask and a database. Hooklyne is six specialised stages working together. Research first, writing last." },
      { q: "How is Hooklyne different from a contact database?", a: "A database gives you a name. Hooklyne gives you a verified contact, a live reason to reach out, and a drafted message. Databases stop at the row. We deliver the whole package." },
      { q: "How is Hooklyne different from a sales agency?", a: "Agencies cost €2,500+ a month and take the sending away from you. Hooklyne costs a fraction of that and keeps you in the sales seat, with the research already done." },
      { q: "Does Hooklyne use AI?", a: "Hooklyne combines several research and data systems into one workflow. Point is what shows up in the inbox, not what's under the hood." },
      { q: "Will the messages sound like a bot wrote them?", a: "No. Voice is calibrated from a 30-minute interview and up to five example emails. Every draft is reasoned through four times before it reaches you." },
    ],
  },
  {
    title: "Contacts, signals, and data quality",
    short: "Data & signals",
    items: [
      { q: "How do you find contact details?", a: "A waterfall across 20+ contact data providers, picking the best source per region. If one doesn't return a verified match, the next tries. Until we get a clean hit." },
      { q: "Why not just use one database?", a: "Any single provider covers about 40% of a market, and every provider covers a different 40%. One database means thin coverage and bounces. 20+ combined is how you reach the contacts that actually move." },
      { q: "How are email addresses verified?", a: "Four deliverability layers. Three parallel checks during enrichment, plus a final deliverability pass. Catch-alls, spam traps, role accounts, disposables, known complainers - flagged or dropped. If it can't be verified, it doesn't ship." },
      { q: "Will verifying my prospects damage my sender reputation?", a: "No. Verification runs on our infrastructure, not yours. Your domain never touches the probing." },
      { q: "What signals do you track?", a: "Seven sources: funding, hiring, leadership, launches, press, expansion, sector news. Every tracked prospect watched continuously." },
      { q: "How fresh are the signals?", a: "Within hours. We also watch company and team pages directly - new roles, quiet launches, careers-page expansions - often before the press picks up." },
      { q: "Why don't I see every hire and press release?", a: "Every signal is scored twice: matters to them, matters to you. Only the ones that pass both land in your inbox." },
      { q: "How accurate is the data?", a: "We ship only verified contacts. The four-layer verification holds bounce rate well below the 2% industry safe zone." },
      { q: "Is the data GDPR-compliant?", a: "Yes. Dutch-built, EU-first. Every provider in the waterfall operates under GDPR. Compliance is baked in, not bolted on." },
    ],
  },
  {
    title: "Research and message quality",
    short: "Research",
    items: [
      { q: "How do you avoid making stuff up about my prospects?", a: "Live web research, not training data. Every claim traces back to a current URL you can click. No invented quotes, no made-up stats, no fabricated customers." },
      { q: "Can I see the sources behind a meeting brief?", a: "Yes. Every brief shows its citations, clickable, so you can verify any fact before you walk in." },
      { q: "How do you personalise the messages?", a: "Sender Profile: five tabs - company, voice, example emails, products, rules. Set it once (about 30 minutes). Every message from that point inherits your voice through four reasoning passes." },
    ],
  },
  {
    title: "Languages and markets",
    short: "Languages",
    items: [
      { q: "Do you support Dutch outreach?", a: "Yes. Native Dutch, written to the tone Dutch buyers expect. Not translated." },
      { q: "How is the language chosen?", a: "Automatically, at prospecting. From the company domain and the contact's location. Once a prospect is in, language is locked for that package." },
      { q: "Can I target prospects outside the Netherlands?", a: "Yes. Provider selection tunes per region. Strong coverage across the UK, DACH, Benelux, and the Nordics." },
      { q: "Is Hooklyne only for Dutch companies?", a: "Dutch-built, but any EMEA team working in Dutch or English is a fit." },
    ],
  },
  {
    title: "Credits, plans, and billing",
    short: "Credits & plans",
    items: [
      { q: "How does the credit system work?", a: "Prospecting, intelligence, and meeting prep use credits. Reviewing and editing don't. Dashboard shows what's used, what's left. Resets monthly." },
      { q: "Do I pay for contacts we can't verify?", a: "No. Only verified hits are charged. No hit, no charge." },
      { q: "What if I run out mid-month?", a: "Top-ups on every plan at €0.85 per credit. Custom rates on Enterprise." },
      { q: "Can I change plans?", a: "Yes, anytime." },
      { q: "Long-term contract?", a: "No. Monthly or annual - annual saves up to €60/month. Cancel anytime." },
      { q: "Per-seat fees?", a: "Start 1 seat, Growth 2, Scale 5, Enterprise unlimited." },
    ],
  },
  {
    title: "Pilots and onboarding",
    short: "Pilots",
    items: [
      { q: "What's the free pilot?", a: "Ten fully built prospects, free. Verified contacts, live signals, messages in your voice. We ask for a 20-minute feedback call in return." },
      { q: "How long does onboarding take?", a: "Under a week for a single rep. A bit longer for a team. Sender Profile takes ~30 minutes per voice. ICP calibration, one or two passes. Growth and Scale include a kick-off call and a live training session for the whole team." },
      { q: "Do I need to change my CRM or sequencer?", a: "No. Copy packages into what you already use, or send from your inbox." },
      { q: "Who sends the emails?", a: "You do. Your inbox, your domain, your reputation." },
    ],
  },
];
