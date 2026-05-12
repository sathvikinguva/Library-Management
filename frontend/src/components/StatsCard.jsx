const StatsCard = ({ label, value, helper }) => {
  return (
    <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-soft">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-display font-semibold text-white">{value}</p>
      {helper && <p className="mt-2 text-sm text-slate-400">{helper}</p>}
    </div>
  );
};

export default StatsCard;
