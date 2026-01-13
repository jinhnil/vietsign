import React from "react";
import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { LessonDetail } from "@/src/components/learn/lesson";

export const metadata: Metadata = {
  title: "Bài học chi tiết - VietSignSchool",
  description: "Vietnamese Sign Language Lesson",
};

export default function LessonPage() {
  return (
    <DashboardLayout>
      <LessonDetail />
    </DashboardLayout>
  );
}
