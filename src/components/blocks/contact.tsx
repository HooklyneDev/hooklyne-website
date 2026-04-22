import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const WEB3FORMS_KEY = "d2734bdb-dd47-4ef5-bb94-8b814f46d404";

type Interest = "" | "Pilot" | "Demo" | "Question";
type Status = "idle" | "loading" | "success" | "error";

const SUBMIT_LABEL: Record<Interest, string> = {
  "": "Send message",
  Pilot: "Start my free pilot",
  Demo: "Book my demo",
  Question: "Send message",
};

export const Contact = () => {
  const [interest, setInterest] = useState<Interest>("");
  const [status, setStatus] = useState<Status>("idle");
  const [firstName, setFirstName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const scrollToForm = (preset: Interest) => {
    setInterest(preset);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      formRef.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
    }, 30);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    const fullName = (data.get("name") as string) || "";
    setFirstName(fullName.trim().split(/\s+/)[0] || fullName);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json?.message || "Failed");
      form.reset();
      setInterest("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="container max-w-5xl">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--hooklyne-blue)] mb-4">Contact</p>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-[var(--heading)] mb-4">
            Let's talk.
          </h1>
          <p className="text-base md:text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
            Book a demo, start a free pilot, or ask a question. Most replies inside four hours, never more than one business day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <button
            type="button"
            onClick={() => scrollToForm("Pilot")}
            className="group relative text-left rounded-2xl p-7 flex flex-col justify-between min-h-[200px] transition-all hover:-translate-y-0.5 overflow-hidden"
            style={{
              background: `
                radial-gradient(ellipse 60% 40% at 30% 0%, rgba(255,140,66,0.14), transparent 65%),
                linear-gradient(180deg, var(--card) 0%, var(--card-hover) 100%)
              `,
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full" style={{ background: "rgba(255,140,66,0.14)", color: "var(--hooklyne-orange)" }}>
              Recommended
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--hooklyne-orange)] mb-3">10 prospects, free</p>
              <h2 className="text-2xl font-semibold text-[var(--heading)] mb-2 tracking-tight">Start a free pilot</h2>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                Ten fully built prospects. No payment. We ask for 20 minutes of honest feedback in return.
              </p>
            </div>
            <span className="mt-6 text-sm font-semibold text-[var(--hooklyne-orange)] group-hover:opacity-80 transition-opacity">
              Request a pilot →
            </span>
          </button>

          <button
            type="button"
            onClick={() => scrollToForm("Demo")}
            className="group text-left rounded-2xl p-7 flex flex-col justify-between min-h-[200px] transition-all hover:-translate-y-0.5"
            style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-3">20 minutes</p>
              <h2 className="text-2xl font-semibold text-[var(--heading)] mb-2 tracking-tight">Book a demo</h2>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                We show the portal live, walk through a real prospect package, and answer your questions.
              </p>
            </div>
            <span className="mt-6 text-sm font-semibold text-[var(--hooklyne-blue)] group-hover:opacity-80 transition-opacity">
              Book a slot →
            </span>
          </button>
        </div>

        <div
          id="contact-form"
          className="rounded-2xl p-7 lg:p-10 scroll-mt-24"
          style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-xs)" }}
        >
          {status === "success" ? (
            <div className="py-6 text-center">
              <div
                className="inline-flex items-center justify-center size-12 rounded-full mb-4"
                style={{ background: "rgba(13,148,136,0.14)", color: "var(--hooklyne-teal)" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
              <h2 className="text-2xl font-semibold text-[var(--heading)] tracking-tight mb-2">
                Thanks{firstName ? `, ${firstName}` : ""}. Message received.
              </h2>
              <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto leading-relaxed mb-6">
                You'll hear back from a real person within one business day. Most replies inside four hours.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="text-sm font-semibold text-[var(--hooklyne-blue)] hover:opacity-80 transition-opacity"
              >
                Send another message
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-[var(--heading)] mb-1">Send a message</h2>
              <p className="text-sm text-[var(--muted-foreground)] mb-7">Four fields, nothing more. Real humans read every one.</p>
              <form ref={formRef} onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
                <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
                <input
                  type="hidden"
                  name="subject"
                  value={
                    interest === "Pilot"
                      ? "Pilot request from hooklyne.com"
                      : interest === "Demo"
                      ? "Demo request from hooklyne.com"
                      : interest === "Question"
                      ? "Question from hooklyne.com"
                      : "New message from hooklyne.com"
                  }
                />
                <input type="hidden" name="from_name" value="Hooklyne website" />
                <input type="hidden" name="interest" value={interest || "Unspecified"} />
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  aria-hidden="true"
                  tabIndex={-1}
                />

                <div className="space-y-2">
                  <Label htmlFor="cf-name">Name</Label>
                  <Input id="cf-name" name="name" placeholder="First and last name" required autoComplete="name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cf-company">Company</Label>
                  <Input id="cf-company" name="company" placeholder="Company name" required autoComplete="organization" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="cf-email">Work email</Label>
                  <Input id="cf-email" name="email" type="email" placeholder="me@company.com" required autoComplete="email" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="cf-interest">What are you after?</Label>
                  <select
                    id="cf-interest"
                    name="interest_choice"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value as Interest)}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  >
                    <option value="" disabled>Pick one</option>
                    <option value="Pilot">Free pilot - 10 prospects built for us</option>
                    <option value="Demo">Live demo of the portal</option>
                    <option value="Question">Just a question</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="cf-message">
                    Message <span className="text-[var(--muted-foreground)] font-normal">(optional)</span>
                  </Label>
                  <Textarea
                    id="cf-message"
                    name="message"
                    placeholder="Tell us about your team, your ICP, or just say hi."
                    className="min-h-[120px] resize-none"
                  />
                </div>

                <div className="md:col-span-2 flex items-center justify-between flex-wrap gap-4 pt-1">
                  <p className="text-xs text-[var(--muted-foreground)] max-w-md">
                    We only use your details to reply. See our{" "}
                    <a href="/privacy" className="underline hover:text-[var(--heading)]">privacy policy</a>.
                  </p>
                  <Button
                    size="lg"
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-shine disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "var(--hooklyne-navy)", color: "#ffffff" }}
                  >
                    {status === "loading" ? "Sending..." : SUBMIT_LABEL[interest]}
                  </Button>
                </div>

                {status === "error" && (
                  <div
                    className="md:col-span-2 rounded-lg p-3.5 text-sm"
                    style={{
                      background: "rgba(255,140,66,0.10)",
                      border: "1px solid rgba(255,140,66,0.30)",
                      color: "var(--hooklyne-orange)",
                    }}
                  >
                    Something went wrong. Email{" "}
                    <a href="mailto:hello@hooklyne.com" className="underline underline-offset-2 font-medium">
                      hello@hooklyne.com
                    </a>{" "}
                    directly and we'll pick it up from there.
                  </div>
                )}
              </form>
            </>
          )}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-[var(--muted-foreground)]">
            Prefer email? Write to us at{" "}
            <a
              href="mailto:hello@hooklyne.com"
              className="text-[var(--hooklyne-blue)] font-medium hover:opacity-80 transition-opacity"
            >
              hello@hooklyne.com
            </a>
          </p>
          <p className="text-xs text-[var(--muted-foreground)] mt-2">Based in the Netherlands, reachable across EMEA.</p>
        </div>
      </div>
    </section>
  );
};
