import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { ExamsManagement } from "@/src/components/exams";

export const metadata: Metadata = {
  title: "Quản lý kiểm tra - VietSignSchool",
  description: "Quản lý kiểm tra VietSignSchool",
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

export default function ExamsPage() {
  return (
    <DashboardLayout>
      <ExamsManagement />
    </DashboardLayout>
  );
}
