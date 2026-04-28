export const SITE_URL = "https://www.hooklyne.com";
export const GITHUB_URL = "https://github.com/HooklyneDev";

export const SITE_TITLE =
  "B2B Prospect Research for Dutch and UK SMEs | Hooklyne";
export const SITE_DESCRIPTION =
  "B2B prospect research for Dutch and UK sales teams. Verified contacts, trigger signals, and ready-to-send outreach - in Dutch or English. From €39 a month.";

export const SITE_TITLE_NL =
  "Prospectonderzoek voor Nederlandse en Britse B2B-teams | Hooklyne";
export const SITE_DESCRIPTION_NL =
  "B2B prospect-onderzoek voor Nederlandse en Britse salesteams. Geverifieerde contacten, koopsignalen en kant-en-klare mails - in NL of EN. Vanaf €39 per maand.";

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
