import { Metadata } from "next";
import AuthLayout from "@/src/components/layout/authlayout";
import { DictionaryDetail } from "@/src/components/dictionary/detail";
import { dictionaryItems } from "@/src/data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const item = dictionaryItems.find(i => i.id === id);
  
  return {
    title: `${item?.word || "Chi tiết từ"} - VietSignSchool`,
    description: `Chi tiết từ vựng ngôn ngữ ký hiệu: ${item?.word}`,
  };
}

export default function DictionaryDetailPage() {
  return (
    <AuthLayout>
      <DictionaryDetail />
    </AuthLayout>
  );
}
