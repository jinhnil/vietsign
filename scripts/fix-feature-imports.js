/**
 * VietSign Fix Feature Imports Script
 *
 * Script này chuyển đổi các imports từ @/components/... sang @/features/...
 * Chạy trước khi cleanup folder components cũ.
 */

const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "..", "src");

// Mapping các components sang features
const FEATURE_MAPPINGS = [
  { from: "@/components/auth", to: "@/features/auth" },
  { from: "@/components/study", to: "@/features/study" },
  { from: "@/components/learn", to: "@/features/learn" },
  { from: "@/components/games", to: "@/features/games" },
  { from: "@/components/practice", to: "@/features/practice" },
  { from: "@/components/dictionary", to: "@/features/dictionary" },
  { from: "@/components/messages", to: "@/features/messages" },
  { from: "@/components/settings", to: "@/features/settings" },
  { from: "@/components/dashboard", to: "@/features/dashboard" },
  { from: "@/components/home", to: "@/features/home" },
  { from: "@/components/notifications", to: "@/features/notifications" },
  { from: "@/components/users", to: "@/features/management/users" }, // Lưu ý: Users management thường ở features/management
  // Map các management components
  {
    from: "@/components/classes-management",
    to: "@/features/management/classes",
  },
  {
    from: "@/components/organizations-management",
    to: "@/features/management/organizations",
  },
  { from: "@/components/exams-management", to: "@/features/management/exams" },
  { from: "@/components/games-management", to: "@/features/management/games" },
  {
    from: "@/components/dictionary-management",
    to: "@/features/management/dictionary",
  },
  {
    from: "@/components/learning-management",
    to: "@/features/management/learning",
  },
  {
    from: "@/components/questions-management",
    to: "@/features/management/questions",
  },
  { from: "@/components/grading", to: "@/features/management/grading" },
  { from: "@/components/permissions", to: "@/features/management/permissions" },
  { from: "@/components/statistics", to: "@/features/management/statistics" },
  { from: "@/components/tools", to: "@/features/management/tools" },

  // UI components -> Shared UI
  { from: "@/components/UI", to: "@/shared/components/ui" },
  { from: "@/components/ui", to: "@/shared/components/ui" },

  // Common components -> Shared Common (đã xử lý trước đó nhưng check lại)
  { from: "@/components/common", to: "@/shared/components/common" },
];

function fixImportsInFile(filePath) {
  if (!filePath.endsWith(".ts") && !filePath.endsWith(".tsx")) return false;

  let content = fs.readFileSync(filePath, "utf8");
  let originalContent = content;

  for (const mapping of FEATURE_MAPPINGS) {
    // Regex để match import ... from "mapping.from..."
    // Escape special chars in mapping.from
    const escapedFrom = mapping.from.replace(/\//g, "\\/");
    const regex = new RegExp(
      `(import\\s+.*?from\\s+["'])${escapedFrom}(.*?)["']`,
      "g",
    );

    content = content.replace(regex, `$1${mapping.to}$2"`);
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed: ${path.relative(SRC_DIR, filePath)}`);
    return true;
  }

  return false;
}

function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return 0;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  let fixedCount = 0;

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      fixedCount += processDirectory(fullPath);
    } else if (entry.isFile()) {
      if (fixImportsInFile(fullPath)) {
        fixedCount++;
      }
    }
  }

  return fixedCount;
}

function main() {
  console.log("═".repeat(60));
  console.log("   VietSign Fix Feature Imports Script");
  console.log("═".repeat(60));
  console.log("\nFixing imports from @/components/... to @/features/...\n");

  // Quét folder app
  const appDir = path.join(SRC_DIR, "app");
  let totalFixed = processDirectory(appDir);

  // Quét cả folder features mới để đảm bảo cross-feature imports cũng đúng
  const featuresDir = path.join(SRC_DIR, "features");
  totalFixed += processDirectory(featuresDir);

  // Quét folder shared
  const sharedDir = path.join(SRC_DIR, "shared");
  totalFixed += processDirectory(sharedDir);

  console.log(`\n✅ Fixed ${totalFixed} files.`);
  console.log('\nRun "npm run dev" to verify before cleanup.\n');
}

main();
