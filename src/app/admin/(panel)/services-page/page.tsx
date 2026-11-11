import ServicesEditor from "@/components/admin/ServicesEditor";

export default function ServicesPageListAdmin() {
  return (
    <ServicesEditor
      page="services"
      accent="amber"
      title="Services — services page"
      description="The list of services on the dedicated /services page. Separate from the home-page block, so the two can say different things."
    />
  );
}
