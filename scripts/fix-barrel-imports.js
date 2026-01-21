/**
 * VietSign Final Import Fix Script
 *
 * Script này sửa imports để sử dụng barrel exports đúng cách
 */

const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "..", "src");

// Fix imports to use barrel exports or correct file names
const IMPORT_FIXES = [
  // Fix layout imports to use barrel export
  {
    from: /from\s+["']@\/shared\/components\/layout\/authlayout["']/gi,
    to: 'from "@/shared/components/layout"',
  },
  {
    from: /from\s+["']@\/shared\/components\/layout\/AuthLayout["']/g,
    to: 'from "@/shared/components/layout"',
  },
  {
    from: /from\s+["']@\/shared\/components\/layout\/defaultlayout["']/gi,
    to: 'from "@/shared/components/layout"',
  },
  {
    from: /from\s+["']@\/shared\/components\/layout\/DefaultLayout["']/g,
    to: 'from "@/shared/components/layout"',
  },
  {
    from: /from\s+["']@\/shared\/components\/layout\/smartlayout["']/gi,
    to: 'from "@/shared/components/layout"',
  },
  {
    from: /from\s+["']@\/shared\/components\/layout\/SmartLayout["']/g,
    to: 'from "@/shared/components/layout"',
  },
  {
    from: /from\s+["']@\/shared\/components\/layout\/learnlayout["']/gi,
    to: 'from "@/shared/components/layout"',
  },
  {
    from: /from\s+["']@\/shared\/components\/layout\/LearnLayout["']/g,
    to: 'from "@/shared/components/layout"',
  },
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
    console.log(`✅ Fixed: ${filePath.replace(SRC_DIR, "src")}`);
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
  console.log("   VietSign Final Import Fix Script");
  console.log("═".repeat(60));
  console.log("\nFixing layout imports to use barrel exports...\n");

  const totalFixed = processDirectory(path.join(SRC_DIR, "app"));

  console.log(`\n✅ Fixed ${totalFixed} files.`);
  console.log('\nRun "npm run dev" to verify.\n');
}

main();
