import DashboardLayout from "@/src/components/layout/authlayout";
import { AiPractice } from "@/src/components/practice/AiPractice";

export const metadata = {
  title: "Luyện tập AI | VietSign",
  description: "Thực hiện ký hiệu và AI sẽ nhận diện",
};

export default function AiPracticePage() {
  return (
    <DashboardLayout>
      <AiPractice />
    </DashboardLayout>
  );
}
