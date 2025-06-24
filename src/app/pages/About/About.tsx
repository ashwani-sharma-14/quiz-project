import logo from "@/assets/logo.jpg";

const teamData = [
  {
    name: "Vansh Shrivastava",
    role: "Full Stack Developer",
    degree: "B.Tech - ETE (Batch 2026)",
    desc: "Experienced developer skilled in building complete web applications from scratch, handling both frontend and backend development using React and other web technologies.",
    image: logo,
    socials: [
      { icon: "🌐", link: "#" },
      { icon: "💼", link: "#" },
      { icon: "🔗", link: "#" },
    ],
    gradient: "from-blue-500 to-purple-500",
    button: "View Portfolio",
  },
  {
    name: "Ashwani Sharma",
    role: "Full Stack Developer",
    degree: "B.Tech - ETE (Batch 2026)",
    desc: "Led the overhaul of a full-stack web application by adopting a modern technology stack, significantly improving performance, while optimizing backend systems for reliability and scalability.",
    image: logo,
    socials: [
      { icon: "🌐", link: "#" },
      { icon: "💼", link: "#" },
      { icon: "🔗", link: "#" },
    ],
    gradient: "from-orange-500 to-pink-500",
    button: "View Portfolio",
  },
];

const TeamSection = () => {
  return (
    <section className="pt-10 pb-16 bg-gradient-to-b from-white to-blue-50">
      <h2 className="text-4xl font-bold text-center text-blue-800 mb-4">
        🚀 Development Team
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Meet the passionate developers behind the product – committed to
        building performant, scalable, and delightful user experiences.
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
        {teamData.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-lg overflow-hidden text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div
              className={`h-28 rounded-t-3xl bg-gradient-to-r ${member.gradient}`}
            ></div>
            <div className="-mt-14">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-md object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500">{member.degree}</p>
              <p className="text-sm text-blue-700 mt-1 font-medium">
                {member.role}
              </p>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                {member.desc}
              </p>

              <div className="flex justify-center gap-4 mt-4">
                {member.socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.link}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 text-lg transition"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              <button
                className={`mt-6 px-6 py-2 rounded-full text-white font-medium text-sm bg-gradient-to-r ${member.gradient} hover:brightness-110 transition`}
              >
                {member.button}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
