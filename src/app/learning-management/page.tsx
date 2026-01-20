import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { LearningManagement } from "@/src/components/learning-management";

export const metadata: Metadata = {
  title: "Quản lý khóa học - VietSignSchool",
  description: "Quản lý khóa học VietSignSchool",
};

export default function LearningManagementPage() {
  return (
    <DashboardLayout>
      <LearningManagement />
    </DashboardLayout>
  );
}
