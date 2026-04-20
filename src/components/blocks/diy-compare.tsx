import { useState } from "react";
import { Check, X, Clock, Database, Wrench, Sparkles, Euro, Workflow, Briefcase } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type TabKey = "database" | "diy" | "builder" | "agency" | "hooklyne";

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
  tone: "orange" | "amber" | "teal";
  total: string;
  totalSub: string;
  steps: Step[];
};

const TABS: TabDef[] = [
  {
    key: "database",
    label: "Contact database",
    sub: "Rows you filter",
    icon: Database,
    tone: "orange",
    total: "€99 - €300 / mo",
    totalSub: "rows, nothing more",
    steps: [
      { step: "1", label: "Filter a big list", detail: "Industry, size, geo, title. Taxonomy rarely matches how you actually sell.", time: "~15 min", callout: "Thin coverage outside US", good: false },
      { step: "2", label: "Emails, mostly", detail: "Single provider per row. No waterfall. Bounce rate burns your domain.", time: "varies", callout: "~20% bounce risk", good: false },
      { step: "3", label: "No signals", detail: "A row is a row. No funding, no hiring, no leadership, no launches.", time: "—", callout: "Zero buying context", good: false },
      { step: "4", label: "No research", detail: "You still Google the company. You still read the founder's LinkedIn.", time: "your time", callout: "Research stays on you", good: false },
      { step: "5", label: "You write every email", detail: "Merge fields only get you a name and a company. The hook is yours.", time: "your time", callout: "Generic or slow", good: false },
      { step: "6", label: "Send from your tool", detail: "At least the domain stays yours. That's the one good part.", time: "manual", callout: "Inbox stays clean-ish", good: true },
    ],
  },
  {
    key: "diy",
    label: "DIY stack",
    sub: "Spreadsheet + ChatGPT",
    icon: Wrench,
    tone: "amber",
    total: "~6h 30m per prospect",
    totalSub: "across 6 tools",
    steps: [
      { step: "1", label: "Build the ICP list", detail: "Filter a database. Paste into a sheet. Dedupe. Clean the columns.", time: "45 min", callout: "Stale data, wrong bands", good: false },
      { step: "2", label: "Verify emails", detail: "Paste into a verifier. Toss bounces. Re-verify borderline ones.", time: "30 min", callout: "~20% still unreliable", good: false },
      { step: "3", label: "Hunt for signals", detail: "Google each company. LinkedIn each founder. Skim press mentions.", time: "2 hr", callout: "Miss 80% of what matters", good: false },
      { step: "4", label: "Research each account", detail: "ChatGPT a summary. Check which parts are real. Fix hallucinations.", time: "1 hr", callout: "No live citations", good: false },
      { step: "5", label: "Draft the emails", detail: "Write a hook. Rewrite. Paste into template. Make it sound like you.", time: "1.5 hr", callout: "Generic, or takes forever", good: false },
      { step: "6", label: "Organize and send", detail: "Sheet for prospects, doc for drafts, tabs for research. Merge by hand.", time: "45 min", callout: "Context lives nowhere", good: false },
    ],
  },
  {
    key: "builder",
    label: "Workflow builder",
    sub: "Build-your-own agents",
    icon: Workflow,
    tone: "amber",
    total: "~8 hrs setup + €150+ / mo",
    totalSub: "you build the workflow",
    steps: [
      { step: "1", label: "Learn the tool", detail: "Weeks of tutorials. Table joins, enrichment chains, conditional logic.", time: "weeks", callout: "Not a sales tool, a builder", good: false },
      { step: "2", label: "Build the workflow", detail: "Chain providers, write conditionals, tune prompts, wire credits.", time: "hours", callout: "Your job now", good: false },
      { step: "3", label: "Bolt on signals", detail: "Scrapers and APIs for funding, hiring, press. You pick the sources.", time: "hours", callout: "Coverage depends on you", good: false },
      { step: "4", label: "Prompt the research", detail: "Write your own research + draft prompts. QA every output.", time: "hours", callout: "Hallucinations still yours", good: false },
      { step: "5", label: "Maintain it", detail: "Providers change, sites change, prompts drift. Workflow rots.", time: "ongoing", callout: "Constant upkeep", good: false },
      { step: "6", label: "Hand-finish each prospect", detail: "Still need to review, edit, verify, and send from your inbox.", time: "your time", callout: "Powerful, if you have the time", good: true },
    ],
  },
  {
    key: "agency",
    label: "Outbound agency",
    sub: "€2,500+ / month",
    icon: Briefcase,
    tone: "orange",
    total: "€2,500 - €5,000 / mo",
    totalSub: "plus platform and list fees",
    steps: [
      { step: "1", label: "Long onboarding", detail: "Weeks to define ICP, hand over assets, agree copy, sign retainer.", time: "2-4 wks", callout: "Slow to start, slow to change", good: false },
      { step: "2", label: "They pick targets", detail: "From their own database and lists. You approve, not choose.", time: "theirs", callout: "You lose the filter", good: false },
      { step: "3", label: "They send from their domain", detail: "Not your inbox, not your reputation. Prospects hear from a stranger.", time: "theirs", callout: "Your domain stays out", good: false },
      { step: "4", label: "Generic campaigns", detail: "Sequences templated across their book. Scale wins, relevance loses.", time: "theirs", callout: "Same email, many names", good: false },
      { step: "5", label: "You lose sender voice", detail: "Replies come to them first. Your rep never builds a relationship.", time: "—", callout: "No voice match", good: false },
      { step: "6", label: "Locked-in retainer", detail: "Hard to pause, hard to leave. Results often show after 90+ days.", time: "3-6 mo", callout: "Heavy commitment", good: false },
    ],
  },
  {
    key: "hooklyne",
    label: "Hooklyne",
    sub: "One package per prospect",
    icon: Sparkles,
    tone: "teal",
    total: "<60s review per prospect",
    totalSub: "one card, one inbox",
    steps: [
      { step: "1", label: "Describe or point", detail: "Describe your ICP in plain words, paste a domain, or drop in a name. Pick your way in.", time: "2 min", callout: "Real fits, not filter guesses", good: true },
      { step: "2", label: "Emails arrive verified", detail: "20+ providers waterfalled. Four deliverability layers. Unverifiable ones never ship.", time: "auto", callout: "Your domain stays clean", good: true },
      { step: "3", label: "Signals scored for your ICP", detail: "Seven categories watched continuously: funding, hiring, leadership, launches, press, expansion, sector.", time: "auto", callout: "Catch the moment, not the noise", good: true },
      { step: "4", label: "Brief with live citations", detail: "Every claim traces to a real URL. No stale training data, no hallucinations.", time: "auto", callout: "Source-level confidence", good: true },
      { step: "5", label: "Drafts in your voice", detail: "Four reasoning passes: hook, angle, voice, QC. Dutch or English, locked per prospect.", time: "auto", callout: "Generic stops here", good: true },
      { step: "6", label: "One card, ready to send", detail: "Company, signal, hook, email, LinkedIn. Review and send from your inbox, your domain.", time: "<60s", good: true, callout: "Under a minute per prospect" },
    ],
  },
];

