import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { GamesManagementComponent } from "@/src/components/games-management";

export const metadata: Metadata = {
  title: "Quản lý trò chơi - VietSignSchool",
  description: "Quản lý trò chơi VietSignSchool",
  
};

export default function GamesManagementPage() {
  return (
    <DashboardLayout>
      <GamesManagementComponent />
    </DashboardLayout>
  );
}
