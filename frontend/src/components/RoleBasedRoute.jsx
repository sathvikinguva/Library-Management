import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { ROUTES } from "../routes/routePaths.js";

const RoleBasedRoute = ({ allowedRoles }) => {
  const { role } = useAuth();

  if (!allowedRoles.includes(role)) {
    const fallback = role === "LIBRARIAN" ? ROUTES.librarian.dashboard : ROUTES.member.dashboard;
    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;
