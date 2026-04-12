import { Search, UserCheck, FileText, Send } from "lucide-react";
import { DashedLine } from "@/components/dashed-line";

const modes = [
  {
    badge: "Most powerful",
    title: "Find me companies",
    subtitle: "Describe it. Find it. Send it.",
    description: "Describe the type of company, their situation, their focus. Hooklyne returns a ranked list, highest signal first. Select, describe the person by role, and the system runs: verifies email, finds LinkedIn, writes outreach anchored to the signal that ranked them.",
    tags: ["Prospecting from scratch", "Testing a new segment", "Building pipeline fast"],
    need: "Just a description",
    highlight: true,
  },
  {
    badge: null,
    title: "I know who I want to reach",
    subtitle: "Add a name or list. We verify and write.",
    description: "Submit companies with a contact name or role description. Hooklyne finds their details, verifies the email, and writes the outreach. Ready-to-send in under 60 seconds per prospect.",
    tags: ["Working a known list", "Trade show follow-up", "Warm pipeline"],
    need: "A name + LinkedIn URL per company",
    highlight: false,
  },
  {
    badge: null,
    title: "I know the company",
    subtitle: "Enter the company. We find the right door.",
    description: "Enter the company. Describe the type of person you want to reach - not a job title, an actual role description. Hooklyne surfaces 3 matched contacts. Pick one or run them all.",
    tags: ["Target account lists", "You know the company, not the right person"],
    need: "A company name + domain",
    highlight: false,
  },
];

const signalFeatures = [
  { title: "Context-aware search", desc: "Finds by meaning, not keywords. Surfaces relevant signals others miss." },
  { title: "ICP-relative scoring", desc: "Every hook scored 1-10 against your product and ICP. Only 6+ ships. Same news scores differently for every sender." },
  { title: "Cited research", desc: "Every finding has a clickable source. No hallucinations. Verify it yourself." },
  { title: "Direct intelligence", desc: "Newsrooms and press pages scraped before they hit aggregators." },
];

const beyond = [
  { icon: "📋", title: "Meeting prep briefs", desc: "Deep company brief - key people, recent news, talking points - in under 5 minutes. Show up knowing more than anyone in the room." },
  { icon: "📞", title: "Company phone numbers", desc: "Found via registries and business databases. ~€0.01 per lookup. Available when you want to follow up by phone after your email lands." },
  { icon: "🔗", title: "LinkedIn connection messages", desc: "Each package includes a signal-anchored LinkedIn invite in your voice - ready to send alongside or instead of the email." },
  { icon: "📝", title: "Signal call scripts", desc: "When a signal fires: opening line, 30-sec pitch, discovery questions, objection handlers. All based on the specific signal." },
  { icon: "📡", title: "Long-term prospect tracking", desc: "Track companies and contacts over time. The moment something relevant happens, you get an alert and a ready-to-send follow-up." },
  { icon: "⚡", title: "Staged outreach", desc: "Not just one touch. Signal-triggered follow-ups for the prospects you're nurturing. Each one anchored to something new, in your voice." },
];

