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
    <div className="bg-white py-20 sm:py-24">
      <p className="mx-auto max-w-5xl mb-16 text-xl text-black font-semibold rounded-lg p-8">
        <span className="text-3xl">At Cornerstone Engineering & Surveying</span>
        , we bring over 25 years of expertise to every project, blending modern
        design techniques with time-tested engineering and surveying principles.
        Our team of licensed professional engineers and registered professional
        land surveyors is dedicated to delivering innovative, sustainable, and
        cost-effective solutions for our clients.
      </p>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <h2 className="text-3xl font-bold underline decoration-teal-500 tracking-tight text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name}>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500">
                    <feature.icon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 text-base leading-7 text-gray-600">
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
