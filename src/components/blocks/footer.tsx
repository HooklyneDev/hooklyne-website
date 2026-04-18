export const Footer = () => (
  <footer className="relative bg-[var(--hooklyne-navy)] overflow-hidden">
    <div className="footer-glow-blob absolute inset-0 pointer-events-none" />

    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl opacity-[0.035] pointer-events-none select-none">
      <img src="/footer.svg" alt="" aria-hidden="true" className="w-full" />
    </div>

    <div className="container relative z-10 py-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <a href="/" className="flex items-center gap-2 mb-2">
          <img src="/logo.svg" alt="Hooklyne" width={100} height={20} style={{ filter: "brightness(0) invert(1)" }} />
        </a>
        <p className="text-xs text-white/50">Not more. Smarter.</p>
      </div>
      <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
        <a href="/how-it-works" className="hover:text-white transition-colors">How it works</a>
        <a href="/pricing" className="hover:text-white transition-colors">Pricing</a>
        <a href="/about" className="hover:text-white transition-colors">About</a>
        <a href="/faq" className="hover:text-white transition-colors">FAQ</a>
        <a href="/contact" className="hover:text-white transition-colors">Contact</a>
        <a href="https://portal.hooklyne.com" className="hover:text-white transition-colors">Log in</a>
      </nav>
      <p className="text-xs text-white/40">
        &copy; {new Date().getFullYear()} Hooklyne. All rights reserved.
      </p>
    </div>
  </footer>
);
