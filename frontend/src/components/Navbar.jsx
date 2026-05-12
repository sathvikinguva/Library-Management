import { Bell, Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const deriveTitle = (pathname) => {
  const segment = pathname.split("/").filter(Boolean).pop() || "dashboard";
  return segment.replace(/-/g, " ");
};

const Navbar = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between gap-4 px-6 py-5 bg-slate-900/60 border-b border-slate-800 glass-panel">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Dashboard</p>
        <h2 className="text-2xl font-display font-semibold text-white capitalize">
          {deriveTitle(pathname)}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">
          <Search size={16} />
          <span>Quick search</span>
        </div>
        <button className="p-2 rounded-full bg-slate-800 hover:bg-slate-700">
          <Bell size={18} />
        </button>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-white">{user?.name}</p>
            <p className="text-xs text-slate-400">{user?.role}</p>
          </div>
          <button
            onClick={logout}
            className="text-xs uppercase tracking-widest text-slate-400 hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
