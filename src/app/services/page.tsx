import {
  MapIcon,
  BuildingOffice2Icon,
  TruckIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Land Surveying",
    description:
      "Precise boundary surveys, topographic mapping, and construction staking to ensure accurate property lines and elevations for your projects.",
    icon: MapIcon,
  },
  {
    name: "Site Development",
    description:
      "Comprehensive site planning and design services, including grading plans, drainage solutions, and utility layout for residential and commercial developments.",
    icon: BuildingOffice2Icon,
  },
  {
    name: "Transportation Engineering",
    description:
      "Expert design of roadways, intersections, and traffic management systems to improve mobility and safety in urban and rural areas.",
    icon: TruckIcon,
  },
  {
    name: "Environmental Engineering",
    description:
      "Sustainable solutions for water resources management, environmental impact assessments, and regulatory compliance to protect our natural environment.",
    icon: ChartBarIcon,
  },
];

export default function Services() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-bold leading-7 text-[#651212]">
            Expert Solutions
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Comprehensive Civil Engineering and Surveying Services
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            From precise land surveys to complex infrastructure design, our team
            of experienced professionals delivers innovative solutions tailored
            to your project&apos;s unique needs. We combine cutting-edge
            technology with decades of expertise to ensure your project&apos;s
            success.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#651212]">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
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
