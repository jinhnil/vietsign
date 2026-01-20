import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { ClassesManagement } from "@/src/components/classes-management";

export const metadata: Metadata = {
  title: "Quản lý lớp học - VietSignSchool",
  description: "Quản lý lớp học VietSignSchool",
};

export default function ClassesPage() {
  return (
    <DashboardLayout>
      <ClassesManagement />
    </DashboardLayout>
  );
}
