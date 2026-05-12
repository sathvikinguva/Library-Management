import { BookOpen } from "lucide-react";
import { availabilityLabel } from "../utils/formatters.js";

const BookCard = ({ book }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-brand-600/20 flex items-center justify-center">
            <BookOpen size={18} />
          </div>
          <div>
            <p className="font-medium text-white">{book.title}</p>
            <p className="text-sm text-slate-400">{book.author}</p>
          </div>
        </div>
        <span
          className={`text-xs px-3 py-1 rounded-full border ${
            book.availability
              ? "border-emerald-500/40 text-emerald-300"
              : "border-rose-500/40 text-rose-300"
          }`}
        >
          {availabilityLabel(book.availability)}
        </span>
      </div>
    </div>
  );
};

export default BookCard;
