import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { AppChrome } from "@/components/AppChrome";
import { SiteContentProvider } from "@/components/SiteContentProvider";

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
      <body className={`${bebasNeue.variable} ${inter.variable} bg-white font-body text-black antialiased`}>
        <SiteContentProvider>
          <AppChrome>{children}</AppChrome>
        </SiteContentProvider>
      </body>
    </html>
  );
}
