import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { GameManagementDetail } from "@/src/components/games-management/detail";
import { gameSections } from "@/src/data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const allGames = gameSections.flatMap(s => s.games);
  const game = allGames.find(g => g.id === id);
  
  return {
    title: `Chi tiết: ${game?.name || "Trò chơi"} - Quản lý trò chơi - VietSignSchool`,
    description: `Chi tiết và chỉnh sửa trò chơi: ${game?.name}`,
  };
}

export default function GameManagementDetailPage() {
  return (
    <DashboardLayout>
      <GameManagementDetail />
    </DashboardLayout>
  );
}
