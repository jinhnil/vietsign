import { Metadata } from "next";
import HomeLayout from "@/src/components/layout/authlayout";
import { AccountSettings } from "@/src/components/settings/account";

export const metadata: Metadata = {
  title: "Account Settings - VietSignSchool",
  description: "Manage your account settings",
};

export default function AccountSettingsPage() {
  return (
    <HomeLayout>
      <AccountSettings />
    </HomeLayout>
  );
}
