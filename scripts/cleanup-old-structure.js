/**
 * VietSign Project Cleanup Script
 *
 * Script này sẽ xóa các thư mục cũ sau khi migration hoàn tất
 * CHỈ CHẠY SAU KHI ĐÃ KIỂM TRA VÀ XÁC NHẬN MIGRATION THÀNH CÔNG!
 *
 * Chạy script: node scripts/cleanup-old-structure.js
 */

const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "..", "src");

// Directories to remove after successful migration
const OLD_DIRECTORIES = [
  "config",
  "providers",
  "store",
  "lib",
  "model",
  "components",
  "hooks",
  "utils",
  "services",
];

function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`🗑️  Removed: ${dirPath}`);
  } else {
    console.log(`⚠️  Directory not found: ${dirPath}`);
  }
}

function main() {
  console.log("═".repeat(60));
  console.log("   VietSign Old Structure Cleanup Script");
  console.log("═".repeat(60));
  console.log("\n⚠️  WARNING: This will permanently delete old directories!\n");
  console.log("Old directories to be removed:");
  OLD_DIRECTORIES.forEach((dir) => console.log(`   - src/${dir}`));
  console.log("\n");

  // Check if new structure exists
  const newStructure = ["core", "shared", "domain", "features"];
  const missingNew = newStructure.filter(
    (dir) => !fs.existsSync(path.join(SRC_DIR, dir)),
  );

  if (missingNew.length > 0) {
    console.log("❌ Error: New structure not found!");
    console.log("   Missing directories:", missingNew.join(", "));
    console.log("   Please run migrate-architecture.js first.\n");
    process.exit(1);
  }

  console.log("✅ New structure verified. Proceeding with cleanup...\n");

  for (const dir of OLD_DIRECTORIES) {
    removeDirectory(path.join(SRC_DIR, dir));
  }

  console.log("\n═".repeat(60));
  console.log("   ✅ CLEANUP COMPLETED!");
  console.log("═".repeat(60));
  console.log("\nThe old structure has been removed.");
  console.log('Run "npm run dev" to verify everything still works.\n');
}

// Only run if explicitly called
const args = process.argv.slice(2);
if (args.includes("--confirm")) {
  main();
} else {
  console.log("═".repeat(60));
  console.log("   VietSign Old Structure Cleanup Script");
  console.log("═".repeat(60));
  console.log("\n⚠️  SAFETY CHECK: This script will delete old directories.\n");
  console.log("To run this script, add --confirm flag:");
  console.log("   node scripts/cleanup-old-structure.js --confirm\n");
  console.log("Make sure you have:");
  console.log("   1. Run the migration script successfully");
  console.log('   2. Verified the app works with "npm run dev"');
  console.log("   3. Committed or backed up your changes\n");
}
