import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { track } from "@/lib/analytics";
import { useLang } from "@/lib/use-lang";

type Interest = "" | "Pilot" | "Demo" | "Question";
type Status = "idle" | "loading" | "success" | "error";

const EN = {
  submit: { "": "Send message", Pilot: "Start my free pilot", Demo: "Book my demo", Question: "Send message" } as Record<Interest, string>,
  eyebrow: "Contact",
  headline: "Let's talk.",
  sub: "Book a demo, start a free pilot, or ask a question. Most replies inside four hours, never more than one business day.",
  pilotEyebrow: "10 prospects, free",
  pilotTitle: "Start a free pilot",
  pilotBody: "Ten fully built prospects. No payment. We ask for 20 minutes of honest feedback in return.",
  pilotCta: "Request a pilot →",
  pilotBadge: "Recommended",
  demoEyebrow: "20 minutes",
  demoTitle: "Book a demo",
  demoBody: "We show the portal live, walk through a real prospect package, and answer your questions.",
  demoCta: "Book a slot →",
  successTitleSuffix: ". Message received.",
  successTitlePrefix: "Thanks",
  successBody: "You'll hear back from a real person within one business day. Most replies inside four hours.",
  successAgain: "Send another message",
  formTitle: "Send a message",
  formSub: "Four fields, nothing more. Real humans read every one.",
  name: "Name",
  namePh: "First and last name",
  company: "Company",
  companyPh: "Company name",
  email: "Work email",
  emailPh: "me@company.com",
  interestLabel: "What are you after?",
  pickOne: "Pick one",
  optPilot: "Free pilot - 10 prospects built for us",
  optDemo: "Live demo of the portal",
  optQuestion: "Just a question",
  message: "Message",
  optional: "(optional)",
  messagePh: "Tell us about your team, your ICP, or just say hi.",
  privacy: "We only use your details to reply. See our",
  privacyLink: "privacy policy",
  sending: "Sending...",
  errorPrefix: "Something went wrong. Email",
  errorSuffix: "directly and we'll pick it up from there.",
  preferEmail: "Prefer email? Write to us at",
  basedIn: "Based in the Netherlands, reachable across EMEA.",
  subjects: {
    Pilot: "Pilot request from hooklyne.com",
    Demo: "Demo request from hooklyne.com",
    Question: "Question from hooklyne.com",
    "": "New message from hooklyne.com",
  } as Record<Interest, string>,
};

const NL = {
  submit: { "": "Verstuur bericht", Pilot: "Start mijn gratis pilot", Demo: "Boek mijn demo", Question: "Verstuur bericht" } as Record<Interest, string>,
  eyebrow: "Contact",
  headline: "Laten we praten.",
  sub: "Boek een demo. Start een gratis pilot. Of stel een vraag. De meeste antwoorden binnen vier uur. Nooit later dan één werkdag.",
  pilotEyebrow: "Tien prospects, gratis",
  pilotTitle: "Start een gratis pilot",
  pilotBody: "Tien complete prospects. Wij maken ze. Geen betaling. Wij vragen 20 minuten feedback in ruil.",
  pilotCta: "Vraag een pilot aan →",
  pilotBadge: "Meest gekozen",
  demoEyebrow: "20 minuten",
  demoTitle: "Boek een demo",
  demoBody: "We laten het portaal live zien. Lopen door een echt prospect-pakket. En beantwoorden je vragen.",
  demoCta: "Boek een slot →",
  successTitleSuffix: ". Bericht binnen.",
  successTitlePrefix: "Bedankt",
  successBody: "Je krijgt binnen één werkdag antwoord van een echt persoon. De meeste antwoorden binnen vier uur.",
  successAgain: "Verstuur nog een bericht",
  formTitle: "Stuur een bericht",
  formSub: "Vier velden. Meer niet. Echte mensen lezen elk bericht.",
  name: "Naam",
  namePh: "Voor- en achternaam",
  company: "Bedrijf",
  companyPh: "Bedrijfsnaam",
  email: "Zakelijk mailadres",
  emailPh: "ik@bedrijf.nl",
  interestLabel: "Waar kunnen we mee helpen?",
  pickOne: "Kies een optie",
  optPilot: "Gratis pilot - 10 prospects voor ons gebouwd",
  optDemo: "Live demo van het portaal",
  optQuestion: "Gewoon een vraag",
  message: "Bericht",
  optional: "(optioneel)",
  messagePh: "Vertel iets over je team, je ICP, of zeg gewoon hoi.",
  privacy: "We gebruiken je gegevens alleen om te reageren. Zie onze",
  privacyLink: "privacyverklaring",
  sending: "Versturen...",
  errorPrefix: "Er ging iets mis. Mail",
  errorSuffix: "direct, dan pakken we het van daar op.",
  preferEmail: "Liever mailen? Schrijf naar",
  basedIn: "Gevestigd in Nederland. Bereikbaar door heel EMEA.",
  subjects: {
    Pilot: "Pilot-aanvraag via hooklyne.com",
    Demo: "Demo-aanvraag via hooklyne.com",
    Question: "Vraag via hooklyne.com",
    "": "Nieuw bericht via hooklyne.com",
  } as Record<Interest, string>,
};

