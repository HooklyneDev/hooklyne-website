export const Logos = () => {
 return (
 <section className="pb-16 lg:pb-20">
 <div className="container">
 <div className="rounded-2xl bg-[var(--card)] px-8 py-8">
 <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] text-center mb-6">
 The research layer between cheap data and expensive agencies
 </p>
 <div className="grid gap-6 md:grid-cols-3 md:divide-x md:divide-[var(--border)]">
 <div className="text-center md:pr-6">
 <p className="text-sm font-semibold text-[var(--hooklyne-navy)] mb-1">Not a contact database</p>
 <p className="text-sm text-[var(--muted-foreground)]">Databases give you a name. Hooklyne gives you the research, the contact, and the outreach - done.</p>
 </div>
 <div className="text-center md:px-6">
 <p className="text-sm font-semibold text-[var(--hooklyne-navy)] mb-1">Not an agency</p>
 <p className="text-sm text-[var(--muted-foreground)]">Agencies charge €2,500+/mo and run campaigns. We give your reps outreach-ready packages at a fraction of the cost.</p>
 </div>
 <div className="text-center md:pl-6">
 <p className="text-sm font-semibold text-[var(--hooklyne-navy)] mb-1">Dutch-built</p>
 <p className="text-sm text-[var(--muted-foreground)]">Native NL outreach with local tone, not translations. EN + NL from day one. International tools don't get Dutch B2B.</p>
 </div>
 </div>
 </div>
 </div>
 </section>
 );
};
