import { Metadata } from "next";
import { DashboardLayout } from "@/shared/components/layout";
import { LearningManagement } from "@/features/learning-management";

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
