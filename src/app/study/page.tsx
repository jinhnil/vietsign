import React from "react";
import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { Study } from "@/src/components/study";

export const metadata: Metadata = {
  title: "Lớp học của tôi - VietSignSchool",
  description: "Các lớp học đã đăng ký",
  
};

export default function StudyPage() {
  return (
    <DashboardLayout>
      <Study />
    </DashboardLayout>
  );
}
