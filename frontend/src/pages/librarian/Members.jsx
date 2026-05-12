import { useEffect, useMemo, useState } from "react";
import MemberTable from "../../components/MemberTable.jsx";
import IssueTable from "../../components/IssueTable.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import Loader from "../../components/Loader.jsx";
import memberService from "../../services/memberService.js";
import issueService from "../../services/issueService.js";
import bookService from "../../services/bookService.js";

const LibrarianMembers = () => {
  const [members, setMembers] = useState([]);
  const [issues, setIssues] = useState([]);
  const [books, setBooks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [memberData, issueData, bookData] = await Promise.all([
        memberService.getMembers(),
        issueService.getIssues(),
        bookService.getBooks()
      ]);
      setMembers(memberData);
      setIssues(issueData);
      setBooks(bookData);
      setSelected(memberData[0] || null);
      setLoading(false);
    };

    loadData();
  }, []);

  const enrichedMembers = useMemo(() => {
    return members.map((member) => ({
      ...member,
      activeCount: issues.filter(
        (issue) => issue.memberId === member.userId && !issue.returnDate
      ).length
    }));
  }, [members, issues]);

  const memberIssues = useMemo(() => {
    if (!selected) return [];
    return issues
      .filter((issue) => issue.memberId === selected.userId)
      .map((issue) => {
        const book = books.find((item) => item.bookId === issue.bookId);
        return {
          ...issue,
          bookTitle: book?.title || "Unknown",
          memberName: selected.name
        };
      });
  }, [issues, books, selected]);

  if (loading) {
    return <Loader label="Loading members" />;
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-4">
        <h3 className="text-xl font-display text-white">Members</h3>
        {enrichedMembers.length ? (
          <MemberTable members={enrichedMembers} onSelect={setSelected} />
        ) : (
          <EmptyState title="No members" description="Invite members to start tracking issues." />
        )}
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-display text-white">Member activity</h3>
        {memberIssues.length ? (
          <IssueTable issues={memberIssues} />
        ) : (
          <EmptyState title="No issues" description="Select a member to view history." />
        )}
      </div>
    </section>
  );
};

export default LibrarianMembers;
