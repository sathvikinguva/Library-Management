import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";

const AppLayout = () => {
  return (
    <div className="min-h-screen grid-pattern">
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 px-6 py-8 space-y-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
