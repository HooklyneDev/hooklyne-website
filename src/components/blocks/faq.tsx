import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type QA = { q: string; a: string };
type Group = { title: string; items: QA[] };

const groups: Group[] = [
  {
    title: "How Hooklyne works",
    items: [
      {
        q: "What does Hooklyne actually do?",
        a: "Hooklyne is a research workflow for B2B sales teams. It finds companies that match your ICP, verifies decision-maker contact details across 20+ data providers, watches each prospect for live buying signals, and drafts first-touch outreach in your rep's voice. Everything arrives in one portal, ready to review and send.",
      },
      {
        q: "Is this just another AI prospecting tool?",
        a: "No. Most \"AI prospecting tools\" are one model talking to a static contact database. Hooklyne is a multi-stage workflow - six specialised stages, each doing a specific job a human researcher would do. The research layer is what makes the output useful. The writing is the last step, not the whole product.",
      },
      {
        q: "How is Hooklyne different from a contact database like Apollo or Cognism?",
        a: "Databases give you a name and an email. Hooklyne gives you a complete prospect package - a verified contact, a live signal explaining why to reach out this week, and a drafted message in your rep's voice. Databases leave the research and writing to you. Hooklyne does both, and runs continuously.",
      },
      {
        q: "How is Hooklyne different from a sales agency?",
        a: "Agencies typically cost €2,500 per month or more and replace part of your team. Hooklyne costs a fraction of that and adds to your team instead - your rep stays in the sales seat, but with proper research and drafted outreach done for them. You send from your own inbox, with your own voice, on your own schedule.",
      },
      {
        q: "Does Hooklyne use AI?",
        a: "Hooklyne combines several specialised research and data systems into a single workflow. Some of them are language-based. The point isn't that any one of them is \"AI\" - the point is that the workflow produces prospect packages that work. We don't publicly detail which systems are used because the combination is how we deliver results.",
      },
      {
        q: "Will the messages sound like they were written by a bot?",
        a: "No, and this is the main reason the workflow is shaped the way it is. Every message goes through multiple reasoning passes: hook selection, angle, voice match, and quality check. Voice is calibrated from a 30-minute interview and up to five example emails you provide. The output reads like your rep wrote it on a sharp morning, because every draft has been read and rewritten specifically to match how your rep writes.",
      },
    ],
  },
  {
    title: "Contacts, signals, and data quality",
    items: [
      {
        q: "How do you find contact details?",
        a: "We run a waterfall across 20+ contact data providers. One provider is tried first - chosen based on the geography of the prospect - and if they don't return a verified match, the next provider tries. This continues until we get a result that passes verification.",
      },
      {
        q: "Why not just use one database?",
        a: "Contact data providers rarely overlap. Any single provider has roughly 40% of any given market, and the 40% each one covers is different. A single-source tool gives you thin coverage and frequent bounces. Combining 20+ providers is the only way to reach the 80%+ coverage outbound actually needs.",
      },
      {
        q: "How are email addresses verified?",
        a: "Four layers of verification. Three during the enrichment process - parallel checks that only pass a contact through if multiple methods agree. And a final separate deliverability check at the end. Invalid addresses, catch-all domains, spam traps, disposable emails, role-based addresses, and known complainer addresses are all flagged or filtered. If we can't verify a contact, we don't ship it.",
      },
      {
        q: "Will verifying my prospects damage my sender reputation?",
        a: "No. Verification runs through our infrastructure, not yours. Your domain is never used to probe mail servers during the verification process.",
      },
      {
        q: "What kinds of signals do you track?",
        a: "Seven intelligence sources: funding, hiring, leadership changes, product launches, press mentions, expansions, and sector news. Each tracked prospect is watched continuously.",
      },
      {
        q: "How fresh are the signals?",
        a: "Real-time. Most signals surface within hours of the underlying event. We also monitor profile and company pages directly for changes that don't make the press - new roles added to team pages, quietly launched products, expansions visible on careers pages before they're announced. Weekly or monthly signal tools miss most of this. Ours don't.",
      },
      {
        q: "Why don't I see every hire and press release from my tracked prospects?",
        a: "Because we score every signal twice - for relevance to the prospect, and for relevance to what you sell. Only the ones that pass both checks reach your inbox. A routine junior hire at a company you can't sell to doesn't need your attention.",
      },
      {
        q: "How accurate is the data?",
        a: "Contact data accuracy depends on the source and region. Our waterfall approach maximises coverage, and the four-layer verification removes emails that would bounce. We aim to ship only verified, reachable contacts - if one doesn't verify, we don't ship it. The industry standard to stay inbox-friendly is a bounce rate below 2%, and we aim to stay well under that.",
      },
      {
        q: "Is the data sourcing GDPR-compliant?",
        a: "Yes. All contact sourcing follows EU data protection standards. Data providers in our waterfall operate under GDPR-compliant processes, and nothing we ship has been obtained outside the bounds of European data law. As a Dutch-built product serving EMEA, compliance is foundational - not a bolt-on.",
      },
    ],
  },
  {
    title: "Research and message quality",
    items: [
      {
        q: "How do you avoid making stuff up about my prospects?",
        a: "Research is grounded in live web sources, not training data. The system plans what to look up, searches, synthesises, then searches again where gaps remain - iteratively, the way a human researcher works. Every fact is traceable back to a real, current source. No invented quotes, no made-up statistics, no fabricated customer names. If we claim it, there's a source behind it.",
      },
      {
        q: "Can I see the sources behind a meeting prep brief?",
        a: "Yes. Every brief shows its work - where each fact came from, so you can double-check anything before you walk into the meeting.",
      },
      {
        q: "How do you personalise the messages?",
        a: "Through the Sender Profile. Five tabs covering your company, voice, example emails, products, and rules. Set it up once during onboarding (about 30 minutes). Every piece of outreach from that point inherits your voice. Messages get multiple reasoning passes - hook, angle, voice match, quality check - before they reach your inbox.",
      },
    ],
  },
  {
    title: "Languages and markets",
    items: [
      {
        q: "Do you support Dutch outreach?",
        a: "Yes. Native Dutch, written with the cultural tone Dutch buyers expect - not translated from English. EN and NL from day one.",
      },
      {
        q: "Can I target prospects outside the Netherlands?",
        a: "Yes. Our EMEA coverage is strong, and we tune contact data provider selection by region so coverage stays high across the UK, DACH, Benelux, and the Nordics.",
      },
      {
        q: "Is Hooklyne only for Dutch companies?",
        a: "We're Dutch-built and our core audience is Dutch and UK B2B SMEs. That said, any EMEA team reaching out in Dutch or English can use Hooklyne today.",
      },
    ],
  },
  {
    title: "Credits, plans, and billing",
    items: [
      {
        q: "How does the credit system work?",
        a: "Every prospecting, intelligence, or meeting prep action consumes credits. Reading, reviewing, and editing existing prospects does not. You see what's used and what's left on your dashboard, and credits reset monthly.",
      },
      {
        q: "Do I pay for contacts we can't verify?",
        a: "No. Contact lookup credits are only charged on verified hits. If we can't find or verify a contact, you pay nothing for that attempt.",
      },
      {
        q: "What happens if I run out of credits mid-month?",
        a: "Top-ups are available on every plan at €0.85 per credit. Enterprise plans get custom rates.",
      },
      {
        q: "Can I change plans?",
        a: "Yes, at any time.",
      },
      {
        q: "Is there a long-term contract?",
        a: "No. Monthly and annual options are available, with annual plans saving up to €60 per month depending on tier. Cancel anytime.",
      },
      {
        q: "Are there per-seat fees?",
        a: "The Start plan is for 1 seat. Growth is 2 seats, Scale is 5 seats. Enterprise has unlimited seats. Most teams won't hit seat limits.",
      },
    ],
  },
  {
    title: "Pilots and onboarding",
    items: [
      {
        q: "What's the free pilot?",
        a: "We build 10 full prospect packages for you - verified contacts, real signals, messages drafted in your voice. No payment needed. We ask for a 20-minute feedback call in exchange.",
      },
      {
        q: "How long does onboarding take?",
        a: "Most teams are live in under a week. The Sender Profile takes around 30 minutes to set up properly, and ICP calibration usually takes one or two iterations. Growth and Scale plans include a kick-off call to shorten this.",
      },
      {
        q: "Do I need to change my CRM or sequencer?",
        a: "No. Hooklyne doesn't replace your CRM or your outreach tool. Packages copy cleanly into whatever you use, or you send from your own inbox.",
      },
      {
        q: "Who actually sends the emails?",
        a: "You do. Hooklyne drafts and delivers the outreach. The send happens from your inbox, your sequencer, or your LinkedIn. Your voice, your domain, your reputation.",
      },
    ],
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="pb-28 lg:pb-32">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--hooklyne-blue)] mb-3">FAQ</p>
            <h1 className="text-4xl md:text-5xl tracking-tight text-[var(--heading)] leading-tight mb-4">
              Frequently asked questions
            </h1>
            <p className="text-[var(--muted-foreground)] text-base max-w-xl mx-auto leading-relaxed">
              Common questions about how Hooklyne works, what's included, and how to get started. If your question isn't here, get in touch.
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {groups.map((g, gi) => (
              <div key={gi}>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--hooklyne-orange)] mb-4">
                  {g.title}
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {g.items.map((qa, i) => (
                    <AccordionItem
                      key={i}
                      value={`g${gi}-item-${i}`}
                      className="rounded-xl bg-[var(--card)] px-5 data-[state=open]:border-[var(--hooklyne-blue)]/20"
                    >
                      <AccordionTrigger className="text-left text-sm font-semibold text-[var(--heading)] hover:no-underline py-4">
                        {qa.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-[var(--muted-foreground)] leading-relaxed pb-4">
                        {qa.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl p-8 text-center" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <h3 className="text-xl font-semibold text-[var(--heading)] mb-2">Didn't find your answer?</h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-5">Get in touch. We answer fast.</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--hooklyne-navy)" }}
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
