import SettingsForm from "@/components/admin/SettingsForm";
import { ABOUT_TEXT } from "@/lib/settings-fields";

export default function AboutTextAdmin() {
  return (
    <SettingsForm
      title="About page text"
      description="The heading and intro paragraphs on the About page, plus Mitchell's founder bio (name, title, the two paragraphs, and the closing quote)."
      groups={ABOUT_TEXT}
    />
  );
}
