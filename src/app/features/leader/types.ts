export type AttendanceStatus = "Present" | "Absent" | "Late" | "Excused";

export interface Team {
  id: string;
  name: string;
  description: string;
}

export interface TeamMember {
  id: string;
  teamId: string;
  fullName: string;
  phone: string;
  department: string;
  yearOfStudy: string;
  gender: string;
  dateJoined: string;
  email: string;
  role: string;
  notes: string;
}

export interface MeetingSchedule {
  teamId: string;
  day: string;
  time: string;
  location: string;
}

export interface AttendanceRecord {
  id: string;
  teamId: string;
  meetingDate: string;
  markedAt: string;
  statuses: Record<string, AttendanceStatus>;
}
