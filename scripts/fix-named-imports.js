/**
 * VietSign Fix Named Imports Script
 *
 * Fix imports to use named imports from barrel exports
 */

const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "..", "src");

// Fix default imports to named imports
const IMPORT_FIXES = [
  // DashboardLayout
  {
    from: /import\s+DashboardLayout\s+from\s+["']@\/shared\/components\/layout["'];?/g,
    to: 'import { DashboardLayout } from "@/shared/components/layout";',
  },
  {
    from: /import\s+AuthLayout\s+from\s+["']@\/shared\/components\/layout["'];?/g,
    to: 'import { DashboardLayout as AuthLayout } from "@/shared/components/layout";',
  },
  {
    from: /import\s+HomeLayout\s+from\s+["']@\/shared\/components\/layout["'];?/g,
    to: 'import { DashboardLayout as HomeLayout } from "@/shared/components/layout";',
  },
  {
    from: /import\s+DefaultLayout\s+from\s+["']@\/shared\/components\/layout["'];?/g,
    to: 'import { DefaultLayout } from "@/shared/components/layout";',
  },
  {
    from: /import\s+SmartLayout\s+from\s+["']@\/shared\/components\/layout["'];?/g,
    to: 'import { SmartLayout } from "@/shared/components/layout";',
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
  console.log("   VietSign Fix Named Imports Script");
  console.log("═".repeat(60));
  console.log("\nFixing default imports to named imports...\n");

  const totalFixed = processDirectory(path.join(SRC_DIR, "app"));

  console.log(`\n✅ Fixed ${totalFixed} files.`);
  console.log('\nRun "npm run dev" to verify.\n');
}

main();
