import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore classic car photos from Unlimited Classic Rollers events and members.",
};

const images = Array.from({ length: 12 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    src: `/gallery/car-${number}.svg`,
    alt: `Classic Rollers car placeholder ${index + 1}`,
  };
});

export default function GalleryPage() {
  return (
    <Section eyebrow="Gallery" title="Classic Rollers Showcase" description="Send us photos to be featured.">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image) => (
          <div key={image.src} className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
            <Image src={image.src} alt={image.alt} width={500} height={340} className="h-auto w-full object-cover" />
          </div>
        ))}
      </div>
    </Section>
  );
}
