import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ITEMS = [
  { label: "How it works", href: "/#how-it-works" },
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
          "w-full pointer-events-auto transition-all duration-300 rounded-2xl border",
          "max-w-[960px]",
          scrolled
            ? "bg-white/60 backdrop-blur-2xl shadow-lg border-white/40"
            : "bg-white/40 backdrop-blur-2xl border-white/30",
        )}
      >
        <div className="flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <a href="/" className="flex shrink-0 items-center gap-2">
            <img
              src="/logo.svg"
              alt="Hooklyne"
              width={140}
              height={28}
            />
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
            <a
              href="https://portal.hooklyne.com"
              className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
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
          <div className="border-t border-white/30 px-5 py-4 flex flex-col gap-1">
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
            <div className="mt-3 pt-3 border-t border-white/30 flex flex-col gap-2">
              <a
                href="https://portal.hooklyne.com"
                className="py-2.5 px-3 text-sm font-medium text-[var(--muted-foreground)]"
                onClick={() => setIsMenuOpen(false)}
              >
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
