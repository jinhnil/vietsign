import React from "react";
import { Metadata } from "next";
import { DashboardLayout } from "@/shared/components/layout";
import { DailySigns } from "@/components/daily-signs";

export const metadata: Metadata = {
  title: "Ký Hiệu Của Ngày - VietSignSchool",
  description: "Daily Sign of the Day",
  
};

export default function DailySignsPage() {
  return (
    <DashboardLayout>
      <DailySigns />
    </DashboardLayout>
  );
}
