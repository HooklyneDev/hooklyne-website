import { Newspaper, UserCheck, MessageSquare, Radio, FileSearch, Inbox } from "lucide-react";
import { ScreenPlaceholder } from "@/components/screen-placeholder";

const CARDS = [
  {
    icon: Newspaper,
    title: "News hooks from 4 sources.",
    body: "Context-aware search finds signals keyword filters miss. Every hook scored 6+.",
    placeholder: { label: "Signal feed: 4 sources stacked", accent: "blue" as const },
  },
  {
    icon: UserCheck,
    title: "Verified contacts.",
    body: "20+ sources cross-checked. Smart person matching by role description. Company phone numbers included.",
    placeholder: { label: "Contact profile: verified", accent: "teal" as const },
  },
  {
    icon: MessageSquare,
    title: "Email + LinkedIn in your voice.",
    body: "Not templates. Sender voice profiles calibrated from a 30-min interview.",
    placeholder: { label: "Voice profile selector", accent: "orange" as const },
  },
  {
    icon: Radio,
    title: "Real-time prospect signals.",
    body: "LinkedIn activity, hiring, news mentions. Email digest on Start, real-time on Growth+.",
    placeholder: { label: "Signal feed timeline", accent: "navy" as const },
  },
  {
    icon: FileSearch,
    title: "Meeting prep in 5 minutes.",
    body: "Deep company research and talking points. Ready before a call or a trade show meeting.",
    placeholder: { label: "Meeting prep brief", accent: "blue" as const },
  },
  {
    icon: Inbox,
    title: "Zero learning curve.",
    body: "No platform to learn. No sequences to build. Open your portal, review, send.",
    placeholder: { label: "Portal inbox: ready to send", accent: "teal" as const },
  },
];

export const FeatureGridSix = () => (
  <section className="py-20 lg:py-28">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--hooklyne-blue)] mb-3">Capabilities</p>
        <h2 className="text-3xl md:text-4xl font-semibold text-[var(--heading)] tracking-tight">
          Everything your team needs to send better outreach.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.title}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 hover:border-[var(--hooklyne-blue)]/30 transition-all"
              style={{ boxShadow: "var(--shadow-xs)" }}
            >
              <ScreenPlaceholder
                label={c.placeholder.label}
                accent={c.placeholder.accent}
                ratio="16/9"
                className="mb-5"
              />
              <Icon className="size-5 text-[var(--hooklyne-blue)] mb-3" strokeWidth={1.75} />
              <h3 className="font-semibold text-[var(--heading)] text-base mb-2">{c.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{c.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
