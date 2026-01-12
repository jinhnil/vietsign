import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { NotificationsManagement } from "@/src/components/notifications";

export const metadata: Metadata = {
  title: "Thông báo - VietSignSchool",
  description: "Quản lý thông báo VietSignSchool",
  
};

export default function NotificationsPage() {
  return (
    <DashboardLayout>
      <NotificationsManagement />
    </DashboardLayout>
  );
}
