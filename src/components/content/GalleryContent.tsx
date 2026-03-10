"use client";

/* eslint-disable @next/next/no-img-element */

import { Section } from "@/components/Section";
import { useSiteContent } from "@/components/SiteContentProvider";

export function GalleryContent() {
  const { content } = useSiteContent();
  const gallery = content.gallery;

  return (
    <div className="bg-white">
      <Section
        eyebrow={gallery.eyebrow}
        title={gallery.title}
        description={gallery.description}
        className="pt-32 text-black lg:pt-40"
        titleClassName="text-black"
        descriptionClassName="text-black/70"
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.images.map((image) => (
            <div key={image.id} className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
              <img src={image.src} alt={image.alt} className="h-auto w-full object-cover" />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
