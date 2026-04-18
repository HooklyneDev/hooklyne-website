import { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
 { q: "What is Hooklyne?", a: "A managed research service for B2B sales teams. We find real reasons to reach out and write the outreach for you." },
 { q: "What do I get per prospect?", a: "Verified contact, scored news hook, buying signal, personalized email, LinkedIn invite, and outreach rationale." },
 { q: "How are credits used?", a: "1 credit = prospect package. 2 credits = contact finding. 3 credits = full prospect. See pricing for the full table." },
 { q: "What languages do you support?", a: "English and Dutch from day one. NL copy is rewritten, not translated." },
 { q: "Is there a contract?", a: "No. Monthly plans cancel anytime. Annual saves 10% with a 12-month commitment." },
 { q: "How do I get started?", a: "Start a free pilot. 10 prospects, no payment needed. Book a 20-min demo call." },
];

export const HomeFAQ = () => {
 const [open, setOpen] = useState<number | null>(0);

 return (
 <section className="py-20 lg:py-28">
 <div className="container max-w-3xl">
 <div className="text-center mb-12">
 <h2 className="text-3xl md:text-4xl font-semibold text-[var(--heading)] tracking-tight">
 Questions
 </h2>
 </div>

 <div className="rounded-2xl bg-[var(--card)] overflow-hidden">
 {ITEMS.map((item, i) => {
 const isOpen = open === i;
 return (
 <div key={item.q} className={cn(i > 0 && "")}>
 <button
 onClick={() => setOpen(isOpen ? null : i)}
 className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-[var(--card-hover)] transition-colors"
 >
 <span className="font-medium text-[var(--heading)]">{item.q}</span>
 {isOpen
 ? <Minus className="size-5 shrink-0 text-[var(--hooklyne-blue)] mt-0.5" />
 : <Plus className="size-5 shrink-0 text-[var(--muted-foreground)] mt-0.5" />}
 </button>
 {isOpen && (
 <div className="px-6 pb-5 text-sm text-[var(--muted-foreground)] leading-relaxed">{item.a}</div>
 )}
 </div>
 );
 })}
 </div>

 <div className="text-center mt-8">
 <a href="/faq" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--hooklyne-blue)] hover:opacity-80 transition-opacity">
 See all questions
 <ArrowRight className="size-3.5" />
 </a>
 </div>
 </div>
 </section>
 );
};
