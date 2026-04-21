import { useEffect, useState } from "react";

export type Lang = "en" | "nl";

const STORAGE_KEY = "hooklyne-lang";
const EVENT = "hooklyne:lang-change";

function readFromDom(): Lang {
  if (typeof document === "undefined") return "en";
  const attr = document.documentElement.getAttribute("data-lang");
  return attr === "nl" ? "nl" : "en";
}

export function setLang(next: Lang) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-lang", next);
  document.documentElement.setAttribute("lang", next);
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {}
  window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
}

export function useLang(): Lang {
  const [lang, setState] = useState<Lang>("en");

  useEffect(() => {
    setState(readFromDom());
    const handler = () => setState(readFromDom());
    window.addEventListener(EVENT, handler);
    return () => window.removeEventListener(EVENT, handler);
  }, []);

  return lang;
}
