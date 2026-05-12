import { ROUTES } from "./routePaths.js";

export const NAV_ITEMS = {
  LIBRARIAN: [
    { label: "Overview", path: ROUTES.librarian.dashboard },
    { label: "Books", path: ROUTES.librarian.books },
    { label: "Issues", path: ROUTES.librarian.issues },
    { label: "Members", path: ROUTES.librarian.members }
  ],
  MEMBER: [
    { label: "My Dashboard", path: ROUTES.member.dashboard },
    { label: "Book Catalog", path: ROUTES.member.books },
    { label: "Profile", path: ROUTES.member.profile }
  ]
};
