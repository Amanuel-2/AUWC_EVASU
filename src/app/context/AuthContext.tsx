import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "team_leader" | "member";
  assignedTeamId: string;
  phone: string;
  avatarUrl: string;
  joinedTeams: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  joinTeam: (teamId: string) => void;
  hasJoinedTeam: (teamId: string) => boolean;
  updateUser: (updates: Partial<User>) => void;
  changePassword: (currentPassword: string, nextPassword: string) => Promise<boolean>;
}

const CURRENT_USER_KEY = "fellowship_user";
const AUTH_DELAY_MS = 250;

const AuthContext = createContext<AuthContextType | null>(null);

function createId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `user-${Date.now()}`;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function parseStoredUser(): User | null {
  try {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as Partial<User>;
    if (!parsed.id || !parsed.email || !parsed.name || !parsed.role) return null;
    return {
      id: parsed.id,
      name: parsed.name,
      email: normalizeEmail(parsed.email),
      role: parsed.role,
      assignedTeamId: parsed.assignedTeamId ?? "",
      phone: parsed.phone ?? "",
      avatarUrl: parsed.avatarUrl ?? "",
      joinedTeams: Array.isArray(parsed.joinedTeams) ? parsed.joinedTeams : [],
    };
  } catch {
    localStorage.removeItem(CURRENT_USER_KEY);
    return null;
  }
}

function createDemoUser(email: string): User {
  const normalizedEmail = normalizeEmail(email);
  const isAdmin = normalizedEmail === "admin@auwcec.edu";
  const leaderTeams: Record<string, string> = {
    "media@auwcec.edu": "media",
    "fund@auwcec.edu": "fund",
    "leader1@gmail.com": "small-group-1",
    "leader2@gmail.com": "small-group-2",
    "leader3@gmail.com": "small-group-3",
    "leader4@gmail.com": "small-group-4",
    "leader5@gmail.com": "small-group-5",
    "leader6@gmail.com": "small-group-6",
    "leader7@gmail.com": "small-group-7",
    "leader8@gmail.com": "small-group-8",
  };
  const assignedTeamId = leaderTeams[normalizedEmail] ?? "";
  const isTeamLeader = Boolean(assignedTeamId);
  const name = isAdmin ? "AUWC ECSF Admin" : normalizedEmail.split("@")[0].replace(/[._]/g, " ");

  return {
    id: createId(),
    name,
    email: normalizedEmail,
    role: isAdmin ? "admin" : isTeamLeader ? "team_leader" : "member",
    assignedTeamId,
    phone: isAdmin ? "+251 900 000 001" : isTeamLeader ? "+251 900 000 002" : "",
    avatarUrl: "",
    joinedTeams: assignedTeamId ? [assignedTeamId] : [],
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => parseStoredUser());

  useEffect(() => {
    if (user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(CURRENT_USER_KEY);
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, AUTH_DELAY_MS));
    if (!normalizeEmail(email) || password.length < 1) return false;
    setUser(createDemoUser(email));
    return true;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, AUTH_DELAY_MS));
    const normalizedName = name.trim();
    const normalizedEmail = normalizeEmail(email);
    if (!normalizedName || !normalizedEmail || password.length < 6) return false;

    setUser({
      id: createId(),
      name: normalizedName,
      email: normalizedEmail,
      role: "member",
      assignedTeamId: "",
      phone: "",
      avatarUrl: "",
      joinedTeams: [],
    });
    return true;
  };

  const logout = () => setUser(null);

  const joinTeam = (teamId: string) => {
    if (!user || !teamId) return;
    if (user.joinedTeams.includes(teamId)) return;
    setUser({ ...user, joinedTeams: [...user.joinedTeams, teamId] });
  };

  const hasJoinedTeam = (teamId: string) => {
    return user?.joinedTeams.includes(teamId) ?? false;
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    setUser({
      ...user,
      ...updates,
      id: user.id,
      email: updates.email ? normalizeEmail(updates.email) : user.email,
      name: updates.name?.trim() || user.name,
      joinedTeams: updates.joinedTeams ?? user.joinedTeams,
    });
  };

  const changePassword = async (_currentPassword: string, nextPassword: string) => {
    await new Promise((resolve) => setTimeout(resolve, 450));
    return nextPassword.length >= 8;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, joinTeam, hasJoinedTeam, updateUser, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
