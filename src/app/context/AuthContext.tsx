import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ApiUser, clearAccessToken, currentUserRequest, getAccessToken, joinTeamRequest, loginRequest, registerRequest } from "../api";

interface User extends ApiUser { assignedTeamId: string; joinedTeams: string[]; }
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  register: (name: string, email: string, password: string, phone: string, yearOfStudy: string, gender: string) => Promise<User | null>;
  logout: () => void;
  joinTeam: (teamId: string) => Promise<boolean>;
  hasJoinedTeam: (teamId: string) => boolean;
  updateUser: (updates: Partial<User>) => void;
  changePassword: (currentPassword: string, nextPassword: string) => Promise<boolean>;
}

const CURRENT_USER_KEY = "fellowship_user";
const AuthContext = createContext<AuthContextType | null>(null);

function toUser(user: ApiUser, teamIds: string[] = []): User {
  return { ...user, joinedTeams: teamIds, assignedTeamId: user.role === "team_leader" ? teamIds[0] ?? "" : "" };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(Boolean(getAccessToken()));

  useEffect(() => {
    if (!getAccessToken()) return;
    currentUserRequest().then(({ user: apiUser, teamIds }) => {
      const nextUser = toUser(apiUser, teamIds);
      setUser(nextUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(nextUser));
    }).catch(() => { clearAccessToken(); localStorage.removeItem(CURRENT_USER_KEY); }).finally(() => setLoading(false));
  }, []);

  useEffect(() => { if (user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user)); }, [user]);

  const login = async (email: string, password: string) => {
    try {
      await loginRequest(email, password);
      const current = await currentUserRequest();
      const nextUser = toUser(current.user, current.teamIds);
      setUser(nextUser);
      return nextUser;
    } catch { return null; }
  };

  const register = async (name: string, email: string, password: string, phone: string, yearOfStudy: string, gender: string) => {
    try {
      const apiUser = await registerRequest(name, email, password, phone, yearOfStudy, gender);
      const nextUser = toUser(apiUser);
      setUser(nextUser);
      return nextUser;
    } catch { return null; }
  };

  const logout = () => { clearAccessToken(); localStorage.removeItem(CURRENT_USER_KEY); setUser(null); };

  const joinTeam = async (teamId: string) => {
    if (!user || user.joinedTeams.includes(teamId)) return Boolean(user);
    try {
      await joinTeamRequest(teamId);
      const current = await currentUserRequest();
      setUser(toUser(current.user, current.teamIds));
      return true;
    } catch { return false; }
  };

  const hasJoinedTeam = (teamId: string) => user?.joinedTeams.includes(teamId) ?? false;
  const updateUser = (updates: Partial<User>) => setUser((current) => current ? { ...current, ...updates, id: current.id, email: updates.email?.trim().toLowerCase() ?? current.email } : current);
  const changePassword = async (_currentPassword: string, nextPassword: string) => nextPassword.length >= 8;

  return <AuthContext.Provider value={{ user, loading, login, register, logout, joinTeam, hasJoinedTeam, updateUser, changePassword }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
