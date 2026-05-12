import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login.jsx";
import LibrarianDashboard from "../pages/librarian/Dashboard.jsx";
import LibrarianBooks from "../pages/librarian/Books.jsx";
import LibrarianIssues from "../pages/librarian/Issues.jsx";
import LibrarianMembers from "../pages/librarian/Members.jsx";
import MemberDashboard from "../pages/member/Dashboard.jsx";
import MemberBooks from "../pages/member/Books.jsx";
import MemberProfile from "../pages/member/Profile.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import RoleBasedRoute from "../components/RoleBasedRoute.jsx";
import AppLayout from "../layouts/AppLayout.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import { ROUTES } from "./routePaths.js";
import { useAuth } from "../hooks/useAuth.js";

const AppRoutes = () => {
  const { role, isAuthenticated } = useAuth();

  const roleHome = role === "LIBRARIAN" ? ROUTES.librarian.dashboard : ROUTES.member.dashboard;

  return (
    <Routes>
      <Route
        path={ROUTES.root}
        element={<Navigate to={isAuthenticated ? roleHome : ROUTES.login} replace />}
      />
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.login} element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute />}> 
        <Route element={<AppLayout />}>
          <Route
            element={<RoleBasedRoute allowedRoles={["LIBRARIAN"]} />}
          >
            <Route path={ROUTES.librarian.dashboard} element={<LibrarianDashboard />} />
            <Route path={ROUTES.librarian.books} element={<LibrarianBooks />} />
            <Route path={ROUTES.librarian.issues} element={<LibrarianIssues />} />
            <Route path={ROUTES.librarian.members} element={<LibrarianMembers />} />
          </Route>

          <Route
            element={<RoleBasedRoute allowedRoles={["MEMBER"]} />}
          >
            <Route path={ROUTES.member.dashboard} element={<MemberDashboard />} />
            <Route path={ROUTES.member.books} element={<MemberBooks />} />
            <Route path={ROUTES.member.profile} element={<MemberProfile />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.login} replace />} />
    </Routes>
  );
};

export default AppRoutes;
