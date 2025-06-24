import logo from "@/assets/logo.jpg";
import {  GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const userProfile = {
  name: "Vansh Shrivastava",
  role: "Full Stack Developer",
  email: "vanshshrivastava@gmail.com",
  phone: "+91 810357923",
  location: "Gwalior, India",
  degree: "B.Tech in Electronics & Telecommunication (2022–2026)",
  skills: [
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "TailwindCSS",
    "Express",
    "TypeScript",
  ],
  bio: "Passionate developer with experience building full-stack applications using modern technologies. Loves solving real-world problems with scalable web solutions.",
  resume: "/resume/vansh_resume.pdf", // Optional resume link
};

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-8 border border-blue-100">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={logo}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">
              {userProfile.name}
            </h1>
            <p className="text-blue-600 text-lg font-medium">
              {userProfile.role}
            </p>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600 justify-center md:justify-start">
              <span className="flex items-center gap-1">
                <Mail size={16} /> {userProfile.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone size={16} /> {userProfile.phone}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={16} /> {userProfile.location}
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">About Me</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            {userProfile.bio}
          </p>
        </div>

        {/* Education */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            🎓 Education
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <GraduationCap size={18} className="text-purple-600" />
            {userProfile.degree}
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            🛠️ Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {userProfile.skills.map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full border border-blue-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Resume */}
        {userProfile.resume && (
          <div className="mt-10">
            <a
              href={userProfile.resume}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full py-3 text-lg rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition">
                📄 Download Resume
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
