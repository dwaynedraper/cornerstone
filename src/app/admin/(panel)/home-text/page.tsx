import SettingsForm from "@/components/admin/SettingsForm";
import { HOME_TEXT } from "@/lib/settings-fields";

export default function HomeTextAdmin() {
  return (
    <SettingsForm
      title="Home page text"
      description="The hero headline and sub-text at the top of the home page, the small stats in the white bar, and the intro paragraph above the services."
      groups={HOME_TEXT}
    />
  );
}
