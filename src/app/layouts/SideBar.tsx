import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBrain,
  FaInfoCircle,
  FaBullhorn,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-white shadow-xl p-6 space-y-6 rounded-tr-3xl rounded-br-3xl">
      <h1 className="text-2xl font-bold text-purple-700 mb-6">Quiz Panel</h1>
      <nav className="flex flex-col gap-4 text-lg">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-bold text-purple-700" : "text-gray-700"
          }
        >
          <FaHome className="inline mr-2" /> Home
        </NavLink>
        <NavLink
          to="/quiz"
          className={({ isActive }) =>
            isActive ? "font-bold text-purple-700" : "text-gray-700"
          }
        >
          <FaBrain className="inline mr-2" /> Quiz
        </NavLink>
        <NavLink
          to="/hiring"
          className={({ isActive }) =>
            isActive ? "font-bold text-purple-700" : "text-gray-700"
          }
        >
          <FaBullhorn className="inline mr-2" /> Hiring
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "font-bold text-purple-700" : "text-gray-700"
          }
        >
          <FaInfoCircle className="inline mr-2" /> About
        </NavLink>
        
      </nav>
    </div>
  );
};

export default Sidebar;
