import { CalendarClock, Clock, MapPin, Users } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { StatCard } from "../components/StatCard";
import { useLeaderDashboard } from "../context/LeaderDashboardContext";

export default function LeaderHome() {
  const { user } = useAuth();
  const { team, members, schedule, attendanceHistory, getRecentMembers } = useLeaderDashboard();

  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-[#23342f] p-6 text-white shadow-sm md:p-8">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.18em] text-white/55">Welcome back</p>
          <h2 className="mt-3 text-2xl font-semibold md:text-4xl">{user?.name}, your {team?.name} is ready.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/72">Manage your assigned team, mark meeting attendance, keep schedules current, and follow member participation without access to other teams or system settings.</p>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label="Team Members" value={String(members.length)} detail="Visible members are limited to your assigned team." />
        <StatCard icon={CalendarClock} label="Next Meeting" value={schedule?.day ?? "Not set"} detail={schedule ? `${schedule.time} at ${schedule.location}` : "Add a meeting schedule."} />
        <StatCard icon={Clock} label="Attendance Logs" value={String(attendanceHistory.length)} detail="Saved records remain in app state for this session." />
        <StatCard icon={MapPin} label="Team" value={team?.name ?? "Assigned"} detail={team?.description ?? "Role based access is active."} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-lg border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold">Recently joined members</h3>
              <p className="text-sm text-muted-foreground">Newest additions to {team?.name}.</p>
            </div>
          </div>
          <div className="mt-5 divide-y">
            {getRecentMembers().map((member) => (
              <div key={member.id} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="font-medium">{member.fullName}</p>
                  <p className="text-sm text-muted-foreground">{member.department} • {member.yearOfStudy}</p>
                </div>
                <time className="text-sm text-muted-foreground" dateTime={member.dateJoined}>{new Date(member.dateJoined).toLocaleDateString()}</time>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border bg-card p-5 shadow-sm">
          <h3 className="text-lg font-semibold">Current meeting schedule</h3>
          {schedule ? (
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Day</dt><dd className="font-medium">{schedule.day}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Time</dt><dd className="font-medium">{schedule.time}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Location</dt><dd className="font-medium text-right">{schedule.location}</dd></div>
            </dl>
          ) : <p className="mt-4 text-sm text-muted-foreground">No meeting schedule has been set.</p>}
        </section>
      </div>
    </div>
  );
}
