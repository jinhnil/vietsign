import { Metadata } from "next";
import HomeLayout from "@/src/components/layout/authlayout";
import { PrivacySettings } from "@/src/components/settings/privacy";

export const metadata: Metadata = {
  title: "Cài đặt quyền riêng tư - VietSignSchool",
  description: "Cài đặt quyền riêng tư VietSignSchool",
};

export default function PrivacySettingsPage() {
  return (
    <HomeLayout>
      <PrivacySettings />
    </HomeLayout>
  );
}
