import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqGroups, faqGroupsNL } from "@/data/faq";
import { track } from "@/lib/analytics";
import { useLang, type Lang } from "@/lib/use-lang";

const HEAD_EN = {
  eyebrow: "FAQ",
  headline: (
    <>Frequently asked, <span className="text-accent">honestly answered</span>.</>
  ),
  sub: "The ones we hear most. If yours isn't here, ask us directly.",
};
const HEAD_NL = {
  eyebrow: "FAQ",
  headline: (
    <>Veelgestelde vragen, <span className="text-accent">eerlijk beantwoord</span>.</>
  ),
  sub: "De vragen die we het vaakst horen; staat de jouwe er niet tussen, mail ons dan direct.",
};

export const FAQ = ({ lang: langProp }: { lang?: Lang } = {}) => {
  const lang = useLang(langProp);
  const groups = lang === "nl" ? faqGroupsNL : faqGroups;
  const head = lang === "nl" ? HEAD_NL : HEAD_EN;
  const [active, setActive] = useState(0);
  const g = groups[active];

  return (
    <section id="faq" className="pb-28 lg:pb-32">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--hooklyne-blue)] mb-3">{head.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl tracking-tight text-[var(--heading)] leading-tight mb-4">
              {head.headline}
            </h1>
            <p className="text-[var(--muted-foreground)] text-base max-w-xl mx-auto leading-relaxed">
              {head.sub}
            </p>
          </div>

          <div className="mb-10">
            <div
              className="flex flex-wrap justify-center gap-1.5 rounded-2xl p-1.5"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              {groups.map((grp, gi) => {
                const isActive = active === gi;
                return (
                  <button
                    key={gi}
                    onClick={() => setActive(gi)}
                    aria-pressed={isActive}
                    className="flex-1 min-w-max px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors"
                    style={
                      isActive
                        ? { background: "var(--hooklyne-navy)", color: "white" }
                        : { color: "var(--muted-foreground)", background: "transparent" }
                    }
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.background = "var(--bg)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {grp.short}
                  </button>
                );
              })}
            </div>
          </div>

          <Accordion
            type="single"
            collapsible
            className="space-y-2"
            key={active}
            onValueChange={(v) => {
              if (v) {
                const idx = parseInt(v.split("-item-")[1] || "0", 10);
                const qa = g.items[idx];
                if (qa) track("faq_open", { group: g.short, question: qa.q.slice(0, 60) });
              }
            }}
          >
            {g.items.map((qa, i) => (
              <AccordionItem
                key={i}
                value={`g${active}-item-${i}`}
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

          <div className="mt-16 rounded-2xl p-8 text-center" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <h3 className="text-xl font-semibold text-[var(--heading)] mb-2">Still wondering something?</h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-5">Message us. We reply the same day, usually within an hour.</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--hooklyne-navy)" }}
            >
              Talk to us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
