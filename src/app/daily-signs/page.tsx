import React from "react";
import { Metadata } from "next";
import { LearnLayout } from "@/src/components/layout/learnlayout";
import { DailySigns } from "@/src/components/daily-signs";

export const metadata: Metadata = {
  title: "Ký Hiệu Của Ngày - VietSignSchool",
  description: "Daily Sign of the Day",
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

export default function DailySignsPage() {
  return (
    <LearnLayout>
      <DailySigns />
    </LearnLayout>
  );
}
