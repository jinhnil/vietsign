import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { ExamsManagement } from "@/src/components/exams";

export const metadata: Metadata = {
  title: "Quản lý kiểm tra - VietSignSchool",
  description: "Quản lý kiểm tra VietSignSchool",
  
};

export default function ExamsPage() {
  return (
    <DashboardLayout>
      <ExamsManagement />
    </DashboardLayout>
  );
}
