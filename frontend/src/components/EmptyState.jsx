const EmptyState = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 border border-dashed border-slate-700 rounded-2xl text-slate-400">
      <h3 className="text-lg font-display text-white">{title}</h3>
      <p className="mt-2 text-sm max-w-sm">{description}</p>
    </div>
  );
};

export default EmptyState;
