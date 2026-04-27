import { useLang } from "@/lib/use-lang";

const EN = {
  tagline: "Research-grade prospect packages in your rep's voice. Not more. Smarter.",
  status: "All systems operational",
  productCol: { title: "Product", links: [
    { label: "Product", href: "/product" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
  ]},
  resourcesCol: { title: "Resources", links: [
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Support", href: "/resources/support" },
  ]},
  companyCol: { title: "Company", links: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Log in", href: "https://portal.hooklyne.com" },
  ]},
  legalCol: { title: "Legal", links: [
    { label: "Privacy", href: "/privacy" },
    { label: "Cookies", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
  ]},
  rights: "All rights reserved.",
};

const NL = {
  tagline: "Onderzoeksgedreven prospectpakketten in de stem van je vertegenwoordiger. Niet meer. Slimmer.",
  status: "Alles draait soepel",
  productCol: { title: "Product", links: [
    { label: "Product", href: "/nl/product" },
    { label: "Hoe het werkt", href: "/nl/hoe-het-werkt" },
    { label: "Prijzen", href: "/nl/prijzen" },
  ]},
  resourcesCol: { title: "Resources", links: [
    { label: "Blog", href: "/nl/blog" },
    { label: "FAQ", href: "/nl/faq" },
    { label: "Support", href: "/nl/resources/support" },
  ]},
  companyCol: { title: "Bedrijf", links: [
    { label: "Over ons", href: "/nl/over-ons" },
    { label: "Contact", href: "/nl/contact" },
    { label: "Inloggen", href: "https://portal.hooklyne.com" },
  ]},
  legalCol: { title: "Juridisch", links: [
    { label: "Privacy", href: "/nl/privacy" },
    { label: "Cookies", href: "/nl/cookies" },
    { label: "Disclaimer", href: "/nl/disclaimer" },
  ]},
  rights: "Alle rechten voorbehouden.",
};

export const Footer = () => {
  const lang = useLang();
  const t = lang === "nl" ? NL : EN;
  const cols = [t.productCol, t.resourcesCol, t.companyCol, t.legalCol];

  return (
  <footer className="relative overflow-hidden bg-[var(--hooklyne-navy)]">
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-px pointer-events-none"
      style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)" }}
    />
    <div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-[32rem] pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(52,76,163,0.42) 0%, rgba(52,76,163,0.20) 40%, rgba(52,76,163,0.08) 70%, transparent 95%)",
      }}
    />
    <div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-56 pointer-events-none"
      style={{
        background:
          "linear-gradient(to top, rgba(255,140,66,0.10) 0%, rgba(255,140,66,0.04) 50%, transparent 100%)",
      }}
    />

    <div className="container relative z-10 pt-14 pb-10 lg:pt-16 lg:pb-12">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-10">
        <div className="max-w-xs">
          <a href={lang === "nl" ? "/nl" : "/"} className="flex items-center gap-2 mb-3">
            <img src="/logo-white.svg" alt="Hooklyne" width={140} height={28} />
          </a>
          <p className="text-sm text-white/50 leading-relaxed">
            {t.tagline}
          </p>
          <div className="mt-5 inline-flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400"></span>
            </span>
            <span className="text-xs font-medium text-white/70">{t.status}</span>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-10 gap-y-6 text-sm">
          {cols.map((col) => (
            <div key={col.title} className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1">{col.title}</p>
              {col.links.map((l) => (
                <a key={l.label + l.href} href={l.href} className="text-white/60 hover:text-white transition-colors">{l.label}</a>
              ))}
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Hooklyne. {t.rights}
          </p>
          <span className="text-white/15">·</span>
          {t.legalCol.links.map((l, i) => (
            <span key={l.href} className="inline-flex items-center gap-x-3">
              <a href={l.href} className="text-xs text-white/45 hover:text-white/80 transition-colors">{l.label}</a>
              {i < t.legalCol.links.length - 1 && <span className="text-white/15">·</span>}
            </span>
          ))}
          <span className="hidden sm:inline text-white/15">·</span>
          <p className="inline-flex items-center gap-1.5 text-xs text-white/40">
            <span aria-hidden="true" className="inline-flex flex-col w-3.5 h-2.5 rounded-[1px] overflow-hidden ring-1 ring-white/20">
              <span className="flex-1" style={{ background: "#AE1C28" }} />
              <span className="flex-1" style={{ background: "#FFFFFF" }} />
              <span className="flex-1" style={{ background: "#21468B" }} />
            </span>
            {lang === "nl" ? "Gemaakt in Nederland" : "Made in the Netherlands"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a
              href="https://x.com/Hooklyne"
              target="_blank"
              aria-label="Hooklyne on X"
              rel="noopener noreferrer me"
              className="inline-flex size-8 items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2H21.5l-7.39 8.443L23 22h-6.828l-5.347-6.99L4.7 22H1.44l7.91-9.04L1 2h6.99l4.83 6.39L18.244 2Zm-1.197 18h1.812L7.05 4H5.117l11.93 16Z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/hooklyne"
              target="_blank"
              aria-label="Hooklyne on LinkedIn"
              rel="noopener noreferrer me"
              className="inline-flex size-8 items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.602 0 4.268 2.37 4.268 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM6.999 20.452H3.673V9h3.326v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.728v20.544C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.272V1.728C24 .774 23.2 0 22.225 0Z"/>
              </svg>
            </a>
          </div>
          <p className="text-xs text-white/30">
            KVK: <span className="text-white/40">99990512</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
  );
};
