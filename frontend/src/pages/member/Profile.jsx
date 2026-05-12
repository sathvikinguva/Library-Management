import { useAuth } from "../../hooks/useAuth.js";

const MemberProfile = () => {
  const { user } = useAuth();

  return (
    <section className="max-w-2xl space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-soft">
        <h3 className="text-xl font-display text-white">Profile</h3>
        <div className="mt-4 space-y-2 text-sm text-slate-300">
          <p>
            <span className="text-slate-400">Name:</span> {user?.name}
          </p>
          <p>
            <span className="text-slate-400">Email:</span> {user?.email}
          </p>
          <p>
            <span className="text-slate-400">Role:</span> {user?.role}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MemberProfile;
