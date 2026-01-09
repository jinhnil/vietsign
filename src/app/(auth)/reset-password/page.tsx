import { Metadata } from "next";
import DefaultLayout from "@/src/components/layout/defaultlayout";
import ResetPassword from "@/src/components/auth/reset-password";
import { Suspense } from "react";
import Loading from "@/src/app/loading";

export const metadata: Metadata = {
  title: "Đặt lại mật khẩu - VietSignSchool",
  description: "Đặt lại mật khẩu mới cho tài khoản VietSignSchool",
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

export default function ResetPasswordPage() {
  return (
    <DefaultLayout>
      <Suspense fallback={<Loading />}>
        <ResetPassword />
      </Suspense>
    </DefaultLayout>
  );
}
