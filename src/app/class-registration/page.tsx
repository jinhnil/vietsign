import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { ClassRegistrationManagement } from "@/src/components/class-registration";

export const metadata: Metadata = {
  title: "Đăng ký lớp học - VietSignSchool",
  description: "Đăng ký lớp học VietSignSchool",
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

export default function ClassRegistrationPage() {
  return (
    <DashboardLayout>
      <ClassRegistrationManagement />
    </DashboardLayout>
  );
}
