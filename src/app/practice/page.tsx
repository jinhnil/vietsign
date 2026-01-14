import DashboardLayout from "@/src/components/layout/authlayout";
import { PracticeModeSelection } from "@/src/components/practice";

export const metadata = {
  title: "Luyện tập | VietSign",
  description: "Chọn chế độ luyện tập ký hiệu ngôn ngữ",
};

export default function PracticePage() {
  return (
    <DashboardLayout>
      <PracticeModeSelection />
    </DashboardLayout>
  );
}
