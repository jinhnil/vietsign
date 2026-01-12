import { Metadata } from "next";
import DefaultLayout from "@/src/components/layout/defaultlayout";
import Register from "@/src/components/auth/register";

export const metadata: Metadata = {
  title: "Register - VietSignSchool",
  description: "Register page for VietSignSchool",
  
};

export default function RegisterPage() {
  return (
    <DefaultLayout>
      <Register />
    </DefaultLayout>
  );
}
