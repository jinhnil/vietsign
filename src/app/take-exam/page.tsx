import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { TakeExamManagement } from "@/src/components/take-exam";

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
