import Navbar from "@/app/layouts/NavBar";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="px-4 py-6">{children}</main>
    </div>
  );
};

export default BaseLayout;