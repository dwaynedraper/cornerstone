"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

type GalleryImage = { url: string; alt: string };

export default function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) =>
      setOpen((o) => (o === null ? o : (o + d + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, step]);

  if (images.length === 0) return null;

  // Up to 4 images sit in a roomy 2-up; 5+ become a tighter wall.
  const cols = images.length > 4 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <>
      <div className={`grid grid-cols-2 gap-3 ${cols}`}>
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={img.alt || "Open image"}
            className="group relative aspect-[4/3] overflow-hidden rounded-md border border-ink/10"
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4 sm:p-8"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-2xl text-white/80 hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>

          {images.length > 1 && (
            <button
              type="button"
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-2 flex h-12 w-12 items-center justify-center rounded-full text-3xl text-white/80 hover:bg-white/10 hover:text-white sm:left-6"
            >
              ‹
            </button>
          )}

          <figure onClick={(e) => e.stopPropagation()} className="max-w-5xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[open].url}
              alt={images[open].alt}
              className="mx-auto max-h-[82vh] w-auto max-w-full rounded-md object-contain"
            />
            {images[open].alt && (
              <figcaption className="mt-3 text-center text-sm text-gray-300">
                {images[open].alt}
              </figcaption>
            )}
          </figure>

          {images.length > 1 && (
            <button
              type="button"
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-2 flex h-12 w-12 items-center justify-center rounded-full text-3xl text-white/80 hover:bg-white/10 hover:text-white sm:right-6"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
