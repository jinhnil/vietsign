import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { FacilityManagementDetail } from "@/src/components/facilities/detail";
import { mockFacilities } from "@/src/data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const facility = mockFacilities.find(f => f.id === id);
  
  return {
    title: `Chi tiết: ${facility?.name || "Cơ sở"} - Quản lý cơ sở - VietSignSchool`,
    description: `Chi tiết và chỉnh sửa cơ sở: ${facility?.name}`,
  };
}

export default function FacilityManagementDetailPage() {
  return (
    <DashboardLayout>
      <FacilityManagementDetail />
    </DashboardLayout>
  );
}
