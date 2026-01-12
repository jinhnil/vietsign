import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { StatisticsManagement } from "@/src/components/statistics";

export const metadata: Metadata = {
  title: "Thống kê - VietSignSchool",
  description: "Thống kê VietSignSchool",
  
};

export default function StatisticsPage() {
  return (
    <DashboardLayout>
      <StatisticsManagement />
    </DashboardLayout>
  );
}
