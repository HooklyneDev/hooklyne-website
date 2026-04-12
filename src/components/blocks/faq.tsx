import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "We already use Apollo or Lusha - why do we need Hooklyne?",
    answer:
      "Apollo and Lusha give you data. Hooklyne gives you done. With Apollo, you still need to interpret signals, find the right contact, and write the outreach yourself - that's 2 to 4 hours per prospect. Hooklyne does all of that for you and delivers a ready-to-send message in your voice. It also supports Dutch, which most tools don't handle well.",
  },
  {
    question: "We already work with a sales or marketing agency.",
    answer:
      "Agencies are great for strategy and campaigns. Hooklyne is for your sales reps who need to send outreach today - not in two weeks after a briefing cycle. It's not a replacement for an agency, it's what fills the gap between strategy and execution for your day-to-day prospecting.",
  },
  {
    question: "We already have too many tools. We don't need another one.",
    answer:
      "Fair. But Hooklyne replaces a stack of tools: data enrichment, contact finding, signal monitoring, and copywriting. If you're currently doing those things across multiple subscriptions - or just not doing them properly - Hooklyne simplifies it into one workflow. Most customers end up cancelling at least one other tool.",
  },
  {
    question: "Can't ChatGPT do this?",
    answer:
      "ChatGPT can help write outreach, but it doesn't find your prospects, verify contacts, monitor signals, or know when to reach out. You'd still need to do all the research yourself, then prompt it carefully every time. Hooklyne is a complete workflow - it handles the full process from finding companies to delivering outreach that's ready to send.",
  },
  {
    question: "What about data privacy? Is this GDPR-compliant?",
    answer:
      "Yes. Hooklyne processes only publicly available professional data - company information and business contact details that are legitimately accessible under GDPR's legitimate interest basis. We don't store personal data beyond what's needed to deliver the service, and we comply with Dutch and EU data protection rules. If you have specific compliance questions, we're happy to discuss them on a call.",
  },
  {
    question: "What does the pilot include?",
    answer:
      "The pilot gives you 10 fully researched prospect packages - company, contact, signal analysis, and ready-to-send outreach. It includes all features: smart company discovery, person matching, Signals, Intelligence, and Meeting Prep. In return, we ask for a feedback call and the right to use your results as a case study (anonymised if you prefer). No credit card needed.",
  },
  {
    question: "How is outreach personalised to my voice?",
    answer:
      "During onboarding we capture your tone, style, and typical messaging approach. We also review examples of your best-performing outreach. From there, Hooklyne generates messages that match your style - not a generic template. You can review and edit before sending, but most users send with minimal changes.",
  },
  {
    question: "Which languages does Hooklyne support?",
    answer:
      "Hooklyne supports Dutch and English natively. This is a key differentiator - most tools struggle with natural Dutch outreach. If your prospects are primarily Dutch-speaking, you'll get outreach that reads like it was written by a native speaker, not translated.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="pb-28 lg:pb-32">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--hooklyne-blue)] mb-3">
              FAQ
            </p>
            <h2 className="text-3xl tracking-tight md:text-4xl text-[var(--hooklyne-navy)]">
              Common questions
            </h2>
            <p className="text-[var(--muted-foreground)] mt-3 text-base">
              Everything you need to know before booking a demo.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-5 data-[state=open]:border-[var(--hooklyne-blue)]/20"
              >
                <AccordionTrigger className="text-left text-sm font-semibold text-[var(--hooklyne-navy)] hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[var(--muted-foreground)] leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA below FAQ */}
          <div className="mt-10 text-center">
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              Still have questions? We're happy to walk you through it.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--hooklyne-navy)" }}
            >
              Book a demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
