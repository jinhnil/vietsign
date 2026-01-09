import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { UsersManagement } from "@/src/components/users";

export const metadata: Metadata = {
  title: "Quản lý người dùng - VietSignSchool",
  description: "Quản lý người dùng trong hệ thống VietSignSchool",
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

export default function UsersPage() {
  return (
    <DashboardLayout>
      <UsersManagement />
    </DashboardLayout>
  );
}
