import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { StepDetail } from "@/src/components/learn/step";

export const metadata: Metadata = {
  title: "Học bài - VietSignSchool",
  description: "Học từ vựng và luyện tập ngôn ngữ ký hiệu",
};

export default function LearnStepPage() {
  return (
    <DashboardLayout>
      <StepDetail />
    </DashboardLayout>
  );
}
