import { Metadata } from "next";
import DefaultLayout from "@/src/components/layout/defaultlayout";
import Register from "@/src/components/auth/register";

export const metadata: Metadata = {
  title: "Register - VietSign",
  description: "Register page for VietSign",
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

export default function RegisterPage() {
  return (
    <DefaultLayout>
      <Register />
    </DefaultLayout>
  );
}
