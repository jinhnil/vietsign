import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { GradingManagement } from "@/src/components/grading";

export const metadata: Metadata = {
  title: "Chấm điểm - VietSignSchool",
  description: "Chấm điểm VietSignSchool",
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

export default function GradingPage() {
  return (
    <DashboardLayout>
      <GradingManagement />
    </DashboardLayout>
  );
}
