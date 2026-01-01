import { Metadata } from "next";
import HomeLayout from "@/src/components/layout/authlayout";
import { LanguageSettings } from "@/src/components/settings/language";

export const metadata: Metadata = {
  title: "Language Settings - VietSignSchool",
  description: "Set your preferred language and region",
};

export default function LanguageSettingsPage() {
  return (
    <HomeLayout>
      <LanguageSettings />
    </HomeLayout>
  );
}
