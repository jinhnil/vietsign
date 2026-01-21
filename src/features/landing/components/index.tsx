"use client";
import React, { useState } from "react";
import { Hero } from "../module/hero";
import { Features } from "../module/features";
import { DictionaryMode } from "../../types";

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<DictionaryMode>(
    DictionaryMode.SEARCH
  );

  const handleOpenTool = (mode: DictionaryMode) => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  return (
    <>
      <Hero onOpenTool={handleOpenTool} />
      <Features />
    </>
  );
}
