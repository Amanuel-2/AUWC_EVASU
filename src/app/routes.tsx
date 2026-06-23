import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Home from "./pages/Home";
import TeamDetails from "./pages/TeamDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequireTeamLeader from "./features/leader/components/RequireTeamLeader";
import LeaderLayout from "./features/leader/components/LeaderLayout";
import LeaderHome from "./features/leader/pages/LeaderHome";
import MembersPage from "./features/leader/pages/MembersPage";
import AttendancePage from "./features/leader/pages/AttendancePage";
import SchedulePage from "./features/leader/pages/SchedulePage";
import ProfilePage from "./features/leader/pages/ProfilePage";
import RequireAdmin from "./features/admin/components/RequireAdmin";
import AdminDashboard from "./features/admin/pages/AdminDashboard";
import BrandLogo from "./components/BrandLogo";
import { useLanguage } from "./context/LanguageContext";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "teams/:id", Component: TeamDetails },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      {
        path: "leader",
        Component: RequireTeamLeader,
        children: [
          {
            Component: LeaderLayout,
            children: [
              { index: true, Component: LeaderHome },
              { path: "members", Component: MembersPage },
              { path: "attendance", Component: AttendancePage },
              { path: "schedule", Component: SchedulePage },
              { path: "profile", Component: ProfilePage },
            ],
          },
        ],
      },
      {
        path: "admin",
        Component: RequireAdmin,
        children: [{ index: true, Component: AdminDashboard }],
      },
      {
        path: "*",
        Component: () => {
          const { t } = useLanguage();
          return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
              <BrandLogo compact />
              <h1 className="font-['DM_Serif_Display'] text-4xl text-foreground">{t("pageNotFound")}</h1>
              <p className="text-muted-foreground">{t("missingPage")}</p>
              <a href="/" className="mt-4 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors">
                {t("goHome")}
              </a>
            </div>
          );
        },
      },
    ],
  },
]);
