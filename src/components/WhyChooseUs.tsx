import {
  FaUsersCog,
  FaLightbulb,
  FaHandshake,
  FaCheckCircle,
} from "react-icons/fa";

const features = [
  {
    name: "Expertise",
    description:
      "Our team's diverse skill set allows us to tackle complex challenges across various sectors.",
    icon: FaUsersCog,
  },
  {
    name: "Innovation",
    description:
      "Utilizing state-of-the-art equipment and techniques, we provide accurate and reliable surveying services for boundary determination, topographic mapping, and construction layout.",
    icon: FaLightbulb,
  },
  {
    name: "Client-Centric Approach",
    description:
      "We prioritize clear communication and collaboration, tailoring our services to meet your specific needs.",
    icon: FaHandshake,
  },
  {
    name: "Sustainable Design",
    description:
      "Our commitment to environmental stewardship is reflected in our sustainable development practices.",
    icon: FaCheckCircle,
  },
];

export default function WhyChooseUs() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <h2 className="text-3xl font-bold underline decoration-indigo-500 tracking-tight text-gray-900 sm:text-4xl">
            Why Choose Us?
          </h2>
          <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name}>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
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
        <p className="mx-auto max-w-5xl mb-8 text-xl text-black font-semibold rounded-lg p-8 mt-24 text-center">
          Whether you&apos;re planning a small residential development or a
          large-scale infrastructure project, Cornerstone Engineering &
          Surveying has the knowledge, skills, and dedication to bring your
          vision to life. Contact us today to discuss how we can help you
          achieve your project goals.
        </p>
      </div>
    </div>
  );
}
