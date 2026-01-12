import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { ClassRegistrationManagement } from "@/src/components/class-registration";

export const metadata: Metadata = {
  title: "Đăng ký lớp học - VietSignSchool",
  description: "Đăng ký lớp học VietSignSchool",
  
};

export default function ClassRegistrationPage() {
  return (
    <DashboardLayout>
      <ClassRegistrationManagement />
    </DashboardLayout>
  );
}
