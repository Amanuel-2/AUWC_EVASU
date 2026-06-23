import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { TeamMember } from "../types";
import { useLeaderDashboard } from "../context/LeaderDashboardContext";

export default function MembersPage() {
  const { members, team } = useLeaderDashboard();
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("all");
  const [year, setYear] = useState("all");
  const [selected, setSelected] = useState<TeamMember | null>(null);

  const departments = useMemo(() => Array.from(new Set(members.map((member) => member.department))).sort(), [members]);
  const years = useMemo(() => Array.from(new Set(members.map((member) => member.yearOfStudy))).sort(), [members]);
  const filtered = members.filter((member) => {
    const matchesQuery = member.fullName.toLowerCase().includes(query.toLowerCase());
    const matchesDepartment = department === "all" || member.department === department;
    const matchesYear = year === "all" || member.yearOfStudy === year;
    return matchesQuery && matchesDepartment && matchesYear;
  });

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold">Team Members</h2>
        <p className="text-sm text-muted-foreground">Showing members assigned to {team?.name}. Leaders cannot remove members.</p>
      </div>

      <section className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[1fr_220px_180px]">
          <label className="relative block">
            <span className="sr-only">Search members by name</span>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name" className="h-11 w-full rounded-md border bg-background pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
          </label>
          <label className="relative block">
            <span className="sr-only">Filter by department</span>
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={17} />
            <select value={department} onChange={(event) => setDepartment(event.target.value)} className="h-11 w-full rounded-md border bg-background pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20">
              <option value="all">All departments</option>
              {departments.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <select value={year} onChange={(event) => setYear(event.target.value)} className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" aria-label="Filter by year">
            <option value="all">All years</option>
            {years.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
      </section>

      {filtered.length === 0 ? (
        <div className="rounded-lg border bg-card p-8 text-center text-sm text-muted-foreground">No members match the current search and filters.</div>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-lg border bg-card shadow-sm md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/60 text-xs uppercase text-muted-foreground">
                <tr><th className="px-4 py-3">Full name</th><th className="px-4 py-3">Phone</th><th className="px-4 py-3">Department</th><th className="px-4 py-3">Year</th><th className="px-4 py-3">Gender</th><th className="px-4 py-3">Date joined</th></tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((member) => (
                  <tr key={member.id} onClick={() => setSelected(member)} className="cursor-pointer transition hover:bg-muted/40">
                    <td className="px-4 py-3 font-medium">{member.fullName}</td><td className="px-4 py-3">{member.phone}</td><td className="px-4 py-3">{member.department}</td><td className="px-4 py-3">{member.yearOfStudy}</td><td className="px-4 py-3">{member.gender}</td><td className="px-4 py-3">{new Date(member.dateJoined).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid gap-3 md:hidden">
            {filtered.map((member) => (
              <button key={member.id} type="button" onClick={() => setSelected(member)} className="rounded-lg border bg-card p-4 text-left shadow-sm transition hover:border-primary/50">
                <div className="flex items-start justify-between gap-3"><div><p className="font-semibold">{member.fullName}</p><p className="text-sm text-muted-foreground">{member.department} • {member.yearOfStudy}</p></div><span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary">{member.gender}</span></div>
                <p className="mt-3 text-sm text-muted-foreground">{member.phone}</p>
                <p className="mt-1 text-xs text-muted-foreground">Joined {new Date(member.dateJoined).toLocaleDateString()}</p>
              </button>
            ))}
          </div>
        </>
      )}

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected?.fullName}</DialogTitle>
            <DialogDescription>{selected?.role} in {team?.name}</DialogDescription>
          </DialogHeader>
          {selected && <dl className="grid gap-3 text-sm sm:grid-cols-2"><div><dt className="text-muted-foreground">Email</dt><dd className="font-medium">{selected.email}</dd></div><div><dt className="text-muted-foreground">Phone</dt><dd className="font-medium">{selected.phone}</dd></div><div><dt className="text-muted-foreground">Department</dt><dd className="font-medium">{selected.department}</dd></div><div><dt className="text-muted-foreground">Year</dt><dd className="font-medium">{selected.yearOfStudy}</dd></div><div><dt className="text-muted-foreground">Gender</dt><dd className="font-medium">{selected.gender}</dd></div><div><dt className="text-muted-foreground">Date joined</dt><dd className="font-medium">{new Date(selected.dateJoined).toLocaleDateString()}</dd></div><div className="sm:col-span-2"><dt className="text-muted-foreground">Notes</dt><dd className="font-medium">{selected.notes}</dd></div></dl>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
