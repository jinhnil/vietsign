import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { ClassesManagement } from "@/src/components/classes";

export const metadata: Metadata = {
  title: "Quản lý lớp học - VietSignSchool",
  description: "Quản lý lớp học VietSignSchool",
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

export default function ClassesPage() {
  return (
    <DashboardLayout>
      <ClassesManagement />
    </DashboardLayout>
  );
}
