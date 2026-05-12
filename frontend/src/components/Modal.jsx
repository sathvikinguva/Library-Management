const Modal = ({ title, open, onClose, children, actions }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-soft">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <h3 className="text-lg font-display text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-sm uppercase tracking-widest text-slate-400 hover:text-white"
          >
            Close
          </button>
        </div>
        <div className="px-6 py-5 text-slate-200">{children}</div>
        {actions && <div className="px-6 py-4 border-t border-slate-800">{actions}</div>}
      </div>
    </div>
  );
};

export default Modal;
