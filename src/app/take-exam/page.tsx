import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { TakeExamManagement } from "@/src/components/take-exam";

export const metadata: Metadata = {
  title: "Làm bài kiểm tra - VietSignSchool",
  description: "Làm bài kiểm tra VietSignSchool",
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

export default function TakeExamPage() {
  return (
    <DashboardLayout>
      <TakeExamManagement />
    </DashboardLayout>
  );
}
