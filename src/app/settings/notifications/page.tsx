import { Metadata } from "next";
import HomeLayout from "@/src/components/layout/authlayout";
import { NotificationsSettings } from "@/src/components/settings/notifications";

export const metadata: Metadata = {
  title: "Cài đặt thông báo - VietSignSchool",
  description: "Cài đặt thông báo VietSignSchool",
};

export default function NotificationsSettingsPage() {
  return (
    <HomeLayout>
      <NotificationsSettings />
    </HomeLayout>
  );
}
