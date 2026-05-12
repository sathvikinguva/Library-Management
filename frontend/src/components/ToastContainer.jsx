const toneStyles = {
  success: "border-emerald-500/40 text-emerald-200",
  error: "border-rose-500/40 text-rose-200",
  info: "border-sky-500/40 text-sky-200"
};

const ToastContainer = ({ toasts, onDismiss }) => {
  if (!toasts.length) return null;

  return (
    <div className="fixed top-6 right-6 z-50 space-y-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-xl border bg-slate-900/90 px-4 py-3 shadow-soft ${
            toneStyles[toast.tone || "info"]
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">{toast.title}</p>
              {toast.message && <p className="text-xs text-slate-300">{toast.message}</p>}
            </div>
            <button onClick={() => onDismiss(toast.id)} className="text-xs">
              Close
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
