import { useState } from "react";
import { Check, X, Clock } from "lucide-react";

type TabKey = "diy" | "hooklyne";

const TABS: { key: TabKey; label: string; sub: string }[] = [
  { key: "diy", label: "DIY stack", sub: "Spreadsheet + ChatGPT + scraper" },
  { key: "hooklyne", label: "Hooklyne", sub: "One package per prospect" },
];

const DIY_STEPS = [
  { step: "1", label: "Build the ICP list", detail: "Filter a contact database by industry, size, geo. Hope the taxonomy matches.", time: "45 min", pain: "Stale data, wrong size bands" },
  { step: "2", label: "Verify emails", detail: "Paste into a verifier. Toss bounces. Re-verify borderline ones.", time: "30 min", pain: "20% still unreliable" },
  { step: "3", label: "Hunt for signals", detail: "Google each company. LinkedIn each founder. Skim press mentions.", time: "2 hr", pain: "Miss 80% of what matters" },
  { step: "4", label: "Research each account", detail: "ChatGPT a summary. Check which parts are real. Fix hallucinations.", time: "1 hr", pain: "No live citations" },
  { step: "5", label: "Draft the emails", detail: "Write a hook. Rewrite. Paste into template. Make sure it sounds like you.", time: "1.5 hr", pain: "Generic, or takes forever" },
  { step: "6", label: "Organize and send", detail: "Sheet for prospects, doc for drafts, tabs for research. Merge by hand.", time: "45 min", pain: "Context lives nowhere" },
];

const HOOKLYNE_STEPS = [
  { step: "1", label: "Describe your ICP", detail: "In plain language. We read the web semantically, not by filter grid.", time: "2 min", win: "Real fits, not database guesses" },
  { step: "2", label: "Emails arrive verified", detail: "20+ providers, 4 deliverability layers. Unverifiable ones never ship.", time: "auto", win: "Your domain stays clean" },
  { step: "3", label: "Signals scored for your ICP", detail: "Seven categories watched continuously. Only real moves land.", time: "auto", win: "Catch the moment, not the noise" },
  { step: "4", label: "Brief with live citations", detail: "Every claim traces to a real URL. No stale training data.", time: "auto", win: "Zero hallucinations" },
  { step: "5", label: "Drafts in your voice", detail: "Four reasoning passes: hook, angle, voice, QC. Reads like your rep wrote it.", time: "auto", win: "Generic stops here" },
  { step: "6", label: "One card, ready to send", detail: "Company, signal, hook, email, LinkedIn. Review and send from your inbox.", time: "<60s", win: "Under a minute per prospect" },
];

export const DIYCompare = () => {
  const [tab, setTab] = useState<TabKey>("hooklyne");
  const isDIY = tab === "diy";

  return (
    <section className="py-14 lg:py-20" data-fade>
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--hooklyne-orange)] mb-4">
            The real comparison
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--heading)] tracking-tight leading-[1.1] mb-4">
            What "just do it yourself" actually looks like.
          </h2>
          <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
            Spreadsheet, ChatGPT, a verifier, three tabs of LinkedIn. Switch the tab and see the same workflow, handled.
          </p>
        </div>

        {/* Tab switcher */}
        <div
          className="inline-flex p-1 rounded-xl mb-6"
          style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-xs)" }}
          role="tablist"
        >
          {TABS.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                role="tab"
                aria-selected={active}
                className="relative px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: active
                    ? t.key === "hooklyne"
                      ? "var(--hooklyne-navy)"
                      : "var(--card-hover)"
                    : "transparent",
                  color: active
                    ? t.key === "hooklyne"
                      ? "#fff"
                      : "var(--heading)"
                    : "var(--muted-foreground)",
                }}
              >
                <span className="flex items-center gap-2">
                  {t.key === "diy" ? (
                    <X className="size-3.5" />
                  ) : (
                    <Check className="size-3.5" />
                  )}
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Totals strip */}
        <div
          className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6 px-5 py-3 rounded-xl"
          style={{
            background: isDIY
              ? "rgba(255,140,66,0.08)"
              : "rgba(13,148,136,0.08)",
            border: `1px solid ${isDIY ? "rgba(255,140,66,0.25)" : "rgba(13,148,136,0.25)"}`,
          }}
        >
          <div className="flex items-center gap-2">
            <Clock
              className="size-4"
              style={{ color: isDIY ? "var(--hooklyne-orange)" : "var(--hooklyne-teal)" }}
            />
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: isDIY ? "var(--hooklyne-orange)" : "var(--hooklyne-teal)" }}>
              Per prospect
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[var(--heading)]">
              {isDIY ? "~6h 30m" : "<60s review"}
            </span>
            <span className="text-xs text-[var(--muted-foreground)]">
              {isDIY ? "across 6 tools" : "one card, one inbox"}
            </span>
          </div>
        </div>

        {/* Steps grid */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{ background: "var(--border)", boxShadow: "var(--shadow-md)" }}
        >
          {(isDIY ? DIY_STEPS : HOOKLYNE_STEPS).map((s) => (
            <div
              key={s.step}
              className="p-6 lg:p-7 relative"
              style={{ background: "var(--card)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="inline-flex items-center justify-center size-7 rounded-lg text-[11px] font-bold"
                  style={{
                    background: isDIY
                      ? "rgba(255,140,66,0.12)"
                      : "var(--hooklyne-navy)",
                    color: isDIY ? "var(--hooklyne-orange)" : "#fff",
                  }}
                >
                  {s.step}
                </span>
                <span
                  className="text-[10px] font-mono font-semibold px-2 py-1 rounded"
                  style={{
                    background: isDIY
                      ? "rgba(255,140,66,0.08)"
                      : "rgba(13,148,136,0.10)",
                    color: isDIY ? "var(--hooklyne-orange)" : "var(--hooklyne-teal)",
                  }}
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
                {isDIY ? (
                  <X className="size-3.5 shrink-0 mt-0.5" style={{ color: "var(--hooklyne-orange)" }} />
                ) : (
                  <Check className="size-3.5 shrink-0 mt-0.5" style={{ color: "var(--hooklyne-teal)" }} />
                )}
                <span className="text-[12px] font-medium text-[var(--heading)]">
                  {"pain" in s ? s.pain : s.win}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[11px] text-[var(--muted-foreground)]/70">
          DIY timings based on a typical 10-prospect research cycle by a solo AE.
        </p>
      </div>
    </section>
  );
};
