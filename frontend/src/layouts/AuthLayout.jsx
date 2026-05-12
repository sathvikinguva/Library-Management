import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="w-full max-w-5xl grid gap-8 md:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Library Suite</p>
          <h1 className="text-4xl md:text-5xl font-display font-semibold text-white">
            Manage issues, returns, and member activity in one polished workspace.
          </h1>
          <p className="text-slate-300">
            Role-based access for librarians and members with live availability, issue tracking,
            and lightning fast catalog search.
          </p>
          <div className="flex gap-3 text-xs text-slate-400">
            <span className="px-3 py-1 rounded-full border border-slate-700">Secure Access</span>
            <span className="px-3 py-1 rounded-full border border-slate-700">Modern UI</span>
            <span className="px-3 py-1 rounded-full border border-slate-700">Real-time Updates</span>
          </div>
        </div>
        <div className="glass-panel rounded-3xl p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
