const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "..", "src");
const filePath = (p) => path.join(SRC_DIR, p);

console.log("Starting final export fixes...");

// 1. Fix Shared Types
const sharedTypesPath = filePath("shared/types/index.ts");
const sharedTypesContent = `/**
 * Shared Types
 * Export all shared TypeScript types and interfaces
 */
import React from 'react';

// Common Props
export interface LearningToolProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  reverse?: boolean;
}

// Enums
export enum DictionaryMode {
  SEARCH = 'search',
  SIGN_OF_DAY = 'sign_of_day',
  GAME = 'game'
}
`;
fs.writeFileSync(sharedTypesPath, sharedTypesContent);
console.log("✅ Updated shared/types/index.ts");

// 2. Fix Landing Page Export
const landingPath = filePath("features/landing/components/index.tsx");
if (fs.existsSync(landingPath)) {
  let content = fs.readFileSync(landingPath, "utf8");
  // Change export default to export function
  content = content.replace(
    "export default function LandingPage",
    "export function LandingPage",
  );
  // Also fix imports in this file while we are at it
  content = content.replace(
    '"../module/hero"',
    '"@/features/module/components/hero"',
  );
  content = content.replace(
    '"../module/features"',
    '"@/features/module/components/features"',
  );
  content = content.replace('"../../types"', '"@/shared/types"');
  fs.writeFileSync(landingPath, content);
  console.log("✅ Updated features/landing/components/index.tsx");
}

// 3. Fix App Page Imports
const pagePath = filePath("app/page.tsx");
if (fs.existsSync(pagePath)) {
  let content = fs.readFileSync(pagePath, "utf8");
  // Fix LandingPage import
  content = content.replace(
    'import LandingPage from "@/features/landing"',
    'import { LandingPage } from "@/features/landing"',
  );
  // Fix SmartLayout import
  content = content.replace(
    'import SmartLayout from "@/shared/components/layout"',
    'import { SmartLayout } from "@/shared/components/layout"',
  );
  fs.writeFileSync(pagePath, content);
  console.log("✅ Updated app/page.tsx");
}

console.log("Final fixes applied.");
