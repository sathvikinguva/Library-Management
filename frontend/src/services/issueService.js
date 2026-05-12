import { getIssues, issueBook, returnBook } from "../api/axios.js";

const createIssue = async ({ bookId, memberId, issuedById }) =>
  issueBook({ bookId, memberId, issuedById });

export default { getIssues, issueBook: createIssue, returnBook };
