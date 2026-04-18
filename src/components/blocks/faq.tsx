import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
 {
 question: "What is Hooklyne?",
 answer: "A signal-ranked outreach engine for B2B sales teams. We give you a ranked list of companies and prospects, ordered by how relevant their latest developments are to what you sell. Every first touch has a real reason - a live news signal that connects their world to your product. For each prospect, we find the right person by role description, verify the contact, and write a ready-to-send email and LinkedIn message in your voice.",
 },
 {
 question: "What do I get per prospect?",
 answer: "A complete package: verified contact, company phone number, news hook (scored 1-10, with clickable source), buying signal, personalized email in your voice, LinkedIn invite, and outreach rationale. On higher plans: meeting prep brief, sector news, and real-time signal tracking.",
 },
 {
 question: "How are credits used?",
 answer: "1 credit = prospect package (news hook + buying signal + personalized email + LinkedIn invite + outreach rationale). 2 credits = contact finding (verified email + role + company from 20+ sources, triple verified). 3 credits = full prospect (everything combined). Meeting prep and signal call scripts cost 1 credit each. Company discovery costs 1 credit.",
 },
 {
 question: "We already use Apollo or Lusha - why do we need Hooklyne?",
 answer: "Apollo and Lusha give you data. Hooklyne gives you done. With Apollo you still need to interpret signals, find the right contact, and write the outreach yourself - that's 2 to 4 hours per prospect. Hooklyne does all of that and delivers a ready-to-send message in your voice. It also supports Dutch natively, which most tools handle poorly.",
 },
 {
 question: "Can't ChatGPT do this?",
 answer: "ChatGPT can help write outreach, but it doesn't find your prospects, verify contacts, monitor signals, or know when to reach out. You'd still do all the research yourself, then prompt it carefully every time. Hooklyne is a complete workflow - it handles everything from finding companies to delivering outreach that's ready to send.",
 },
 {
 question: "What languages do you support?",
 answer: "English and Dutch natively. Our system researches in English for maximum coverage but delivers in your language with cultural awareness built in. Native Dutch outreach with local tone, not translations. For Dutch companies reaching out to EU markets in English, we adjust for cultural communication styles. More languages coming.",
 },
 {
 question: "Is there a contract?",
 answer: "No. Monthly plans cancel anytime. Annual plans are 12-month commitments with 10% savings.",
 },
 {
 question: "How do I get started?",
 answer: "Start a free pilot. 10 full prospect packages, all features, no payment needed. We ask for a 20-min feedback call and case study permission in return. Book a demo call and we'll set you up.",
 },
 {
 question: "What about data privacy? Is this GDPR-compliant?",
 answer: "Yes. Hooklyne processes only publicly available professional data - company information and business contact details accessible under GDPR's legitimate interest basis. We don't store personal data beyond what's needed to deliver the service and comply with Dutch and EU data protection rules.",
 },
 {
 question: "What if I run out of credits?",
 answer: "Overage credits kick in automatically at your plan's overage rate. Start: €1.50/cr. Growth Smarter: €1.20/cr. Scale: €0.90/cr. You'll never get blocked mid-workflow - you just pay for what you use above your monthly allowance.",
 },
];

export const FAQ = () => {
 return (
 <section id="faq" className="pb-28 lg:pb-32">
 <div className="container">
 <div className="mx-auto max-w-3xl">
 <div className="text-center mb-12">
 <p className="text-xs font-semibold uppercase tracking-widest text-[var(--hooklyne-blue)] mb-3">FAQ</p>
 <h2 className="text-3xl tracking-tight md:text-4xl text-[var(--heading)]">Common questions</h2>
 <p className="text-[var(--muted-foreground)] mt-3 text-base">Everything you need to know before booking a demo.</p>
 </div>

 <Accordion type="single" collapsible className="space-y-2">
 {faqs.map((faq, i) => (
 <AccordionItem
 key={i}
 value={`item-${i}`}
 className="rounded-xl bg-[var(--card)] px-5 data-[state=open]:border-[var(--hooklyne-blue)]/20"
 >
 <AccordionTrigger className="text-left text-sm font-semibold text-[var(--heading)] hover:no-underline py-4">
 {faq.question}
 </AccordionTrigger>
 <AccordionContent className="text-sm text-[var(--muted-foreground)] leading-relaxed pb-4">
 {faq.answer}
 </AccordionContent>
 </AccordionItem>
 ))}
 </Accordion>

 <div className="mt-10 text-center">
 <p className="text-sm text-[var(--muted-foreground)] mb-4">Still have questions? We're happy to walk you through it.</p>
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
