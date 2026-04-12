import { Search, UserCheck, FileText, Send } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Describe your ideal prospect",
    description:
      "Tell Hooklyne the type of company, their situation, and their focus. No forms, no filters - just describe it like you would to a colleague.",
    tag: "Find me companies",
  },
  {
    number: "02",
    icon: UserCheck,
    title: "Get a ranked list with matched contacts",
    description:
      "Hooklyne returns a ranked list of matching companies, highest signal first. It then finds the right decision-maker at each one - not just a job title, the actual person.",
    tag: "Smart person matching",
  },
  {
    number: "03",
    icon: FileText,
    title: "Receive outreach written in your voice",
    description:
      "For each prospect, Hooklyne writes a personalised email or LinkedIn message based on real signals - in your tone, referencing their situation. No editing needed.",
    tag: "Outreach written",
  },
  {
    number: "04",
    icon: Send,
    title: "Send. Track. Repeat.",
    description:
      "Outreach lands in My Leads ready to send. Signals keep updating so you always know when to follow up and why.",
    tag: "My Leads",
  },
];

export const Features = () => {
  return (
    <section id="how-it-works" className="pb-28 lg:pb-32">
      <div className="container">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16 lg:mb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--hooklyne-blue)] mb-3">
            How it works
          </p>
          <h2 className="text-3xl tracking-tight md:text-4xl lg:text-5xl text-[var(--hooklyne-navy)]">
            From description to outreach in minutes
          </h2>
          <p className="text-[var(--muted-foreground)] mt-4 text-lg leading-relaxed">
            Three ways to start. One workflow out. Every path ends in ready-to-send outreach.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 lg:p-8 flex gap-5"
              >
                <div className="shrink-0">
                  <div className="size-10 rounded-xl bg-[var(--hooklyne-blue)]/8 flex items-center justify-center">
                    <Icon className="size-5 text-[var(--hooklyne-blue)]" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-semibold text-[var(--muted-foreground)]">
                      {step.number}
                    </span>
                    <span className="text-xs font-medium text-[var(--hooklyne-teal)] bg-[var(--hooklyne-teal)]/8 px-2 py-0.5 rounded-full">
                      {step.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--hooklyne-navy)] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Three entry points */}
        <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 lg:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-6">
            Three ways to start
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Find me companies",
                subtitle: "Describe it. Find it. Send it.",
                detail: "Just a description",
                highlight: true,
                badge: "Most powerful",
              },
              {
                title: "I know who I want to reach",
                subtitle: "Add a name or list. We verify and write.",
                detail: "A name + LinkedIn URL",
                highlight: false,
                badge: null,
              },
              {
                title: "I know the company",
                subtitle: "Enter the company. We find the right person.",
                detail: "A company name + domain",
                highlight: false,
                badge: null,
              },
            ].map((entry) => (
              <div
                key={entry.title}
                className={`rounded-xl p-4 border ${
                  entry.highlight
                    ? "border-[var(--hooklyne-blue)]/30 bg-[var(--hooklyne-blue)]/4"
                    : "border-[var(--border)] bg-[var(--bg)]"
                }`}
              >
                {entry.badge && (
                  <span className="text-xs font-semibold text-[var(--hooklyne-orange)] uppercase tracking-wide mb-2 block">
                    {entry.badge}
                  </span>
                )}
                <h4 className="text-sm font-semibold text-[var(--hooklyne-navy)] mb-1">
                  {entry.title}
                </h4>
                <p className="text-xs text-[var(--muted-foreground)] mb-3">{entry.subtitle}</p>
                <span className="text-xs text-[var(--muted-foreground)]">
                  Need: <span className="font-medium text-[var(--foreground)]">{entry.detail}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
