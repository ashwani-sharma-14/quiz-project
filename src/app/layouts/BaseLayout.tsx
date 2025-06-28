import { useState } from "react";
import Navbar from "./NavBar2";
import Sidebar from "./SideBar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="h-screen overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex pt-16 h-full">
        <div className="fixed top-16 left-0 h-[calc(100%-4rem)] w-64 z-40 hidden md:block">
          <Sidebar isOpen={true} closeSidebar={closeSidebar} />
        </div>
        <main className="flex-1 ml-0 md:ml-64 h-[calc(100vh-4rem)] overflow-y-auto p-4 hide-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
