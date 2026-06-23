import { AttendanceRecord, MeetingSchedule, Team, TeamMember } from "./types";

const teams: Team[] = [
  { id: "media", name: "Media Team", description: "Photography, announcements, livestream, and digital storytelling." },
  { id: "worship", name: "Worship Team", description: "Music, prayer, and chapel service coordination." },
  { id: "outreach", name: "Outreach Team", description: "Community service and campus engagement." },
];

const members: TeamMember[] = [
  { id: "m-001", teamId: "media", fullName: "Hodan Ali", phone: "+253 77 100 421", department: "Communication", yearOfStudy: "Year 3", gender: "Female", dateJoined: "2025-09-14", email: "hodan.ali@university.edu", role: "Photographer", notes: "Leads event photo coverage." },
  { id: "m-002", teamId: "media", fullName: "Samuel Okello", phone: "+253 77 204 876", department: "Computer Science", yearOfStudy: "Year 2", gender: "Male", dateJoined: "2025-10-03", email: "samuel.okello@university.edu", role: "Livestream Operator", notes: "Handles Sunday broadcast setup." },
  { id: "m-003", teamId: "media", fullName: "Mariam Hassan", phone: "+253 77 334 119", department: "Business", yearOfStudy: "Year 4", gender: "Female", dateJoined: "2025-08-27", email: "mariam.hassan@university.edu", role: "Content Coordinator", notes: "Owns weekly announcement calendar." },
  { id: "m-004", teamId: "media", fullName: "Daniel Tesfaye", phone: "+253 77 814 020", department: "Engineering", yearOfStudy: "Year 1", gender: "Male", dateJoined: "2026-01-18", email: "daniel.tesfaye@university.edu", role: "Video Editor", notes: "Edits reels and recap videos." },
  { id: "m-005", teamId: "media", fullName: "Amina Roble", phone: "+253 77 231 602", department: "Communication", yearOfStudy: "Year 2", gender: "Female", dateJoined: "2026-02-05", email: "amina.roble@university.edu", role: "Social Media", notes: "Schedules Instagram posts." },
  { id: "m-006", teamId: "media", fullName: "Peter Mwangi", phone: "+253 77 712 558", department: "Design", yearOfStudy: "Year 3", gender: "Male", dateJoined: "2026-03-12", email: "peter.mwangi@university.edu", role: "Graphics Designer", notes: "Creates sermon and event artwork." },
  { id: "m-101", teamId: "worship", fullName: "Grace Mensah", phone: "+253 77 555 000", department: "Music", yearOfStudy: "Year 3", gender: "Female", dateJoined: "2025-09-01", email: "grace.mensah@university.edu", role: "Vocalist", notes: "Other team data, hidden from Media leader." },
];

const schedules: MeetingSchedule[] = [
  { teamId: "media", day: "Thursday", time: "17:30", location: "Student Center Studio" },
  { teamId: "worship", day: "Tuesday", time: "18:00", location: "Chapel Hall" },
  { teamId: "outreach", day: "Saturday", time: "10:00", location: "Fellowship Office" },
];

const wait = () => new Promise((resolve) => setTimeout(resolve, 350));

export async function fetchLeaderTeam(teamId: string) {
  await wait();
  const team = teams.find((item) => item.id === teamId);
  if (!team) throw new Error("Assigned team could not be found.");
  return team;
}

export async function fetchTeamMembers(teamId: string) {
  await wait();
  return members.filter((member) => member.teamId === teamId);
}

export async function fetchMeetingSchedule(teamId: string) {
  await wait();
  const schedule = schedules.find((item) => item.teamId === teamId);
  if (!schedule) throw new Error("Meeting schedule could not be found.");
  return schedule;
}

export async function saveMeetingSchedule(schedule: MeetingSchedule) {
  await wait();
  return schedule;
}

export async function saveAttendanceRecord(record: AttendanceRecord) {
  await wait();
  return record;
}
