import { Metadata } from "next";
import DefaultLayout from "@/src/components/layout/defaultlayout";
import ForgotPassword from "@/src/components/auth/forgot-password";

export const metadata: Metadata = {
  title: "Quên mật khẩu - VietSignSchool",
  description: "Đặt lại mật khẩu tài khoản VietSignSchool",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon.ico",
        href: "/favicon.ico",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon.ico",
        href: "/favicon.ico",
      },
    ],
  },
};

export default function ForgotPasswordPage() {
  return (
    <DefaultLayout>
      <ForgotPassword />
    </DefaultLayout>
  );
}
