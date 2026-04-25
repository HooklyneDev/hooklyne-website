export const Footer = () => (
  <footer className="relative overflow-hidden bg-[var(--hooklyne-navy)]">
    {/* subtle top hairline separating from the CTA above */}
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-px pointer-events-none"
      style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)" }}
    />

    {/* soft bottom glow - subtle gradient warmth near the base */}
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
          <a href="/" className="flex items-center gap-2 mb-3">
            <img src="/logo-white.svg" alt="Hooklyne" width={140} height={28} />
          </a>
          <p className="text-sm text-white/50 leading-relaxed">
            Research-grade prospect packages in your rep's voice. Not more. Smarter.
          </p>
          <div className="mt-5 inline-flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400"></span>
            </span>
            <span className="text-xs font-medium text-white/70">All systems operational</span>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-10 gap-y-6 text-sm">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1">Product</p>
            <a href="/product" className="text-white/60 hover:text-white transition-colors">Product</a>
            <a href="/how-it-works" className="text-white/60 hover:text-white transition-colors">How it works</a>
            <a href="/pricing" className="text-white/60 hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1">Resources</p>
            <a href="/blog" className="text-white/60 hover:text-white transition-colors">Blog</a>
            <a href="/faq" className="text-white/60 hover:text-white transition-colors">FAQ</a>
            <a href="/resources/support" className="text-white/60 hover:text-white transition-colors">Support</a>
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
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a
              href="#"
              aria-label="Hooklyne on X"
              rel="noopener me"
              className="inline-flex size-8 items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2H21.5l-7.39 8.443L23 22h-6.828l-5.347-6.99L4.7 22H1.44l7.91-9.04L1 2h6.99l4.83 6.39L18.244 2Zm-1.197 18h1.812L7.05 4H5.117l11.93 16Z"/>
              </svg>
            </a>
            <a
              href="#"
              aria-label="Hooklyne on LinkedIn"
              rel="noopener me"
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
