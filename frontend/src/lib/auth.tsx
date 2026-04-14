"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { apiGet, apiPost } from "./api";
import type { User } from "./types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; password_confirmation: string; phone?: string; role?: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getToken = useCallback(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("hotelku_token");
  }, []);

  const refreshUser = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const res = await apiGet<User>("/auth/me");
      setUser(res.data);
    } catch {
      localStorage.removeItem("hotelku_token");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    const res = await apiPost<{ user: User; token: string }>("/auth/login", { email, password });
    localStorage.setItem("hotelku_token", res.data.token);
    setUser(res.data.user);
  };

  const register = async (data: { name: string; email: string; password: string; password_confirmation: string; phone?: string; role?: string }) => {
    const res = await apiPost<{ user: User; token: string }>("/auth/register", data);
    localStorage.setItem("hotelku_token", res.data.token);
    setUser(res.data.user);
  };

  const logout = async () => {
    try {
      await apiPost("/auth/logout");
    } catch {
      // ignore
    }
    localStorage.removeItem("hotelku_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("hotelku_token");
}
