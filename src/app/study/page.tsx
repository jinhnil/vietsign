import React from "react";
import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { Study } from "@/src/components/study";

export const metadata: Metadata = {
  title: "Học Bài - VietSignSchool",
  description: "Study Vietnamese Sign Language",
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

export default function StudyPage() {
  return (
    <DashboardLayout>
      <Study />
    </DashboardLayout>
  );
}
