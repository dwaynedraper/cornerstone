import Link from "next/link";
import { getMedia } from "@/lib/content";
import ImageUpload from "@/components/admin/ImageUpload";
import { uploadMedia } from "@/app/admin/media-actions";

export default async function MediaAdmin() {
  const heroUrl = (await getMedia("hero")) ?? "/IMG_0854.jpg";

  return (
    <div>
      <Link
        href="/admin"
        className="font-heading text-sm font-medium text-blueprint hover:text-blueprint-dark"
      >
        ← Dashboard
      </Link>

      <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-ink">
        Hero photo
      </h1>
      <div className="mt-4 h-0.5 w-16 bg-amber" />
      <p className="mt-4 max-w-2xl text-ink-500">
        The full-width photo at the top of the home page. Upload any size — we
        compress and optimize it automatically, and the change appears live
        within a few seconds. (Project photos are managed inside Projects.)
      </p>

      <div className="mt-8 space-y-6">
        <ImageUpload
          action={uploadMedia}
          hiddenFields={{ slot: "hero" }}
          label="Hero photo — home page background"
          currentUrl={heroUrl}
        />
      </div>
    </div>
  );
}
