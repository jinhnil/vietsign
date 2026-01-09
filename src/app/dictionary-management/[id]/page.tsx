import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { DictionaryManagementDetail } from "@/src/components/dictionary-management/detail";
import { dictionaryItems } from "@/src/data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const item = dictionaryItems.find(i => i.id === id);
  
  return {
    title: `Chi tiết: ${item?.word || "Từ"} - Quản lý từ điển - VietSignSchool`,
    description: `Chi tiết và chỉnh sửa từ vựng: ${item?.word}`,
  };
}

export default function DictionaryManagementDetailPage() {
  return (
    <DashboardLayout>
      <DictionaryManagementDetail />
    </DashboardLayout>
  );
}
