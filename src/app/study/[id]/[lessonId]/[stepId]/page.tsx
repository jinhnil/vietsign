import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { StepDetail } from "@/src/components/study/step";

export const metadata: Metadata = {
  title: "Chi tiết bước học - VietSignSchool",
  description: "Thực hành ngôn ngữ ký hiệu",
};

export default function StepDetailPage() {
  return (
    <DashboardLayout>
      <StepDetail />
    </DashboardLayout>
  );
}
