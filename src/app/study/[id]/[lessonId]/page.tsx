import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { LessonDetail } from "@/src/components/study/lesson";

export const metadata: Metadata = {
  title: "Chi tiết bài học - VietSignSchool",
  description: "Xem nội dung bài học ngôn ngữ ký hiệu",
};

export default function LessonDetailPage() {
  return (
    <DashboardLayout>
      <LessonDetail />
    </DashboardLayout>
  );
}
