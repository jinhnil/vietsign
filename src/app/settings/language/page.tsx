import { Metadata } from "next";
import HomeLayout from "@/src/components/layout/authlayout";
import { LanguageSettings } from "@/src/components/settings/language";

export const metadata: Metadata = {
  title: "Cài đặt ngôn ngữ - VietSignSchool",
  description: "Cài đặt ngôn ngữ VietSignSchool",
};

export default function LanguageSettingsPage() {
  return (
    <HomeLayout>
      <LanguageSettings />
    </HomeLayout>
  );
}
