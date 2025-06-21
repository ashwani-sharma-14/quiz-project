import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logoWithName.png";

type NavbarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const Navbar = ({ isOpen, toggleSidebar }: NavbarProps) => {
  return (
    <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between w-full fixed top-0 z-50 md:static">
      {/* Left: Menu Button + Logo */}
      <div className="flex items-center gap-3">
        <button className="md:hidden" onClick={toggleSidebar}>
          {isOpen ? (
            <FaTimes className="text-xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </button>
        <img src={logo} alt="Logo" className="h-10" />
      </div>

      {/* Right: Profile */}
      <div className="hidden md:flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-2xl text-purple-700" />
          <span className="text-sm font-semibold">VANSH SHRIVASTAVA</span>
        </div>
        <button className="bg-red-100 hover:bg-red-200 text-red-600 text-sm px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
