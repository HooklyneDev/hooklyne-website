import { useEffect, useState } from "react";

export type Lang = "en" | "nl";

const EVENT = "hooklyne:lang-change";

function langFromPath(path: string): Lang {
  return path === "/nl" || path.startsWith("/nl/") ? "nl" : "en";
}

function readFromDom(): Lang {
  if (typeof document === "undefined") return "en";
  const attr = document.documentElement.getAttribute("data-lang");
  return attr === "nl" ? "nl" : "en";
}

/**
 * Paths that have a real NL translation. Add to this list as more pages
 * are translated. Anything not in this set falls back to /nl when
 * switching en -> nl. See DOCS/i18n-sync-tracker.md for the canonical list.
 */
const NL_AVAILABLE = new Set<string>([
  "/nl",
  "/nl/faq",
  "/nl/pricing",
  "/nl/how-it-works",
  "/nl/product",
  "/nl/about",
  "/nl/contact",
]);

/**
 * Navigate to the equivalent URL in the other language.
 * /pricing <-> /nl/pricing. Keeps hash and query when a translation exists.
 */
export function switchLangUrl(next: Lang) {
  if (typeof window === "undefined") return;
  const { pathname, search, hash } = window.location;
  const current = langFromPath(pathname);
  if (current === next) return;

  let newPath: string;
  if (next === "nl") {
    // en -> nl: prepend /nl, but only if a Dutch version exists.
    const candidate = pathname === "/" ? "/nl" : `/nl${pathname}`;
    newPath = NL_AVAILABLE.has(candidate) ? candidate : "/nl";
  } else {
    // nl -> en: strip /nl prefix
    newPath = pathname.replace(/^\/nl(\/|$)/, "/") || "/";
    if (newPath !== "/" && newPath.endsWith("/")) newPath = newPath.slice(0, -1);
  }
  window.location.href = newPath + search + hash;
}

/**
 * @deprecated client-side lang swap is no longer used. Kept for components
 * that still call it; it now redirects via URL instead.
 */
export function setLang(next: Lang) {
  switchLangUrl(next);
}

export function useLang(): Lang {
  const [lang, setState] = useState<Lang>("en");

  useEffect(() => {
    // URL is source of truth.
    setState(langFromPath(window.location.pathname));
    const handler = () => setState(readFromDom());
    window.addEventListener(EVENT, handler);
    return () => window.removeEventListener(EVENT, handler);
  }, []);

  return lang;
}
