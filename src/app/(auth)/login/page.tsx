import { Metadata } from "next";
import DefaultLayout from "@/src/components/layout/defaultlayout";
import Login from "@/src/components/auth/login";

export const metadata: Metadata = {
  title: "Login - VietSignSchool",
  description: "Login page for VietSignSchool",
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

export default function LoginPage() {
  return (
    <DefaultLayout>
      <Login />
    </DefaultLayout>
  );
}
