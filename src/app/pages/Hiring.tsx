import logo from "../../assets/logo.jpg";
import poster from "../../assets/poster.jpg";

const dummyPosts = [
  {
    id: "1",
    content:
      "MITS T&P Cell is hiring for a Software Developer position. Apply now and be part of our innovation journey!",
    image: "https://via.placeholder.com/600x400",
    applyLink: "https://example.com/apply1",
  },
  {
    id: "2",
    content:
      "Exciting opportunity for Data Analysts at MITS T&P Cell. Click below to learn more and apply.",
    image: "https://via.placeholder.com/600x400",
    applyLink: "https://example.com/apply2",
  },
];

export default function HiringPage() {
  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {dummyPosts.map((post) => (
        <div
          key={post.id}
          className="border border-gray-100 shadow-sm transition-shadow hover:shadow-md rounded-md overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 flex items-center gap-3">
            <img
              src={logo}
              alt="T&P Cell MITS"
              className="w-10 h-10 rounded-full border"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">T&P Cell MITS</span>
              </div>
              <div className="text-xs text-gray-500">Just now</div>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
            <img
              src={poster}
              alt="Hiring Poster"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            <p className="text-sm text-gray-800 whitespace-pre-line">
              {post.content}
            </p>

            <a
              href={post.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
            >
              Apply Now
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
