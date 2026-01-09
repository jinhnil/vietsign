import { Metadata } from "next";
import HomeLayout from "@/src/components/layout/authlayout";
import { PrivacySettings } from "@/src/components/settings/privacy";

export const metadata: Metadata = {
  title: "Privacy Settings - VietSignSchool",
  description: "Manage your privacy and data sharing settings",
};

export default function PrivacySettingsPage() {
  return (
    <HomeLayout>
      <PrivacySettings />
    </HomeLayout>
  );
}
