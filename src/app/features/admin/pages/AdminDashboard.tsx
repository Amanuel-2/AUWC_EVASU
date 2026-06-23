import { CalendarPlus, Settings, ShieldCheck, UsersRound } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../../../context/AuthContext";

const cards = [
  { label: "Total teams", value: "12", detail: "System-wide fellowship teams", icon: UsersRound },
  { label: "Upcoming events", value: "8", detail: "Admin-only event creation area", icon: CalendarPlus },
  { label: "Access roles", value: "3", detail: "Admin, team leader, member", icon: ShieldCheck },
  { label: "Settings", value: "Active", detail: "System-wide configuration", icon: Settings },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <main className="min-h-screen bg-[#f7f8f5] p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 rounded-lg bg-[#0F2638] p-6 text-white shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-white/50">Admin Dashboard</p>
            <h1 className="mt-2 text-2xl font-semibold md:text-4xl">Welcome, {user?.name}</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/70">This is the protected admin area for system-wide management. Team leaders should use their separate `/leader` dashboard.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/" className="rounded-md bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/20">Public site</Link>
            <button onClick={logout} className="rounded-md bg-white px-4 py-2 text-sm font-medium text-[#0F2638] transition hover:bg-white/90">Logout</button>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <article key={card.label} className="rounded-lg border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div><p className="text-sm text-muted-foreground">{card.label}</p><p className="mt-2 text-2xl font-semibold">{card.value}</p></div>
                <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary"><card.icon size={22} /></div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{card.detail}</p>
            </article>
          ))}
        </section>

        <section className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Admin scope</h2>
          <p className="mt-2 text-sm text-muted-foreground">Admins can manage global teams, events, roles, and system settings. Those capabilities are mocked here and can be expanded into full modules next.</p>
        </section>
      </div>
    </main>
  );
}
