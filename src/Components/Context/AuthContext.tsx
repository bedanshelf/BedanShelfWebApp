import { createContext, useContext, useState, type ReactNode } from "react";
import { getCurrentUser } from "../../Services/AuthService";

export type Role = "user" | "admin" | "encoder" | "cashier";

export interface User {
  uid: string;
  email: string;
  name: string;
  role: Role[];
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize user from localStorage
  const [user, setUser] = useState<User | null>(getCurrentUser());

  // Login function
  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthContext only.");
  return ctx;
}
