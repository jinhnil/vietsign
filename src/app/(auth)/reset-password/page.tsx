import { Metadata } from "next";
import DefaultLayout from "@/src/components/layout/defaultlayout";
import ResetPassword from "@/src/components/auth/reset-password";
import { Suspense } from "react";
import Loading from "@/src/app/loading";

export const metadata: Metadata = {
  title: "Đặt lại mật khẩu - VietSignSchool",
  description: "Đặt lại mật khẩu mới cho tài khoản VietSignSchool",
  
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
