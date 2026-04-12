export const Footer = () => {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <div className="container py-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Logo + tagline */}
        <div>
          <a href="/" className="flex items-center gap-2 mb-2">
            <img src="/logo.svg" alt="Hooklyne" width={100} height={20} />
          </a>
          <p className="text-xs text-[var(--muted-foreground)]">
            Not more. Smarter.
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--muted-foreground)]">
          <a href="/#how-it-works" className="hover:text-[var(--foreground)] transition-colors">How it works</a>
          <a href="/pricing" className="hover:text-[var(--foreground)] transition-colors">Pricing</a>
          <a href="/faq" className="hover:text-[var(--foreground)] transition-colors">FAQ</a>
          <a href="/contact" className="hover:text-[var(--foreground)] transition-colors">Contact</a>
          <a href="https://portal.hooklyne.com" className="hover:text-[var(--foreground)] transition-colors">Log in</a>
        </nav>

        {/* Legal */}
        <p className="text-xs text-[var(--muted-foreground)]">
          &copy; {new Date().getFullYear()} Hooklyne. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
