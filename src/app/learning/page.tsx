import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { LearningManagement } from "@/src/components/learning";

export const metadata: Metadata = {
  title: "Quản lý học tập - VietSignSchool",
  description: "Quản lý nội dung học tập VietSignSchool",
  
};

export default function LearningPage() {
  return (
    <DashboardLayout>
      <LearningManagement />
    </DashboardLayout>
  );
}
