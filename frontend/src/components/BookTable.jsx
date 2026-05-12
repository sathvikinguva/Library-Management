import { availabilityLabel } from "../utils/formatters.js";

const BookTable = ({ books }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-900/70 text-slate-400">
          <tr>
            <th className="px-5 py-3">Title</th>
            <th className="px-5 py-3">Author</th>
            <th className="px-5 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-900/30">
          {books.map((book) => (
            <tr key={book.book_id} className="hover:bg-slate-900/60">
              <td className="px-5 py-4 text-white">{book.title}</td>
              <td className="px-5 py-4 text-slate-300">{book.author}</td>
              <td className="px-5 py-4">
                <span
                  className={`text-xs px-3 py-1 rounded-full border ${
                    book.availability
                      ? "border-emerald-500/40 text-emerald-300"
                      : "border-rose-500/40 text-rose-300"
                  }`}
                >
                  {availabilityLabel(book.availability)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
