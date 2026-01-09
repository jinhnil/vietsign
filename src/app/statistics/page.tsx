import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { StatisticsManagement } from "@/src/components/statistics";

export const metadata: Metadata = {
  title: "Thống kê - VietSignSchool",
  description: "Thống kê VietSignSchool",
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

export default function StatisticsPage() {
  return (
    <DashboardLayout>
      <StatisticsManagement />
    </DashboardLayout>
  );
}
