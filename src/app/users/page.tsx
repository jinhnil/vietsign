import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { UsersManagement } from "@/src/components/users";

export const metadata: Metadata = {
  title: "Quản lý người dùng - VietSignSchool",
  description: "Quản lý người dùng trong hệ thống VietSignSchool",
  
};

export default function UsersPage() {
  return (
    <DashboardLayout>
      <UsersManagement />
    </DashboardLayout>
  );
}
