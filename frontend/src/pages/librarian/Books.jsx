import { useEffect, useMemo, useState } from "react";
import BookTable from "../../components/BookTable.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import Modal from "../../components/Modal.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import Loader from "../../components/Loader.jsx";
import { useToast } from "../../hooks/useToast.js";
import bookService from "../../services/bookService.js";

const LibrarianBooks = () => {
  const { addToast } = useToast();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", author: "" });
  const titleRegex = /^[A-Za-z0-9][A-Za-z0-9\s.'-]{1,98}$/;
  const authorRegex = /^[A-Za-z][A-Za-z\s.'-]{1,98}$/;
  const searchRegex = /^[A-Za-z0-9\s.'-]*$/;

  useEffect(() => {
    const loadBooks = async () => {
      const data = await bookService.getBooks();
      setBooks(data);
      setLoading(false);
    };

    loadBooks();
  }, []);

  const filtered = useMemo(() => {
    if (!search) return books;
    return books.filter((book) =>
      `${book.title} ${book.author}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [books, search]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!titleRegex.test(form.title.trim())) {
      addToast({
        title: "Invalid title",
        message: "Use 2-99 characters (letters, numbers, spaces).",
        tone: "error"
      });
      return;
    }

    if (!authorRegex.test(form.author.trim())) {
      addToast({
        title: "Invalid author",
        message: "Use 2-99 letters for the author name.",
        tone: "error"
      });
      return;
    }
    const payload = {
      title: form.title.trim(),
      author: form.author.trim()
    };
    const newBook = await bookService.addBook(payload);
    setBooks((prev) => [newBook, ...prev]);
    addToast({ title: "Book added", message: newBook.title, tone: "success" });
    setOpen(false);
    setForm({ title: "", author: "" });
  };

  if (loading) {
    return <Loader label="Loading books" />;
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by title or author"
          validationRegex={searchRegex}
        />
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-full bg-brand-600 text-white text-sm"
        >
          Add book
        </button>
      </div>

      {filtered.length ? (
        <BookTable books={filtered} />
      ) : (
        <EmptyState title="No books" description="Try a different search query." />
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Add new book"
        actions={
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-full border border-slate-700 text-slate-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-full bg-brand-600 text-white"
            >
              Save
            </button>
          </div>
        }
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Title</label>
            <input
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              className="mt-2 w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm"
              pattern={titleRegex.source}
              title="2-99 characters, letters and numbers"
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Author</label>
            <input
              value={form.author}
              onChange={(event) => setForm((prev) => ({ ...prev, author: event.target.value }))}
              className="mt-2 w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm"
              pattern={authorRegex.source}
              title="2-99 letters"
              required
            />
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default LibrarianBooks;
