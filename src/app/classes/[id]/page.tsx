import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { ClassManagementDetail } from "@/src/components/classes/detail";
import { mockClasses } from "@/src/data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const classItem = mockClasses.find(c => c.id === id);
  
  return {
    title: `Chi tiết: ${classItem?.name || "Lớp học"} - Quản lý lớp học - VietSignSchool`,
    description: `Chi tiết và chỉnh sửa lớp học: ${classItem?.name}`,
  };
}

export default function ClassManagementDetailPage() {
  return (
    <DashboardLayout>
      <ClassManagementDetail />
    </DashboardLayout>
  );
}
