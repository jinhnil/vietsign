import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { DictionaryManagementComponent } from "@/src/components/dictionary-management";

export const metadata: Metadata = {
  title: "Quản lý từ điển - VietSignSchool",
  description: "Quản lý từ điển VietSignSchool",
  
};

export default function DictionaryManagementPage() {
  return (
    <DashboardLayout>
      <DictionaryManagementComponent />
    </DashboardLayout>
  );
}
