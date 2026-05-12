import { useEffect, useMemo, useState } from "react";
import BookCard from "../../components/BookCard.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import Loader from "../../components/Loader.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import bookService from "../../services/bookService.js";

const MemberBooks = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return <Loader label="Loading catalog" />;
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-display text-white">Book catalog</h3>
          <p className="text-sm text-slate-400">Browse and search the full collection.</p>
        </div>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Find a title"
          validationRegex={searchRegex}
        />
      </div>

      {filtered.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((book) => (
            <BookCard key={book.bookId} book={book} />
          ))}
        </div>
      ) : (
        <EmptyState title="No results" description="Try a different keyword." />
      )}
    </section>
  );
};

export default MemberBooks;
