import { Metadata } from "next";
import AuthLayout from "@/src/components/layout/authlayout";
import { Messages } from "@/src/components/messages";

export const metadata: Metadata = {
  title: "Tin nhắn - VietSignSchool",
  description: "Trang tin nhắn của VietSignSchool",
  
};

export default function MessagesPage() {
  return (
    <AuthLayout hideFooter>
      <Messages />
    </AuthLayout>
  );
}
