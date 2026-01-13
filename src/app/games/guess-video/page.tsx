import React from "react";
import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { GuessVideoGame } from "@/src/components/games/guess-video";

export const metadata: Metadata = {
  title: "Đoán Ký Hiệu - VietSignSchool",
  description:
    "Challenge your sign language skills by guessing the correct word from videos.",
};

export default function GuessVideoPage() {
  return (
    <DashboardLayout>
      <GuessVideoGame />
    </DashboardLayout>
  );
}
