const Loader = ({ label = "Loading" }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
      <p className="text-sm text-slate-300">{label}</p>
    </div>
  );
};

export default Loader;
