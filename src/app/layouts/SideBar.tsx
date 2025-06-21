import { NavLink } from "react-router-dom";
import { FaHome, FaBolt, FaStore, FaUser, FaBrain } from "react-icons/fa";

type SidebarProps = {
  isOpen: boolean;
  closeSidebar: () => void;
};
const Sidebar = ({ isOpen, closeSidebar }: SidebarProps) => {
  const links = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/quiz", label: "Quiz", icon: <FaBrain /> },
    { to: "/hiring", label: "Hirings", icon: <FaBolt /> },
    { to: "/developer", label: "Developers", icon: <FaStore /> },
    { to: "/profile", label: "Profile", icon: <FaUser /> },
  ];

  return (
    <div
      className={`bg-white shadow-md p-4 pt-6 space-y-4 w-64 h-screen fixed left-0 top-14 z-40 transform transition-transform duration-300 md:static md:top-0 md:translate-x-0 md:block ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <nav className="flex flex-col gap-2 text-md">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "text-blue-700 font-semibold bg-blue-100 shadow-md"
                  : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
              }`
            }
            onClick={closeSidebar} // Auto-close on mobile
          >
            <span className="text-lg">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
