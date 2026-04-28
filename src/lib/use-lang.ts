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
  "/nl/vergelijken",
  "/nl/guides",
  "/nl/compliance",
  "/nl/industries",
  "/nl/saas-prospecting",
  "/nl/logistiek-prospecting",
  "/nl/bureau-prospecting",
  "/nl/fintech-prospecting",
  "/nl/industrie-prospecting",
  "/nl/energie-prospecting",
  "/nl/bouw-prospecting",
  "/nl/agritech-prospecting",
  "/nl/healthcare-prospecting",
  "/nl/food-prospecting",
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
  "/compare": "/nl/vergelijken",
  "/logistics-prospecting": "/nl/logistiek-prospecting",
  "/agency-prospecting": "/nl/bureau-prospecting",
  "/industrial-prospecting": "/nl/industrie-prospecting",
  "/energy-prospecting": "/nl/energie-prospecting",
  "/construction-prospecting": "/nl/bouw-prospecting",
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

/**
 * Returns the current language.
 *
 * Pass `initialLang` when the Astro page already knows the language (i.e.
 * it was determined server-side from the URL). This ensures the React
 * component's initial render matches the server-rendered HTML, eliminating
 * the English flash on Dutch pages.
 *
 * Without `initialLang` the hook reads `window.location.pathname`
 * synchronously in the useState lazy initializer, which fixes the flash
 * for client:only components (no SSR HTML to mismatch).
 */
export function useLang(initialLang?: Lang): Lang {
  const [lang, setState] = useState<Lang>(() => {
    // Prop wins: came from Astro's server-side URL check at build time.
    if (initialLang) return initialLang;
    // Client-side: read URL synchronously so the first render is correct.
    if (typeof window !== "undefined") return langFromPath(window.location.pathname);
    // SSR fallback (only reached when no prop is passed).
    return "en";
  });

  useEffect(() => {
    // If prop was passed we trust it; still listen for programmatic switches.
    if (!initialLang) setState(langFromPath(window.location.pathname));
    const handler = () => setState(readFromDom());
    window.addEventListener(EVENT, handler);
    return () => window.removeEventListener(EVENT, handler);
  }, []);

  return lang;
}
