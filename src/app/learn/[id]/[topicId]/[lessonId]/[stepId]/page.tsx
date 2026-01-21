import { Metadata } from "next";
import { DashboardLayout } from "@/shared/components/layout";
import { StepDetail } from "@/features/learn/step";

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
