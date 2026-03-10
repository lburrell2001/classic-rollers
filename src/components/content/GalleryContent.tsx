"use client";

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useState } from "react";
import { Section } from "@/components/Section";
import { useSiteContent } from "@/components/SiteContentProvider";

export function GalleryContent() {
  const { content } = useSiteContent();
  const gallery = content.gallery;
  const [activeImageId, setActiveImageId] = useState<string | null>(null);
  const activeImageIndex = gallery.images.findIndex((image) => image.id === activeImageId);
  const activeImage = activeImageIndex >= 0 ? gallery.images[activeImageIndex] : null;

  const showPreviousImage = useCallback(() => {
    if (!gallery.images.length || activeImageIndex < 0) {
      return;
    }

    const nextIndex = (activeImageIndex - 1 + gallery.images.length) % gallery.images.length;
    setActiveImageId(gallery.images[nextIndex].id);
  }, [activeImageIndex, gallery.images]);

  const showNextImage = useCallback(() => {
    if (!gallery.images.length || activeImageIndex < 0) {
      return;
    }

    const nextIndex = (activeImageIndex + 1) % gallery.images.length;
    setActiveImageId(gallery.images[nextIndex].id);
  }, [activeImageIndex, gallery.images]);

  useEffect(() => {
    if (!activeImage) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImageId(null);
      }
      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }
      if (event.key === "ArrowRight") {
        showNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage, showNextImage, showPreviousImage]);

  return (
    <>
      <div className="bg-[linear-gradient(to_bottom,var(--color-accent-green)_0,var(--color-accent-green)_70vh,#ffffff_25vh,#ffffff_100%)]">
        <Section
          eyebrow={gallery.eyebrow}
          title={gallery.title}
          description={gallery.description}
          className="pt-32 text-white lg:pt-40"
          titleClassName="text-white"
          descriptionClassName="text-white/70"
          contentClassName="mt-10"
        >
          <div className="columns-2 gap-0 sm:columns-3 lg:columns-4">
            {gallery.images.map((image) => (
              <button
                key={image.id}
                type="button"
                className="mb-0 block w-full break-inside-avoid overflow-hidden text-left"
                onClick={() => setActiveImageId(image.id)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="block h-auto w-full cursor-zoom-in transition-transform duration-500 hover:scale-105"
                />
              </button>
            ))}
          </div>
        </Section>
      </div>

      {activeImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt || "Gallery image"}
          onClick={() => setActiveImageId(null)}
        >
          <div className="relative max-h-[90vh] max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="absolute left-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-black shadow-sm"
              aria-label="Previous image"
              onClick={showPreviousImage}
            >
              ‹
            </button>
            <button
              type="button"
              className="absolute right-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-black shadow-sm"
              aria-label="Next image"
              onClick={showNextImage}
            >
              ›
            </button>
            <button
              type="button"
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl text-black shadow-sm"
              aria-label="Close image overlay"
              onClick={() => setActiveImageId(null)}
            >
              x
            </button>
            <img src={activeImage.src} alt={activeImage.alt} className="max-h-[90vh] w-auto max-w-full object-contain shadow-2xl" />
          </div>
        </div>
      ) : null}
    </>
  );
}
