import SettingsForm from "@/components/admin/SettingsForm";
import { CONTACT_FIELDS } from "@/lib/settings-fields";

export default function ContactAdmin() {
  return (
    <SettingsForm
      title="Contact info"
      description="The contact page intro, plus phone, email, and office address. Contact details appear in the footer on every page and on the contact page."
      groups={CONTACT_FIELDS}
      accent="neutral"
    />
  );
}
