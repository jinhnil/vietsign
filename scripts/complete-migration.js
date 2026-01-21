/**
 * VietSign Complete Migration Script
 *
 * Script này hoàn thiện migration bằng cách:
 * 1. Đổi tên files trong shared/components/layout để match với tên cũ
 * 2. Cập nhật barrel exports
 * 3. Chuyển app/ imports sang paths mới
 */

const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "..", "src");

// ============================================
// STEP 1: Rename files in new structure
// ============================================

function renameIfExists(oldPath, newPath) {
  if (fs.existsSync(oldPath) && !fs.existsSync(newPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(
      `📝 Renamed: ${path.basename(oldPath)} -> ${path.basename(newPath)}`,
    );
    return true;
  }
  return false;
}

function step1_RenameFiles() {
  console.log("\n📂 Step 1: Renaming files in new structure...\n");

  const layoutDir = path.join(SRC_DIR, "shared", "components", "layout");

  // Rename layout files to lowercase
  renameIfExists(
    path.join(layoutDir, "AuthLayout.tsx"),
    path.join(layoutDir, "authlayout.tsx"),
  );
  renameIfExists(
    path.join(layoutDir, "DefaultLayout.tsx"),
    path.join(layoutDir, "defaultlayout.tsx"),
  );
  renameIfExists(
    path.join(layoutDir, "SmartLayout.tsx"),
    path.join(layoutDir, "smartlayout.tsx"),
  );
  renameIfExists(
    path.join(layoutDir, "LearnLayout.tsx"),
    path.join(layoutDir, "learnlayout.tsx"),
  );

  console.log("✅ Step 1 completed!\n");
}

// ============================================
// STEP 2: Update barrel exports
// ============================================

function step2_UpdateBarrelExports() {
  console.log("📦 Step 2: Updating barrel exports...\n");

  // Update shared/components/layout/index.ts
  const layoutIndexPath = path.join(
    SRC_DIR,
    "shared",
    "components",
    "layout",
    "index.ts",
  );
  const layoutIndexContent = `/**
 * Layout Components
 * 
 * Header, Footer, Sidebar, and layout wrappers
 */

export { Header } from './Header';
export { Footer } from './Footer';
export { Sidebar } from './Sidebar';
export { default as AuthLayout } from './authlayout';
export { default as DashboardLayout } from './authlayout';
export { default as DefaultLayout } from './defaultlayout';
export { default as SmartLayout } from './smartlayout';
export { LearnLayout } from './learnlayout';
`;
  fs.writeFileSync(layoutIndexPath, layoutIndexContent);
  console.log("✅ Updated: shared/components/layout/index.ts");

  // Update shared/components/index.ts
  const componentsIndexPath = path.join(
    SRC_DIR,
    "shared",
    "components",
    "index.ts",
  );
  const componentsIndexContent = `/**
 * Shared Components
 */

export * from './ui';
export * from './layout';
export * from './common';
`;
  fs.writeFileSync(componentsIndexPath, componentsIndexContent);
  console.log("✅ Updated: shared/components/index.ts");

  // Update shared/index.ts
  const sharedIndexPath = path.join(SRC_DIR, "shared", "index.ts");
  const sharedIndexContent = `/**
 * Shared Module
 * 
 * Contains reusable components, hooks, and utilities
 */

export * from './components';
`;
  fs.writeFileSync(sharedIndexPath, sharedIndexContent);
  console.log("✅ Updated: shared/index.ts");

  console.log("✅ Step 2 completed!\n");
}

// ============================================
// STEP 3: Update app/ imports to use new paths
// ============================================

const NEW_IMPORT_MAPPINGS = [
  // Layout imports - use barrel export
  {
    from: /import\s+(DashboardLayout|AuthLayout|HomeLayout)\s+from\s+["']@\/components\/layout\/authlayout["'];?/g,
    to: 'import DashboardLayout from "@/shared/components/layout/authlayout";',
  },
  {
    from: /import\s+DefaultLayout\s+from\s+["']@\/components\/layout\/defaultlayout["'];?/g,
    to: 'import DefaultLayout from "@/shared/components/layout/defaultlayout";',
  },
  {
    from: /import\s+SmartLayout\s+from\s+["']@\/components\/layout\/smartlayout["'];?/g,
    to: 'import SmartLayout from "@/shared/components/layout/smartlayout";',
  },
  {
    from: /import\s+\{\s*LearnLayout\s*\}\s+from\s+["']@\/components\/layout\/learnlayout["'];?/g,
    to: 'import { LearnLayout } from "@/shared/components/layout/learnlayout";',
  },

  // Common components
  {
    from: /@\/components\/common\/VideoPlayer/g,
    to: "@/shared/components/common/VideoPlayer",
  },
  {
    from: /@\/components\/common\/Modal/g,
    to: "@/shared/components/common/Modal",
  },
  {
    from: /@\/components\/common\/Pagination/g,
    to: "@/shared/components/common/Pagination",
  },
  {
    from: /@\/components\/common\/ConfirmModal/g,
    to: "@/shared/components/common/ConfirmModal",
  },

  // UI components
  { from: /@\/components\/UI\/Loader/g, to: "@/shared/components/ui/Loader" },

  // Core - config
  { from: /@\/config\//g, to: "@/core/config/" },

  // Core - providers
  { from: /@\/providers\//g, to: "@/core/providers/" },

  // Core - store
  { from: /@\/store\//g, to: "@/core/store/" },

  // Core - services/api
  { from: /@\/utils\/api\//g, to: "@/core/services/api/" },

  // Shared - hooks
  { from: /@\/hooks\//g, to: "@/shared/hooks/" },

  // Shared - utils
  { from: /@\/utils\/text/g, to: "@/shared/utils/text" },
  { from: /@\/utils\/class-utils/g, to: "@/shared/utils/cn" },
  { from: /@\/utils\/gemini/g, to: "@/shared/utils/gemini" },

  // Domain - models
  { from: /@\/model\//g, to: "@/domain/entities/" },
];

function updateImportsInFile(filePath) {
  if (!filePath.endsWith(".ts") && !filePath.endsWith(".tsx")) return false;

  let content = fs.readFileSync(filePath, "utf8");
  let originalContent = content;

  for (const mapping of NEW_IMPORT_MAPPINGS) {
    content = content.replace(mapping.from, mapping.to);
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    return true;
  }

  return false;
}

function processDirectory(dirPath, depth = 0) {
  if (!fs.existsSync(dirPath)) return 0;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  let fixedCount = 0;

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      fixedCount += processDirectory(fullPath, depth + 1);
    } else if (entry.isFile()) {
      if (updateImportsInFile(fullPath)) {
        console.log(`✅ ${fullPath.replace(SRC_DIR, "src")}`);
        fixedCount++;
      }
    }
  }

  return fixedCount;
}

function step3_UpdateAppImports() {
  console.log("📱 Step 3: Updating app/ imports to use new paths...\n");

  const appFixed = processDirectory(path.join(SRC_DIR, "app"));

  console.log(`\n✅ Step 3 completed! Updated ${appFixed} files.\n`);
}

// ============================================
// STEP 4: Copy remaining files to new structure
// ============================================

function copyFileWithFix(src, dest) {
  if (!fs.existsSync(src)) return false;

  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  let content = fs.readFileSync(src, "utf8");

  // Fix imports in the copied file
  for (const mapping of NEW_IMPORT_MAPPINGS) {
    content = content.replace(mapping.from, mapping.to);
  }

  // Also fix @/src/ to @/
  content = content.replace(/@\/src\//g, "@/");

  fs.writeFileSync(dest, content);
  return true;
}

function step4_CopyRemainingFiles() {
  console.log("📦 Step 4: Copying remaining files to new structure...\n");

  // Copy hooks
  const hooksDir = path.join(SRC_DIR, "hooks");
  const sharedHooksDir = path.join(SRC_DIR, "shared", "hooks");

  if (fs.existsSync(hooksDir)) {
    const files = fs.readdirSync(hooksDir);
    for (const file of files) {
      if (file.endsWith(".ts") || file.endsWith(".tsx")) {
        const src = path.join(hooksDir, file);
        const dest = path.join(sharedHooksDir, file);
        if (copyFileWithFix(src, dest)) {
          console.log(`✅ Copied: hooks/${file} -> shared/hooks/${file}`);
        }
      }
    }
  }

  // Copy utils (except api folder)
  const utilsDir = path.join(SRC_DIR, "utils");
  const sharedUtilsDir = path.join(SRC_DIR, "shared", "utils");

  if (fs.existsSync(utilsDir)) {
    const files = fs.readdirSync(utilsDir);
    for (const file of files) {
      if (file !== "api" && (file.endsWith(".ts") || file.endsWith(".tsx"))) {
        const src = path.join(utilsDir, file);
        const dest = path.join(sharedUtilsDir, file);
        if (copyFileWithFix(src, dest)) {
          console.log(`✅ Copied: utils/${file} -> shared/utils/${file}`);
        }
      }
    }
  }

  // Update shared/hooks/index.ts
  const sharedHooksIndexPath = path.join(sharedHooksDir, "index.ts");
  const sharedHooksIndexContent = `/**
 * Shared Hooks
 */

export * from './useAuth';
export * from './useUsers';
export * from './useOrganizations';
`;
  fs.writeFileSync(sharedHooksIndexPath, sharedHooksIndexContent);
  console.log("✅ Updated: shared/hooks/index.ts");

  // Update shared/utils/index.ts
  const sharedUtilsIndexPath = path.join(sharedUtilsDir, "index.ts");
  const sharedUtilsIndexContent = `/**
 * Shared Utilities
 */

export * from './text';
export { cn } from './class-utils';
export * from './gemini';
`;
  fs.writeFileSync(sharedUtilsIndexPath, sharedUtilsIndexContent);
  console.log("✅ Updated: shared/utils/index.ts");

  console.log("✅ Step 4 completed!\n");
}

// ============================================
// MAIN
// ============================================

function main() {
  console.log("═".repeat(60));
  console.log("   VietSign Complete Migration Script");
  console.log("═".repeat(60));

  try {
    step1_RenameFiles();
    step2_UpdateBarrelExports();
    step3_UpdateAppImports();
    step4_CopyRemainingFiles();

    console.log("═".repeat(60));
    console.log("   ✅ MIGRATION COMPLETED!");
    console.log("═".repeat(60));
    console.log("\n📋 Next steps:");
    console.log('   1. Run "npm run dev" to verify');
    console.log("   2. Test multiple pages");
    console.log("   3. Once verified, old folders can be removed\n");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  }
}

main();
