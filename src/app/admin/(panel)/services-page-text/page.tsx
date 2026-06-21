import SettingsForm from "@/components/admin/SettingsForm";
import { SERVICES_PAGE_TEXT } from "@/lib/settings-fields";

export default function ServicesPageTextAdmin() {
  return (
    <SettingsForm
      title="Services page text"
      description="The heading and intro paragraph at the top of the /services page."
      groups={SERVICES_PAGE_TEXT}
    />
  );
}
