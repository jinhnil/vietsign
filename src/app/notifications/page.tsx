import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { NotificationsManagement } from "@/src/components/notifications";

export const metadata: Metadata = {
  title: "Thông báo - VietSignSchool",
  description: "Quản lý thông báo VietSignSchool",
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

export default function NotificationsPage() {
  return (
    <DashboardLayout>
      <NotificationsManagement />
    </DashboardLayout>
  );
}
