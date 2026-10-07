import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { Search, UsersRound, UserRoundCheck, UserRoundX, X } from "lucide-react";
import { AdminOverview, AdminTeam, fetchAdminOverviewRequest } from "../../../api";
import { useAuth } from "../../../context/AuthContext";
import { useLanguage } from "../../../context/LanguageContext";
import LanguageToggle from "../../../components/LanguageToggle";

type Section = "overview" | "leaders" | "members";

const sections: { key: Section; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "leaders", label: "Team leaders" },
  { key: "members", label: "Members" },
];

function teamLeader(team: AdminTeam, overview: AdminOverview) {
  return overview.users.find((user) => team.memberIds.includes(user.id) && user.role === "team_leader");
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [section, setSection] = useState<Section>("overview");
  const [selectedTeam, setSelectedTeam] = useState<AdminTeam | null>(null);
  const [selectedMember, setSelectedMember] = useState<ApiUser | null>(null);
  const [query, setQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdminOverviewRequest()
      .then(setOverview)
      .catch((requestError: Error) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  const teams = overview?.teams ?? [];
  const users = overview?.users ?? [];
  const members = users.filter((member) => member.role === "member");
  const leaders = users.filter((member) => member.role === "team_leader");
  const assignedMemberIds = new Set(teams.flatMap((team) => team.memberIds));
  const unassignedMembers = members.filter((member) => !assignedMemberIds.has(member.id));

  const memberGroups = useMemo(() => {
    const groups = new Map<string, string[]>();
    for (const team of teams) {
      for (const memberId of team.memberIds) {
        groups.set(memberId, [...(groups.get(memberId) ?? []), team.name]);
      }
    }
    return groups;
  }, [teams]);

  const filteredMembers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return members.filter((member) => {
      const matchesQuery = !normalizedQuery || [member.name, member.email, member.phone, member.department].some((value) => value.toLowerCase().includes(normalizedQuery));
      const memberTeamNames = memberGroups.get(member.id) ?? [];
      const matchesGroup = groupFilter === "all" || (groupFilter === "unassigned" ? memberTeamNames.length === 0 : memberTeamNames.includes(groupFilter));
      return matchesQuery && matchesGroup;
    });
  }, [groupFilter, memberGroups, members, query]);

  const openGroup = (team: AdminTeam) => setSelectedTeam(team);

  return (
    <main className="min-h-screen bg-[#f7f8f5] p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 rounded-lg bg-[#0F2638] p-6 text-white shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-white/50">{t("adminDashboard")}</p>
            <h1 className="mt-2 text-2xl font-semibold md:text-4xl">{t("welcomeBack")}, {user?.name}</h1>
            <p className="mt-2 text-sm text-white/70">Manage groups, leaders, and members from one place.</p>
          </div>
          <div className="flex gap-3">
            <LanguageToggle light />
            <Link to="/" className="rounded-md bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/20">{t("publicSite")}</Link>
            <button onClick={logout} className="rounded-md bg-white px-4 py-2 text-sm font-medium text-[#0F2638] transition hover:bg-white/90">{t("logout")}</button>
          </div>
        </header>

        {error && <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}

        <nav className="flex gap-1 overflow-x-auto rounded-lg border bg-card p-1 shadow-sm">
          {sections.map((item) => <button key={item.key} onClick={() => setSection(item.key)} className={`whitespace-nowrap rounded-md px-4 py-2.5 text-sm font-medium transition ${section === item.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>{item.label}</button>)}
        </nav>

        {section === "overview" && <OverviewSection teams={teams} members={members} leaders={leaders} unassignedMembers={unassignedMembers} loading={loading} onSection={setSection} onShowUnassigned={() => { setGroupFilter("unassigned"); setSection("members"); }} />}

        {section === "leaders" && <section className="space-y-4"><SectionHeading title="Team leaders" description="See which group each leader manages." /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{leaders.map((leader) => { const team = teams.find((candidate) => candidate.memberIds.includes(leader.id)); return <article key={leader.id} className="rounded-lg border bg-card p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold">{leader.name}</h3><p className="mt-1 text-sm text-muted-foreground">{leader.email}</p></div><span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">Active</span></div><div className="mt-5 rounded-md bg-muted/50 p-3 text-sm"><p className="text-muted-foreground">Assigned group</p><p className="mt-1 font-medium">{team?.name ?? "Unassigned"}</p><p className="mt-1 text-muted-foreground">{team ? `${team.memberIds.filter((id) => id !== leader.id).length} members` : "No group assigned"}</p></div>{team && <button onClick={() => openGroup(team)} className="mt-4 w-full rounded-md border px-3 py-2 text-sm font-medium transition hover:bg-muted">View group</button>}</article>})}</div>{!loading && !leaders.length && <EmptyState message="No team leaders have been assigned yet." />}</section>}

        {section === "members" && <section className="space-y-4"><SectionHeading title="Members" description="Search members and select a person to view their contact details." /><div className="flex flex-col gap-3 rounded-lg border bg-card p-4 shadow-sm md:flex-row"><label className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, email, phone, or department" className="w-full rounded-md border bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary" /></label><select value={groupFilter} onChange={(event) => setGroupFilter(event.target.value)} className="rounded-md border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary md:w-64"><option value="all">All groups</option><option value="unassigned">Unassigned members</option>{teams.map((team) => <option key={team.slug} value={team.name}>{team.name}</option>)}</select></div><div className="overflow-x-auto rounded-lg border bg-card shadow-sm"><table className="w-full min-w-[760px] text-left text-sm"><thead><tr className="border-b text-muted-foreground"><th className="px-4 py-3 font-medium">Member</th><th className="px-4 py-3 font-medium">Group</th><th className="px-4 py-3 font-medium">Department</th><th className="px-4 py-3 font-medium">Year</th><th className="px-4 py-3 font-medium">Contact</th></tr></thead><tbody>{filteredMembers.map((member) => <tr key={member.id} className="border-b last:border-0"><td className="px-4 py-3"><button type="button" onClick={() => setSelectedMember(member)} className="text-left"><p className="font-medium text-primary hover:underline">{member.name}</p><p className="text-xs text-muted-foreground">{member.email}</p></button></td><td className="px-4 py-3">{memberGroups.get(member.id)?.join(", ") || <span className="text-muted-foreground">Unassigned</span>}</td><td className="px-4 py-3">{member.department || "—"}</td><td className="px-4 py-3">{member.yearOfStudy || "—"}</td><td className="px-4 py-3">{member.phone ? <><span className="mr-3">{member.phone}</span><a href={`tel:${member.phone}`} className="text-primary hover:underline">Call</a></> : <span className="text-muted-foreground">No number</span>}</td></tr>)}</tbody></table>{!loading && !filteredMembers.length && <EmptyState message="No members match your filters." />}</div></section>}

        {selectedTeam && overview && <GroupDetails team={selectedTeam} overview={overview} onClose={() => setSelectedTeam(null)} />}
        {selectedMember && <MemberDetails member={selectedMember} groups={memberGroups.get(selectedMember.id) ?? []} onClose={() => setSelectedMember(null)} />}
      </div>
    </main>
  );
}

function SectionHeading({ title, description }: { title: string; description: string }) {
  return <div><h2 className="text-xl font-semibold">{title}</h2><p className="mt-1 text-sm text-muted-foreground">{description}</p></div>;
}

function OverviewSection({ teams, members, leaders, unassignedMembers, loading, onSection, onShowUnassigned }: { teams: AdminTeam[]; members: AdminOverview["users"]; leaders: AdminOverview["users"]; unassignedMembers: AdminOverview["users"]; loading: boolean; onSection: (section: Section) => void; onShowUnassigned: () => void }) {
  const cards = [
    { label: "Total members", value: members.length, icon: UsersRound },
    { label: "Team leaders", value: leaders.length, icon: UserRoundCheck },
    { label: "Total groups", value: teams.length, icon: UsersRound },
    { label: "Unassigned members", value: unassignedMembers.length, icon: UserRoundX },
  ];
  return <section className="space-y-6"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map((card) => <button key={card.label} type="button" onClick={() => card.label === "Total members" ? onSection("members") : card.label === "Team leaders" || card.label === "Total groups" ? onSection("leaders") : onShowUnassigned()} className="rounded-lg border bg-card p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">{card.label}</p><p className="mt-2 text-3xl font-semibold">{loading ? "—" : card.value}</p><p className="mt-2 text-xs text-primary">View details →</p></div><div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary"><card.icon size={21} /></div></div></button>)}</div><div><SectionHeading title="Team leader assignments" description="Groups are shown here through their assigned team leaders." /><div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{leaders.slice(0, 6).map((leader) => <button key={leader.id} type="button" onClick={() => onSection("leaders")} className="rounded-lg border bg-card p-5 text-left shadow-sm transition hover:border-primary/40 hover:shadow-md"><p className="font-semibold">{leader.name}</p><p className="mt-1 text-sm text-muted-foreground">{teams.find((team) => team.memberIds.includes(leader.id))?.name ?? "Unassigned"}</p><p className="mt-3 text-xs text-primary">View leader details →</p></button>)}</div></div>{unassignedMembers.length > 0 && <button type="button" onClick={onShowUnassigned} className="w-full rounded-lg border border-amber-200 bg-amber-50 p-4 text-left text-sm text-amber-900 hover:bg-amber-100">{unassignedMembers.length} member{unassignedMembers.length === 1 ? "" : "s"} are not assigned to a group. View members →</button>}</section>;
}

function GroupCard({ team, overview, onView }: { team: AdminTeam; overview: AdminOverview; onView: () => void }) {
  const leader = teamLeader(team, overview);
  const memberCount = team.memberIds.filter((id) => id !== leader?.id).length;
  return <article className="rounded-lg border bg-card p-5 shadow-sm"><div className="flex items-start justify-between gap-4"><div><h3 className="font-semibold">{team.name}</h3><p className="mt-1 text-sm text-muted-foreground">{team.tagline}</p></div><span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">{memberCount} members</span></div><div className="mt-5 rounded-md bg-muted/50 p-3 text-sm"><p className="text-muted-foreground">Team leader</p><p className="mt-1 font-medium">{leader?.name ?? "No leader assigned"}</p></div><button onClick={onView} className="mt-4 w-full rounded-md border px-3 py-2 text-sm font-medium transition hover:bg-muted">View group</button></article>;
}

function GroupDetails({ team, overview, onClose }: { team: AdminTeam; overview: AdminOverview; onClose: () => void }) {
  const leader = teamLeader(team, overview);
  const members = team.memberIds.map((id) => overview.users.find((user) => user.id === id)).filter((member) => member && member.id !== leader?.id);
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-6" onClick={onClose}><div role="dialog" aria-modal="true" aria-label={`${team.name} details`} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-xl bg-card p-6 shadow-xl sm:rounded-xl" onClick={(event) => event.stopPropagation()}><div className="flex items-start justify-between gap-4"><div><p className="text-sm text-muted-foreground">Group details</p><h2 className="mt-1 text-2xl font-semibold">{team.name}</h2><p className="mt-1 text-sm text-muted-foreground">{team.description}</p></div><button onClick={onClose} className="rounded-md p-2 text-muted-foreground hover:bg-muted" aria-label="Close"><X size={20} /></button></div><div className="mt-6 grid gap-3 sm:grid-cols-2"><div className="rounded-md bg-muted/50 p-4"><p className="text-sm text-muted-foreground">Team leader</p><p className="mt-1 font-medium">{leader?.name ?? "No leader assigned"}</p>{leader && <p className="mt-1 text-sm text-muted-foreground">{leader.email}</p>}</div><div className="rounded-md bg-muted/50 p-4"><p className="text-sm text-muted-foreground">Members</p><p className="mt-1 text-xl font-semibold">{members.length}</p></div></div><h3 className="mt-6 font-semibold">Member list</h3><div className="mt-3 divide-y rounded-md border">{members.length ? members.map((member) => <div key={member!.id} className="flex flex-col justify-between gap-1 p-3 text-sm sm:flex-row"><div><p className="font-medium">{member!.name}</p><p className="text-muted-foreground">{member!.department || "Department not provided"} · {member!.yearOfStudy || "Year not provided"}</p></div><p className="text-muted-foreground">{member!.email}</p></div>) : <p className="p-4 text-sm text-muted-foreground">No members are assigned to this group.</p>}</div></div></div>;
}

function EmptyState({ message }: { message: string }) {
  return <div className="rounded-lg border border-dashed bg-card p-10 text-center text-sm text-muted-foreground">{message}</div>;
}

function MemberDetails({ member, groups, onClose }: { member: ApiUser; groups: string[]; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-6" onClick={onClose}><div role="dialog" aria-modal="true" aria-label={`${member.name} details`} className="w-full max-w-lg rounded-t-xl bg-card p-6 shadow-xl sm:rounded-xl" onClick={(event) => event.stopPropagation()}><div className="flex items-start justify-between gap-4"><div><p className="text-sm text-muted-foreground">Member details</p><h2 className="mt-1 text-2xl font-semibold">{member.name}</h2><p className="mt-1 text-sm capitalize text-muted-foreground">{member.role.replace("_", " ")}</p></div><button onClick={onClose} className="rounded-md p-2 text-muted-foreground hover:bg-muted" aria-label="Close"><X size={20} /></button></div><dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2"><div><dt className="text-muted-foreground">Phone</dt><dd className="mt-1 font-medium">{member.phone || "Not provided"}</dd></div><div><dt className="text-muted-foreground">Email</dt><dd className="mt-1 break-all font-medium">{member.email}</dd></div><div><dt className="text-muted-foreground">Department</dt><dd className="mt-1 font-medium">{member.department || "Not provided"}</dd></div><div><dt className="text-muted-foreground">Year of study</dt><dd className="mt-1 font-medium">{member.yearOfStudy || "Not provided"}</dd></div><div className="sm:col-span-2"><dt className="text-muted-foreground">Groups</dt><dd className="mt-1 font-medium">{groups.length ? groups.join(", ") : "Unassigned"}</dd></div></dl><div className="mt-6 flex gap-3"><a href={`mailto:${member.email}`} className="flex-1 rounded-md bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90">Email member</a>{member.phone && <a href={`tel:${member.phone}`} className="flex-1 rounded-md border px-4 py-2.5 text-center text-sm font-medium hover:bg-muted">Call member</a>}</div></div></div>;
}