export const Contact = () => {
  const lang = useLang();
  const t = lang === "nl" ? NL : EN;
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
      const res = await fetch("/api/contact", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json?.message || "Failed");
      const submittedInterest = (data.get("interest_choice") as string) || interest || "Unspecified";
      track("contact_form_submit", { interest: submittedInterest });
      if (submittedInterest === "Pilot") track("pilot_request");
      else if (submittedInterest === "Demo") track("demo_request");
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
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--hooklyne-blue)] mb-4">{t.eyebrow}</p>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-[var(--heading)] mb-4">
            {t.headline}
          </h1>
          <p className="text-base md:text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
            {t.sub}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <button
            type="button"
            onClick={() => scrollToForm("Pilot")}
            className="group relative text-left rounded-2xl p-5 flex flex-col gap-3 min-h-0 transition-all hover:-translate-y-0.5 overflow-hidden"
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
              {t.pilotBadge}
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--hooklyne-orange)] mb-3">{t.pilotEyebrow}</p>
              <h2 className="text-2xl font-semibold text-[var(--heading)] mb-2 tracking-tight">{t.pilotTitle}</h2>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                {t.pilotBody}
              </p>
            </div>
            <span className="text-sm font-semibold text-[var(--hooklyne-orange)] group-hover:opacity-80 transition-opacity">
              {t.pilotCta}
            </span>
          </button>

          <button
            type="button"
            onClick={() => scrollToForm("Demo")}
            className="group text-left rounded-2xl p-5 flex flex-col gap-3 min-h-0 transition-all hover:-translate-y-0.5"
            style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-3">{t.demoEyebrow}</p>
              <h2 className="text-2xl font-semibold text-[var(--heading)] mb-2 tracking-tight">{t.demoTitle}</h2>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                {t.demoBody}
              </p>
            </div>
            <span className="text-sm font-semibold text-[var(--hooklyne-blue)] group-hover:opacity-80 transition-opacity">
              {t.demoCta}
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
                {t.successTitlePrefix}{firstName ? `, ${firstName}` : ""}{t.successTitleSuffix}
              </h2>
              <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto leading-relaxed mb-6">
                {t.successBody}
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="text-sm font-semibold text-[var(--hooklyne-blue)] hover:opacity-80 transition-opacity"
              >
                {t.successAgain}
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-[var(--heading)] mb-1">{t.formTitle}</h2>
              <p className="text-sm text-[var(--muted-foreground)] mb-7">{t.formSub}</p>
              <form ref={formRef} onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
                <input
                  type="hidden"
                  name="subject"
                  value={
                    t.subjects[interest]
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
                  <Label htmlFor="cf-name">{t.name}</Label>
                  <Input id="cf-name" name="name" placeholder={t.namePh} required autoComplete="name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cf-company">{t.company}</Label>
                  <Input id="cf-company" name="company" placeholder={t.companyPh} required autoComplete="organization" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="cf-email">{t.email}</Label>
                  <Input id="cf-email" name="email" type="email" placeholder={t.emailPh} required autoComplete="email" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="cf-interest">{t.interestLabel}</Label>
                  <select
                    id="cf-interest"
                    name="interest_choice"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value as Interest)}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  >
                    <option value="" disabled>{t.pickOne}</option>
                    <option value="Pilot">{t.optPilot}</option>
                    <option value="Demo">{t.optDemo}</option>
                    <option value="Question">{t.optQuestion}</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="cf-message">
                    {t.message} <span className="text-[var(--muted-foreground)] font-normal">{t.optional}</span>
                  </Label>
                  <Textarea
                    id="cf-message"
                    name="message"
                    placeholder={t.messagePh}
                    className="min-h-[120px] resize-none"
                  />
                </div>

                <div className="md:col-span-2 flex items-center justify-between flex-wrap gap-4 pt-1">
                  <p className="text-xs text-[var(--muted-foreground)] max-w-md">
                    {t.privacy}{" "}
                    <a href="/privacy" className="underline hover:text-[var(--heading)]">{t.privacyLink}</a>.
                  </p>
                  <Button
                    size="lg"
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-shine disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "var(--hooklyne-navy)", color: "#ffffff" }}
                  >
                    {status === "loading" ? t.sending : t.submit[interest]}
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
                    {t.errorPrefix}{" "}
                    <a href="mailto:contact@hooklyne.com" className="underline underline-offset-2 font-medium">
                      contact@hooklyne.com
                    </a>{" "}
                    {t.errorSuffix}
                  </div>
                )}
              </form>
            </>
          )}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-[var(--muted-foreground)]">
            {t.preferEmail}{" "}
            <a
              href="mailto:contact@hooklyne.com"
              className="text-[var(--hooklyne-blue)] font-medium hover:opacity-80 transition-opacity"
            >
              contact@hooklyne.com
            </a>
          </p>
          <p className="text-xs text-[var(--muted-foreground)] mt-2">{t.basedIn}</p>
        </div>
      </div>
    </section>
  );
};
