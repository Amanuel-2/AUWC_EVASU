import { AttendanceRecord, MeetingSchedule, Team, TeamMember } from "./types";

const SCHEDULES_KEY = "fellowship_mock_schedules";
const ATTENDANCE_KEY = "fellowship_mock_attendance";

const teams: Team[] = [
  { id: "media", name: "Media Team", description: "Photography, announcements, livestream, and digital storytelling." },
  { id: "worship", name: "Worship Team", description: "Music, prayer, and chapel service coordination." },
  { id: "outreach", name: "Outreach Team", description: "Community service and campus engagement." },
  { id: "fund", name: "Fund Team", description: "Fundraising, giving records, and financial support for fellowship programs." },
  { id: "small-group-1", name: "Small Group 1", description: "Small group shepherding, attendance, and student care for Group 1." },
  { id: "small-group-2", name: "Small Group 2", description: "Small group shepherding, attendance, and student care for Group 2." },
  { id: "small-group-3", name: "Small Group 3", description: "Small group shepherding, attendance, and student care for Group 3." },
  { id: "small-group-4", name: "Small Group 4", description: "Small group shepherding, attendance, and student care for Group 4." },
  { id: "small-group-5", name: "Small Group 5", description: "Small group shepherding, attendance, and student care for Group 5." },
  { id: "small-group-6", name: "Small Group 6", description: "Small group shepherding, attendance, and student care for Group 6." },
  { id: "small-group-7", name: "Small Group 7", description: "Small group shepherding, attendance, and student care for Group 7." },
  { id: "small-group-8", name: "Small Group 8", description: "Small group shepherding, attendance, and student care for Group 8." },
];

