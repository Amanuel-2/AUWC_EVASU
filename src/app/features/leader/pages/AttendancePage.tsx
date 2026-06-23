import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AttendanceStatus } from "../types";
import { useLeaderDashboard } from "../context/LeaderDashboardContext";

const statuses: AttendanceStatus[] = ["Present", "Absent", "Late", "Excused"];

export default function AttendancePage() {
  const { members, attendanceHistory, saveAttendance } = useLeaderDashboard();
  const [meetingDate, setMeetingDate] = useState(new Date().toISOString().slice(0, 10));
  const [query, setQuery] = useState("");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [records, setRecords] = useState<Record<string, AttendanceStatus>>({});

  useEffect(() => {
    setRecords((current) => {
      const next = { ...current };
      members.forEach((member) => {
        if (!next[member.id]) next[member.id] = "Present";
      });
      return next;
    });
  }, [members]);

  const filtered = useMemo(() => members.filter((member) => member.fullName.toLowerCase().includes(query.toLowerCase())), [members, query]);

  const setStatus = (memberId: string, status: AttendanceStatus) => setRecords((current) => ({ ...current, [memberId]: status }));

  const handleSave = async () => {
    setSaving(true);
    setNotice("");
    try {
      await saveAttendance(meetingDate, records);
      setNotice("Attendance saved for this meeting.");
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Attendance could not be saved.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <div><h2 className="text-2xl font-semibold">Attendance</h2><p className="text-sm text-muted-foreground">Mark and save attendance for your assigned team.</p></div>
      <section className="grid gap-3 rounded-lg border bg-card p-4 shadow-sm md:grid-cols-[220px_1fr_auto]">
        <input type="date" value={meetingDate} onChange={(event) => setMeetingDate(event.target.value)} className="h-11 rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" aria-label="Meeting date" />
        <label className="relative"><span className="sr-only">Search members</span><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search members" className="h-11 w-full rounded-md border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>
        <button type="button" onClick={handleSave} disabled={saving || !meetingDate} className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60">{saving ? "Saving..." : "Save attendance"}</button>
      </section>
      {notice && <p className="rounded-lg border border-primary/20 bg-primary/10 p-3 text-sm text-primary">{notice}</p>}
      <section className="rounded-lg border bg-card shadow-sm">
        {filtered.length === 0 ? <p className="p-8 text-center text-sm text-muted-foreground">No members found.</p> : filtered.map((member) => (
          <div key={member.id} className="flex flex-col gap-3 border-b p-4 last:border-b-0 lg:flex-row lg:items-center lg:justify-between">
            <div><p className="font-medium">{member.fullName}</p><p className="text-sm text-muted-foreground">{member.department} • {member.yearOfStudy}</p></div>
            <div className="grid grid-cols-2 gap-2 sm:flex">{statuses.map((status) => <button key={status} type="button" onClick={() => setStatus(member.id, status)} className={`rounded-md border px-3 py-2 text-sm transition ${records[member.id] === status ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:bg-accent"}`}>{status}</button>)}</div>
          </div>
        ))}
      </section>
      <section className="rounded-lg border bg-card p-5 shadow-sm"><h3 className="font-semibold">Attendance history</h3>{attendanceHistory.length === 0 ? <p className="mt-3 text-sm text-muted-foreground">No saved attendance records yet.</p> : <div className="mt-4 space-y-3">{attendanceHistory.map((record) => <div key={record.id} className="rounded-md border p-3 text-sm"><p className="font-medium">{new Date(record.meetingDate).toLocaleDateString()}</p><p className="text-muted-foreground">Saved {new Date(record.markedAt).toLocaleString()} • {Object.values(record.statuses).filter((status) => status === "Present").length} present</p></div>)}</div>}</section>
    </div>
  );
}
