import { Metadata } from "next";
import { DashboardLayout } from "@/shared/components/layout";
import { HelpSettings } from "@/features/settings/help";

export const metadata: Metadata = {
  title: "Trợ giúp & Hỗ trợ - VietSignSchool",
  description: "Trợ giúp và hỗ trợ VietSignSchool",
};

export default function HelpSettingsPage() {
  return (
    <HomeLayout>
      <HelpSettings />
    </HomeLayout>
  );
}
