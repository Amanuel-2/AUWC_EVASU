import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  joinedTeams: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  joinTeam: (teamId: string) => void;
  hasJoinedTeam: (teamId: string) => boolean;
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
    const mockUser: User = {
      id: crypto.randomUUID(),
      name: email.split("@")[0].replace(/[._]/g, " "),
      email,
      joinedTeams: [],
    };
    setUser(mockUser);
    return true;
  };

  const register = async (name: string, email: string, _password: string): Promise<boolean> => {
    const mockUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      joinedTeams: [],
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

  return (
    <AuthContext.Provider value={{ user, login, register, logout, joinTeam, hasJoinedTeam }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
