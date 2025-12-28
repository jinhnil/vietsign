import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { ToolsManagement } from "@/src/components/tools";

export const metadata: Metadata = {
  title: "Quản lý công cụ - VietSignSchool",
  description: "Quản lý công cụ VietSignSchool",
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

export default function ToolsPage() {
  return (
    <DashboardLayout>
      <ToolsManagement />
    </DashboardLayout>
  );
}
