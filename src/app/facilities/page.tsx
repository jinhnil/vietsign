import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { FacilitiesManagement } from "@/src/components/facilities";

export const metadata: Metadata = {
  title: "Quản lý cơ sở - VietSignSchool",
  description: "Quản lý các cơ sở đào tạo VietSignSchool",
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

export default function FacilitiesPage() {
  return (
    <DashboardLayout>
      <FacilitiesManagement />
    </DashboardLayout>
  );
}
