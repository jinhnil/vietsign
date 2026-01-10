import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { Settings } from "@/src/components/settings";

export const metadata: Metadata = {
  title: "Cài đặt - VietSignSchool",
  description: "Cài đặt VietSignSchool",
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

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <Settings />
    </DashboardLayout>
  );
}
