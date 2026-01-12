import { Metadata } from "next";
import HomeLayout from "@/src/components/layout/authlayout";
import { AccountSettings } from "@/src/components/settings/account";

export const metadata: Metadata = {
  title: "Cài đặt tài khoản - VietSignSchool",
  description: "Cài đặt tài khoản VietSignSchool",
};

export default function AccountSettingsPage() {
  return (
    <HomeLayout>
      <AccountSettings />
    </HomeLayout>
  );
}
