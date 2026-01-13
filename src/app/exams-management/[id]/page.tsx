import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { ExamManagementDetail } from "@/src/components/exams/detail";
import { mockExams } from "@/src/data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const exam = mockExams.find(e => e.id === id);
  
  return {
    title: `Chi tiết: ${exam?.title || "Bài kiểm tra"} - Quản lý kiểm tra - VietSignSchool`,
    description: `Chi tiết và chỉnh sửa bài kiểm tra: ${exam?.title}`,
  };
}

export default function ExamManagementDetailPage() {
  return (
    <DashboardLayout>
      <ExamManagementDetail />
    </DashboardLayout>
  );
}
