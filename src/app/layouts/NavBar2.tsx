import { useEffect, useRef, useState } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logoWithName.png";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  const [showMenu, setShowMenu] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // Enhanced outside click detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Skip closing if dialog is open OR click is inside dialog or dropdown
      if (
        showDialog ||
        dropdownRef.current?.contains(target) ||
        dialogRef.current?.contains(target)
      ) {
        return;
      }

      setShowMenu(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDialog]);

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

      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setShowMenu((prev) => !prev)}
          className="flex items-center gap-2 cursor-pointer"
        >
          {user.profile ? (
            <img
              src={user.profile}
              alt={user.name || "User"}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <FaUserCircle className="text-2xl text-purple-700" />
          )}
          <span className="hidden md:flex text-sm font-semibold">
            {user.name || "Guest User"}
          </span>
        </div>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-2xl shadow-lg p-4 z-50">
            <p className="text-sm">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-sm">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-sm">
              <strong>Enrollment:</strong> {user.enrollment}
            </p>
            <p className="text-sm">
              <strong>Branch:</strong> {user.branch}
            </p>
            <p className="text-sm">
              <strong>Admission Year:</strong> {user.admissionYear}
            </p>
            <p className="text-sm">
              <strong>Current Year:</strong> {user.currentYear}
            </p>

            <Dialog
              open={showDialog}
              onOpenChange={(open) => {
                setShowDialog(open);
                if (!open) setShowMenu(false);
              }}
            >
              <DialogTrigger asChild>
                <Button
                  className="w-full mt-4 text-sm bg-red-600 hover:bg-red-700 rounded-2xl text-white"
                  onClick={() => {
                    setShowDialog(true);
                  }}
                >
                  Logout
                </Button>
              </DialogTrigger>
              <DialogContent
                ref={dialogRef}
                className="sm:max-w-md border border-gray-100 bg-white shadow-2xl rounded-2xl"
              >
                <DialogHeader>
                  <DialogTitle>Are you sure you want to logout?</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="secondary"
                    className="bg-gray-600 hover:bg-gray-700 text-white rounded-2xl"
                    onClick={() => setShowDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white rounded-2xl"
                    onClick={handleLogout}
                  >
                    Confirm Logout
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
