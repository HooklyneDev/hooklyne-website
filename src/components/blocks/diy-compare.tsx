import { useState, useEffect } from "react";
import { Check, X, Clock, Database, Wrench, Briefcase, Euro, Network } from "lucide-react";
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

type TabKey = "hooklyne" | "database" | "diy" | "salesnav" | "agency";

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
  icon: LucideIcon;
  tone: "teal" | "orange" | "amber";
  totalLabel: string;
  total: string;
  totalSub: string;
  steps: Step[];
};

const TABS: TabDef[] = [
  {
    key: "hooklyne",
    label: "Hooklyne",
    sub: "Entire workflow",
    icon: Wrench, // unused for hooklyne
    tone: "teal",
    totalLabel: "Your time",
    total: "<60s to review and send",
    totalSub: "everything else is handled",
    steps: [
      {
        step: "1", label: "Describe the company type",
        detail: "Plain language, not filter grids. We run a semantic match across billions of pages and return a ranked list. Best fit at the top, scored against your ICP.",
        time: "2 min", callout: "A ranked shortlist, not a dump of rows", good: true,
      },
      {
        step: "2", label: "Pick the contact you want to reach",
        detail: "Each company shows the available roles. You choose the one that fits. That contact goes through a 20+ provider waterfall. Unverifiable ones never reach you.",
        time: "30 sec", callout: "You choose the role. We verify the address.", good: true,
      },
      {
        step: "3", label: "Lands in My Leads with a reason",
        detail: "Every prospect arrives with a why-this-company signal already attached: funding round, hiring move, leadership change, launch. Not a guess, a sourced event.",
        time: "auto", callout: "A reason to reach out, not just a name", good: true,
      },
      {
        step: "4", label: "Full email, written in your voice",
        detail: "Four reasoning passes: hook, angle, voice, QC. Dutch or English locked from the prospect's domain. Reads like your rep wrote it after doing the research.",
        time: "auto", callout: "No template smell, no generic opener", good: true,
      },
      {
        step: "5", label: "Track signals from that lead",
        detail: "Choose to monitor any lead for ongoing signals: new funding, team changes, press coverage. You get notified when the moment changes, not when the calendar says so.",
        time: "toggle", callout: "Catch the next moment too, not just the first", good: true,
      },
      {
        step: "6", label: "Request a meeting brief",
        detail: "When you are ready to meet, request a live-researched brief. Every claim traces to a real URL. No hallucinations, no stale data. Walk in prepared.",
        time: "on demand", callout: "Cited, current, ready when you need it", good: true,
      },
    ],
  },
  {
    key: "database",
    label: "Contact database",
    sub: "Rows you filter",
    icon: Database,
    tone: "orange",
    totalLabel: "Cost",
    total: "€99 - €300 / mo",
    totalSub: "plus all the manual work on top",
    steps: [
      {
        step: "1", label: "Filter a list",
        detail: "Industry, headcount, geo, title. The taxonomy rarely matches how you actually think about your ICP.",
        time: "~15 min", callout: "ICP is your problem to map", good: false,
      },
      {
        step: "2", label: "Emails included, quality varies",
        detail: "Single provider per row. No waterfall. Older exports degrade fast. Bounces burn your domain reputation over time.",
        time: "included", callout: "Bounce risk real, domain reputation yours to lose", good: false,
      },
      {
        step: "3", label: "No signal monitoring",
        detail: "A contact row has no context. Funding, hiring, launches - you check manually, if at all.",
        time: "your time", callout: "No buying context included", good: false,
      },
      {
        step: "4", label: "No research",
        detail: "You still Google the company, read their blog, look up the founder. The database stops at the row.",
        time: "your time", callout: "Research is still yours to do", good: false,
      },
      {
        step: "5", label: "You write every message",
        detail: "Merge fields give you a name and company. The hook, the angle, the voice - all manual, every time.",
        time: "your time", callout: "Generic or slow", good: false,
      },
      {
        step: "6", label: "Send from your own inbox",
        detail: "You own the sending setup. That part is fine. Everything before this point still takes your rep's time.",
        time: "manual", callout: "Inbox is yours, prep time is not", good: true,
      },
    ],
  },
  {
    key: "diy",
    label: "DIY / Builder",
    sub: "Claude, spreadsheet or workflow tool",
    icon: Wrench,
    tone: "amber",
    totalLabel: "Time",
    total: "~45 min per prospect",
    totalSub: "or weeks of setup for a builder tool",
    steps: [
      {
        step: "1", label: "Source and filter the list",
        detail: "Pull from a database, clean in a sheet - or spend days learning a builder tool before you prospect anyone.",
        time: "~4 min", callout: "Repeat every cycle as data drifts", good: false,
      },
      {
        step: "2", label: "Verify emails",
        detail: "Run through a verifier, discard bounces, re-check borderlines. Or build a provider waterfall yourself in a workflow tool.",
        time: "~3 min", callout: "Manual or built - still ~15-20% uncertainty", good: false,
      },
      {
        step: "3", label: "Find signals",
        detail: "Google, LinkedIn, press - by hand. Or wire up scrapers and APIs in a builder. Either way, coverage depends on what you check.",
        time: "~12 min", callout: "You catch what you think to look for", good: false,
      },
      {
        step: "4", label: "Research with Claude or your own agents",
        detail: "Claude cites sources now and does solid research. You still re-prompt per company, review output and fill gaps - every time.",
        time: "~10 min", callout: "Good output, but re-prompt for every prospect", good: false,
      },
      {
        step: "5", label: "Write the message",
        detail: "Draft a hook. Revise. Match your tone. Claude helps but the final voice check is yours - whether you built an agent or not.",
        time: "~15 min", callout: "Still your call on every draft", good: false,
      },
      {
        step: "6", label: "Assemble, maintain and send",
        detail: "Paste and send from the sheet, or keep a workflow tool running as providers change and prompts drift. Both take ongoing effort.",
        time: "~5 min", callout: "Works - does not scale without slipping", good: false,
      },
    ],
  },
  {
    key: "salesnav",
    label: "Sales Navigator",
    sub: "LinkedIn prospecting",
    icon: Network,
    tone: "orange",
    totalLabel: "Cost",
    total: "€90 - €150 / mo",
    totalSub: "plus all the manual work on top",
    steps: [
      {
        step: "1", label: "Filter companies and people",
        detail: "Good filters for seniority, company size and industry. Still firmographic - it ranks by profile data, not actual fit to your ICP.",
        time: "~15 min", callout: "Good reach, limited ICP depth", good: false,
      },
      {
        step: "2", label: "Limited contact data",
        detail: "Sales Nav surfaces profiles, not verified emails. You get InMail credits and some phone numbers. Deliverable emails need an extra tool.",
        time: "varies", callout: "Emails need a separate verifier", good: false,
      },
      {
        step: "3", label: "Basic activity signals",
        detail: "Job changes, company growth, shared connections. Useful, but limited to what LinkedIn tracks - no funding, press or sector signals.",
        time: "included", callout: "LinkedIn signals only, not the full picture", good: false,
      },
      {
        step: "4", label: "Account insights only",
        detail: "Sales Nav shows headcount growth and news snippets. Deep research - recent press, product moves, leadership changes - is still yours to do.",
        time: "your time", callout: "Research is still on you", good: false,
      },
      {
        step: "5", label: "You write every message",
        detail: "InMail or email - you write the hook, the angle, the opener. No voice matching, no reasoning passes. Templates at best.",
        time: "your time", callout: "Generic or slow", good: false,
      },
      {
        step: "6", label: "Send via LinkedIn or your inbox",
        detail: "InMail limits cap your volume. Sending from your inbox needs the email first - which Sales Nav often cannot give you directly.",
        time: "manual", callout: "Inbox stays yours, reach is capped", good: true,
      },
    ],
  },
  {
    key: "agency",
    label: "Outbound agency",
    sub: "Fully outsourced",
    icon: Briefcase,
    tone: "orange",
    totalLabel: "Cost",
    total: "€2,500 - €5,000 / mo",
    totalSub: "typically a 3-6 month commitment",
    steps: [
      {
        step: "1", label: "Onboarding takes weeks",
        detail: "ICP definition, copywriting handover, infrastructure setup, retainer sign-off. You will not be live in week one.",
        time: "2-4 wks", callout: "Slow to start, slow to adjust", good: false,
      },
      {
        step: "2", label: "They pick the targets",
        detail: "From their database and their process. You review and approve, but the filter logic is theirs.",
        time: "theirs", callout: "You approve, not choose", good: false,
      },
      {
        step: "3", label: "Separate sending infrastructure",
        detail: "Most agencies use a secondary inbox setup, not your main domain. Your main sender reputation stays separate.",
        time: "theirs", callout: "Your main inbox is protected, but disconnected", good: false,
      },
      {
        step: "4", label: "Campaigns, not conversations",
        detail: "Sequenced at scale. Works for volume but personalisation is limited by how much they can do per seat.",
        time: "theirs", callout: "Scale over relevance", good: false,
      },
      {
        step: "5", label: "Your rep is not the sender",
        detail: "Replies come to a shared inbox. The relationship between your rep and the prospect starts later, if at all.",
        time: "n/a", callout: "Sender voice and relationship are lost", good: false,
      },
      {
        step: "6", label: "Hard to pause or redirect",
        detail: "Retainers run for months. Changing ICP, copy or strategy mid-contract takes time and goodwill.",
        time: "3-6 mo", callout: "Right for some, not for agile teams", good: false,
      },
    ],
  },
];

