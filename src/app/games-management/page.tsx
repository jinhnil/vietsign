import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { GamesManagementComponent } from "@/src/components/games-management";

export const metadata: Metadata = {
  title: "Quản lý trò chơi - VietSignSchool",
  description: "Quản lý trò chơi VietSignSchool",
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

export default function GamesManagementPage() {
  return (
    <DashboardLayout>
      <GamesManagementComponent />
    </DashboardLayout>
  );
}
