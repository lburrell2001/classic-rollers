import type { Metadata } from "next";
import { HomeContent } from "@/components/content/HomeContent";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Classic Rollers Car Club supports Amarillo students through scholarships and community events.",
  openGraph: {
    title: "Classic Rollers Car Club",
    description:
      "Classic cars. Community pride.",
  },
  twitter: {
    title: "Classic Rollers Car Club",
    description:
      "Classic cars. Community pride.",
  },
};

export default function HomePage() {
  return <HomeContent />;
}
