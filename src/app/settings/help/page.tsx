import { Metadata } from "next";
import HomeLayout from "@/src/components/layout/authlayout";
import { HelpSettings } from "@/src/components/settings/help";

export const metadata: Metadata = {
  title: "Help & Support - VietSignSchool",
  description: "Get help and support for VietSignSchool",
};

export default function HelpSettingsPage() {
  return (
    <HomeLayout>
      <HelpSettings />
    </HomeLayout>
  );
}
