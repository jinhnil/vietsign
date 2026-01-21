import { Metadata } from "next";
import { DashboardLayout } from "@/shared/components/layout";
import { TopicDetail } from "@/features/learn/topic";

export const metadata: Metadata = {
  title: "Chi tiết chủ đề - VietSignSchool",
  description: "Danh sách bài học trong chủ đề",
};

export default function LearnTopicPage() {
  return (
    <DashboardLayout>
      <TopicDetail />
    </DashboardLayout>
  );
}
