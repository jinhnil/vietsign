import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { StudyDetail } from "@/src/components/study/detail";

export const metadata: Metadata = {
  title: "Chi tiết lớp học - VietSignSchool",
  description: "Thông tin chi tiết lớp học, lịch học và tài liệu",
};

export default function StudyDetailPage() {
  return (
    <DashboardLayout>
      <StudyDetail />
    </DashboardLayout>
  );
}
