import DashboardLayout from "@/src/components/layout/authlayout";
import { SpellingPractice } from "@/src/components/practice/SpellingPractice";

export const metadata = {
  title: "Luyện tập đánh vần | VietSign",
  description: "Đánh vần từ bằng ký hiệu chữ cái",
};

export default function SpellingPracticePage() {
  return (
    <DashboardLayout>
      <SpellingPractice />
    </DashboardLayout>
  );
}
