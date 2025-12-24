import { Metadata } from "next";
import HomeLayout from "@/src/components/layout/authlayout";
import { Home } from "@/src/components/home";

export const metadata: Metadata = {
  title: "Home - VietSignSchool",
  description: "Home page for VietSignSchool",
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

export default function HomePage() {
  return (
    <HomeLayout>
      <Home />
    </HomeLayout>
  );
}
