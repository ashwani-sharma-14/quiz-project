import { useState } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logoWithName.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="w-full bg-white shadow border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <img src={logo} alt="MITS" className="h-12" />
        </div>

        {/* Center Nav - Desktop Only */}
        <div className="hidden md:flex gap-8 text-lg font-semibold text-gray-800">
          <a
            href="/"
            className="hover:text-blue-600 border-b-2 border-transparent hover:border-blue-500 pb-1"
          >
            Home
          </a>
          <a
            href="/quiz"
            className="hover:text-blue-600 border-b-2 border-transparent hover:border-blue-500 pb-1"
          >
            Quiz
          </a>
          <a
            href="/hiring"
            className="hover:text-blue-600 border-b-2 border-transparent hover:border-blue-500 pb-1"
          >
            Hiring
          </a>
          <a
            href="/profile"
            className="hover:text-blue-600 border-b-2 border-transparent hover:border-blue-500 pb-1"
          >
            Profile
          </a>
          <a
            href="/developer"
            className="hover:text-blue-600 border-b-2 border-transparent hover:border-blue-500 pb-1"
          >
            Developer
          </a>
        </div>

        {/* Right: User Info & Mobile Menu */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-2xl text-purple-700" />
            <span className="text-sm font-semibold">VANSH SHRIVASTAVA</span>
          </div>
          <button className="bg-red-100 hover:bg-red-200 text-red-600 text-sm px-3 py-1 rounded">
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <FaTimes className="text-2xl text-gray-700" />
            ) : (
              <FaBars className="text-2xl text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow px-6 py-4 space-y-3 text-gray-700 text-sm">
          <a href="/" className="block hover:text-blue-600">
            Home
          </a>
          <a href="/quiz" className="block hover:text-blue-600">
            Quiz
          </a>
          <a href="/hiring" className="block hover:text-blue-600">
            Hiring
          </a>
          <a href="/profile" className="block hover:text-blue-600">
            Profile
          </a>
          <a href="/developer" className="block hover:text-blue-600">
            Developer
          </a>
          <div className="pt-3 border-t">
            <div className="flex items-center gap-2 mb-2">
              <FaUserCircle className="text-xl text-purple-700" />
              <span className="font-semibold">VANSH SHRIVASTAVA</span>
            </div>
            <button className="bg-red-100 hover:bg-red-200 text-red-600 text-sm px-3 py-1 rounded">
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