const TONE: Record<TabDef["tone"], { bg: string; border: string; fg: string; soft: string }> = {
  orange: {
    bg: "rgba(255,140,66,0.10)",
    border: "rgba(255,140,66,0.30)",
    fg: "var(--hooklyne-orange)",
    soft: "rgba(255,140,66,0.08)",
  },
  amber: {
    bg: "rgba(245,158,11,0.10)",
    border: "rgba(245,158,11,0.30)",
    fg: "#b45309",
    soft: "rgba(245,158,11,0.08)",
  },
  teal: {
    bg: "rgba(13,148,136,0.10)",
    border: "rgba(13,148,136,0.30)",
    fg: "var(--hooklyne-teal)",
    soft: "rgba(13,148,136,0.08)",
  },
};

export const DIYCompare = () => {
  const [tab, setTab] = useState<TabKey>("hooklyne");
  const [hasInteracted, setHasInteracted] = useState(false);
  const active = TABS.find((t) => t.key === tab)!;
  const tone = TONE[active.tone];
  const isHooklyne = active.key === "hooklyne";

  return (
    <section className="py-14 lg:py-20" data-fade>
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--hooklyne-blue)] mb-4">
            The workflow
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--heading)] tracking-tight leading-[1.1] mb-4">
            Six steps, handled.
          </h2>
          <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
            This is what a prospect package looks like inside Hooklyne. Tap the other tabs to see what the same six steps cost you with a database, a spreadsheet, a builder, or an agency.
          </p>
        </div>

        {/* Tab switcher label */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--muted-foreground)]">
            Compare with
          </span>
          <span className="flex-1 h-px" style={{ background: "var(--border)" }} />
          {!hasInteracted && (
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[var(--hooklyne-blue)] animate-pulse">
              Tap a tab
              <span aria-hidden>&rarr;</span>
            </span>
          )}
        </div>

        {/* Tab switcher - larger, label + sub */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-5 p-1.5 rounded-2xl"
          style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-xs)" }}
          role="tablist"
        >
          {TABS.map((t) => {
            const isActive = tab === t.key;
            const tTone = TONE[t.tone];
            const Icon = t.icon;
            const nudge = !hasInteracted && !isActive && t.key !== "hooklyne";
            return (
              <button
                key={t.key}
                onClick={() => {
                  setTab(t.key);
                  setHasInteracted(true);
                }}
                role="tab"
                aria-selected={isActive}
                className="relative text-left px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-sm"
                style={{
                  background: isActive
                    ? t.key === "hooklyne"
                      ? "var(--hooklyne-navy)"
                      : tTone.bg
                    : "transparent",
                  border: `1px solid ${isActive ? (t.key === "hooklyne" ? "var(--hooklyne-navy)" : tTone.border) : "transparent"}`,
                  color: isActive && t.key === "hooklyne" ? "#fff" : "var(--heading)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "var(--card-hover)";
                    e.currentTarget.style.borderColor = "var(--border-strong)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "transparent";
                  }
                }}
              >
                {/* Attention ping on inactive tabs before first interaction */}
                {nudge && (
                  <span className="absolute -top-1 -right-1 flex size-2.5">
                    <span
                      className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping"
                      style={{ background: "var(--hooklyne-blue)" }}
                    />
                    <span
                      className="relative inline-flex rounded-full size-2.5"
                      style={{ background: "var(--hooklyne-blue)" }}
                    />
                  </span>
                )}

                <div className="flex items-center gap-2.5">
                  <span
                    className="inline-flex items-center justify-center size-8 rounded-lg shrink-0 transition-colors"
                    style={{
                      background: isActive
                        ? t.key === "hooklyne"
                          ? "rgba(255,255,255,0.12)"
                          : tTone.fg
                        : "var(--card-hover)",
                      color: isActive
                        ? "#fff"
                        : "var(--muted-foreground)",
                    }}
                  >
                    {t.key === "hooklyne" ? (
                      <img
                        src="/favicon.svg"
                        alt=""
                        aria-hidden
                        className="size-5"
                        style={{ filter: isActive ? "brightness(0) invert(1)" : "none" }}
                      />
                    ) : (
                      <Icon className="size-4" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold leading-tight flex items-center gap-1.5">
                      {t.label}
                      {t.key === "hooklyne" && (
                        <span
                          className="text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded"
                          style={{
                            background: isActive ? "rgba(13,148,136,0.35)" : "var(--hooklyne-teal)",
                            color: "#fff",
                          }}
                        >
                          Ours
                        </span>
                      )}
                    </div>
                    <div
                      className="text-[11px] leading-tight mt-0.5 truncate"
                      style={{
                        color: isActive && t.key === "hooklyne" ? "rgba(255,255,255,0.7)" : "var(--muted-foreground)",
                      }}
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
          className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6 px-5 py-3 rounded-xl transition-colors"
          style={{ background: tone.bg, border: `1px solid ${tone.border}` }}
        >
          <div className="flex items-center gap-2">
            {isHooklyne ? (
              <Clock className="size-4" style={{ color: tone.fg }} />
            ) : active.key === "database" ? (
              <Euro className="size-4" style={{ color: tone.fg }} />
            ) : (
              <Clock className="size-4" style={{ color: tone.fg }} />
            )}
            <span
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: tone.fg }}
            >
              {active.key === "database" ? "Cost" : "Per prospect"}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[var(--heading)]">{active.total}</span>
            <span className="text-xs text-[var(--muted-foreground)]">{active.totalSub}</span>
          </div>
        </div>

        {/* Steps grid */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden transition-all"
          style={{ background: "var(--border)", boxShadow: "var(--shadow-md)" }}
        >
          {active.steps.map((s) => (
            <div
              key={s.step}
              className="p-6 lg:p-7 relative"
              style={{ background: "var(--card)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="inline-flex items-center justify-center size-7 rounded-lg text-[11px] font-bold"
                  style={{
                    background: isHooklyne ? "var(--hooklyne-navy)" : tone.soft,
                    color: isHooklyne ? "#fff" : tone.fg,
                  }}
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
              <div className="text-[15px] font-semibold text-[var(--heading)] mb-2 leading-tight">
                {s.label}
              </div>
              <p className="text-[13px] text-[var(--muted-foreground)] leading-relaxed mb-3">
                {s.detail}
              </p>
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

        <p className="mt-4 text-[11px] text-[var(--muted-foreground)]/70">
          Timings based on a typical 10-prospect research cycle by a solo AE. Database pricing reflects common single-seat plans.
        </p>
      </div>
    </section>
  );
};
