"use client";

import { useState } from "react";
import Image from "next/image";
import { SubmitButton } from "@/components/admin/FormButtons";

/**
 * Shows the current image for a target and lets an admin upload a replacement.
 * The server action is passed in (so this works for the hero slot, project
 * covers, etc.); `hiddenFields` identifies the target (e.g. { slot: "hero" }
 * or { id: projectId }).
 */
export default function ImageUpload({
  action,
  hiddenFields = {},
  label,
  currentUrl,
}: {
  action: (formData: FormData) => void | Promise<void>;
  hiddenFields?: Record<string, string>;
  label: string;
  currentUrl: string;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="rounded-lg border border-ink/10 bg-white p-6 shadow-xs">
      <h2 className="font-heading text-base font-semibold text-ink">{label}</h2>

      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-2 font-heading text-xs font-semibold uppercase tracking-wider text-ink-400">
            {preview ? "New — not saved yet" : "Current"}
          </p>
          <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-ink/10 bg-sand-light">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <Image
                src={currentUrl}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 360px"
                className="object-cover"
              />
            )}
          </div>
        </div>

        <form action={action} className="flex flex-col">
          {Object.entries(hiddenFields).map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={value} />
          ))}
          <label className="block">
            <span className="font-heading text-sm font-medium text-ink">
              Choose a new photo
            </span>
            <input
              type="file"
              name="file"
              accept="image/*"
              required
              onChange={(e) => {
                const f = e.target.files?.[0];
                setPreview(f ? URL.createObjectURL(f) : null);
              }}
              className="mt-2 block w-full text-sm text-ink-500 file:mr-3 file:rounded-sm file:border-0 file:bg-blueprint file:px-4 file:py-2 file:font-heading file:text-sm file:font-medium file:text-white hover:file:bg-blueprint-dark"
            />
          </label>
          <p className="mt-3 text-xs text-ink-400">
            Any size or orientation — we compress and optimize it automatically.
          </p>
          <SubmitButton
            pendingText="Uploading…"
            className="mt-auto self-start rounded-sm bg-blueprint px-5 py-2.5 font-heading text-sm font-medium text-white hover:bg-blueprint-dark disabled:opacity-60"
          >
            Save photo
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
