import { Metadata } from "next";
import AuthLayout from "@/src/components/layout/authlayout";
import { Messages } from "@/src/components/messages";

export const metadata: Metadata = {
  title: "Tin nhắn - VietSignSchool",
  description: "Trang tin nhắn của VietSignSchool",
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

export default function MessagesPage() {
  return (
    <AuthLayout hideFooter>
      <Messages />
    </AuthLayout>
  );
}
