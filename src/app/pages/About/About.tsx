import logo from "../../assets/logo.jpg";

const teamData = [
  {
    name: "Vansh Shrivastava",
    role: "Full Stack Developer",
    degree: "B.Tech - ETE (Batch 2026)",
    desc: "Experienced developer skilled in building complete web applications from scratch, handling both frontend and backend development using React and other web technologies.",
    image: { logo },
    socials: [{ icon: "🌐" }, { icon: "💼" }, { icon: "🔗" }],
    gradient: "from-blue-500 to-purple-500",
    button: "View Portfolio",
  },
  {
    name: "Ashwani Sharma",
    role: "Full Stack Developer",
    degree: "B.Tech - ETE (Batch 2026)",
    desc: "Led the overhaul of a full-stack web application by adopting a modern technology stack, significantly improving  performance, while optimizing backend systems for reliability and scalability.",
    image: { logo },
    socials: [{ icon: "🌐" }, { icon: "💼" }, { icon: "🔗" }],
    gradient: "from-orange-500 to-pink-500",
    button: "View Portfolio",
  },
];

const TeamSection = () => {
  return (
    <section className=" pt-0 pb-12">
      <h2 className="text-3xl font-bold text-center mb-8">Development Team</h2>
      <div className="flex justify-center mb-8">
        <div className="w-24 h-1 bg-purple-600 rounded-full"></div>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
        {teamData.map((member, index) => (
          <div
            key={index}
            className="w-80 bg-white rounded-3xl shadow-lg overflow-hidden text-center"
          >
            <div
              className={`h-24 rounded-t-3xl bg-gradient-to-r ${member.gradient}`}
            ></div>
            <div className="-mt-10">
              <img
                src={logo}
                alt={member.name}
                className="w-20 h-20 rounded-full mx-auto border-4 border-white shadow-md object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.degree}</p>
              <p className="text-sm text-gray-700 mt-1">{member.role}</p>
              <p className="text-gray-600 text-sm mt-3">{member.desc}</p>
              <div className="flex justify-center gap-4 mt-4 text-xl">
                {member.socials.map((s, i) => (
                  <span key={i}>{s.icon}</span>
                ))}
              </div>
              <button
                className={`mt-6 px-5 py-2 rounded-full text-white font-medium bg-gradient-to-r ${member.gradient}`}
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
