export const SITE_TITLE = "Hooklyne - Stop researching leads. Start closing them.";
export const SITE_DESCRIPTION =
  "Hooklyne finds your next prospects, matches the right contact, and writes the outreach - in your voice, ready to send. Built for Dutch B2B SMEs.";
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
        alt: "Hooklyne - Stop researching leads. Start closing them.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@hooklyne",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180" },
    ],
    shortcut: [
      { url: "/favicon/favicon.ico" },
    ],
  },
};
