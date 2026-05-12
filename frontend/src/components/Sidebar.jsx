import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../routes/navConfig.js";
import { useAuth } from "../hooks/useAuth.js";

const Sidebar = () => {
  const { role } = useAuth();
  const items = NAV_ITEMS[role] || [];

  return (
    <aside className="hidden lg:flex flex-col gap-8 w-64 p-6 bg-slate-900/70 border-r border-slate-800 glass-panel">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Library</p>
        <h1 className="text-2xl font-display font-semibold text-white">Issue Hub</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-xl transition ${
                isActive
                  ? "bg-brand-600 text-white shadow-soft"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="rounded-xl border border-slate-800 p-4 text-sm text-slate-300">
        Role: <span className="font-semibold text-white">{role}</span>
      </div>
    </aside>
  );
};

export default Sidebar;
