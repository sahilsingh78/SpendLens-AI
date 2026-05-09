import type { Metadata, Viewport } from "next";
import "./globals.css";
import { APP_NAME, APP_DESCRIPTION, APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: `${APP_NAME} — AI Spend Audit for Startups`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: [
    "AI spend audit",
    "Cursor pricing",
    "Claude pricing",
    "ChatGPT cost",
    "GitHub Copilot cost",
    "AI tools for startups",
    "reduce AI costs",
    "AI budget",
  ],
  authors: [{ name: "Credex", url: "https://credex.rocks" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: APP_NAME,
    title: `${APP_NAME} — Free AI Spend Audit`,
    description: APP_DESCRIPTION,
    images: [
      {
        url: `${APP_URL}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "SpendLens — AI Spend Audit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} — Free AI Spend Audit`,
    description: APP_DESCRIPTION,
    images: [`${APP_URL}/images/og-image.png`],
    creator: "@credexrocks",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/icons/favicon.ico", sizes: "any" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/icons/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}