"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, loginUser } from "@/lib/api";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on initial load
    const token = localStorage.getItem("token");
    if (token) {
      // For a real app, you should validate the token with your backend
      // or decode JWT to get user info
      setIsAuthenticated(true);

      // Just for demo purposes, we'll store a simple user object
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse user data");
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginUser(email, password);
      localStorage.setItem("token", response.token);

      // In a real app, you would fetch user data or decode from JWT
      // For now, we'll create a simple user object
      const dummyUser = {
        id: 1,
        nama: email.split("@")[0], // Just using part of email as name for demo
        email: email,
        created_at: new Date().toISOString(),
      };

      localStorage.setItem("user", JSON.stringify(dummyUser));
      setUser(dummyUser);
      setIsAuthenticated(true);
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during login"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
