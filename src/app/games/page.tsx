import React from "react";
import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { Games } from "@/src/components/games";

export const metadata: Metadata = {
  title: "Trò Chơi - VietSignSchool",
  description: "Games for learning Vietnamese Sign Language",
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

export default function GamesPage() {
  return (
    <DashboardLayout>
      <Games />
    </DashboardLayout>
  );
}
