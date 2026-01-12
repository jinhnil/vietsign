import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { ToolsManagement } from "@/src/components/tools";

export const metadata: Metadata = {
  title: "Quản lý công cụ - VietSignSchool",
  description: "Quản lý công cụ VietSignSchool",
  
};

export default function ToolsPage() {
  return (
    <DashboardLayout>
      <ToolsManagement />
    </DashboardLayout>
  );
}