export const Features = () => {
  return (
    <>
      {/* How it works */}
      <section id="how-it-works" className="pb-20 lg:pb-28">
        <div className="container">
          <div className="relative flex items-center justify-center mb-12 lg:mb-16">
            <DashedLine className="text-muted-foreground" />
            <span className="bg-muted text-muted-foreground absolute px-3 font-mono text-sm font-medium tracking-wide max-md:hidden">
              THREE WAYS IN. ONE WORKFLOW OUT.
            </span>
          </div>

          <div className="mx-auto max-w-4xl mb-10 grid items-center gap-3 md:gap-0 lg:grid-cols-2">
            <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl text-[var(--hooklyne-navy)]">
              From description to outreach in minutes
            </h2>
            <p className="text-[var(--muted-foreground)] leading-snug">
              Every user starts from a different place. Hooklyne meets them there - and the modes chain together. One flow, start to send, no switching tools.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3 mb-8">
            {modes.map((mode) => (
              <div
                key={mode.title}
                className={`rounded-2xl border p-6 flex flex-col ${
                  mode.highlight
                    ? "border-[var(--hooklyne-blue)]/30 bg-[var(--hooklyne-blue)]/4"
                    : "border-[var(--border)] bg-[var(--card)]"
                }`}
              >
                {mode.badge && (
                  <span className="text-xs font-semibold text-[var(--hooklyne-orange)] uppercase tracking-wide mb-3 block">
                    {mode.badge}
                  </span>
                )}
                <h3 className="text-base font-semibold text-[var(--hooklyne-navy)] mb-1">{mode.title}</h3>
                <p className="text-xs font-medium text-[var(--hooklyne-blue)] mb-3">{mode.subtitle}</p>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4 flex-1">{mode.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mode.tags.map((tag) => (
                    <span key={tag} className="text-xs text-[var(--hooklyne-blue)] bg-[var(--hooklyne-blue)]/6 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Need: <span className="font-medium text-[var(--foreground)]">{mode.need}</span>
                </p>
              </div>
            ))}
          </div>

          {/* Flow chain */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 lg:p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">How the flow chains</p>
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { label: "Describe company type", highlight: false },
                { label: "Ranked list, highest signal first", highlight: false },
                { label: "Select", highlight: false },
                { label: "Describe role", highlight: false },
                { label: "3 matched contacts", highlight: false },
                { label: "Email verified + outreach written", highlight: false },
                { label: "My Leads - ready to send", highlight: true },
              ].map((step, i, arr) => (
                <div key={step.label} className="flex items-center gap-1.5">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                    step.highlight
                      ? "bg-[var(--hooklyne-teal)]/10 text-[var(--hooklyne-teal)] font-semibold"
                      : "bg-[var(--bg)] text-[var(--muted-foreground)] border border-[var(--border)]"
                  }`}>
                    {step.label}
                  </span>
                  {i < arr.length - 1 && <span className="text-[var(--muted-foreground)]/40 text-xs">›</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Signal monitoring */}
      <section className="pb-20 lg:pb-28">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--hooklyne-blue)] mb-3">Signal monitoring</p>
              <h2 className="text-3xl tracking-tight md:text-4xl text-[var(--hooklyne-navy)] mb-5">
                Your pipeline doesn't go cold. It stays warm automatically.
              </h2>
              <p className="text-[var(--muted-foreground)] text-base leading-relaxed mb-4">
                Most outreach fails because timing is wrong. You reach out too early, nothing's happening. You wait too long, someone else got there first. Hooklyne solves this without you lifting a finger.
              </p>
              <p className="text-[var(--muted-foreground)] text-base leading-relaxed mb-6">
                Select the companies you want to track. Hooklyne monitors them continuously - news, hiring moves, leadership changes, expansions, funding. The moment something relevant happens, you get a ready-to-send message already written.
              </p>
              <div className="rounded-xl border border-[var(--hooklyne-orange)]/20 bg-[var(--hooklyne-orange)]/4 p-4 mb-5">
                <p className="text-xs font-semibold text-[var(--hooklyne-orange)] uppercase tracking-wide mb-2">What a signal looks like</p>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  A prospect you tracked just completed Phase 2 of a new facility. Your product solves the exact challenge that creates. Hooklyne catches it before the aggregators, writes the email. You get: the signal, the source, the contact, and a ready-to-send message. All in your voice.
                </p>
              </div>
              <p className="text-xs text-[var(--muted-foreground)]">Real-time on Growth Smarter and above. Email digest on Start.</p>

              {/* Placeholder image */}
              <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 flex items-center justify-center min-h-[160px]">
                <p className="text-xs text-[var(--muted-foreground)]/50 text-center">Replace with signal notification screenshot</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">Why we search differently</p>
              <div className="space-y-3">
                {signalFeatures.map((s) => (
                  <div key={s.title} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 flex gap-3">
                    <div className="mt-1 size-2 rounded-full bg-[var(--hooklyne-blue)] shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--hooklyne-navy)] mb-0.5">{s.title}</h4>
                      <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beyond first outreach */}
      <section className="pb-20 lg:pb-28">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--hooklyne-blue)] mb-3">Beyond first outreach</p>
            <h2 className="text-3xl tracking-tight md:text-4xl text-[var(--hooklyne-navy)] mb-3">Everything in one place</h2>
            <p className="text-[var(--muted-foreground)] max-w-xl mx-auto text-base leading-relaxed">
              The core is prospect discovery and first-touch outreach. But the platform does more - and it all feeds the same goal: reaching the right person at the right moment with the right message.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {beyond.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <h3 className="text-sm font-semibold text-[var(--hooklyne-navy)] mb-1.5">{item.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
