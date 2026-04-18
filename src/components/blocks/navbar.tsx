import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 lg:pt-5 flex justify-center pointer-events-none">
      <nav
        className={cn(
          "w-full pointer-events-auto transition-all duration-500 rounded-2xl",
          "max-w-[1220px]",
          "backdrop-blur-2xl backdrop-saturate-150",
        )}
        style={{
          background: scrolled ? "var(--glass-bg-scrolled)" : "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          boxShadow: `var(--glass-shadow), inset 0 1px 0 var(--glass-highlight)`,
        }}
      >
        <div className="flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <a href="/" className="flex shrink-0 items-center gap-2">
            <img src="/logo.svg" alt="Hooklyne" width={140} height={28} />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {ITEMS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-[var(--hooklyne-blue)]"
                    : "text-[var(--foreground)]/80 hover:text-[var(--hooklyne-blue)] hover:bg-[var(--hooklyne-blue)]/5",
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <a
              href="https://portal.hooklyne.com"
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm font-medium text-[var(--foreground)] hover:bg-[var(--card-hover)] hover:border-[var(--border-strong)] transition-colors"
            >
              <UserCircle className="size-4 shrink-0" />
              Log in
            </a>
            <a href="/contact">
              <Button
                className="text-sm font-semibold rounded-lg px-4 py-2 h-auto"
                style={{
                  backgroundColor: "var(--hooklyne-navy)",
                  color: "#ffffff",
                }}
              >
                Book a demo
              </Button>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="text-[var(--muted-foreground)] relative flex size-8 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="absolute top-1/2 left-1/2 block w-[18px] -translate-x-1/2 -translate-y-1/2">
              <span aria-hidden="true" className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-300 ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`} />
              <span aria-hidden="true" className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
              <span aria-hidden="true" className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-300 ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="border-t border-[var(--border)] px-5 py-4 flex flex-col gap-1">
            {ITEMS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="py-2.5 px-3 rounded-lg text-sm font-medium text-[var(--foreground)]/80 hover:text-[var(--hooklyne-blue)] hover:bg-[var(--hooklyne-blue)]/5 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 pt-3 border-t border-[var(--border)] flex flex-col gap-2">
              <div className="flex items-center justify-between px-3 py-1">
                <span className="text-sm text-[var(--muted-foreground)]">Theme</span>
                <ThemeToggle />
              </div>
              <a
                href="https://portal.hooklyne.com"
                className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm font-medium text-[var(--foreground)] hover:bg-[var(--card-hover)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserCircle className="size-4 shrink-0" />
                Log in
              </a>
              <a href="/contact" onClick={() => setIsMenuOpen(false)}>
                <Button
                  className="w-full text-sm font-semibold rounded-lg"
                  style={{
                    backgroundColor: "var(--hooklyne-navy)",
                    color: "#ffffff",
                  }}
                >
                  Book a demo
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
