import type { Metadata } from "next";
import { Manrope, Oswald } from "next/font/google";

import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
});

const oswald = Oswald({
  subsets: ["latin", "latin-ext"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "Ömer Uzunsoy | Developer Portfolio",
  description:
    "Ömer Uzunsoy için mobil, web, otomasyon ve backend odaklı premium geliştirici portfolyosu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${oswald.variable} bg-background font-sans text-foreground antialiased`}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
