import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { Dashboard } from "@/src/components/dashboard";

export const metadata: Metadata = {
  title: "Dashboard - VietSignSchool",
  description: "Dashboard page for VietSignSchool",
  
};

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
}
