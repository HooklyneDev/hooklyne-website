export const Footer = () => (
  <footer className="relative border-t border-[var(--border)]" style={{ background: "var(--background)" }}>
    <div className="container relative z-10 pt-14 pb-10 lg:pt-16 lg:pb-12">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-10">
        <div className="max-w-xs">
          <a href="/" className="flex items-center gap-2 mb-3">
            <img src="/logo.svg" alt="Hooklyne" width={140} height={28} />
          </a>
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
            Research-grade prospect packages in your rep's voice. Not more. Smarter.
          </p>
          <div className="mt-5 inline-flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping"></span>
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-[var(--heading)]/70">All systems operational</span>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-10 gap-y-6 text-sm">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]/70 mb-1">Product</p>
            <a href="/product" className="text-[var(--muted-foreground)] hover:text-[var(--heading)] transition-colors">Product</a>
            <a href="/how-it-works" className="text-[var(--muted-foreground)] hover:text-[var(--heading)] transition-colors">How it works</a>
            <a href="/pricing" className="text-[var(--muted-foreground)] hover:text-[var(--heading)] transition-colors">Pricing</a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]/70 mb-1">Resources</p>
            <a href="/faq" className="text-[var(--muted-foreground)] hover:text-[var(--heading)] transition-colors">FAQ</a>
            <a href="/blog" className="text-[var(--muted-foreground)] hover:text-[var(--heading)] transition-colors">News</a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]/70 mb-1">Company</p>
            <a href="/about" className="text-[var(--muted-foreground)] hover:text-[var(--heading)] transition-colors">About</a>
            <a href="/contact" className="text-[var(--muted-foreground)] hover:text-[var(--heading)] transition-colors">Contact</a>
            <a href="https://portal.hooklyne.com" className="text-[var(--muted-foreground)] hover:text-[var(--heading)] transition-colors">Log in</a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]/70 mb-1">Legal</p>
            <a href="/privacy" className="text-[var(--muted-foreground)] hover:text-[var(--heading)] transition-colors">Privacy</a>
            <a href="/cookies" className="text-[var(--muted-foreground)] hover:text-[var(--heading)] transition-colors">Cookies</a>
            <a href="/disclaimer" className="text-[var(--muted-foreground)] hover:text-[var(--heading)] transition-colors">Disclaimer</a>
          </div>
        </nav>
      </div>

      <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-xs text-[var(--muted-foreground)]/80">
          &copy; {new Date().getFullYear()} Hooklyne. All rights reserved.
        </p>
        <p className="text-xs text-[var(--muted-foreground)]/80">
          KVK: <span className="text-[var(--heading)]/80">99990512</span>
        </p>
      </div>
    </div>
  </footer>
);
