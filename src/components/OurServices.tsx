import { GiEarthAmerica } from "react-icons/gi";
import { PiBlueprint } from "react-icons/pi";
import { MdDesignServices } from "react-icons/md";
import { FaChartGantt } from "react-icons/fa6";

const features = [
  {
    name: "Civil Engineering",
    description:
      "From site development and infrastructure design to environmental compliance, we handle projects of all scales with precision and care",
    icon: MdDesignServices,
  },
  {
    name: "Land Surveying",
    description:
      "Utilizing state-of-the-art equipment and techniques, we provide accurate and reliable surveying services for boundary determination, topographic mapping, and construction layout.",
    icon: PiBlueprint,
  },
  {
    name: "Project Management",
    description:
      "We oversee your project from concept to completion, ensuring seamless coordination and timely delivery",
    icon: FaChartGantt,
  },
  {
    name: "Sustainable Design",
    description:
      "Our commitment to environmental stewardship is reflected in our sustainable development practices.",
    icon: GiEarthAmerica,
  },
];

export default function OurServices() {
  return (
    <div className="bg-surface py-20 sm:py-24">
      <p className="mx-auto max-w-5xl mb-16 text-xl text-gray-800 font-semibold rounded-lg p-8">
        <span className="text-3xl font-heading text-navy">At Cornerstone Engineering & Surveying</span>
        , we bring over 25 years of expertise to every project, blending modern
        design techniques with time-tested engineering and surveying principles.
        Our team of licensed professional engineers and registered professional
        land surveyors is dedicated to delivering innovative, sustainable, and
        cost-effective solutions for our clients.
      </p>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div>
            <p className="text-sm font-heading font-semibold uppercase tracking-widest text-gold-600">What We Do</p>
            <h2 className="mt-2 text-3xl font-heading font-bold tracking-tight text-navy sm:text-4xl">
              Our Services
            </h2>
            <div className="mt-4 w-16 h-1 bg-gold rounded-full" />
          </div>
          <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-shadow duration-300 hover:shadow-md">
                <dt className="text-base font-heading font-semibold leading-7 text-navy">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gold">
                    <feature.icon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
