import { Metadata } from "next";
import HomeLayout from "@/src/components/layout/authlayout";
import { NotificationsSettings } from "@/src/components/settings/notifications";

export const metadata: Metadata = {
  title: "Notification Settings - VietSignSchool",
  description: "Manage your notification preferences",
};

export default function NotificationsSettingsPage() {
  return (
    <HomeLayout>
      <NotificationsSettings />
    </HomeLayout>
  );
}
