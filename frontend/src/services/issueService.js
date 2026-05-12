import api from "../api/axios.js";
import { mockStore } from "./mockData.js";

const getIssues = async () => {
  try {
    const response = await api.get("/issues");
    return response.data;
  } catch {
    return [...mockStore.issues];
  }
};

const issueBook = async ({ book_id, member_id, issued_by }) => {
  try {
    const response = await api.post("/issues/issue", { book_id, member_id, issued_by });
    return response.data;
  } catch {
    const issue = {
      issue_id: Date.now(),
      book_id,
      member_id,
      issued_by,
      issue_date: new Date().toISOString(),
      return_date: null
    };
    mockStore.issues = [issue, ...mockStore.issues];
    mockStore.books = mockStore.books.map((book) =>
      book.book_id === book_id ? { ...book, availability: false } : book
    );
    return issue;
  }
};

const returnBook = async (issueId) => {
  try {
    const response = await api.put(`/issues/return/${issueId}`);
    return response.data;
  } catch {
    const issue = mockStore.issues.find((entry) => entry.issue_id === issueId);
    if (!issue) throw new Error("Issue not found");

    issue.return_date = new Date().toISOString();
    mockStore.books = mockStore.books.map((book) =>
      book.book_id === issue.book_id ? { ...book, availability: true } : book
    );
    return issue;
  }
};

export default { getIssues, issueBook, returnBook };
