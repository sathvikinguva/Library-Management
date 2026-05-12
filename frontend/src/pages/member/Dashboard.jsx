import { useEffect, useMemo, useState } from "react";
import IssueTable from "../../components/IssueTable.jsx";
import StatsCard from "../../components/StatsCard.jsx";
import Loader from "../../components/Loader.jsx";
import issueService from "../../services/issueService.js";
import bookService from "../../services/bookService.js";
import { useAuth } from "../../hooks/useAuth.js";

const MemberDashboard = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [issueData, bookData] = await Promise.all([
        issueService.getIssues(),
        bookService.getBooks()
      ]);
      setIssues(issueData);
      setBooks(bookData);
      setLoading(false);
    };

    loadData();
  }, []);

  const myIssues = useMemo(() => {
    return issues
      .filter((issue) => issue.member_id === user.user_id)
      .map((issue) => {
        const book = books.find((item) => item.book_id === issue.book_id);
        return {
          ...issue,
          bookTitle: book?.title || "Unknown",
          memberName: user.name
        };
      });
  }, [issues, books, user]);

  const activeCount = myIssues.filter((issue) => !issue.return_date).length;

  if (loading) {
    return <Loader label="Loading dashboard" />;
  }

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <StatsCard label="Active borrows" value={activeCount} />
        <StatsCard label="Total books" value={myIssues.length} />
      </div>
      <div className="space-y-3">
        <h3 className="text-xl font-display text-white">My borrowed books</h3>
        <IssueTable issues={myIssues} />
      </div>
    </section>
  );
};

export default MemberDashboard;
