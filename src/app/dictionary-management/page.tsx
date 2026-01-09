import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { DictionaryManagementComponent } from "@/src/components/dictionary-management";

export const metadata: Metadata = {
  title: "Quản lý từ điển - VietSignSchool",
  description: "Quản lý từ điển VietSignSchool",
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

export default function DictionaryManagementPage() {
  return (
    <DashboardLayout>
      <DictionaryManagementComponent />
    </DashboardLayout>
  );
}
