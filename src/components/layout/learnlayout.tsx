"use client";

import React, { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { Header } from "./header-auth/index";
import { Footer } from "./footer/index";
import Loader from "@/src/components/UI/Loader";

interface LearnLayoutProps {
  children: React.ReactNode;
}

export const LearnLayout: React.FC<LearnLayoutProps> = ({ children }) => {
  const isAuthenticated = useSelector((state: any) => state.admin.isAuthenticated);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    // Check localStorage directly for token (support demo mode)
    const accessToken = localStorage.getItem("access_token");
    const user = localStorage.getItem("user");

    if (accessToken && user) {
      setIsAuthed(true);
      setIsLoading(false);
    } else if (!isAuthenticated) {
      // No token and not authenticated, redirect to login
      redirect("/login");
    } else {
      setIsAuthed(true);
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Update isAuthed when Redux state changes
  useEffect(() => {
    if (isAuthenticated) {
      setIsAuthed(true);
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const toggleSidebar = () => { };

  if (isLoading || !isAuthed) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Main Content - with padding for fixed header */}
      <main className="flex-1 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
        <div className="mt-[200px]">
          <Footer />
        </div>
      </main>
    </div>
  );
};

