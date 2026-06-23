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

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("fellowship_user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("fellowship_user", JSON.stringify(user));
    else localStorage.removeItem("fellowship_user");
  }, [user]);

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Simulate login — in production this would hit an API
    const normalizedEmail = email.trim().toLowerCase();
    const isAdmin = normalizedEmail === "admin@radiance.edu";
    const name = isAdmin ? "Admin User" : email.split("@")[0].replace(/[._]/g, " ");
    const mockUser: User = {
      id: crypto.randomUUID(),
      name,
      email: normalizedEmail,
      role: isAdmin ? "admin" : "team_leader",
      assignedTeamId: isAdmin ? "" : "media",
      phone: isAdmin ? "+253 77 000 001" : "+253 77 213 890",
      avatarUrl: "",
      joinedTeams: isAdmin ? [] : ["media"],
    };
    setUser(mockUser);
    return true;
  };

  const register = async (name: string, email: string, _password: string): Promise<boolean> => {
    const mockUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      role: "team_leader",
      assignedTeamId: "media",
      phone: "+253 77 213 890",
      avatarUrl: "",
      joinedTeams: ["media"],
    };
    setUser(mockUser);
    return true;
  };

  const logout = () => setUser(null);

  const joinTeam = (teamId: string) => {
    if (!user) return;
    if (user.joinedTeams.includes(teamId)) return;
    setUser({ ...user, joinedTeams: [...user.joinedTeams, teamId] });
  };

  const hasJoinedTeam = (teamId: string) => {
    return user?.joinedTeams.includes(teamId) ?? false;
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...updates });
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
