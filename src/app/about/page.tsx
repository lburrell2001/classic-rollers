import type { Metadata } from "next";
import { AboutContent } from "@/components/content/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Unlimited Classic Rollers Car Club and its mission in Amarillo.",
};

export default function AboutPage() {
  return <AboutContent />;
}
