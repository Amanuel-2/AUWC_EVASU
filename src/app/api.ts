const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "team_leader" | "member";
  phone: string;
  department: string;
  yearOfStudy: string;
  gender: string;
  avatarUrl: string;
}

export interface ApiTeam {
  _id?: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  isPublic: boolean;
  color: string;
  schedule: { day: string; time: string; location: string }[];
}

export interface AdminTeam extends ApiTeam {
  memberIds: string[];
}

export interface AdminOverview {
  users: ApiUser[];
  teams: AdminTeam[];
}

const tokenKey = "fellowship_access_token";

export function getAccessToken() { return localStorage.getItem(tokenKey); }
export function clearAccessToken() { localStorage.removeItem(tokenKey); }

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  const token = getAccessToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.message || "The server request failed.");
  return body as T;
}

export async function loginRequest(email: string, password: string) {
  const result = await request<{ user: ApiUser; accessToken: string }>("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
  localStorage.setItem(tokenKey, result.accessToken);
  return result.user;
}

export async function registerRequest(name: string, email: string, password: string, phone: string, department: string, yearOfStudy: string, gender: string) {
  const result = await request<{ user: ApiUser; accessToken: string }>("/api/auth/register", { method: "POST", body: JSON.stringify({ name, email, password, phone, department, yearOfStudy, gender }) });
  localStorage.setItem(tokenKey, result.accessToken);
  return result.user;
}

export async function currentUserRequest() { return request<{ user: ApiUser; teamIds: string[] }>("/api/auth/me"); }
export async function fetchAdminOverviewRequest() { return request<AdminOverview>("/api/admin/overview"); }
export async function assignTeamLeaderRequest(teamSlug: string, userIds: string[]) { return request<{ message: string }>(`/api/admin/teams/${encodeURIComponent(teamSlug)}/leaders`, { method: "POST", body: JSON.stringify({ userIds }) }); }
export async function changeLeaderPasswordRequest(userIds: string[], password: string) { return request<{ message: string }>("/api/admin/leaders/password", { method: "POST", body: JSON.stringify({ userIds, password }) }); }
export async function joinTeamRequest(teamId: string) { return request<{ message: string }>(`/api/teams/${encodeURIComponent(teamId)}/join`, { method: "POST", body: JSON.stringify({}) }); }
export async function fetchTeamRequest(teamId: string) { return request<ApiTeam>(`/api/teams/${encodeURIComponent(teamId)}`); }
export async function fetchLeaderTeamRequest(teamId: string) { return fetchTeamRequest(teamId); }
export async function fetchTeamMembersRequest(teamId: string) { return request<ApiUser[]>(`/api/teams/${encodeURIComponent(teamId)}/members`); }
export async function fetchScheduleRequest(teamId: string) { return request<{ day: string; time: string; location: string } | null>(`/api/teams/${encodeURIComponent(teamId)}/schedule`); }
export async function fetchAttendanceRequest(teamId: string) { return request<unknown[]>(`/api/teams/${encodeURIComponent(teamId)}/attendance`); }
export async function saveScheduleRequest(teamId: string, schedule: { day: string; time: string; location: string }) { return request<{ day: string; time: string; location: string }>(`/api/teams/${encodeURIComponent(teamId)}/schedule`, { method: "PATCH", body: JSON.stringify(schedule) }); }
export async function saveAttendanceRequest(teamId: string, meetingDate: string, statuses: Record<string, string>) { return request<unknown>(`/api/teams/${encodeURIComponent(teamId)}/attendance`, { method: "POST", body: JSON.stringify({ meetingDate, statuses }) }); }
