import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { FacilityManagementDetail } from "@/src/components/facilities/detail";


export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  
  return {
    title: `Chi tiết cơ sở - Quản lý cơ sở - VietSignSchool`,
    description: `Chi tiết và chỉnh sửa thông tin cơ sở giáo dục`,
  };
}

export default function FacilityManagementDetailPage() {
  return (
    <DashboardLayout>
      <FacilityManagementDetail />
    </DashboardLayout>
  );
}
