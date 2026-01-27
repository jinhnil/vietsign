import { Metadata } from "next";
import { DashboardLayout } from "@/shared/components/layout";
import { TakeExamManagement } from "@/features/take-exam";

export const metadata: Metadata = {
  title: "Làm bài kiểm tra - VietSignSchool",
  description: "Làm bài kiểm tra VietSignSchool",
};

export default function TakeExamPage() {
  return (
    <DashboardLayout>
      <TakeExamManagement />
    </DashboardLayout>
  );
}
