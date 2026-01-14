import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { OrganizationsManagement } from "@/src/components/organizations";

export const metadata: Metadata = {
  title: "Quản lý tổ chức - VietSignSchool",
  description: "Quản lý các tổ chức đào tạo VietSignSchool",
};

export default function OrganizationsPage() {
  return (
    <DashboardLayout>
      <OrganizationsManagement />
    </DashboardLayout>
  );
}
