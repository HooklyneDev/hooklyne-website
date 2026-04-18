import { Calendar, Mail, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const PERKS = [
 "10 full prospect packages",
 "All features unlocked",
 "No payment, no card",
 "20-min feedback call in return",
];

export const Contact = () => {
 return (
 <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
 <div className="container max-w-6xl">
 <div className="text-center mb-14">
 <p className="text-xs font-semibold uppercase tracking-widest text-[var(--hooklyne-blue)] mb-3">Get in touch</p>
 <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-[var(--heading)] leading-[1.1] mb-5">
 Start your free pilot.
 </h1>
 <p className="text-lg text-[var(--muted-foreground)] max-w-xl mx-auto leading-relaxed">
 Book a 20-minute demo. We walk through the portal, you decide if it fits, and we set up your pilot the same week.
 </p>
 </div>

 <div className="grid lg:grid-cols-5 gap-6">
 <div className="lg:col-span-3 rounded-2xl bg-[var(--card)] p-7" style={{ boxShadow: "var(--shadow-md)" }}>
 <div className="flex items-center gap-2 mb-4">
 <Calendar className="size-5 text-[var(--hooklyne-blue)]" />
 <h2 className="text-base font-semibold text-[var(--heading)]">Book a demo</h2>
 </div>
 <div
 className="rounded-xl flex flex-col items-center justify-center text-center px-6"
 style={{
 minHeight: "360px",
 background: `
 radial-gradient(ellipse 60% 40% at 30% 20%, rgba(52,76,163,0.10), transparent 65%),
 linear-gradient(135deg, var(--card-hover) 0%, var(--background) 100%)
 `,
 border: "1px dashed var(--border-strong)",
 }}
 >
 <Calendar className="size-10 text-[var(--hooklyne-blue)] mb-4" strokeWidth={1.5} />
 <p className="text-sm font-semibold text-[var(--heading)] mb-1.5">Cal.com embed goes here</p>
 <p className="text-xs text-[var(--muted-foreground)] max-w-xs mb-5">
 Tim will provide the Cal.com link. Drop it in to enable inline booking.
 </p>
 <a
 href="mailto:hello@hooklyne.com"
 className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--hooklyne-navy)] text-white px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
 >
 Email us instead
 <ArrowRight className="size-3.5" />
 </a>
 </div>
 </div>

 <div className="lg:col-span-2 flex flex-col gap-6">
 <div className="rounded-2xl bg-[var(--card)] p-6">
 <p className="text-xs font-semibold uppercase tracking-widest text-[var(--hooklyne-teal)] mb-3">Free pilot</p>
 <h3 className="text-base font-semibold text-[var(--heading)] mb-4">What you get</h3>
 <ul className="space-y-2.5">
 {PERKS.map((p) => (
 <li key={p} className="flex items-start gap-2 text-sm text-[var(--muted-foreground)]">
 <Check className="size-4 text-[var(--hooklyne-teal)] shrink-0 mt-0.5" />
 {p}
 </li>
 ))}
 </ul>
 </div>

 <div className="rounded-2xl bg-[var(--card)] p-6">
 <div className="flex items-center gap-2 mb-3">
 <Mail className="size-4 text-[var(--hooklyne-blue)]" />
 <h3 className="text-sm font-semibold text-[var(--heading)]">Other inquiries</h3>
 </div>
 <a href="mailto:hello@hooklyne.com" className="text-sm text-[var(--hooklyne-blue)] hover:opacity-80 transition-opacity">
 hello@hooklyne.com
 </a>
 </div>
 </div>
 </div>

 <div className="mt-12 rounded-2xl bg-[var(--card)] p-7 lg:p-8" style={{ boxShadow: "var(--shadow-xs)" }}>
 <h2 className="text-base font-semibold text-[var(--heading)] mb-1">Or send a message</h2>
 <p className="text-sm text-[var(--muted-foreground)] mb-6">For non-booking questions. We reply within one business day.</p>
 <form className="grid md:grid-cols-2 gap-5">
 <div className="space-y-2">
 <Label>Full name</Label>
 <Input placeholder="First and last name" />
 </div>
 <div className="space-y-2">
 <Label>Work email</Label>
 <Input placeholder="me@company.com" type="email" />
 </div>
 <div className="space-y-2">
 <Label>Company <span className="text-[var(--muted-foreground)]">(optional)</span></Label>
 <Input placeholder="Company name" />
 </div>
 <div className="space-y-2">
 <Label>Team size <span className="text-[var(--muted-foreground)]">(optional)</span></Label>
 <Input placeholder="e.g. 10-50" />
 </div>
 <div className="md:col-span-2 space-y-2">
 <Label>Your message</Label>
 <Textarea placeholder="What's on your mind?" className="min-h-[120px] resize-none" />
 </div>
 <div className="md:col-span-2 flex justify-end">
 <Button size="lg" type="submit" style={{ backgroundColor: "var(--hooklyne-navy)", color: "#ffffff" }}>
 Send message
 </Button>
 </div>
 </form>
 </div>
 </div>
 </section>
 );
};
