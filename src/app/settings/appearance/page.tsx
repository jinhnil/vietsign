import { Metadata } from "next";
import HomeLayout from "@/src/components/layout/authlayout";
import { AppearanceSettings } from "@/src/components/settings/appearance";

export const metadata: Metadata = {
  title: "Appearance Settings - VietSignSchool",
  description: "Customize the look and feel of VietSignSchool",
};

export default function AppearanceSettingsPage() {
  return (
    <HomeLayout>
      <AppearanceSettings />
    </HomeLayout>
  );
}
