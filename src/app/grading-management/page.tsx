import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { GradingManagement } from "@/src/components/grading";

export const metadata: Metadata = {
  title: "Chấm điểm - VietSignSchool",
  description: "Chấm điểm VietSignSchool",
  
};

export default function GradingPage() {
  return (
    <DashboardLayout>
      <GradingManagement />
    </DashboardLayout>
  );
}
