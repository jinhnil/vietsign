import { Metadata } from "next";
import HomeLayout from "@/src/components/layout/authlayout";
import { HelpSettings } from "@/src/components/settings/help";

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
