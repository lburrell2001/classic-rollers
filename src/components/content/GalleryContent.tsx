"use client";

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { Button } from "@/components/ui/button";
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

  const touchStartX = useRef<number | null>(null);

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const deltaX = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < 40) return;
    if (deltaX > 0) showPreviousImage();
    else showNextImage();
  };

  return (
    <>
      <section className="bg-[var(--color-accent-green)] text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 pb-8 pt-24 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:pb-12 sm:pt-28 lg:px-8 lg:pt-32">
          <div>
            <h1 className="font-display text-4xl leading-none tracking-wide sm:text-[2.75rem]">{gallery.title}</h1>
            {gallery.description ? <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/85 sm:text-base">{gallery.description}</p> : null}
          </div>
          <Button type="button" variant="outline-light" className="self-start sm:self-auto" onClick={() => window.dispatchEvent(new Event("open-contact"))}>
            Share Your Photos
          </Button>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-1.5 py-1.5 sm:px-6 sm:py-10 lg:px-8">
          {gallery.images.length ? (
            <div className="grid grid-flow-dense grid-cols-2 gap-1.5 sm:gap-2 md:grid-cols-3 lg:grid-cols-4">
              {gallery.images.map((image, index) => {
                const isFeature = index % 7 === 0;

                return (
                  <button
                    key={image.id}
                    type="button"
                    aria-label={`Open photo ${index + 1} of ${gallery.images.length}`}
                    className={`group relative block overflow-hidden bg-black/5 sm:rounded-md ${isFeature ? "col-span-2 row-span-2" : ""}`}
                    onClick={() => setActiveImageId(image.id)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading={index < 6 ? "eager" : "lazy"}
                      className="aspect-square h-full w-full cursor-zoom-in object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="px-4 py-10 text-center text-black/60">Photos are coming soon.</p>
          )}
        </div>
      </section>

      {activeImage ? (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt || "Gallery image"}
          onClick={() => setActiveImageId(null)}
        >
          <div className="flex items-center justify-between px-4 py-3 text-sm text-white/80">
            <span className="tabular-nums">
              {activeImageIndex + 1} / {gallery.images.length}
            </span>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10"
              aria-label="Close image overlay"
              onClick={() => setActiveImageId(null)}
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
                <path d="M5 5l10 10M15 5L5 15" />
              </svg>
            </button>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-6 sm:px-16"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-h-full max-w-full object-contain"
              onClick={(event) => event.stopPropagation()}
            />
            <button
              type="button"
              className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 sm:inline-flex"
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation();
                showPreviousImage();
              }}
            >
              ‹
            </button>
            <button
              type="button"
              className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 sm:inline-flex"
              aria-label="Next image"
              onClick={(event) => {
                event.stopPropagation();
                showNextImage();
              }}
            >
              ›
            </button>
          </div>

          <div className="flex justify-center gap-3 pb-6 sm:hidden" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white"
              aria-label="Previous image"
              onClick={showPreviousImage}
            >
              ‹
            </button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white"
              aria-label="Next image"
              onClick={showNextImage}
            >
              ›
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
