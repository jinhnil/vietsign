import { Metadata } from "next";
import DefaultLayout from "@/src/components/layout/defaultlayout";
import Login from "@/src/components/auth/login";

export const metadata: Metadata = {
  title: "Login - VietSignSchool",
  description: "Login page for VietSignSchool",
  
};

export default function LoginPage() {
  return (
    <DefaultLayout>
      <Login />
    </DefaultLayout>
  );
}
