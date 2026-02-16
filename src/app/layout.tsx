import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { CtaStrip } from "@/components/CtaStrip";
import { SiteFooter } from "@/components/SiteFooter";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://classicrollers.org"),
  title: {
    default: "Unlimited Classic Rollers Car Club",
    template: "%s | Classic Rollers",
  },
  description:
    "Classic cars. Community pride. Scholarships for Amarillo students through the Ike Avery Scholarship Fund.",
  openGraph: {
    title: "Unlimited Classic Rollers Car Club",
    description:
      "Classic cars. Community pride. Scholarships for Amarillo students through the Ike Avery Scholarship Fund.",
    url: "https://classicrollers.org",
    siteName: "Classic Rollers",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unlimited Classic Rollers Car Club",
    description:
      "Classic cars. Community pride. Scholarships for Amarillo students through the Ike Avery Scholarship Fund.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${inter.variable} bg-white font-body text-[var(--color-primary)] antialiased`}>
        <div className="page-texture min-h-screen">
          <SiteHeader />
          <main>{children}</main>
          <CtaStrip />
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