const members: TeamMember[] = [
  { id: "m-001", teamId: "media", fullName: "Hodan Ali", phone: "+253 77 100 421", department: "Communication", yearOfStudy: "Year 3", gender: "Female", dateJoined: "2025-09-14", email: "hodan.ali@university.edu", role: "Photographer", notes: "Leads event photo coverage." },
  { id: "m-002", teamId: "media", fullName: "Samuel Okello", phone: "+253 77 204 876", department: "Computer Science", yearOfStudy: "Year 2", gender: "Male", dateJoined: "2025-10-03", email: "samuel.okello@university.edu", role: "Livestream Operator", notes: "Handles Sunday broadcast setup." },
  { id: "m-003", teamId: "media", fullName: "Mariam Hassan", phone: "+253 77 334 119", department: "Business", yearOfStudy: "Year 4", gender: "Female", dateJoined: "2025-08-27", email: "mariam.hassan@university.edu", role: "Content Coordinator", notes: "Owns weekly announcement calendar." },
  { id: "m-004", teamId: "media", fullName: "Daniel Tesfaye", phone: "+253 77 814 020", department: "Engineering", yearOfStudy: "Year 1", gender: "Male", dateJoined: "2026-01-18", email: "daniel.tesfaye@university.edu", role: "Video Editor", notes: "Edits reels and recap videos." },
  { id: "m-005", teamId: "media", fullName: "Amina Roble", phone: "+253 77 231 602", department: "Communication", yearOfStudy: "Year 2", gender: "Female", dateJoined: "2026-02-05", email: "amina.roble@university.edu", role: "Social Media", notes: "Schedules Instagram posts." },
  { id: "m-006", teamId: "media", fullName: "Peter Mwangi", phone: "+253 77 712 558", department: "Design", yearOfStudy: "Year 3", gender: "Male", dateJoined: "2026-03-12", email: "peter.mwangi@university.edu", role: "Graphics Designer", notes: "Creates sermon and event artwork." },
  { id: "m-101", teamId: "worship", fullName: "Grace Mensah", phone: "+253 77 555 000", department: "Music", yearOfStudy: "Year 3", gender: "Female", dateJoined: "2025-09-01", email: "grace.mensah@university.edu", role: "Vocalist", notes: "Other team data, hidden from Media leader." },
  { id: "f-001", teamId: "fund", fullName: "Ruth Alemu", phone: "+253 77 410 210", department: "Accounting", yearOfStudy: "Year 3", gender: "Female", dateJoined: "2026-01-10", email: "ruth.alemu@university.edu", role: "Fund Coordinator", notes: "Tracks giving records and support requests." },
  { id: "f-002", teamId: "fund", fullName: "Noah Bekele", phone: "+253 77 902 118", department: "Business", yearOfStudy: "Year 2", gender: "Male", dateJoined: "2026-02-19", email: "noah.bekele@university.edu", role: "Budget Assistant", notes: "Helps prepare monthly summaries." },
  { id: "sg-1-1", teamId: "small-group-1", fullName: "Group 1 Member 1", phone: "+253 77 001 001", department: "Campus Ministry", yearOfStudy: "Year 1", gender: "", dateJoined: "2026-01-01", email: "group1.member1@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 1." },
  { id: "sg-1-2", teamId: "small-group-1", fullName: "Group 1 Member 2", phone: "+253 77 001 002", department: "Campus Ministry", yearOfStudy: "Year 2", gender: "", dateJoined: "2026-02-02", email: "group1.member2@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 1." },
  { id: "sg-1-3", teamId: "small-group-1", fullName: "Group 1 Member 3", phone: "+253 77 001 003", department: "Campus Ministry", yearOfStudy: "Year 3", gender: "", dateJoined: "2026-03-03", email: "group1.member3@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 1." },
  { id: "sg-1-4", teamId: "small-group-1", fullName: "Group 1 Member 4", phone: "+253 77 001 004", department: "Campus Ministry", yearOfStudy: "Year 4", gender: "", dateJoined: "2026-04-04", email: "group1.member4@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 1." },
  { id: "sg-2-1", teamId: "small-group-2", fullName: "Group 2 Member 1", phone: "+253 77 002 001", department: "Campus Ministry", yearOfStudy: "Year 1", gender: "", dateJoined: "2026-01-01", email: "group2.member1@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 2." },
  { id: "sg-2-2", teamId: "small-group-2", fullName: "Group 2 Member 2", phone: "+253 77 002 002", department: "Campus Ministry", yearOfStudy: "Year 2", gender: "", dateJoined: "2026-02-02", email: "group2.member2@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 2." },
  { id: "sg-2-3", teamId: "small-group-2", fullName: "Group 2 Member 3", phone: "+253 77 002 003", department: "Campus Ministry", yearOfStudy: "Year 3", gender: "", dateJoined: "2026-03-03", email: "group2.member3@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 2." },
  { id: "sg-2-4", teamId: "small-group-2", fullName: "Group 2 Member 4", phone: "+253 77 002 004", department: "Campus Ministry", yearOfStudy: "Year 4", gender: "", dateJoined: "2026-04-04", email: "group2.member4@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 2." },
  { id: "sg-3-1", teamId: "small-group-3", fullName: "Group 3 Member 1", phone: "+253 77 003 001", department: "Campus Ministry", yearOfStudy: "Year 1", gender: "", dateJoined: "2026-01-01", email: "group3.member1@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 3." },
  { id: "sg-3-2", teamId: "small-group-3", fullName: "Group 3 Member 2", phone: "+253 77 003 002", department: "Campus Ministry", yearOfStudy: "Year 2", gender: "", dateJoined: "2026-02-02", email: "group3.member2@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 3." },
  { id: "sg-3-3", teamId: "small-group-3", fullName: "Group 3 Member 3", phone: "+253 77 003 003", department: "Campus Ministry", yearOfStudy: "Year 3", gender: "", dateJoined: "2026-03-03", email: "group3.member3@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 3." },
  { id: "sg-3-4", teamId: "small-group-3", fullName: "Group 3 Member 4", phone: "+253 77 003 004", department: "Campus Ministry", yearOfStudy: "Year 4", gender: "", dateJoined: "2026-04-04", email: "group3.member4@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 3." },
  { id: "sg-4-1", teamId: "small-group-4", fullName: "Group 4 Member 1", phone: "+253 77 004 001", department: "Campus Ministry", yearOfStudy: "Year 1", gender: "", dateJoined: "2026-01-01", email: "group4.member1@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 4." },
  { id: "sg-4-2", teamId: "small-group-4", fullName: "Group 4 Member 2", phone: "+253 77 004 002", department: "Campus Ministry", yearOfStudy: "Year 2", gender: "", dateJoined: "2026-02-02", email: "group4.member2@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 4." },
  { id: "sg-4-3", teamId: "small-group-4", fullName: "Group 4 Member 3", phone: "+253 77 004 003", department: "Campus Ministry", yearOfStudy: "Year 3", gender: "", dateJoined: "2026-03-03", email: "group4.member3@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 4." },
  { id: "sg-4-4", teamId: "small-group-4", fullName: "Group 4 Member 4", phone: "+253 77 004 004", department: "Campus Ministry", yearOfStudy: "Year 4", gender: "", dateJoined: "2026-04-04", email: "group4.member4@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 4." },
  { id: "sg-5-1", teamId: "small-group-5", fullName: "Group 5 Member 1", phone: "+253 77 005 001", department: "Campus Ministry", yearOfStudy: "Year 1", gender: "", dateJoined: "2026-01-01", email: "group5.member1@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 5." },
  { id: "sg-5-2", teamId: "small-group-5", fullName: "Group 5 Member 2", phone: "+253 77 005 002", department: "Campus Ministry", yearOfStudy: "Year 2", gender: "", dateJoined: "2026-02-02", email: "group5.member2@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 5." },
  { id: "sg-5-3", teamId: "small-group-5", fullName: "Group 5 Member 3", phone: "+253 77 005 003", department: "Campus Ministry", yearOfStudy: "Year 3", gender: "", dateJoined: "2026-03-03", email: "group5.member3@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 5." },
  { id: "sg-5-4", teamId: "small-group-5", fullName: "Group 5 Member 4", phone: "+253 77 005 004", department: "Campus Ministry", yearOfStudy: "Year 4", gender: "", dateJoined: "2026-04-04", email: "group5.member4@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 5." },
  { id: "sg-6-1", teamId: "small-group-6", fullName: "Group 6 Member 1", phone: "+253 77 006 001", department: "Campus Ministry", yearOfStudy: "Year 1", gender: "", dateJoined: "2026-01-01", email: "group6.member1@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 6." },
  { id: "sg-6-2", teamId: "small-group-6", fullName: "Group 6 Member 2", phone: "+253 77 006 002", department: "Campus Ministry", yearOfStudy: "Year 2", gender: "", dateJoined: "2026-02-02", email: "group6.member2@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 6." },
  { id: "sg-6-3", teamId: "small-group-6", fullName: "Group 6 Member 3", phone: "+253 77 006 003", department: "Campus Ministry", yearOfStudy: "Year 3", gender: "", dateJoined: "2026-03-03", email: "group6.member3@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 6." },
  { id: "sg-6-4", teamId: "small-group-6", fullName: "Group 6 Member 4", phone: "+253 77 006 004", department: "Campus Ministry", yearOfStudy: "Year 4", gender: "", dateJoined: "2026-04-04", email: "group6.member4@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 6." },
  { id: "sg-7-1", teamId: "small-group-7", fullName: "Group 7 Member 1", phone: "+253 77 007 001", department: "Campus Ministry", yearOfStudy: "Year 1", gender: "", dateJoined: "2026-01-01", email: "group7.member1@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 7." },
  { id: "sg-7-2", teamId: "small-group-7", fullName: "Group 7 Member 2", phone: "+253 77 007 002", department: "Campus Ministry", yearOfStudy: "Year 2", gender: "", dateJoined: "2026-02-02", email: "group7.member2@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 7." },
  { id: "sg-7-3", teamId: "small-group-7", fullName: "Group 7 Member 3", phone: "+253 77 007 003", department: "Campus Ministry", yearOfStudy: "Year 3", gender: "", dateJoined: "2026-03-03", email: "group7.member3@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 7." },
  { id: "sg-7-4", teamId: "small-group-7", fullName: "Group 7 Member 4", phone: "+253 77 007 004", department: "Campus Ministry", yearOfStudy: "Year 4", gender: "", dateJoined: "2026-04-04", email: "group7.member4@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 7." },
  { id: "sg-8-1", teamId: "small-group-8", fullName: "Group 8 Member 1", phone: "+253 77 008 001", department: "Campus Ministry", yearOfStudy: "Year 1", gender: "", dateJoined: "2026-01-01", email: "group8.member1@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 8." },
  { id: "sg-8-2", teamId: "small-group-8", fullName: "Group 8 Member 2", phone: "+253 77 008 002", department: "Campus Ministry", yearOfStudy: "Year 2", gender: "", dateJoined: "2026-02-02", email: "group8.member2@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 8." },
  { id: "sg-8-3", teamId: "small-group-8", fullName: "Group 8 Member 3", phone: "+253 77 008 003", department: "Campus Ministry", yearOfStudy: "Year 3", gender: "", dateJoined: "2026-03-03", email: "group8.member3@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 8." },
  { id: "sg-8-4", teamId: "small-group-8", fullName: "Group 8 Member 4", phone: "+253 77 008 004", department: "Campus Ministry", yearOfStudy: "Year 4", gender: "", dateJoined: "2026-04-04", email: "group8.member4@university.edu", role: "Small Group Member", notes: "Assigned to Small Group 8." },
];

