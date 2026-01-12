import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { Settings } from "@/src/components/settings";

export const metadata: Metadata = {
  title: "Cài đặt - VietSignSchool",
  description: "Cài đặt VietSignSchool",
  
};

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <Settings />
    </DashboardLayout>
  );
}
