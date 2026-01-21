/**
 * VietSign Import Fix Script
 *
 * Script này sửa lỗi import @/src/... thành @/... cho các file còn lại
 *
 * Chạy script: node scripts/fix-imports.js
 */

const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "..", "src");

// These patterns replace @/src/* with @/* since tsconfig already points @/* to ./src/*
const IMPORT_FIXES = [
  // Fix double src path issue
  { from: /@\/src\//g, to: "@/" },
];

function fixImportsInFile(filePath) {
  if (!filePath.endsWith(".ts") && !filePath.endsWith(".tsx")) return false;

  let content = fs.readFileSync(filePath, "utf8");
  let originalContent = content;

  for (const fix of IMPORT_FIXES) {
    content = content.replace(fix.from, fix.to);
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  }

  return false;
}

function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;

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
  console.log("   VietSign Import Fix Script");
  console.log("═".repeat(60));
  console.log("\nFixing @/src/... to @/... in all TypeScript files...\n");

  const totalFixed = processDirectory(SRC_DIR);

  console.log(`\n✅ Fixed ${totalFixed} files.`);
  console.log('\nRun "npm run dev" to verify the fix worked.\n');
}

main();
