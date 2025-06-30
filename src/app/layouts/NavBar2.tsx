import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logoWithName.png";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

type NavbarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

interface UseAuthStore {
  logout: () => Promise<boolean>;
}

type User = {
  admissionYear: number;
  branch: string;
  currentYear: number;
  email: string;
  enrollment: string;
  id: string;
  name: string;
  profile: string;
};
const Navbar = ({ isOpen, toggleSidebar }: NavbarProps) => {
  const logout = useAuthStore((state) => state as UseAuthStore).logout;
  const user = useAuthStore((state) => (state as { user: User }).user);


  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      window.location.href = "/login";
      toast.success("Logout successful.");
    }
  };

  return (
    <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between w-full fixed top-0 z-50 md:static">
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
      <div className=" flex items-center gap-4">
        <div className="flex items-center gap-2">
          {user.profile ? (
            <img
            src={user.profile}
            alt={user.name || "User"}
            className="w-8 h-8 rounded-full"
          />
          ) : (
            <FaUserCircle className="text-2xl text-purple-700" />
          )}
          <span className=" hidden md:flex text-sm font-semibold">
            {user.name || "Guest User"}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-100 hover:bg-red-200 text-red-600 text-sm px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
