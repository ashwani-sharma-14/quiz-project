import { useParams, useNavigate } from "react-router-dom";
import { hiringData } from "../data/hiringData";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";
import {
  Briefcase,
  CalendarClock,
  MapPin,
  BadgeIndianRupee,
} from "lucide-react";
import { Section } from "@/components/reusable/Section";

const HiringPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = hiringData.find((job) => job.id === Number(id));

  if (!job)
    return (
      <div className="p-6 text-center text-red-600">❌ Job not found.</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-blue-100">
        {/* Header */}
        <div className="flex gap-4 items-center mb-10">
          <img
            src={logo}
            alt={`${job.company} logo`}
            className="w-16 h-16 rounded-xl border border-gray-200 shadow"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{job.jobTitle}</h1>
            <p className="text-gray-600 text-base">{job.company}</p>
            <p className="text-sm font-medium text-green-600 mt-1">
              Work From Office
            </p>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            {
              icon: <MapPin className="text-blue-600" size={20} />,
              label: "Location",
              value: "Indore, MP",
            },
            {
              icon: <BadgeIndianRupee className="text-green-600" size={20} />,
              label: "CTC",
              value: "₹ 4 - 6 LPA",
            },
            {
              icon: <Briefcase className="text-purple-600" size={20} />,
              label: "Experience",
              value: "Fresher",
            },
            {
              icon: <CalendarClock className="text-orange-500" size={20} />,
              label: "Apply By",
              value: "8 Jul'25",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              {item.icon}
              <div>
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="font-medium text-gray-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-8 border-gray-200" />

        {/* Job Description */}
        <Section title="🧾 Job Description">
          <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm">
            <li>Build and maintain full-stack web/mobile applications.</li>
            <li>
              Write scalable, well-structured code using React, Next.js,
              Node.js, etc.
            </li>
            <li>
              Integrate with databases like MongoDB, PostgreSQL, or Firebase.
            </li>
          </ul>
        </Section>

        {/* Skills */}
        <Section title="🛠️ Required Skills">
          <div className="flex flex-wrap gap-2">
            {["AWS", "Next.js", "Node.js", "React", "React Native"].map(
              (skill) => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold border border-blue-300"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </Section>

        {/* Eligibility */}
        <Section title="🎓 Eligibility Criteria">
          <ul className="list-disc pl-6 text-sm text-gray-700 space-y-2">
            <li>Final year graduation (B.Tech/B.E. or equivalent)</li>
            <li>Full-time availability post-academics</li>
            <li>Immediate joiners preferred</li>
            <li>Strong interest in web/software development</li>
          </ul>
          <p className="text-gray-600 text-xs mt-3">
            <strong>Note:</strong> Ideal for freshers transitioning into
            full-time roles.
          </p>
        </Section>

        {/* Process */}
        <Section title="🔍 Recruitment Process">
          <ol className="list-decimal pl-6 text-sm text-gray-700 space-y-2">
            <li>Online Application</li>
            <li>Resume & Skill-based Shortlisting</li>
            <li>Technical Assessment</li>
            <li>Technical Interview (1–2 rounds)</li>
            <li>HR Round & Offer</li>
          </ol>
        </Section>

        {/* About Company */}
        <Section title={`🏢 About ${job.company}`}>
          <p className="text-sm text-gray-700 leading-relaxed">
            Kapidron is a tech-driven startup specializing in AI-based
            solutions, modern UI/UX, and scalable full-stack applications. They
            empower young developers through real-world mentorship and agile
            product delivery.
          </p>
        </Section>

        {/* Apply Button */}
        <div className="mt-10">
          <Button
            className="w-full py-3 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition"
            onClick={() => navigate(`/hiring/apply/${job.id}`)}
          >
            🚀 Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HiringPage;
