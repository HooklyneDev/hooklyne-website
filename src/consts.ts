export const SITE_URL = "https://www.hooklyne.com";
export const GITHUB_URL = "https://github.com/HooklyneDev";

export const SITE_TITLE =
  "B2B Prospect Research for Dutch and UK SMEs | Hooklyne";
export const SITE_DESCRIPTION =
  "Verified contacts, live signals, and first-draft outreach for Dutch, UK and EMEA B2B teams of 10 to 100. Dutch and English, native. From €39 a month.";

export const SITE_TITLE_NL =
  "Prospectonderzoek voor Nederlandse en Britse B2B-teams | Hooklyne";
export const SITE_DESCRIPTION_NL =
  "Geverifieerde contacten, live signalen en een eerste conceptmail voor Nederlandse, Britse en EMEA B2B-teams van 10 tot 100 personen. Native in het Nederlands en Engels. Vanaf €39 per maand.";

export const SITE_METADATA = {
  title: {
    default: SITE_TITLE,
    template: "%s | Hooklyne",
  },
  description: SITE_DESCRIPTION,
  creator: "Hooklyne",
  publisher: "Hooklyne",
  authors: [{ name: "Hooklyne", url: SITE_URL }],
  keywords: [
    "B2B prospect research",
    "prospect research",
    "B2B prospecting",
    "Benelux B2B sales",
    "Dutch B2B",
    "MKB prospecting",
    "sales intelligence",
    "lead generation",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: "Hooklyne",
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "Hooklyne - B2B prospect research for SME sales teams",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@hooklyne",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/favicon/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon/favicon.ico" }],
  },
};

/**
 * Map an EN path to its NL equivalent and vice versa. Used for hreflang
 * and the language switcher.
 */
export function altLangPath(pathname: string, target: "en" | "nl"): string {
  const stripped = pathname.replace(/^\/nl(\/|$)/, "/") || "/";
  const canonical =
    stripped !== "/" && stripped.endsWith("/") ? stripped.slice(0, -1) : stripped;
  if (target === "nl") {
    return canonical === "/" ? "/nl" : `/nl${canonical}`;
  }
  return canonical;
}