const TONE: Record<TabDef["tone"], { bg: string; border: string; fg: string; soft: string }> = {
  teal:   { bg: "rgba(13,148,136,0.10)",  border: "rgba(13,148,136,0.30)",  fg: "var(--hooklyne-teal)",   soft: "rgba(13,148,136,0.08)"  },
  orange: { bg: "rgba(255,140,66,0.10)",  border: "rgba(255,140,66,0.30)",  fg: "var(--hooklyne-orange)", soft: "rgba(255,140,66,0.08)"  },
  amber:  { bg: "rgba(245,158,11,0.10)",  border: "rgba(245,158,11,0.30)",  fg: "#b45309",                soft: "rgba(245,158,11,0.08)"  },
};

const NUDGE_ORDER: TabKey[] = ["database", "diy", "salesnav", "agency"];

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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--heading)] tracking-tight leading-[1.1] mb-4">
            From ICP to inbox. Six simple steps.
          </h2>
          <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
            You describe who you sell to. We find the ranked list, verify the contact, attach the buying signal, write the email in your voice, and prep the meeting brief when you need it. Your rep reviews and sends. That is the whole job.
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
                className={`relative text-left px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-sm${nudge ? " diycompare-auto-hover" : ""}`}
                style={{
                  background: isActive ? (t.key === "hooklyne" ? "var(--hooklyne-navy)" : tTone.bg) : "transparent",
                  border: `1px solid ${isActive ? (t.key === "hooklyne" ? "var(--hooklyne-navy)" : tTone.border) : "transparent"}`,
                }}
                onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = "var(--card-hover)"; e.currentTarget.style.borderColor = "var(--border-strong)"; } }}
                onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; } }}
              >
                <div className="flex items-center gap-2.5">
                  {t.key === "hooklyne" ? (
                    <HooklyneMark className="size-8 rounded-lg" />
                  ) : (
                    <span
                      className="inline-flex items-center justify-center size-8 rounded-lg shrink-0 transition-colors"
                      style={{ background: isActive ? tTone.fg : "var(--card-hover)", color: isActive ? "#fff" : "var(--muted-foreground)" }}
                    >
                      <Icon className="size-4" />
                    </span>
                  )}
                  <div className="min-w-0">
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
          className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6 px-5 py-3 rounded-xl"
          style={{ background: tone.bg, border: `1px solid ${tone.border}` }}
        >
          <div className="flex items-center gap-2">
            {active.key === "database" || active.key === "agency" ? (
              <Euro className="size-4" style={{ color: tone.fg }} />
            ) : (
              <Clock className="size-4" style={{ color: tone.fg }} />
            )}
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: tone.fg }}>
              {active.totalLabel}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[var(--heading)]">{active.total}</span>
            <span className="text-xs text-[var(--muted-foreground)]">{active.totalSub}</span>
          </div>
        </div>

        {/* Steps grid */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{ background: "var(--border)", boxShadow: "var(--shadow-md)" }}
        >
          {active.steps.map((s) => (
            <div key={s.step} className="p-6 lg:p-7" style={{ background: "var(--card)" }}>
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
              <div className="flex items-start gap-1.5 pt-3 border-t border-dashed border-[var(--border)]">
                {s.good ? (
                  <Check className="size-3.5 shrink-0 mt-0.5" style={{ color: "var(--hooklyne-teal)" }} />
                ) : (
                  <X className="size-3.5 shrink-0 mt-0.5" style={{ color: "var(--hooklyne-orange)" }} />
                )}
                <span className="text-[12px] font-medium text-[var(--heading)]">{s.callout}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
