import { Metadata } from "next";
import HomeLayout from "@/src/components/layout/authlayout";
import { AppearanceSettings } from "@/src/components/settings/appearance";

export const metadata: Metadata = {
  title: "Cài đặt giao diện - VietSignSchool",
  description: "Cài đặt giao diện VietSignSchool",
};

export default function AppearanceSettingsPage() {
  return (
    <HomeLayout>
      <AppearanceSettings />
    </HomeLayout>
  );
}
