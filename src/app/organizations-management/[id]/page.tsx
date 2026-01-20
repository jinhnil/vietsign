import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { OrganizationDetail } from "@/src/components/organizations-management/detail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Chi tiết tổ chức - Quản lý tổ chức - VietSignSchool`,
    description: `Chi tiết và chỉnh sửa thông tin tổ chức giáo dục`,
  };
}

export default function OrganizationDetailPage() {
  return (
    <DashboardLayout>
      <OrganizationDetail />
    </DashboardLayout>
  );
}
