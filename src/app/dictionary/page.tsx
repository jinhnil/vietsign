import React from "react";
import { Metadata } from "next";
import DashboardLayout from "@/src/components/layout/authlayout";
import { Dictionary } from "@/src/components/dictionary";

export const metadata: Metadata = {
  title: "Từ Điển - VietSignSchool",
  description: "Dictionary of Vietnamese Sign Language",
  
};

export default function DictionaryPage() {
  return (
    <DashboardLayout>
      <Dictionary />
    </DashboardLayout>
  );
}
