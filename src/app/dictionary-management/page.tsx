import { Metadata } from "next";
import { DashboardLayout } from "@/shared/components/layout";
import { DictionaryManagementComponent } from "@/features/dictionary-management";

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
