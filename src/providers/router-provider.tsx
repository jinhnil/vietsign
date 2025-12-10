"use client";
import React from "react";
// Import BrowserRouter từ react-router-dom
import { BrowserRouter } from "react-router-dom";

/**
 * Component này bao bọc ứng dụng bằng BrowserRouter,
 * cho phép các components con sử dụng Hooks của React Router.
 */
export function RouterProvider({ children }: { children: React.ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}
