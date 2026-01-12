import { Metadata } from "next";
import DefaultLayout from "@/src/components/layout/defaultlayout";
import ForgotPassword from "@/src/components/auth/forgot-password";

export const metadata: Metadata = {
  title: "Quên mật khẩu - VietSignSchool",
  description: "Đặt lại mật khẩu tài khoản VietSignSchool",
  
};

export default function ForgotPasswordPage() {
  return (
    <DefaultLayout>
      <ForgotPassword />
    </DefaultLayout>
  );
}
