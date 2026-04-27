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
  "/nl/prijzen",
  "/nl/hoe-het-werkt",
  "/nl/product",
  "/nl/over-ons",
  "/nl/contact",
  "/nl/privacy",
  "/nl/cookies",
  "/nl/disclaimer",
  "/nl/resources",
  "/nl/resources/support",
  "/nl/blog",
  "/nl/apollo-alternatief",
  "/nl/cognism-alternatief",
  "/nl/lusha-alternatief",
  "/nl/avg-prospecting",
]);

/** EN slug -> NL slug for pages where the slug differs by language. */
const EN_TO_NL_SLUG: Record<string, string> = {
  "/about": "/nl/over-ons",
  "/how-it-works": "/nl/hoe-het-werkt",
  "/pricing": "/nl/prijzen",
  "/apollo-alternative": "/nl/apollo-alternatief",
  "/cognism-alternative": "/nl/cognism-alternatief",
  "/lusha-alternative": "/nl/lusha-alternatief",
  "/gdpr-prospecting": "/nl/avg-prospecting",
};
const NL_TO_EN_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(EN_TO_NL_SLUG).map(([en, nl]) => [nl, en])
);

/**
 * Navigate to the equivalent URL in the other language.
 * /pricing <-> /nl/prijzen. Keeps hash and query when a translation exists.
 */
export function switchLangUrl(next: Lang) {
  if (typeof window === "undefined") return;
  const { pathname, search, hash } = window.location;
  const current = langFromPath(pathname);
  if (current === next) return;

  let newPath: string;
  if (next === "nl") {
    // en -> nl: try the slug map first, then fall back to /nl prefix.
    const mapped = EN_TO_NL_SLUG[pathname];
    if (mapped) {
      newPath = mapped;
    } else {
      const candidate = pathname === "/" ? "/nl" : `/nl${pathname}`;
      newPath = NL_AVAILABLE.has(candidate) ? candidate : "/nl";
    }
  } else {
    // nl -> en: try the slug map first, then strip /nl prefix.
    const mapped = NL_TO_EN_SLUG[pathname];
    if (mapped) {
      newPath = mapped;
    } else {
      newPath = pathname.replace(/^\/nl(\/|$)/, "/") || "/";
      if (newPath !== "/" && newPath.endsWith("/")) newPath = newPath.slice(0, -1);
    }
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
