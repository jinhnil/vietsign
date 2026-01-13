import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { PermissionsManagement } from "@/src/components/permissions";

export const metadata: Metadata = {
  title: "Quản lý phân quyền - VietSignSchool",
  description: "Quản lý vai trò và quyền hạn trong hệ thống",
};

export default function PermissionsPage() {
  return (
    <DashboardLayout>
      <PermissionsManagement />
    </DashboardLayout>
  );
}