const defaultSchedules: MeetingSchedule[] = [
  { teamId: "media", day: "Thursday", time: "17:30", location: "Student Center Studio" },
  { teamId: "worship", day: "Tuesday", time: "18:00", location: "Chapel Hall" },
  { teamId: "outreach", day: "Saturday", time: "10:00", location: "Fellowship Office" },
  { teamId: "fund", day: "Monday", time: "17:00", location: "Fellowship Office" },
  { teamId: "small-group-1", day: "Wednesday", time: "18:00", location: "Small Group Room 1" },
  { teamId: "small-group-2", day: "Wednesday", time: "18:00", location: "Small Group Room 2" },
  { teamId: "small-group-3", day: "Wednesday", time: "18:00", location: "Small Group Room 3" },
  { teamId: "small-group-4", day: "Wednesday", time: "18:00", location: "Small Group Room 4" },
  { teamId: "small-group-5", day: "Wednesday", time: "18:00", location: "Small Group Room 5" },
  { teamId: "small-group-6", day: "Wednesday", time: "18:00", location: "Small Group Room 6" },
  { teamId: "small-group-7", day: "Wednesday", time: "18:00", location: "Small Group Room 7" },
  { teamId: "small-group-8", day: "Wednesday", time: "18:00", location: "Small Group Room 8" },
];

