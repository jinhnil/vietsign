"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface User {
  email: string;
  name: string;
  role: string;
  label?: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // Đổi tên biến navigate thành router để rõ ràng hơn
  const router = useRouter();

  // Khôi phục session từ localStorage khi tải trang (giả lập)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        // Thử parse JSON; nếu không phải JSON hợp lệ thì xoá để tránh lỗi
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (err) {
        console.warn(
          "Invalid user in localStorage, removing it.",
          err,
          storedUser
        );
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    router.push("/home");
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");
    await new Promise((resolve) => setTimeout(resolve, 100));
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// KHÔNG CÓ LỖI Ở ĐÂY: Phần export useAuth này là hoàn toàn CHÍNH XÁC
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
