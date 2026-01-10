import React from "react";
import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { Learn } from "@/src/components/learn/index";

export const metadata: Metadata = {
  title: "Học tập - VietSignSchool",
  description: "Learn Vietnamese Sign Language",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon.ico",
        href: "/favicon.ico",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon.ico",
        href: "/favicon.ico",
      },
    ],
  },
};

export default function LearnPage() {
  return (
    <DashboardLayout>
      <Learn />
    </DashboardLayout>
  );
}
