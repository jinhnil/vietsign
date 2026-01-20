import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { LessonDetail } from "@/src/components/learn/lesson";

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
