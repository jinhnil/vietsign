import DashboardLayout from "@/src/components/layout/authlayout";
import { WordPractice } from "@/src/components/practice/WordPractice";

export const metadata = {
  title: "Luyện tập theo từ | VietSign",
  description: "Học và thực hành các ký hiệu cho từng từ riêng lẻ",
};

export default function WordPracticePage() {
  return (
    <DashboardLayout>
      <WordPractice />
    </DashboardLayout>
  );
}
