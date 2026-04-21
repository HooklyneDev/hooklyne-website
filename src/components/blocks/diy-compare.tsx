import { useState, useEffect } from "react";
import { Check, X, Clock, Database, Wrench, Briefcase, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const HooklyneMark = ({ className = "" }: { className?: string }) => (
  <span
    className={`inline-flex items-center justify-center shrink-0 ${className}`}
    style={{ background: "var(--hooklyne-blue)" }}
    aria-hidden="true"
  >
    <img src="/logo-mark.svg" alt="" className="size-5 block" />
  </span>
);

type TabKey = "hooklyne" | "database" | "aioutreach" | "diy" | "agency";

type Step = {
  step: string;
  label: string;
  detail: string;
  time: string;
  callout: string;
  good: boolean;
};

type TabDef = {
  key: TabKey;
  label: string;
  sub: string;
  price?: string;
  icon: LucideIcon;
  tone: "teal" | "orange" | "amber";
  totalLabel: string;
  total: string;
  totalSub: string;
  goodAt?: string;
  footerNote?: string;
  steps: Step[];
};

const TABS: TabDef[] = [
  {
    key: "hooklyne",
    label: "Hooklyne",
    sub: "Entire workflow",
    price: "€39–299/mo",
    icon: Wrench,
    tone: "teal",
    totalLabel: "Your time",
    total: "<60s to review and send",
    totalSub: "everything else is handled for you",
    steps: [
      {
        step: "1", label: "Describe the company type",
        detail: "Plain language, not filter grids. We run a semantic match across billions of pages and return a ranked list. Best fit at the top, scored against your ICP.",
        time: "2 min", callout: "A ranked shortlist, not a dump of rows", good: true,
      },
      {
        step: "2", label: "Pick the contact you want to reach",
        detail: "Each company shows available roles. You pick the one that fits. We run a waterfall across 20+ contact providers with four verification layers - because no single database has more than 40% of any market.",
        time: "30 sec", callout: "You pick the role. We verify the address.", good: true,
      },
      {
        step: "3", label: "Lands in My Leads with a reason",
        detail: "Every prospect arrives with a signal attached: funding round, hiring move, leadership change, launch. Scored twice - once for the prospect's business, once for what you sell. Only signals that pass both reach you.",
        time: "auto", callout: "A reason to reach out, not just a name.", good: true,
      },
      {
        step: "4", label: "Full email, written in your voice",
        detail: "Four reasoning passes: hook, angle, voice, quality check. Reads like your rep wrote it after doing the research.",
        time: "auto", callout: "Not generic. Dutch or English, locked to the prospect.", good: true,
      },
      {
        step: "5", label: "Track signals from that lead",
        detail: "Monitor any lead for ongoing signals: new funding, team changes, press coverage. You get notified when the moment changes - not when the calendar says so.",
        time: "toggle", callout: "Catch the next moment too, not just the first.", good: true,
      },
      {
        step: "6", label: "Request a meeting brief",
        detail: "When you are ready to meet, request a live-researched brief. Every claim traces to a real URL. Walk in prepared.",
        time: "on demand", callout: "Every claim traces to a source. No made-up facts.", good: true,
      },
    ],
  },
  {
    key: "database",
    label: "Contact database",
    sub: "Rows, filters, exports",
    price: "~€100–300/mo",
    icon: Database,
    tone: "orange",
    totalLabel: "Your time",
    total: "~45 min per prospect",
    totalSub: "research and writing on you",
    goodAt: "Fast, familiar, cheap per row. Great if you already know your ICP tightly and just need to pull a list of contacts to run through your own process.",
    footerNote: "Database price + verification tool + your time. The rows are cheap. The work around them is not.",
    steps: [
      {
        step: "1", label: "Build the filter query",
        detail: "Pick industry, company size, geography, seniority, job function. Save the view. The list refreshes against the database.",
        time: "5 min", callout: "Fast to build a list once you know the filters", good: true,
      },
      {
        step: "2", label: "Export the rows",
        detail: "Download CSV or push to your CRM. You get name, title, company, email, phone if available.",
        time: "instant", callout: "Standard format, works with your existing tools", good: true,
      },
      {
        step: "3", label: "Verify the emails yourself",
        detail: "Most databases show one source. Coverage varies by region. Bounce rates on single-source data typically run 8-15%, which damages sender reputation if you send blind. Most buyers add a verification tool on top.",
        time: "10 min", callout: "Verification is your job, or your sender reputation pays for it", good: false,
      },
      {
        step: "4", label: "Research each prospect",
        detail: "The row tells you what they do, not what's happening at their company this week. You check LinkedIn, news, funding sites manually to find a reason to reach out.",
        time: "15 min", callout: "The database doesn't know what's changed since last indexed", good: false,
      },
      {
        step: "5", label: "Write the email",
        detail: "Draft from scratch or from a template. No auto-personalisation, no voice matching, no signal-anchored hook - you bring all of that.",
        time: "15 min", callout: "Every message is your writing time", good: false,
      },
    ],
  },
  {
    key: "aioutreach",
    label: "AI outreach tool",
    sub: "Generated emails",
    price: "~€100–500/mo",
    icon: Zap,
    tone: "amber",
    totalLabel: "Your time",
    total: "~15 min per prospect",
    totalSub: "speed is real, research is not",
    goodAt: "Volume. If you have a clean list and want to send a lot of emails quickly with basic personalisation, these tools ship. They've built fast workflows for configured-once, sent-many campaigns.",
    footerNote: "Fast at sending. Not built for research. If your ICP is tight and your list is pre-verified, this is a sending layer - not a prospecting layer.",
    steps: [
      {
        step: "1", label: "Upload your list and set variables",
        detail: "Import contacts, map fields. Set the variables the AI will fill - first name, company, a custom field you've scraped from LinkedIn, a pain point you've guessed at.",
        time: "10 min", callout: "If your list is clean, setup is quick", good: true,
      },
      {
        step: "2", label: "Write the template with AI fill-ins",
        detail: "Most tools generate a base email and ask the AI to personalise per prospect. The personalisation pulls from your variables and whatever the model was trained on.",
        time: "5 min", callout: "The AI doesn't research the prospect. It works with what you gave it.", good: false,
      },
      {
        step: "3", label: "Campaign sends on schedule",
        detail: "Warm-up, pacing, deliverability handling. This part they do well.",
        time: "auto", callout: "Sending infrastructure is mature", good: true,
      },
      {
        step: "4", label: "Deal with the reply traffic",
        detail: "Some emails hit. Some bounce (list quality dependent). Some get flagged as generic. The ones that reply come back without the context of why they were messaged.",
        time: "ongoing", callout: "Generic personalisation reads as generic. Response rates reflect it.", good: false,
      },
    ],
  },
  {
    key: "diy",
    label: "DIY stack",
    sub: "Multi-tool, manual",
    price: "~€50–150/mo",
    icon: Wrench,
    tone: "amber",
    totalLabel: "Your time",
    total: "~90 min per prospect",
    totalSub: "every minute is yours",
    goodAt: "Total control. You make every decision. No subscription cost beyond the tools you already have. For a founder doing 2-3 prospects a week, this is genuinely viable - and many are doing exactly this right now.",
    footerNote: "Maximum control, minimum leverage. Sustainable for a handful of prospects a week. Breaks the moment you need volume.",
    steps: [
      {
        step: "1", label: "Build the list",
        detail: "LinkedIn Sales Navigator search, export to spreadsheet. Or a database export, or a scrape. You pick the companies and the people manually.",
        time: "10 min", callout: "You control the shortlist completely", good: true,
      },
      {
        step: "2", label: "Find and verify the email",
        detail: "Try a pattern-matcher or a free email finder. Run it through a verification tool. Manual, slow, and inconsistent across providers.",
        time: "15 min", callout: "One provider's blind spot is your blind spot", good: false,
      },
      {
        step: "3", label: "Research the prospect",
        detail: "Open the company website, their LinkedIn, their recent news. Scan funding databases. Read the CEO's last three posts. Write notes.",
        time: "20 min", callout: "This is where most of your time goes. Every prospect. Every week.", good: false,
      },
      {
        step: "4", label: "Write the email in AI chat",
        detail: "Paste your research into ChatGPT or Claude. Ask for a first draft. Rewrite because it sounds generic. Rewrite again because it invented a fact. Paste back into your sequencer.",
        time: "20 min", callout: "The AI doesn't know it's 2026. Hallucinations happen unless you catch them.", good: false,
      },
      {
        step: "5", label: "Send and track manually",
        detail: "Send from your inbox or paste into a sequencer. Update a spreadsheet. Hope you remember to follow up.",
        time: "5 min", callout: "Tracking is a tab you forget to check", good: false,
      },
      {
        step: "6", label: "Do it again next week",
        detail: "The work doesn't compound. Every prospect starts from scratch.",
        time: "ongoing", callout: "Your time is the product", good: false,
      },
    ],
  },
  {
    key: "agency",
    label: "Outbound agency",
    sub: "Fully outsourced",
    price: "€2,500+/mo",
    icon: Briefcase,
    tone: "orange",
    totalLabel: "Your time",
    total: "Minutes per prospect",
    totalSub: "not your voice, not your control, not your learning",
    goodAt: "Off your plate. A good agency brings experienced SDRs, existing infrastructure, and a process. If you have the budget and the patience to onboard them properly, they can book meetings.",
    footerNote: "If budget is not a constraint and you want outbound off your plate entirely, an agency works. For a small team that wants to own the function and the learning, the math rarely works.",
    steps: [
      {
        step: "1", label: "Onboard the agency",
        detail: "Strategy calls, ICP documents, persona workshops, messaging reviews. They learn your business. Expensive weeks of calendar time before any prospect is contacted.",
        time: "wks 1-2", callout: "Ramp takes weeks. Budget starts immediately.", good: false,
      },
      {
        step: "2", label: "They run campaigns in their voice",
        detail: "Their SDRs write the messages. They send from their domains or yours. You review drafts, sometimes weekly, sometimes monthly. You are a step removed from what goes out.",
        time: "wks 3+", callout: "The voice in the inbox is not your rep's voice", good: false,
      },
      {
        step: "3", label: "Review results in a report",
        detail: "They deliver a dashboard. Meetings booked, emails sent, response rate. You learn the numbers. You don't learn what's working, why, or how to replicate it if the agency leaves.",
        time: "monthly", callout: "The learning stays with the agency", good: false,
      },
      {
        step: "4", label: "Cancel and lose the pipeline",
        detail: "Stop paying and everything stops. No knowledge transfer, no process you own, no contacts you keep. The meetings booked while you paid are yours. The machine is theirs.",
        time: "any time", callout: "Leverage is rented, not built", good: false,
      },
    ],
  },
];

const TONE: Record<TabDef["tone"], { bg: string; border: string; fg: string; soft: string }> = {
  teal:   { bg: "rgba(13,148,136,0.10)",  border: "rgba(13,148,136,0.30)",  fg: "var(--hooklyne-teal)",   soft: "rgba(13,148,136,0.08)"  },
  orange: { bg: "rgba(255,140,66,0.10)",  border: "rgba(255,140,66,0.30)",  fg: "var(--hooklyne-orange)", soft: "rgba(255,140,66,0.08)"  },
  amber:  { bg: "rgba(245,158,11,0.10)",  border: "rgba(245,158,11,0.30)",  fg: "#b45309",                soft: "rgba(245,158,11,0.08)"  },
};

const NUDGE_ORDER: TabKey[] = ["database", "aioutreach", "diy", "agency"];

export const DIYCompare = () => {
  const [tab, setTab] = useState<TabKey>("hooklyne");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [nudgeIdx, setNudgeIdx] = useState(0);

  useEffect(() => {
    if (hasInteracted) return;
    const id = window.setInterval(() => {
      setNudgeIdx((i) => (i + 1) % NUDGE_ORDER.length);
    }, 1600);
    return () => window.clearInterval(id);
  }, [hasInteracted]);

  const nudgeKey: TabKey | null = hasInteracted ? null : NUDGE_ORDER[nudgeIdx];
  const active = TABS.find((t) => t.key === tab)!;
  const tone = TONE[active.tone];
  const isHooklyne = active.key === "hooklyne";

  return (
    <section className="py-14 lg:py-20" data-fade>
      <style>{`
        @keyframes diycompareAutoHover {
          0%       { background: transparent; border-color: transparent; transform: translateY(0); }
          25%, 75% { background: var(--card-hover); border-color: var(--border-strong); transform: translateY(-2px); }
          100%     { background: transparent; border-color: transparent; transform: translateY(0); }
        }
        .diycompare-auto-hover { animation: diycompareAutoHover 1.6s ease-in-out infinite; }
        .diycompare-auto-hover:hover { animation: none; }
        @media (prefers-reduced-motion: reduce) { .diycompare-auto-hover { animation: none; } }
      `}</style>

      <div className="container max-w-6xl">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--hooklyne-blue)] mb-4">The workflow</p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-[var(--heading)] tracking-tight leading-[1.15] md:leading-[1.1] mb-4">
            From ICP to inbox. Six simple steps.
          </h2>
          <p className="text-base md:text-lg text-[var(--muted-foreground)] leading-relaxed">
            Each step does one job a human researcher would do. Together they produce prospect packages your rep can act on in under a minute. Here is the whole flow.
          </p>
        </div>

        {/* Tab label */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--muted-foreground)]">Compare with</span>
          <span className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* Tabs */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-5 p-1.5 rounded-2xl"
          style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-xs)" }}
          role="tablist"
        >
          {TABS.map((t) => {
            const isActive = tab === t.key;
            const tTone = TONE[t.tone];
            const Icon = t.icon;
            const nudge = !isActive && t.key === nudgeKey;
            return (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); setHasInteracted(true); }}
                role="tab"
                aria-selected={isActive}
                className={`relative text-left px-2.5 py-2.5 md:px-4 md:py-3 rounded-xl transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-sm${nudge ? " diycompare-auto-hover" : ""}`}
                style={{
                  background: isActive ? (t.key === "hooklyne" ? "var(--hooklyne-navy)" : tTone.bg) : "transparent",
                  border: `1px solid ${isActive ? (t.key === "hooklyne" ? "var(--hooklyne-navy)" : tTone.border) : "transparent"}`,
                }}
                onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = "var(--card-hover)"; e.currentTarget.style.borderColor = "var(--border-strong)"; } }}
                onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; } }}
              >
                <div className="flex items-start gap-2.5 w-full">
                  {t.key === "hooklyne" ? (
                    <HooklyneMark className="size-8 rounded-lg shrink-0 mt-0.5" />
                  ) : (
                    <span
                      className="inline-flex items-center justify-center size-8 rounded-lg shrink-0 mt-0.5 transition-colors"
                      style={{ background: isActive ? tTone.fg : "var(--card-hover)", color: isActive ? "#fff" : "var(--muted-foreground)" }}
                    >
                      <Icon className="size-4" />
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <div
                      className={`text-[13px] leading-tight ${t.key === "hooklyne" ? "font-bold" : "font-medium"}`}
                      style={{ color: isActive && t.key === "hooklyne" ? "#ffffff" : "var(--heading)" }}
                    >
                      {t.label}
                    </div>
                    <div
                      className="text-[11px] leading-tight mt-0.5 truncate"
                      style={{ color: isActive && t.key === "hooklyne" ? "rgba(255,255,255,0.85)" : "var(--muted-foreground)" }}
                    >
                      {t.sub}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Totals strip */}
        <div
          className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 mb-5 px-4 sm:px-5 py-3 rounded-xl"
          style={{ background: tone.bg, border: `1px solid ${tone.border}` }}
        >
          <div className="flex items-center gap-2 shrink-0">
            <Clock className="size-4" style={{ color: tone.fg }} />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]" style={{ color: tone.fg }}>
              {active.totalLabel}
            </span>
          </div>
          <div className="flex items-baseline gap-2 flex-1 min-w-0">
            <span className="text-xl sm:text-2xl font-bold text-[var(--heading)] whitespace-nowrap">{active.total}</span>
            <span className="text-xs text-[var(--muted-foreground)] truncate">{active.totalSub}</span>
          </div>
          {active.price && (
            <div className="shrink-0 text-right">
              <span className="text-xs font-bold tabular-nums" style={{ color: tone.fg }}>{active.price}</span>
              <div className="text-[10px] text-[var(--muted-foreground)]">est. tool cost</div>
            </div>
          )}
        </div>

        {/* Steps grid */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{ background: "var(--border)", boxShadow: "var(--shadow-md)" }}
        >
          {active.steps.map((s) => (
            <div key={s.step} className="flex flex-col h-full p-5 lg:p-7" style={{ background: "var(--card)" }}>
              <div className="flex items-center justify-between mb-4">
                <span
                  className="inline-flex items-center justify-center size-7 rounded-lg text-[11px] font-bold"
                  style={{ background: isHooklyne ? "var(--hooklyne-navy)" : tone.soft, color: isHooklyne ? "#fff" : tone.fg }}
                >
                  {s.step}
                </span>
                <span
                  className="text-[10px] font-mono font-semibold px-2 py-1 rounded"
                  style={{ background: tone.soft, color: tone.fg }}
                >
                  {s.time}
                </span>
              </div>
              <div className="text-[15px] font-semibold text-[var(--heading)] mb-2 leading-tight">{s.label}</div>
              <p className="text-[13px] text-[var(--muted-foreground)] leading-relaxed mb-3">{s.detail}</p>
              <div className="flex items-start gap-1.5 pt-3 mt-auto border-t border-dashed border-[var(--border)]">
                {s.good ? (
                  <Check className="size-3.5 shrink-0 mt-0.5" style={{ color: "var(--hooklyne-teal)" }} />
                ) : (
                  <X className="size-3.5 shrink-0 mt-0.5" style={{ color: "var(--hooklyne-orange)" }} />
                )}
                <span className="text-[12px] font-medium text-[var(--heading)]">{s.callout}</span>
              </div>
            </div>
          ))}
          {/* Summary card fills the empty grid slot when step count < 6 */}
          {active.footerNote && (
            <div className="flex flex-col justify-center p-5 lg:p-7" style={{ background: "var(--card)" }}>
              <p className="text-[13px] text-[var(--muted-foreground)] leading-relaxed italic">
                {active.footerNote}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
