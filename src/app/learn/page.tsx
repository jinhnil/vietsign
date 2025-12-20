import React from "react";
import { Metadata } from "next";
import { LearnLayout } from "@/src/components/layout/learnlayout";
import { Learn } from "@/src/components/learn/index";

export const metadata: Metadata = {
  title: "Learn - VietSign",
  description: "Learn Vietnamese Sign Language",
};

export default function LearnPage() {
  return (
    <LearnLayout>
      <Learn />
    </LearnLayout>
  );
}
