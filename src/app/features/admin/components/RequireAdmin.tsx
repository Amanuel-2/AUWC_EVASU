import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../../../context/AuthContext";

export default function RequireAdmin() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
}
