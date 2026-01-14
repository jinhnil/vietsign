import DashboardLayout from "@/src/components/layout/authlayout";
import { SentencePractice } from "@/src/components/practice/SentencePractice";

export const metadata = {
  title: "Luyện tập theo câu | VietSign",
  description: "Thực hành ghép các ký hiệu thành câu hoàn chỉnh",
};

export default function SentencePracticePage() {
  return (
    <DashboardLayout>
      <SentencePractice />
    </DashboardLayout>
  );
}
