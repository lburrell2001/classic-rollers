import type { Metadata } from "next";
import { GalleryContent } from "@/components/content/GalleryContent";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore classic car photos from Unlimited Classic Rollers events and members.",
};

export default function GalleryPage() {
  return <GalleryContent />;
}
