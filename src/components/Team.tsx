const team = [
  {
    name: "Mitchell Lenamond",
    role: "Founder / Lead Engineer",
    imageUrl:
      "https://images.unsplash.com/photo-1494648739040-d3d4e84136a9?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Tom Jones",
    role: "The guy with the weird shirts",
    imageUrl:
      "https://images.unsplash.com/photo-1494648739040-d3d4e84136a9?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Adam Even",
    role: "Founder / Lead Engineer",
    imageUrl:
      "https://images.unsplash.com/photo-1494648739040-d3d4e84136a9?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Harold Dresden",
    role: "Founder / Lead Engineer",
    imageUrl:
      "https://images.unsplash.com/photo-1494648739040-d3d4e84136a9?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Jason Bourne",
    role: "Founder / Lead Engineer",
    imageUrl:
      "https://images.unsplash.com/photo-1494648739040-d3d4e84136a9?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  // More people...
];

export default function Team() {
  return (
    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8">
      <div className="mx-auto max-w-3xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Our team
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          At the heart of our success lies a diverse and talented group of
          professionals dedicated to excellence in civil engineering and
          surveying. Our team brings together a wealth of experience, innovative
          thinking, and a commitment to precision that sets us apart in the
          industry.
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          From seasoned engineers with decades of expertise to bright young
          talents bringing fresh perspectives, each member of our team plays a
          crucial role in delivering outstanding results for our clients. We
          pride ourselves on our collaborative approach, combining our
          individual strengths to tackle complex challenges and drive projects
          to successful completion.
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Our engineers and surveyors are not just technically proficient; they
          are passionate problem-solvers who thrive on turning vision into
          reality. Whether it&apos;s designing sustainable infrastructure,
          conducting precise land surveys, or developing cutting-edge solutions
          for urban development, our team approaches each project with
          enthusiasm and meticulous attention to detail.
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          We believe in continuous learning and stay at the forefront of
          industry advancements, ensuring that we bring the latest technologies
          and methodologies to every project. Our commitment to professional
          development means that when you work with us, you&apos;re partnering
          with a team that&apos;s always evolving and improving.
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Get to know the individuals who make our company a leader in civil
          engineering and surveying. Each team member below brings unique skills
          and experiences that contribute to our collective success and your
          project&apos;s triumph.
        </p>
      </div>
      <ul
        role="list"
        className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
      >
        {team.map((person) => (
          <li key={person.name}>
            <img
              alt=""
              src={person.imageUrl}
              className="mx-auto h-24 w-24 rounded-full"
            />
            <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
              {person.name}
            </h3>
            <p className="text-sm leading-6 text-gray-600">{person.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
