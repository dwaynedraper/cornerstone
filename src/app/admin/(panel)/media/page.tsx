import { getMedia } from "@/lib/content";
import ImageUpload from "@/components/admin/ImageUpload";
import AdminPage from "@/components/admin/AdminPage";
import { uploadMedia } from "@/app/admin/media-actions";

export default async function MediaAdmin() {
  const heroUrl = (await getMedia("hero")) ?? "/IMG_0854.jpg";

  return (
    <AdminPage
      title="Hero photo"
      description="The full-width photo at the top of the home page. Upload any size — we compress and optimize it automatically, and the change appears live within a few seconds. (Project photos are managed inside Projects.)"
      accent="blueprint"
    >
      <div className="space-y-6">
        <ImageUpload
          action={uploadMedia}
          hiddenFields={{ slot: "hero" }}
          label="Hero photo — home page background"
          currentUrl={heroUrl}
        />
      </div>
    </AdminPage>
  );
}
