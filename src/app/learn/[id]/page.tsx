import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { CourseDetail } from "@/src/components/learn/course";

export const metadata: Metadata = {
  title: "Chi tiết khóa học - VietSignSchool",
  description: "Learn Vietnamese Sign Language Course Detail",
};

export default function LearnCoursePage() {
  return (
    <DashboardLayout>
      <CourseDetail />
    </DashboardLayout>
  );
}
