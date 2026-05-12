export const mockStore = {
  users: [
    {
      user_id: 1,
      name: "Ava Reynolds",
      email: "librarian@lib.com",
      role: "LIBRARIAN"
    },
    {
      user_id: 2,
      name: "Noah Turner",
      email: "member@lib.com",
      role: "MEMBER"
    },
    {
      user_id: 3,
      name: "Maya Patel",
      email: "maya@lib.com",
      role: "MEMBER"
    }
  ],
  books: [
    { book_id: 101, title: "The Midnight Index", author: "C. Harper", availability: true },
    { book_id: 102, title: "Solar Syntax", author: "L. Briggs", availability: false },
    { book_id: 103, title: "City of Glass", author: "I. Hayes", availability: true },
    { book_id: 104, title: "Ocean Between Pages", author: "N. Skye", availability: true },
    { book_id: 105, title: "Silent Algorithms", author: "R. Kim", availability: false }
  ],
  issues: [
    {
      issue_id: 9001,
      book_id: 102,
      member_id: 2,
      issued_by: 1,
      issue_date: "2026-05-01",
      return_date: null
    },
    {
      issue_id: 9002,
      book_id: 105,
      member_id: 3,
      issued_by: 1,
      issue_date: "2026-05-04",
      return_date: null
    }
  ]
};
