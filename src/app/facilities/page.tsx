import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { FacilitiesManagement } from "@/src/components/facilities";

export const metadata: Metadata = {
  title: "Quản lý cơ sở - VietSignSchool",
  description: "Quản lý các cơ sở đào tạo VietSignSchool",
  
};

export default function FacilitiesPage() {
  return (
    <DashboardLayout>
      <FacilitiesManagement />
    </DashboardLayout>
  );
}
