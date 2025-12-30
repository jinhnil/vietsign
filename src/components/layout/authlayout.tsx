"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./sidebar";
import { Header } from "./header-auth/index";
import { Footer } from "./footer/index";
import { useSelector } from "react-redux";
import Loader from "@/src/components/UI/Loader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const BREAKPOINT = 1000; // Breakpoint for auto collapse/expand

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const isAuthenticated = useSelector((state: any) => state.admin.isAuthenticated);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const router = useRouter();

  // Handle responsive sidebar based on screen width
  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    const shouldCollapse = width < BREAKPOINT;
    
    setIsSmallScreen(shouldCollapse);
    
    // Auto update sidebar state based on screen size
    if (shouldCollapse) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, []);

  // Initialize and listen for resize events
  useEffect(() => {
    // Check initial screen size
    handleResize();

    // Add resize listener with debounce
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [handleResize]);

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
      <Sidebar isOpen={isSidebarOpen} isSmallScreen={isSmallScreen} />

      {/* 3. Overlay for small screens when sidebar is open */}
      {isSmallScreen && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 4. Main Content with dynamic left margin */}
      <main
        className={`
          pt-16 min-h-screen transition-all duration-300 ease-in-out
          ${isSmallScreen 
            ? "ml-0" 
            : isSidebarOpen 
              ? "ml-60" 
              : "ml-24"
          }
        `}
      >
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">{children}</div>
        <div className="mt-[200px]">
          <Footer />
        </div>
      </main>
    </div>
  );
}
