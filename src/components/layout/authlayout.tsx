"use client";

import React, { useState, useEffect } from "react";
import { useRouter, notFound } from "next/navigation";
import { Sidebar } from "./sidebar";
import { Header } from "./header-auth/index";
import { useSelector } from "react-redux";
import Loader from "@/src/components/UI/Loader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const isAuthenticated = useSelector((state: any) => state.admin.isAuthenticated);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check localStorage directly for token
    const accessToken = localStorage.getItem("access_token");
    const user = localStorage.getItem("user");

    if (accessToken && user) {
      setIsAuthed(true);
      setIsLoading(false);
    } else {
      // No token and not authenticated in Redux, redirect to home
      router.push("/");
    }
  }, [isAuthenticated, router]);

  // Update isAuthed when Redux state changes
  useEffect(() => {
    if (isAuthenticated) {
      setIsAuthed(true);
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Show loading while checking auth
  if (isLoading || !isAuthed) {
    return <Loader />;
  }

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
