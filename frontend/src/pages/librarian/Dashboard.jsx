import { useEffect, useState } from "react";
import StatsCard from "../../components/StatsCard.jsx";
import Loader from "../../components/Loader.jsx";
import bookService from "../../services/bookService.js";
import issueService from "../../services/issueService.js";
import memberService from "../../services/memberService.js";

const LibrarianDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      const [books, issues, members] = await Promise.all([
        bookService.getBooks(),
        issueService.getIssues(),
        memberService.getMembers()
      ]);

      const totalBooks = books.length;
      const availableBooks = books.filter((book) => book.availability).length;
      const issuedBooks = totalBooks - availableBooks;

      setStats({
        totalBooks,
        availableBooks,
        issuedBooks,
        totalMembers: members.length
      });
    };

    loadStats();
  }, []);

  if (!stats) {
    return <Loader label="Loading dashboard" />;
  }

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Total Books" value={stats.totalBooks} />
        <StatsCard label="Available" value={stats.availableBooks} />
        <StatsCard label="Issued" value={stats.issuedBooks} />
        <StatsCard label="Members" value={stats.totalMembers} />
      </div>
      <div className="rounded-3xl p-6 bg-slate-900/70 border border-slate-800">
        <h3 className="text-xl font-display text-white">Today at a glance</h3>
        <p className="mt-2 text-slate-400 text-sm">
          Monitor book circulation and member activity with instant insights.
        </p>
      </div>
    </section>
  );
};

export default LibrarianDashboard;
