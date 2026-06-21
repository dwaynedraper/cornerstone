import SettingsForm from "@/components/admin/SettingsForm";
import { CONTACT_FIELDS } from "@/lib/settings-fields";

export default function ContactAdmin() {
  return (
    <SettingsForm
      title="Contact info"
      description="Phone, email, and office address. These appear in the footer on every page and on the contact page."
      groups={CONTACT_FIELDS}
    />
  );
}
