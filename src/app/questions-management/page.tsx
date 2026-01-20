import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { QuestionsManagement } from "@/src/components/questions-management";

export const metadata: Metadata = {
  title: "Quản lý câu hỏi - VietSignSchool",
  description: "Quản lý câu hỏi và bộ câu hỏi VietSignSchool",
};

export default function QuestionsManagementPage() {
  return (
    <DashboardLayout>
      <QuestionsManagement />
    </DashboardLayout>
  );
}
