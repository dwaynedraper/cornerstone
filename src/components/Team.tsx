import Mitchell from "@/components/Mitchell";

const teams = [
  {
    name: "Executive Leadership",
    members: [
      { name: "Mitch Lenamond, P.E.", role: "Founder and CEO" },
      { name: "Bailey Lenamond", role: "Chief Operating Officer" },
    ],
  },
  {
    name: "Administration",
    members: [
      { name: "Mallory Draper", role: "Operations Manager" },
      { name: "Katie Holmes", role: "Coordinator" },
    ],
  },
  {
    name: "Civil Team",
    members: [
      { name: "Jason Lenamond", role: "P.E." },
      { name: "Eric Chavez", role: "E.I.T." },
      { name: "Tj Gonzales", role: "E.I.T." },
    ],
  },
  {
    name: "Survey Team",
    members: [
      { name: "Jacob Holmes", role: "R.P.L.S." },
      { name: "Dayhibe Montilva", role: "Senior Survey Technician" },
      { name: "Eddie Okala", role: "Party Chief" },
      { name: "Ryan Korinek", role: "Party Chief" },
    ],
  },
];

export default function Team() {
  return (
    <div>
      {/* ─── Hero banner for the About page ─── */}
      <div className="bg-navy py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-sm font-heading font-semibold uppercase tracking-widest text-gold">Our Team</p>
          <h1 className="mt-3 text-4xl font-heading font-bold tracking-tight text-white sm:text-5xl">
            About Us
          </h1>
          <div className="mx-auto mt-6 w-16 h-1 bg-gradient-to-r from-heritage via-gold to-heritage rounded-full" />
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-300">
            At the heart of our success lies a diverse and talented group of
            professionals dedicated to excellence in civil engineering and
            surveying. Our team brings together a wealth of experience, innovative
            thinking, and a commitment to precision that sets us apart in the
            industry.
          </p>
        </div>
      </div>

      {/* ─── Two-column body content ─── */}
      <div className="bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="border-l-4 border-gold pl-8">
              <p className="text-lg leading-8 text-gray-600">
                From seasoned engineers with decades of expertise to bright young
                talents bringing fresh perspectives, each member of our team plays a
                crucial role in delivering outstanding results for our clients. We
                pride ourselves on our collaborative approach, combining our
                individual strengths to tackle complex challenges and drive projects
                to successful completion.
              </p>
            </div>
            <div className="border-l-4 border-gold pl-8">
              <p className="text-lg leading-8 text-gray-600">
                Our engineers and surveyors are not just technically proficient; they
                are passionate problem-solvers who thrive on turning vision into
                reality. Whether it&apos;s designing sustainable infrastructure,
                conducting precise land surveys, or developing cutting-edge solutions
                for urban development, our team approaches each project with
                enthusiasm and meticulous attention to detail.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Highlight block ─── */}
      <div className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
            <div>
              <p className="text-lg leading-8 text-gray-600">
                We believe in continuous learning and stay at the forefront of
                industry advancements, ensuring that we bring the latest technologies
                and methodologies to every project. Our commitment to professional
                development means that when you work with us, you&apos;re partnering
                with a team that&apos;s always evolving and improving.
              </p>
            </div>
            <div className="bg-surface rounded-xl p-8 border border-gray-100">
              <p className="text-xl leading-8 text-navy font-heading font-semibold text-center italic">
                Get to know the individuals who make our company a leader in civil
                engineering and surveying. Each team member below brings unique skills
                and experiences that contribute to our collective success and your
                project&apos;s triumph.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Founder section ─── */}
      <div className="bg-surface">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
          <Mitchell />
        </div>
      </div>

      {/* ─── Team sections by category ─── */}
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16">
            <p className="text-sm font-heading font-semibold uppercase tracking-widest text-gold-600">The People</p>
            <h2 className="mt-2 text-3xl font-heading font-bold tracking-tight text-navy sm:text-4xl">
              Our Team
            </h2>
            <div className="mt-4 w-16 h-1 bg-gold rounded-full" />
          </div>

          <div className="space-y-16">
            {teams.map((team) => (
              <section key={team.name}>
                {/* Team category heading */}
                <div className="mb-8 flex items-center gap-4">
                  <div className="w-1.5 h-8 bg-gradient-to-b from-gold to-heritage rounded-full" />
                  <h3 className="text-xl font-heading font-bold tracking-tight text-navy sm:text-2xl">
                    {team.name}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
                </div>

                {/* Team member cards */}
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                >
                  {team.members.map((person) => {
                    const initials = person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("");
                    return (
                      <li
                        key={person.name}
                        className="group relative bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                      >
                        {/* Gold top accent */}
                        <div className="h-1 bg-gradient-to-r from-heritage via-gold to-gold" />
                        <div className="p-6 text-center">
                          {/* Initials avatar */}
                          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy text-white font-heading font-bold text-xl mb-4 ring-2 ring-gold/30 group-hover:ring-gold/60 transition-all duration-300">
                            {initials}
                          </div>
                          <p className="text-base font-heading font-semibold leading-7 tracking-tight text-navy">
                            {person.name}
                          </p>
                          <p className="text-sm leading-6 text-gray-500">{person.role}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Licensing ─── */}
      <div className="bg-surface py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="border-t border-gray-200 pt-12 mb-8">
            <p className="text-sm font-heading font-semibold uppercase tracking-widest text-gold-600">Credentials</p>
            <h2 className="mt-2 text-xl font-heading font-bold tracking-tight text-navy sm:text-xl">
              Licensing
            </h2>
            <div className="mt-4 w-12 h-1 bg-gold rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="text-sm font-heading font-semibold text-navy">Engineering</p>
              <p className="text-gray-500 mt-1">
                Firm Registration Number: F-24969
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="text-sm font-heading font-semibold text-navy">Surveying</p>
              <p className="text-gray-500 mt-1">
                Firm Registration Number: 10194747
              </p>
            </div>
          </div>
          {/* </div>
        <div className="max-w-7xl px-6 py-8 flex justify-between"> */}
          <p className="text-gray-500">
            TEXAS BOARD OF PROFESSIONAL ENGINEERS & LAND SURVEYORS
            <br /> 1917 S I-35 Frontage Road, Austin, TX 78741 | (512) 440-7723
          </p>
          <p className="text-heritage mt-4 font-semibold">
            <a href="https://pels.texas.gov" className="hover:text-heritage-light transition-colors duration-200">https://pels.texas.gov</a>
          </p>
        </div>
      </div>
    </div>
  );
}
