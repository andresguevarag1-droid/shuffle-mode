import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Announcement from "@/components/Announcement";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://shufflemode.us";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shuffle Mode — Dress for the mood, not the occasion",
    template: "%s · Shuffle Mode",
  },
  description:
    "Shuffle Mode is for women who don't dress for the occasion — they dress for the mood. Limited weekly drops of elevated silhouettes and effortless confidence.",
  keywords: [
    "Shuffle Mode",
    "women's fashion",
    "weekly drops",
    "elevated basics",
    "Boston fashion",
    "capsule wardrobe",
  ],
  openGraph: {
    title: "Shuffle Mode — Dress for the mood, not the occasion",
    description:
      "Limited weekly drops of elevated silhouettes. Minimal pieces, maximum presence.",
    url: siteUrl,
    siteName: "Shuffle Mode",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shuffle Mode",
    description: "Dress for the mood, not the occasion.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bone text-ink">
        <Announcement />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
