// Tiny GA4 wrapper. Only fires after cookie consent (gated by DefaultLayout's loadGA).
// All calls are no-ops if gtag isn't loaded - safe to call from anywhere.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    __ga_loaded?: boolean;
  }
}

export type TrackEvent =
  | "pilot_request"
  | "demo_request"
  | "contact_form_submit"
  | "cal_link_click"
  | "pricing_tier_click"
  | "video_play"
  | "faq_open"
  | "outbound_link_click"
  | "nav_cta_click";

export function track(event: TrackEvent, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  if (!window.__ga_loaded || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", event, params || {});
  } catch {
    /* swallow - analytics must never break the page */
  }
}
