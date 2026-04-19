import { Newspaper, BadgeCheck, PenLine, Languages, Send } from "lucide-react";

const PROPS = [
  {
    icon: Newspaper,
    title: "Real signal, real reason",
    body: "We scan news, funding rounds, hiring signals, and business events to find the right moment to reach out.",
  },
  {
    icon: BadgeCheck,
    title: "Verified contact data",
    body: "Every prospect comes with a verified business email and direct number — no bounces, no guessing.",
  },
  {
    icon: PenLine,
    title: "Written in your voice",
    body: "The outreach is drafted in your rep's tone, anchored to the signal. Not a template — a real first message.",
  },
  {
    icon: Languages,
    title: "Dutch and English",
    body: "Native Dutch outreach for local markets. English for international reach. Both handled, both natural.",
  },
  {
    icon: Send,
    title: "Open, review, send",
    body: "Log in to the portal, review the package, and send. No research time, no copy-paste, no back and forth.",
  },
];

export const ValueProps = () => (
  <section className="container max-w-6xl pb-6 pt-14 lg:pt-20">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px rounded-2xl overflow-hidden border border-[var(--border)]">
      {PROPS.map(({ icon: Icon, title, body }) => (
        <div
          key={title}
          className="flex flex-col gap-3 p-6 bg-[var(--card)] hover:bg-[var(--card-hover)] transition-colors"
        >
          <div
            className="size-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "var(--hooklyne-blue)", opacity: 1 }}
          >
            <Icon className="size-4 text-white" />
          </div>
          <p className="text-sm font-semibold text-[var(--heading)] leading-snug">{title}</p>
          <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{body}</p>
        </div>
      ))}
    </div>
  </section>
);
