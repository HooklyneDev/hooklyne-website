import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { switchLangUrl, useLang, type Lang } from "@/lib/use-lang";

/* ── Language suggestion banner ────────────────────────────────────────
   SEO-safe: we never auto-redirect on browser language. Google
   explicitly recommends against it (Googlebot has a US locale and
   would never see EN if we auto-redirected NL browsers). We instead
   suggest, dismissibly, once per browser.

   Logic:
   - On EN page + browser is nl-* + not dismissed -> suggest Dutch
   - On NL page + browser is not nl-* + not dismissed -> suggest English
   - "Switch" remembers the choice, "Dismiss" remembers the dismissal
   - Stored in localStorage under hooklyne_lang_pref */

const STORAGE_KEY = "hooklyne_lang_pref";

type Pref = "shown_dismissed" | "user_chose_en" | "user_chose_nl";

function readPref(): Pref | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "shown_dismissed" || v === "user_chose_en" || v === "user_chose_nl") return v;
  } catch {}
  return null;
}

function writePref(v: Pref) {
  try { localStorage.setItem(STORAGE_KEY, v); } catch {}
}

export const LangSuggest = ({ lang: langProp }: { lang?: Lang } = {}) => {
  const lang = useLang(langProp);
  const [show, setShow] = useState(false);
  const [browserNL, setBrowserNL] = useState(false);

  useEffect(() => {
    const pref = readPref();
    if (pref) return; // user already made a choice or dismissed

    const navLang = (navigator.language || "").toLowerCase();
    const isNLBrowser = navLang.startsWith("nl");
    setBrowserNL(isNLBrowser);

    // Show the banner only when the browser locale and the page locale disagree
    if (lang === "en" && isNLBrowser) setShow(true);
    if (lang === "nl" && !isNLBrowser) setShow(true);
  }, [lang]);

  if (!show) return null;

  const handleSwitch = () => {
    const next = lang === "en" ? "nl" : "en";
    writePref(next === "en" ? "user_chose_en" : "user_chose_nl");
    switchLangUrl(next);
  };

  const handleDismiss = () => {
    writePref("shown_dismissed");
    setShow(false);
  };

  // Copy is in the LANGUAGE WE'RE SUGGESTING, not the current page language.
  // That way a Dutch browser on the EN page sees a Dutch nudge, etc.
  const isSuggestingNL = lang === "en";
  const t = isSuggestingNL
    ? {
        text: "Deze site is ook beschikbaar in het Nederlands.",
        cta: "Bekijk in het Nederlands",
        dismiss: "Sluiten",
      }
    : {
        text: "This site is also available in English.",
        cta: "View in English",
        dismiss: "Dismiss",
      };

  return (
    <div
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-40 rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-lg)",
      }}
      role="status"
      aria-live="polite"
    >
      <p className="text-sm text-[var(--foreground)] flex-1 leading-snug">{t.text}</p>
      <button
        type="button"
        onClick={handleSwitch}
        className="text-xs font-semibold rounded-md h-8 px-3 whitespace-nowrap"
        style={{ backgroundColor: "var(--hooklyne-navy)", color: "#ffffff" }}
      >
        {t.cta}
      </button>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label={t.dismiss}
        className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors p-1 -mr-1"
      >
        <X className="size-4" />
      </button>
    </div>
  );
};