const wait = () => new Promise((resolve) => setTimeout(resolve, 350));

function readJson<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function readSchedules() {
  const saved = readJson<MeetingSchedule[]>(SCHEDULES_KEY, []);
  return defaultSchedules.map((schedule) => saved.find((item) => item.teamId === schedule.teamId) ?? schedule);
}

function readAttendance() {
  return readJson<AttendanceRecord[]>(ATTENDANCE_KEY, []);
}

export async function fetchLeaderTeam(teamId: string) {
  await wait();
  const team = teams.find((item) => item.id === teamId);
  if (!team) throw new Error("Assigned team could not be found.");
  return team;
}

export async function fetchTeamMembers(teamId: string) {
  await wait();
  if (!teams.some((team) => team.id === teamId)) throw new Error("Assigned team could not be found.");
  return members.filter((member) => member.teamId === teamId);
}

export async function fetchMeetingSchedule(teamId: string) {
  await wait();
  const schedule = readSchedules().find((item) => item.teamId === teamId);
  if (!schedule) throw new Error("Meeting schedule could not be found.");
  return schedule;
}

export async function fetchAttendanceRecords(teamId: string) {
  await wait();
  return readAttendance()
    .filter((record) => record.teamId === teamId)
    .sort((a, b) => b.markedAt.localeCompare(a.markedAt));
}

export async function saveMeetingSchedule(schedule: MeetingSchedule) {
  await wait();
  if (!teams.some((team) => team.id === schedule.teamId)) throw new Error("Assigned team could not be found.");
  const cleaned: MeetingSchedule = {
    teamId: schedule.teamId,
    day: schedule.day.trim(),
    time: schedule.time,
    location: schedule.location.trim(),
  };
  const existing = readSchedules().filter((item) => item.teamId !== cleaned.teamId);
  writeJson(SCHEDULES_KEY, [...existing, cleaned]);
  return cleaned;
}

export async function saveAttendanceRecord(record: AttendanceRecord) {
  await wait();
  if (!teams.some((team) => team.id === record.teamId)) throw new Error("Assigned team could not be found.");
  const teamMemberIds = new Set(members.filter((member) => member.teamId === record.teamId).map((member) => member.id));
  const statuses = Object.fromEntries(Object.entries(record.statuses).filter(([memberId]) => teamMemberIds.has(memberId)));
  const cleaned: AttendanceRecord = { ...record, statuses };
  const records = readAttendance().filter((item) => !(item.teamId === cleaned.teamId && item.meetingDate === cleaned.meetingDate));
  writeJson(ATTENDANCE_KEY, [cleaned, ...records]);
  return cleaned;
}
