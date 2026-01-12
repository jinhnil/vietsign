import { Metadata } from "next";
import HomeLayout from "@/src/components/layout/authlayout";
import { Home } from "@/src/components/home";

export const metadata: Metadata = {
  title: "Home - VietSignSchool",
  description: "Home page for VietSignSchool",
  
};

export default function HomePage() {
  return (
    <HomeLayout>
      <Home />
    </HomeLayout>
  );
}
