/**
 * VietSign Reset Shared Layout Script
 *
 * Reset and properly copy layout files from original components/layout to shared/components/layout
 */

const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "..", "src");
const ORIG_LAYOUT = path.join(SRC_DIR, "components", "layout");
const SHARED_LAYOUT = path.join(SRC_DIR, "shared", "components", "layout");

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`  Copied: ${entry.name}`);
    }
  }
}

function removeDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

function main() {
  console.log("═".repeat(60));
  console.log("   VietSign Reset Shared Layout Script");
  console.log("═".repeat(60));

  // Step 1: Remove existing shared layout (broken)
  console.log("\n📂 Step 1: Removing broken shared/components/layout...");
  removeDir(SHARED_LAYOUT);
  console.log("✅ Removed");

  // Step 2: Copy from original components/layout
  console.log("\n📂 Step 2: Copying from components/layout...");
  fs.mkdirSync(SHARED_LAYOUT, { recursive: true });
  copyDir(ORIG_LAYOUT, SHARED_LAYOUT);
  console.log("✅ Copied");

  // Step 3: Create barrel export
  console.log("\n📂 Step 3: Creating barrel export...");
  const indexContent = `/**
 * Layout Components
 */

// Main layouts
export { default as DashboardLayout } from './authlayout';
export { default as AuthLayout } from './authlayout';
export { default as DefaultLayout } from './defaultlayout';
export { default as SmartLayout } from './smartlayout';
export { LearnLayout } from './learnlayout';

// Individual components
export { Header } from './header';
export { Footer } from './footer';
export { Sidebar } from './sidebar';
`;
  fs.writeFileSync(path.join(SHARED_LAYOUT, "index.ts"), indexContent);
  console.log("✅ Created index.ts");

  console.log("\n═".repeat(60));
  console.log("   ✅ DONE!");
  console.log("═".repeat(60));
}

main();
