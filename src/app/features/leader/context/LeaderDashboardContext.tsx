import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { fetchLeaderTeam, fetchMeetingSchedule, fetchTeamMembers, saveAttendanceRecord, saveMeetingSchedule } from "../mockApi";
import { AttendanceRecord, AttendanceStatus, MeetingSchedule, Team, TeamMember } from "../types";

interface LeaderDashboardContextValue {
  team: Team | null;
  members: TeamMember[];
  schedule: MeetingSchedule | null;
  attendanceHistory: AttendanceRecord[];
  loading: boolean;
  error: string;
  updateSchedule: (schedule: MeetingSchedule) => Promise<void>;
  saveAttendance: (meetingDate: string, statuses: Record<string, AttendanceStatus>) => Promise<void>;
  getRecentMembers: () => TeamMember[];
}

const LeaderDashboardContext = createContext<LeaderDashboardContextValue | null>(null);

export function LeaderDashboardProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [team, setTeam] = useState<Team | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [schedule, setSchedule] = useState<MeetingSchedule | null>(null);
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    async function loadDashboardData() {
      if (!user?.assignedTeamId) return;
      setLoading(true);
      setError("");
      try {
        const [teamData, memberData, scheduleData] = await Promise.all([
          fetchLeaderTeam(user.assignedTeamId),
          fetchTeamMembers(user.assignedTeamId),
          fetchMeetingSchedule(user.assignedTeamId),
        ]);
        if (!mounted) return;
        setTeam(teamData);
        setMembers(memberData);
        setSchedule(scheduleData);
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : "Something went wrong while loading dashboard data.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadDashboardData();
    return () => { mounted = false; };
  }, [user?.assignedTeamId]);

  const updateSchedule = async (nextSchedule: MeetingSchedule) => {
    if (nextSchedule.teamId !== user?.assignedTeamId) throw new Error("You can only update your assigned team's schedule.");
    const saved = await saveMeetingSchedule(nextSchedule);
    setSchedule(saved);
  };

  const saveAttendance = async (meetingDate: string, statuses: Record<string, AttendanceStatus>) => {
    if (!user?.assignedTeamId) return;
    const record: AttendanceRecord = {
      id: crypto.randomUUID(),
      teamId: user.assignedTeamId,
      meetingDate,
      markedAt: new Date().toISOString(),
      statuses,
    };
    const saved = await saveAttendanceRecord(record);
    setAttendanceHistory((items) => [saved, ...items]);
  };

  const value = useMemo<LeaderDashboardContextValue>(() => ({
    team,
    members,
    schedule,
    attendanceHistory,
    loading,
    error,
    updateSchedule,
    saveAttendance,
    getRecentMembers: () => [...members].sort((a, b) => b.dateJoined.localeCompare(a.dateJoined)).slice(0, 4),
  }), [attendanceHistory, error, loading, members, schedule, team]);

  return <LeaderDashboardContext.Provider value={value}>{children}</LeaderDashboardContext.Provider>;
}

export function useLeaderDashboard() {
  const context = useContext(LeaderDashboardContext);
  if (!context) throw new Error("useLeaderDashboard must be used within LeaderDashboardProvider");
  return context;
}
