export const SITE_TITLE = "Hooklyne - Find the prospects actually worth reaching out to.";
export const SITE_DESCRIPTION =
  "Find the prospects actually worth reaching out to. Hooklyne matches the right contact and drafts outreach in your voice, ready to send. Built for Dutch B2B SMEs.";
export const SITE_URL = "https://hooklyne.com";
export const GITHUB_URL = "https://github.com/HooklyneDev";

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
    "B2B sales",
    "sales intelligence",
    "prospect research",
    "outreach automation",
    "Dutch B2B",
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
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hooklyne - Find the prospects actually worth reaching out to.",
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
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180" },
    ],
    shortcut: [
      { url: "/favicon/favicon.ico" },
    ],
  },
};
