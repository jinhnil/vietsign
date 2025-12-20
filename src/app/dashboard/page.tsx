import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { Dashboard } from "@/src/components/dashboard";

export const metadata: Metadata = {
  title: "Dashboard - VietSign",
  description: "Dashboard page for VietSign",
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

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
}
