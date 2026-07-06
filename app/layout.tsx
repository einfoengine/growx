import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import { getSite } from "@/lib/content";
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
        {/* Chillax - secondary typeface for labels and accents (hoisted to <head> by React) */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=chillax@400,500,600,700&display=swap"
          precedence="default"
        />
        {children}
      </body>
    </html>
  );
}
