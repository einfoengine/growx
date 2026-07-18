import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import { getSite } from "@/lib/content";
import MotionProvider from "@/components/elements/MotionProvider";
import Analytics from "@/components/elements/Analytics";
import "./globals.css";

// Manrope - primary typeface for headings and body (brand guideline).
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} | ${site.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    icons: {
      icon: "/assets/growX-favicon.svg",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        {/* Skip link — must stay the first focusable thing in the body so the
            first Tab on any page offers a jump past the logo + nav + dropdowns
            + CTA straight to <main id="main"> (WCAG 2.4.1). Visually hidden
            until focused. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to main content
        </a>

        {/* Chillax - secondary typeface for labels and accents (hoisted to <head> by React) */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=chillax@400,500,600,700&display=swap"
          precedence="default"
        />
        <MotionProvider>{children}</MotionProvider>
        {/* Consent-gated GA4 + Meta pixel; inert until env IDs are set. */}
        <Analytics />
      </body>
    </html>
  );
}
