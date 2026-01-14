import React from "react";
import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { GamePlaceholder } from "@/src/components/games/common/GamePlaceholder";

export const metadata: Metadata = {
  title: "Âm Nhạc Ký Hiệu - VietSignSchool",
  description: "Học bài hát yêu thích qua ngôn ngữ ký hiệu.",
};

export default function MusicSignPage() {
  return (
    <DashboardLayout>
      <GamePlaceholder
        title="Âm Nhạc Ký Hiệu"
        description="Kết hợp âm nhạc và ngôn ngữ ký hiệu. Học cách thể hiện cảm xúc và lời bài hát qua các động tác ký hiệu nghệ thuật."
        colorClass="bg-pink-500"
      />
    </DashboardLayout>
  );
}
