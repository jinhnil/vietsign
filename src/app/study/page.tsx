import React from "react";
import { Metadata } from "next";
import { LearnLayout } from "@/src/components/layout/learnlayout";
import { Study } from "@/src/components/study";

export const metadata: Metadata = {
  title: "Học Bài - VietSignSchool",
  description: "Study Vietnamese Sign Language",
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

export default function StudyPage() {
  return (
    <LearnLayout>
      <Study />
    </LearnLayout>
  );
}
