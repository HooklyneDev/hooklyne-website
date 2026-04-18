export const Footer = () => (
  <footer className="relative bg-[var(--hooklyne-navy)] overflow-hidden">
    <div className="footer-glow-blob absolute inset-0 pointer-events-none" />

    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl opacity-[0.035] pointer-events-none select-none">
      <img src="/footer.svg" alt="" aria-hidden="true" className="w-full" />
    </div>

    <div className="container relative z-10 pt-14 pb-10 lg:pt-16 lg:pb-12">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-10">
        <div className="max-w-xs">
          <a href="/" className="flex items-center gap-2 mb-3">
            <img src="/logo.svg" alt="Hooklyne" width={110} height={22} style={{ filter: "brightness(0) invert(1)" }} />
          </a>
          <p className="text-sm text-white/50 leading-relaxed">
            Outreach-ready prospect packages in your rep's voice. Not more. Smarter.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-10 gap-y-6 text-sm">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1">Product</p>
            <a href="/how-it-works" className="text-white/60 hover:text-white transition-colors">How it works</a>
            <a href="/pricing" className="text-white/60 hover:text-white transition-colors">Pricing</a>
            <a href="/faq" className="text-white/60 hover:text-white transition-colors">FAQ</a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1">Company</p>
            <a href="/about" className="text-white/60 hover:text-white transition-colors">About</a>
            <a href="/contact" className="text-white/60 hover:text-white transition-colors">Contact</a>
            <a href="https://portal.hooklyne.com" className="text-white/60 hover:text-white transition-colors">Log in</a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1">Legal</p>
            <a href="/privacy" className="text-white/60 hover:text-white transition-colors">Privacy</a>
            <a href="/cookies" className="text-white/60 hover:text-white transition-colors">Cookies</a>
            <a href="/disclaimer" className="text-white/60 hover:text-white transition-colors">Disclaimer</a>
          </div>
        </nav>
      </div>

      <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-xs text-white/30">
          &copy; {new Date().getFullYear()} Hooklyne. All rights reserved.
        </p>
        <p className="text-xs text-white/30">
          KVK-nummer: <span className="text-white/40">TBD</span> &middot; BTW: <span className="text-white/40">TBD</span>
        </p>
      </div>
    </div>
  </footer>
);
