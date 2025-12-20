"use client";

import React, { useState } from "react";
import { redirect } from "next/navigation";
import { Sidebar } from "./sidebar";
import { Header } from "./header-auth/index";
import { useAuth } from "../../providers/auth-provider";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!isAuthenticated) {
    redirect("/login");
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Header fixed at top */}
      <Header toggleSidebar={toggleSidebar} />

      {/* 2. Sidebar fixed at left */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* 3. Main Content with dynamic left margin */}
      <main
        className={`
          pt-16 min-h-screen transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "ml-60" : "ml-24"}
        `}
      >
        <div className="p-6 md:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
