import React, { useState } from "react";
import { Menu, X, Home, Briefcase, HelpCircle } from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/dashboard", icon: <Home size={18} /> },
  { label: "Jobs", href: "/jobs", icon: <Briefcase size={18} /> },
  { label: "Questions", href: "/questions", icon: <HelpCircle size={18} /> },
];

const CustomSidebar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`relative z-30 h-screen border-r border-gray-200 bg-white transition-all duration-300 ease-in-out ${
          open ? "w-64" : "w-16"
        }`}
      >
        {/* Toggle Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          {open ? (
            <span className="text-lg font-bold text-gray-800">Admin Panel</span>
          ) : (
            <span className="text-sm text-gray-400 font-semibold">AP</span>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-500 hover:text-gray-700"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 mt-4">
          {sidebarLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-all ${
                open ? "justify-start" : "justify-center"
              }`}
            >
              <div className="text-gray-500">{link.icon}</div>
              <span
                className={`ml-3 transition-all whitespace-nowrap ${
                  open ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                }`}
              >
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-100 text-gray-400 text-xs">
          {open && "© 2024 Your Company"}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-auto">{children}</main>
    </div>
  );
};

export default CustomSidebar;
