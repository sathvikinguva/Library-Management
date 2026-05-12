import { useEffect, useMemo, useState } from "react";
import IssueTable from "../../components/IssueTable.jsx";
import Modal from "../../components/Modal.jsx";
import ConfirmDialog from "../../components/ConfirmDialog.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import Loader from "../../components/Loader.jsx";
import { useToast } from "../../hooks/useToast.js";
import bookService from "../../services/bookService.js";
import issueService from "../../services/issueService.js";
import memberService from "../../services/memberService.js";
import { useAuth } from "../../hooks/useAuth.js";

const LibrarianIssues = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [books, setBooks] = useState([]);
  const [issues, setIssues] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [confirmIssue, setConfirmIssue] = useState(null);
  const [form, setForm] = useState({ member_id: "", book_id: "" });

  const mergedIssues = useMemo(() => {
    return issues.map((issue) => {
      const book = books.find((item) => item.book_id === issue.book_id);
      const member = members.find((item) => item.user_id === issue.member_id);
      return {
        ...issue,
        bookTitle: book?.title || "Unknown",
        memberName: member?.name || "Unknown"
      };
    });
  }, [issues, books, members]);

  useEffect(() => {
    const loadData = async () => {
      const [booksData, issuesData, membersData] = await Promise.all([
        bookService.getBooks(),
        issueService.getIssues(),
        memberService.getMembers()
      ]);
      setBooks(booksData);
      setIssues(issuesData);
      setMembers(membersData);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleIssue = async () => {
    const selectedBook = books.find((book) => book.book_id === Number(form.book_id));
    if (!selectedBook?.availability) {
      addToast({ title: "Book unavailable", tone: "error" });
      return;
    }

    const activeCount = issues.filter(
      (issue) => issue.member_id === Number(form.member_id) && !issue.return_date
    ).length;

    if (activeCount >= 3) {
      addToast({ title: "Member has 3 active books", tone: "error" });
      return;
    }

    const issue = await issueService.issueBook({
      book_id: Number(form.book_id),
      member_id: Number(form.member_id),
      issued_by: user.user_id
    });

    setIssues((prev) => [issue, ...prev]);
    setBooks((prev) =>
      prev.map((book) =>
        book.book_id === issue.book_id ? { ...book, availability: false } : book
      )
    );
    addToast({ title: "Book issued", tone: "success" });
    setOpen(false);
    setForm({ member_id: "", book_id: "" });
  };

  const handleReturn = async (issue) => {
    await issueService.returnBook(issue.issue_id);
    setIssues((prev) =>
      prev.map((item) =>
        item.issue_id === issue.issue_id ? { ...item, return_date: new Date().toISOString() } : item
      )
    );
    setBooks((prev) =>
      prev.map((book) =>
        book.book_id === issue.book_id ? { ...book, availability: true } : book
      )
    );
    addToast({ title: "Book returned", tone: "success" });
    setConfirmIssue(null);
  };

  if (loading) {
    return <Loader label="Loading issues" />;
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-display text-white">Active issues</h3>
          <p className="text-sm text-slate-400">Track and manage current book issues.</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-full bg-brand-600 text-white text-sm"
        >
          Issue book
        </button>
      </div>

      {mergedIssues.length ? (
        <IssueTable issues={mergedIssues} onReturn={setConfirmIssue} />
      ) : (
        <EmptyState title="No active issues" description="Issue a book to get started." />
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Issue a book"
        actions={
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-full border border-slate-700 text-slate-300"
            >
              Cancel
            </button>
            <button
              onClick={handleIssue}
              className="px-4 py-2 rounded-full bg-brand-600 text-white"
            >
              Issue
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Member</label>
            <select
              value={form.member_id}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, member_id: event.target.value }))
              }
              className="mt-2 w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm"
              required
            >
              <option value="">Select member</option>
              {members.map((member) => (
                <option key={member.user_id} value={member.user_id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Book</label>
            <select
              value={form.book_id}
              onChange={(event) => setForm((prev) => ({ ...prev, book_id: event.target.value }))}
              className="mt-2 w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm"
              required
            >
              <option value="">Select book</option>
              {books.map((book) => (
                <option key={book.book_id} value={book.book_id}>
                  {book.title} {book.availability ? "" : "(issued)"}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(confirmIssue)}
        title="Return this book?"
        description="This will mark the issue as returned and make the book available."
        onCancel={() => setConfirmIssue(null)}
        onConfirm={() => handleReturn(confirmIssue)}
      />
    </section>
  );
};

export default LibrarianIssues;
