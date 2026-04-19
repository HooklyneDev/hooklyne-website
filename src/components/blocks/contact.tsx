import { Calendar, Sparkles, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Contact = () => {
  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="container max-w-5xl">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--hooklyne-blue)] mb-3">Contact</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-[var(--heading)] leading-[1.1] mb-5">
            Let's talk.
          </h1>
          <p className="text-lg text-[var(--muted-foreground)] max-w-xl mx-auto leading-relaxed">
            Book a demo, start a free pilot, or just send us a question. We answer fast.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-12">
          <div
            className="rounded-2xl p-7 flex flex-col"
            style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}
          >
            <div
              className="inline-flex items-center justify-center size-11 rounded-xl mb-5"
              style={{ background: "rgba(52,76,163,0.10)" }}
            >
              <Calendar className="size-5 text-[var(--hooklyne-blue)]" />
            </div>
            <h2 className="text-lg font-semibold text-[var(--heading)] mb-2">Book a demo</h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6 flex-1">
              20 minutes. We show the portal live, walk through a real prospect package, and answer your questions.
            </p>
            <a
              href="mailto:hello@hooklyne.com?subject=Demo%20request"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[var(--hooklyne-navy)] text-white px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity group self-start"
            >
              Book a demo
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div
            className="rounded-2xl p-7 flex flex-col"
            style={{
              background: `
                radial-gradient(ellipse 60% 40% at 30% 0%, rgba(255,140,66,0.14), transparent 65%),
                linear-gradient(180deg, var(--card) 0%, var(--card-hover) 100%)
              `,
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <div
              className="inline-flex items-center justify-center size-11 rounded-xl mb-5"
              style={{ background: "rgba(255,140,66,0.14)" }}
            >
              <Sparkles className="size-5 text-[var(--hooklyne-orange)]" />
            </div>
            <h2 className="text-lg font-semibold text-[var(--heading)] mb-2">Start a free pilot</h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6 flex-1">
              10 fully built prospect packages, free. No payment needed. We ask for 20 minutes of feedback in exchange.
            </p>
            <a
              href="mailto:hello@hooklyne.com?subject=Pilot%20request"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[var(--hooklyne-navy)] text-white px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity group self-start"
            >
              Request a pilot
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <div
          className="rounded-2xl p-7 lg:p-10"
          style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-xs)" }}
        >
          <h2 className="text-xl font-semibold text-[var(--heading)] mb-1">Or send a message</h2>
          <p className="text-sm text-[var(--muted-foreground)] mb-7">For any other question. We reply within one business day.</p>
          <form className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input placeholder="First and last name" required />
            </div>
            <div className="space-y-2">
              <Label>Company</Label>
              <Input placeholder="Company name" required />
            </div>
            <div className="space-y-2">
              <Label>Work email</Label>
              <Input placeholder="me@company.com" type="email" required />
            </div>
            <div className="space-y-2">
              <Label>Country</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                defaultValue=""
              >
                <option value="" disabled>Select a country</option>
                <option>Netherlands</option>
                <option>United Kingdom</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Team size</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                defaultValue=""
              >
                <option value="" disabled>Select a team size</option>
                <option>1-5</option>
                <option>6-20</option>
                <option>21-50</option>
                <option>51+</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>What are you interested in?</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                defaultValue=""
              >
                <option value="" disabled>Select one</option>
                <option>Demo</option>
                <option>Pilot</option>
                <option>General question</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label>Message <span className="text-[var(--muted-foreground)] font-normal">(optional)</span></Label>
              <Textarea placeholder="What's on your mind?" className="min-h-[120px] resize-none" />
            </div>
            <div className="md:col-span-2 flex items-center justify-between flex-wrap gap-4">
              <p className="text-xs text-[var(--muted-foreground)] max-w-md">
                We'll get back to you within one business day. Your details are only used to respond to your message - see our <a href="/privacy" className="underline hover:text-[var(--heading)]">privacy policy</a> for full details.
              </p>
              <Button size="lg" type="submit" style={{ backgroundColor: "var(--hooklyne-navy)", color: "#ffffff" }}>
                Send message
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <Mail className="size-4" />
            <span>Prefer email? Write to us at</span>
            <a href="mailto:hello@hooklyne.com" className="text-[var(--hooklyne-blue)] font-medium hover:opacity-80 transition-opacity">
              hello@hooklyne.com
            </a>
          </div>
          <p className="text-xs text-[var(--muted-foreground)] mt-2">Based in the Netherlands, reachable across EMEA.</p>
        </div>
      </div>
    </section>
  );
};
