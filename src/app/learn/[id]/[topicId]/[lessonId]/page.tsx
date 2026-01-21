import { Metadata } from "next";
import { DashboardLayout } from "@/shared/components/layout";
import { LessonDetail } from "@/features/learn/lesson";

export const metadata: Metadata = {
  title: "Chi tiết bài học - VietSignSchool",
  description: "Nội dung bài học tự học ngôn ngữ ký hiệu",
};

export default function LearnLessonPage() {
  return (
    <DashboardLayout>
      <LessonDetail />
    </DashboardLayout>
  );
}
