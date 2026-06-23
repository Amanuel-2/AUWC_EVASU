import { Bell, CalendarDays, ClipboardCheck, Home, LogOut, Menu, User, Users, X } from "lucide-react";
import { ReactNode, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import { useLeaderDashboard } from "../context/LeaderDashboardContext";

const navigation = [
  { to: "/leader", label: "Dashboard", icon: Home, end: true },
  { to: "/leader/members", label: "Team Members", icon: Users },
  { to: "/leader/attendance", label: "Attendance", icon: ClipboardCheck },
  { to: "/leader/schedule", label: "Meeting Schedule", icon: CalendarDays },
  { to: "/leader/profile", label: "Profile", icon: User },
];

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { logout } = useAuth();
  const { team } = useLeaderDashboard();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="flex h-full flex-col bg-[#0F2638] text-white">
      <div className="border-b border-white/10 p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-white/45">Team Leader</p>
        <h2 className="mt-2 text-xl font-semibold">AUWC ECSF Hub</h2>
        <p className="mt-1 text-sm text-white/60">{team?.name ?? "Assigned team"}</p>
      </div>
      <nav className="flex-1 space-y-1 p-3" aria-label="Leader dashboard">
        {navigation.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all duration-200 ${isActive ? "bg-white text-[#0F2638] shadow-sm" : "text-white/72 hover:bg-white/10 hover:text-white"}`
            }
          >
            <item.icon size={18} aria-hidden="true" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-white/10 p-3">
        <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white/72 transition-colors hover:bg-white/10 hover:text-white">
          <LogOut size={18} aria-hidden="true" />
          Logout
        </button>
      </div>
    </aside>
  );
}

function TopBar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { user } = useAuth();
  const { team } = useLeaderDashboard();
  return (
    <header className="sticky top-0 z-20 border-b bg-background/95 px-4 py-3 backdrop-blur md:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onOpenMenu} className="inline-flex size-10 items-center justify-center rounded-md border text-foreground transition-colors hover:bg-accent lg:hidden" aria-label="Open navigation">
            <Menu size={20} />
          </button>
          <div>
            <p className="text-sm text-muted-foreground">{team?.name ?? "Team dashboard"}</p>
            <h1 className="text-lg font-semibold text-foreground sm:text-xl">Leader Workspace</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative inline-flex size-10 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground" aria-label="Notifications">
            <Bell size={18} />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-[#F26F5B]" />
          </button>
          <div className="hidden items-center gap-3 rounded-md border px-3 py-2 sm:flex">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              {user?.avatarUrl ? <img src={user.avatarUrl} alt="" className="size-8 rounded-full object-cover" /> : user?.name.slice(0, 1).toUpperCase()}
            </div>
            <div className="leading-tight">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">Team Leader</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function LoadingGate({ children }: { children: ReactNode }) {
  const { loading, error } = useLeaderDashboard();
  if (loading) {
    return <div className="grid min-h-[60vh] place-items-center p-6"><div className="w-full max-w-md space-y-3"><div className="h-4 w-28 animate-pulse rounded bg-muted" /><div className="h-24 animate-pulse rounded-lg bg-muted" /><div className="grid grid-cols-2 gap-3"><div className="h-20 animate-pulse rounded-lg bg-muted" /><div className="h-20 animate-pulse rounded-lg bg-muted" /></div></div></div>;
  }
  if (error) return <div className="m-6 rounded-lg border border-destructive/30 bg-destructive/10 p-5 text-sm text-destructive">{error}</div>;
  return <>{children}</>;
}

export default function LeaderLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#f7f8f5]">
      <div className="fixed inset-y-0 left-0 z-30 hidden w-72 lg:block"><Sidebar /></div>
      <div className={`fixed inset-0 z-40 bg-black/45 transition-opacity lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setOpen(false)} />
      <div className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[86vw] transform transition-transform duration-300 lg:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <button type="button" onClick={() => setOpen(false)} className="absolute right-3 top-3 z-10 inline-flex size-9 items-center justify-center rounded-md bg-white/10 text-white" aria-label="Close navigation"><X size={18} /></button>
        <Sidebar onNavigate={() => setOpen(false)} />
      </div>
      <div className="lg:pl-72">
        <TopBar onOpenMenu={() => setOpen(true)} />
        <main className="p-4 md:p-6"><LoadingGate><Outlet /></LoadingGate></main>
      </div>
    </div>
  );
}
