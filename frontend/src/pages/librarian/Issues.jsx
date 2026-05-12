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
  const [form, setForm] = useState({ memberId: "", bookId: "" });
  const idRegex = /^\d+$/;

  const mergedIssues = useMemo(() => {
    return issues.map((issue) => {
      const book = books.find((item) => item.bookId === issue.bookId);
      const member = members.find((item) => item.userId === issue.memberId);
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
    if (!idRegex.test(String(form.memberId)) || !idRegex.test(String(form.bookId))) {
      addToast({
        title: "Missing selection",
        message: "Select both a member and a book.",
        tone: "error"
      });
      return;
    }

    const selectedBook = books.find((book) => book.bookId === Number(form.bookId));
    if (!selectedBook?.availability) {
      addToast({ title: "Book unavailable", tone: "error" });
      return;
    }

    const activeCount = issues.filter(
      (issue) => issue.memberId === Number(form.memberId) && !issue.returnDate
    ).length;

    if (activeCount >= 3) {
      addToast({ title: "Member has 3 active books", tone: "error" });
      return;
    }

    const issue = await issueService.issueBook({
      bookId: Number(form.bookId),
      memberId: Number(form.memberId),
      issuedById: user.userId
    });

    setIssues((prev) => [issue, ...prev]);
    setBooks((prev) =>
      prev.map((book) =>
        book.bookId === issue.bookId ? { ...book, availability: false } : book
      )
    );
    addToast({ title: "Book issued", tone: "success" });
    setOpen(false);
    setForm({ memberId: "", bookId: "" });
  };

  const handleReturn = async (issue) => {
    await issueService.returnBook(issue.issueId);
    setIssues((prev) =>
      prev.map((item) =>
        item.issueId === issue.issueId ? { ...item, returnDate: new Date().toISOString() } : item
      )
    );
    setBooks((prev) =>
      prev.map((book) =>
        book.bookId === issue.bookId ? { ...book, availability: true } : book
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
              value={form.memberId}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, memberId: event.target.value }))
              }
              className="mt-2 w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm"
              required
            >
              <option value="">Select member</option>
              {members.map((member) => (
                <option key={member.userId} value={member.userId}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Book</label>
            <select
              value={form.bookId}
              onChange={(event) => setForm((prev) => ({ ...prev, bookId: event.target.value }))}
              className="mt-2 w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm"
              required
            >
              <option value="">Select book</option>
              {books.map((book) => (
                <option key={book.bookId} value={book.bookId}>
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
