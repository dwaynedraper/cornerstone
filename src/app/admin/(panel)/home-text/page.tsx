import SettingsForm from "@/components/admin/SettingsForm";
import { HOME_TEXT } from "@/lib/settings-fields";

export default function HomeTextAdmin() {
  return (
    <SettingsForm
      title="Home page text"
      description="Text on the home page. Fields that say leave blank to hide are optional. Suggested wording from the 2026 redesign appears under a field when there is one. Nothing changes on the site until you press Save."
      groups={HOME_TEXT}
    />
  );
}
