import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang, switchLangUrl } from "@/lib/use-lang";
type NavChild = { label: string; href: string };
type NavItem = { label: string; href?: string; children?: NavChild[] };

const EN_ITEMS: NavItem[] = [
  { label: "Product", href: "/product" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Support", href: "/resources/support" },
    ],
  },
  { label: "About", href: "/about" },
];

const NL_ITEMS: NavItem[] = [
  { label: "Product", href: "/nl/product" },
  { label: "Hoe het werkt", href: "/nl/how-it-works" },
  { label: "Tarieven", href: "/nl/pricing" },
  {
    label: "Resources",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/nl/faq" },
      { label: "Support", href: "/resources/support" },
    ],
  },
  { label: "Over ons", href: "/nl/about" },
];

const NAV_LABELS_EN = { login: "Log in", bookDemo: "Book a demo" };
const NAV_LABELS_NL = { login: "Inloggen", bookDemo: "Boek een demo" };

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pathname, setPathname] = useState("");
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPathname(window.location.pathname);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [langOpen]);

  const lang = useLang();
  const ITEMS = lang === "nl" ? NL_ITEMS : EN_ITEMS;
  const labels = lang === "nl" ? NAV_LABELS_NL : NAV_LABELS_EN;

  const isActive = (href: string) =>
    pathname === href ||
    (href === "/blog" && pathname.startsWith("/blog"));

  const handleSwitch = (next: "en" | "nl") => {
    setLangOpen(false);
    if (next !== lang) switchLangUrl(next);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 lg:pt-5 flex justify-center pointer-events-none">
      <nav
        className={cn(
          "w-full pointer-events-auto transition-all duration-500 rounded-2xl",
          "max-w-6xl",
          "backdrop-blur-xl backdrop-saturate-[180%]",
        )}
        style={{
          background: scrolled ? "var(--glass-bg-scrolled)" : "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          boxShadow: `var(--glass-shadow), inset 0 1px 0 var(--glass-highlight)`,
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        <div className="flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <a href={lang === "nl" ? "/nl" : "/"} className="flex shrink-0 items-center gap-2">
            <img src="/logo.svg" alt="Hooklyne" width={140} height={28} />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {ITEMS.map((link) => {
              if (link.children) {
                const childActive = link.children.some((c) => isActive(c.href));
                return (
                  <div key={link.label} className="relative group">
                    <button
                      className={cn(
                        "inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                        childActive
                          ? "text-[var(--hooklyne-blue)] bg-[var(--hooklyne-blue)]/10"
                          : "text-[var(--hooklyne-navy)]/80 group-hover:text-[var(--hooklyne-blue)] group-hover:bg-[var(--hooklyne-blue)]/12",
                      )}
                    >
                      {link.label}
                      <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180" />
                    </button>

                    {/* Dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 hidden group-hover:block">
                      <div
                        className="min-w-[160px] rounded-xl py-1.5"
                        style={{
                          background: "var(--card)",
                          border: "1px solid var(--border)",
                          boxShadow: "var(--shadow-lg)",
                        }}
                      >
                        {link.children.map((c) => (
                          <a
                            key={c.label}
                            href={c.href}
                            className={cn(
                              "block px-4 py-2 text-sm font-medium transition-colors",
                              isActive(c.href)
                                ? "text-[var(--hooklyne-blue)] bg-[var(--hooklyne-blue)]/10"
                                : "text-[var(--foreground)]/80 hover:text-[var(--hooklyne-blue)] hover:bg-[var(--hooklyne-blue)]/8",
                            )}
                          >
                            {c.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={link.label}
                  href={link.href!}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                    isActive(link.href!)
                      ? "text-[var(--hooklyne-blue)] bg-[var(--hooklyne-blue)]/10"
                      : "text-[var(--hooklyne-navy)]/80 hover:text-[var(--hooklyne-blue)] hover:bg-[var(--hooklyne-blue)]/12",
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <div ref={langRef} className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                aria-label="Language"
                aria-haspopup="menu"
                aria-expanded={langOpen}
                className="inline-flex items-center gap-1.5 h-9 px-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--card-hover)] hover:border-[var(--border-strong)] transition-colors"
              >
                <Globe className="size-4" />
                <span className="text-xs font-semibold">{lang === "nl" ? "NL" : "EN"}</span>
              </button>
              {langOpen && (
                <div
                  className="absolute top-full right-0 mt-2 min-w-[160px] rounded-xl py-1.5 z-50"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    boxShadow: "var(--shadow-lg)",
                  }}
                  role="menu"
                >
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={lang === "en"}
                    onClick={() => handleSwitch("en")}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm font-medium transition-colors",
                      lang === "en"
                        ? "text-[var(--hooklyne-blue)] bg-[var(--hooklyne-blue)]/10"
                        : "text-[var(--foreground)] hover:bg-[var(--card-hover)]",
                    )}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={lang === "nl"}
                    onClick={() => handleSwitch("nl")}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm font-medium transition-colors",
                      lang === "nl"
                        ? "text-[var(--hooklyne-blue)] bg-[var(--hooklyne-blue)]/10"
                        : "text-[var(--foreground)] hover:bg-[var(--card-hover)]",
                    )}
                  >
                    Nederlands
                  </button>
                </div>
              )}
            </div>
            <a
              href="https://portal.hooklyne.com"
              className="inline-flex items-center h-9 px-4 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm font-medium text-[var(--foreground)] hover:bg-[var(--card-hover)] hover:border-[var(--border-strong)] transition-colors"
            >
              {labels.login}
            </a>
            <a href={lang === "nl" ? "/nl/contact" : "/contact"}>
              <Button
                className="text-sm font-semibold rounded-lg px-4 py-2 h-auto btn-shine"
                style={{
                  backgroundColor: "var(--hooklyne-navy)",
                  color: "#ffffff",
                }}
              >
                {labels.bookDemo}
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
            isMenuOpen ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="border-t border-[var(--border)] px-5 py-4 flex flex-col gap-1">
            {ITEMS.map((link) => {
              if (link.children) {
                const open = mobileSubOpen === link.label;
                return (
                  <div key={link.label}>
                    <button
                      onClick={() => setMobileSubOpen(open ? null : link.label)}
                      className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium text-[var(--foreground)]/80 hover:text-[var(--hooklyne-blue)] hover:bg-[var(--hooklyne-blue)]/5 transition-colors"
                    >
                      {link.label}
                      <ChevronDown className={cn("size-4 transition-transform duration-200", open && "rotate-180")} />
                    </button>
                    <div className={cn("overflow-hidden transition-all duration-200", open ? "max-h-48" : "max-h-0")}>
                      <div className="pl-3 py-1 flex flex-col gap-1">
                        {link.children.map((c) => (
                          <a
                            key={c.label}
                            href={c.href}
                            className="py-2 px-3 rounded-lg text-sm text-[var(--foreground)]/70 hover:text-[var(--hooklyne-blue)] hover:bg-[var(--hooklyne-blue)]/5 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {c.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={link.label}
                  href={link.href!}
                  className="py-2.5 px-3 rounded-lg text-sm font-medium text-[var(--foreground)]/80 hover:text-[var(--hooklyne-blue)] hover:bg-[var(--hooklyne-blue)]/5 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="mt-3 pt-3 border-t border-[var(--border)] flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm">
                <Globe className="size-4 text-[var(--foreground)]/80" />
                <button
                  type="button"
                  onClick={() => { setIsMenuOpen(false); handleSwitch("en"); }}
                  className={cn(
                    "font-medium transition-colors",
                    lang === "en" ? "text-[var(--hooklyne-blue)]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
                  )}
                >
                  English
                </button>
                <span className="text-[var(--muted-foreground)]/40">/</span>
                <button
                  type="button"
                  onClick={() => { setIsMenuOpen(false); handleSwitch("nl"); }}
                  className={cn(
                    "font-medium transition-colors",
                    lang === "nl" ? "text-[var(--hooklyne-blue)]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
                  )}
                >
                  Nederlands
                </button>
              </div>
              <a
                href="https://portal.hooklyne.com"
                className="flex items-center justify-center h-10 px-4 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm font-medium text-[var(--foreground)] hover:bg-[var(--card-hover)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {labels.login}
              </a>
              <a href={lang === "nl" ? "/nl/contact" : "/contact"} onClick={() => setIsMenuOpen(false)}>
                <Button
                  className="w-full text-sm font-semibold rounded-lg btn-shine"
                  style={{
                    backgroundColor: "var(--hooklyne-navy)",
                    color: "#ffffff",
                  }}
                >
                  {labels.bookDemo}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
