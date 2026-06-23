import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import { LeaderDashboardProvider } from "../context/LeaderDashboardContext";

export default function RequireTeamLeader() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (user.role !== "team_leader" || !user.assignedTeamId) return <Navigate to="/" replace />;

  return (
    <LeaderDashboardProvider>
      <Outlet />
    </LeaderDashboardProvider>
  );
}
