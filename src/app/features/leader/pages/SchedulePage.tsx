import { FormEvent, useEffect, useState } from "react";
import { useLeaderDashboard } from "../context/LeaderDashboardContext";

export default function SchedulePage() {
  const { schedule, updateSchedule } = useLeaderDashboard();
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (schedule) { setDay(schedule.day); setTime(schedule.time); setLocation(schedule.location); } }, [schedule]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaved(false);
    if (!schedule || !day || !time || location.trim().length < 3) { setError("Enter a meeting day, time, and valid location."); return; }
    setError("");
    try {
      await updateSchedule({ ...schedule, day, time, location });
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Schedule could not be saved.");
    }
  };

  return (
    <div className="max-w-3xl space-y-5">
      <div><h2 className="text-2xl font-semibold">Meeting Schedule</h2><p className="text-sm text-muted-foreground">Update only your assigned team's meeting day, time, and location.</p></div>
      <form onSubmit={submit} className="space-y-4 rounded-lg border bg-card p-5 shadow-sm">
        {error && <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
        {saved && <p className="rounded-md border border-primary/20 bg-primary/10 p-3 text-sm text-primary">Schedule updated.</p>}
        <label className="block text-sm font-medium">Meeting day<select value={day} onChange={(event) => setDay(event.target.value)} className="mt-2 h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"><option value="">Select day</option>{["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="block text-sm font-medium">Meeting time<input type="time" value={time} onChange={(event) => setTime(event.target.value)} className="mt-2 h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>
        <label className="block text-sm font-medium">Location<input value={location} onChange={(event) => setLocation(event.target.value)} className="mt-2 h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>
        <button className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">Save schedule</button>
      </form>
    </div>
  );
}
