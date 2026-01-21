/**
 * VietSign Project Migration Script
 *
 * Script này sẽ tự động tái cấu trúc dự án theo kiến trúc mới trong ARCHITECTURE.md
 *
 * Chạy script: node scripts/migrate-architecture.js
 *
 * QUAN TRỌNG: Hãy backup code trước khi chạy script này!
 */

const fs = require("fs");
const path = require("path");

// Configuration
const SRC_DIR = path.join(__dirname, "..", "src");

// ============================================
// MIGRATION MAPPINGS
// ============================================

// Phase 2: Core & Shared migrations
const CORE_MIGRATIONS = {
  // config/ -> core/config/
  "config/api.ts": "core/config/api.ts",
  "config/firebase.ts": "core/config/firebase.ts",
  "config/mockdata.ts": "core/config/mockdata.ts",

  // providers/ -> core/providers/
  "providers/ThemeProvider.tsx": "core/providers/ThemeProvider.tsx",
  "providers/query-provider.tsx": "core/providers/QueryProvider.tsx",

  // store/ -> core/store/
  "store/index.ts": "core/store/store.ts",
  "store/StoreProvider.tsx": "core/store/StoreProvider.tsx",
  "store/slices/adminSlice.ts": "core/store/slices/adminSlice.ts",

  // lib/ -> core/lib/
  "lib/utils.ts": "core/lib/utils.ts",

  // utils/api/ -> core/services/api/
  "utils/api/http.tsx": "core/services/api/http.tsx",
};

const SHARED_MIGRATIONS = {
  // components/layout/ -> shared/components/layout/
  "components/layout/header/index.tsx":
    "shared/components/layout/Header/index.tsx",
  "components/layout/footer/index.tsx":
    "shared/components/layout/Footer/index.tsx",
  "components/layout/sidebar/index.tsx":
    "shared/components/layout/Sidebar/index.tsx",
  "components/layout/header-auth/index.tsx":
    "shared/components/layout/HeaderAuth/index.tsx",
  "components/layout/header-auth/components/NotificationDropdown.tsx":
    "shared/components/layout/HeaderAuth/NotificationDropdown.tsx",
  "components/layout/header-auth/components/UserMenu.tsx":
    "shared/components/layout/HeaderAuth/UserMenu.tsx",
  "components/layout/authlayout.tsx": "shared/components/layout/AuthLayout.tsx",
  "components/layout/defaultlayout.tsx":
    "shared/components/layout/DefaultLayout.tsx",
  "components/layout/smartlayout.tsx":
    "shared/components/layout/SmartLayout.tsx",
  "components/layout/learnlayout.tsx":
    "shared/components/layout/LearnLayout.tsx",

  // components/common/ -> shared/components/common/
  "components/common/VideoPlayer.tsx":
    "shared/components/common/VideoPlayer.tsx",
  "components/common/Modal.tsx": "shared/components/common/Modal.tsx",
  "components/common/Pagination.tsx": "shared/components/common/Pagination.tsx",
  "components/common/ConfirmModal.tsx":
    "shared/components/common/ConfirmModal.tsx",

  // components/UI/ -> shared/components/ui/
  "components/UI/Loader.tsx": "shared/components/ui/Loader.tsx",

  // utils/ -> shared/utils/
  "utils/text.ts": "shared/utils/text.ts",
  "utils/class-utils.ts": "shared/utils/cn.ts",
  "utils/gemini.ts": "shared/utils/gemini.ts",
  "utils/validation/validtor.ts": "shared/utils/validation/validator.ts",

  // hooks/ -> shared/hooks/
  "hooks/useAuth.ts": "shared/hooks/useAuth.ts",
  "hooks/useUsers.ts": "shared/hooks/useUsers.ts",
  "hooks/useOrganizations.ts": "shared/hooks/useOrganizations.ts",
};

// Phase 3: Domain migrations (model/ -> domain/)
const DOMAIN_MIGRATIONS = {
  "model/Class.ts": "domain/entities/Class.ts",
  "model/Dictionary.ts": "domain/entities/Dictionary.ts",
  "model/Exam.ts": "domain/entities/Exam.ts",
  "model/Game.ts": "domain/entities/Game.ts",
  "model/Learn.ts": "domain/entities/Learn.ts",
  "model/Lesson.ts": "domain/entities/Lesson.ts",
  "model/SelfLearn.ts": "domain/entities/SelfLearn.ts",
  "model/User.ts": "domain/entities/User.ts",
  "model/Organization.ts": "domain/entities/Organization.ts",
  "model/Message.ts": "domain/entities/Message.ts",
  "model/Question.ts": "domain/entities/Question.ts",
  "model/Step.ts": "domain/entities/Step.ts",
};

// Phase 4: Feature migrations
const FEATURE_MIGRATIONS = {
  // Auth feature
  "components/auth": "features/auth/components",

  // Study feature
  "components/study": "features/study/components",

  // Learn feature
  "components/learn": "features/learn/components",

  // Games feature
  "components/games": "features/games/components",

  // Practice feature
  "components/practice": "features/practice/components",

  // Dictionary feature
  "components/dictionary": "features/dictionary/components",

  // Messages feature
  "components/messages": "features/messages/components",

  // Notifications feature
  "components/notifications": "features/notifications/components",

  // Settings feature
  "components/settings": "features/settings/components",

  // Dashboard feature
  "components/dashboard": "features/dashboard/components",

  // Home feature
  "components/home": "features/home/components",

  // Landing feature
  "components/landing": "features/landing/components",

  // Management features
  "components/users": "features/management/users/components",
  "components/classes-management": "features/management/classes/components",
  "components/organizations-management":
    "features/management/organizations/components",
  "components/exams-management": "features/management/exams/components",
  "components/games-management": "features/management/games/components",
  "components/dictionary-management":
    "features/management/dictionary/components",
  "components/learning-management": "features/management/learning/components",
  "components/questions-management": "features/management/questions/components",
  "components/grading": "features/management/grading/components",
  "components/permissions": "features/management/permissions/components",
  "components/statistics": "features/management/statistics/components",
  "components/tools": "features/management/tools/components",

  // Other components
  "components/daily-signs": "features/daily-signs/components",
  "components/class-registration": "features/class-registration/components",
  "components/take-exam": "features/take-exam/components",
  "components/module": "features/module/components",
};

// Services migrations
const SERVICES_MIGRATIONS = {
  "services/userService.ts":
    "features/management/users/services/userService.ts",
  "services/classService.ts": "features/study/services/classService.ts",
  "services/lessonService.ts": "features/study/services/lessonService.ts",
  "services/organizationService.ts":
    "features/management/organizations/services/organizationService.ts",
  "services/examService.ts":
    "features/management/exams/services/examService.ts",
  "services/permissionService.ts":
    "features/management/permissions/services/permissionService.ts",
};

// Import path replacements
const IMPORT_REPLACEMENTS = [
  // Core imports
  { from: /@\/src\/config\//g, to: "@/core/config/" },
  { from: /@\/src\/providers\//g, to: "@/core/providers/" },
  { from: /@\/src\/store\//g, to: "@/core/store/" },
  { from: /@\/src\/store\/slices\//g, to: "@/core/store/slices/" },
  { from: /@\/src\/lib\//g, to: "@/core/lib/" },
  { from: /@\/src\/utils\/api\//g, to: "@/core/services/api/" },

  // Shared imports
  { from: /@\/src\/components\/layout\//g, to: "@/shared/components/layout/" },
  { from: /@\/src\/components\/common\//g, to: "@/shared/components/common/" },
  { from: /@\/src\/components\/UI\//g, to: "@/shared/components/ui/" },
  { from: /@\/src\/utils\//g, to: "@/shared/utils/" },
  { from: /@\/src\/hooks\//g, to: "@/shared/hooks/" },

  // Domain imports
  { from: /@\/src\/model\//g, to: "@/domain/entities/" },

  // Data imports
  { from: /@\/src\/data\//g, to: "@/data/" },

  // Feature imports - Auth
  { from: /@\/src\/components\/auth\//g, to: "@/features/auth/components/" },

  // Feature imports - Study
  { from: /@\/src\/components\/study\//g, to: "@/features/study/components/" },

  // Feature imports - Learn
  { from: /@\/src\/components\/learn\//g, to: "@/features/learn/components/" },

  // Feature imports - Games
  { from: /@\/src\/components\/games\//g, to: "@/features/games/components/" },

  // Feature imports - Practice
  {
    from: /@\/src\/components\/practice\//g,
    to: "@/features/practice/components/",
  },

  // Feature imports - Dictionary
  {
    from: /@\/src\/components\/dictionary\//g,
    to: "@/features/dictionary/components/",
  },

  // Feature imports - Messages
  {
    from: /@\/src\/components\/messages\//g,
    to: "@/features/messages/components/",
  },

  // Feature imports - Settings
  {
    from: /@\/src\/components\/settings\//g,
    to: "@/features/settings/components/",
  },

  // Feature imports - Dashboard
  {
    from: /@\/src\/components\/dashboard\//g,
    to: "@/features/dashboard/components/",
  },

  // Feature imports - Home
  { from: /@\/src\/components\/home\//g, to: "@/features/home/components/" },

  // Feature imports - Management
  {
    from: /@\/src\/components\/users\//g,
    to: "@/features/management/users/components/",
  },
  {
    from: /@\/src\/components\/classes-management\//g,
    to: "@/features/management/classes/components/",
  },
  {
    from: /@\/src\/components\/organizations-management\//g,
    to: "@/features/management/organizations/components/",
  },
  {
    from: /@\/src\/components\/exams-management\//g,
    to: "@/features/management/exams/components/",
  },
  {
    from: /@\/src\/components\/games-management\//g,
    to: "@/features/management/games/components/",
  },
  {
    from: /@\/src\/components\/dictionary-management\//g,
    to: "@/features/management/dictionary/components/",
  },
  {
    from: /@\/src\/components\/learning-management\//g,
    to: "@/features/management/learning/components/",
  },
  {
    from: /@\/src\/components\/questions-management\//g,
    to: "@/features/management/questions/components/",
  },
  {
    from: /@\/src\/components\/grading\//g,
    to: "@/features/management/grading/components/",
  },
  {
    from: /@\/src\/components\/permissions\//g,
    to: "@/features/management/permissions/components/",
  },
  {
    from: /@\/src\/components\/statistics\//g,
    to: "@/features/management/statistics/components/",
  },
  {
    from: /@\/src\/components\/tools\//g,
    to: "@/features/management/tools/components/",
  },

  // Services imports
  { from: /@\/src\/services\//g, to: "@/services/" },
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${dirPath}`);
  }
}

function copyFile(src, dest) {
  const srcPath = path.join(SRC_DIR, src);
  const destPath = path.join(SRC_DIR, dest);

  if (!fs.existsSync(srcPath)) {
    console.log(`⚠️  Source file not found: ${src}`);
    return false;
  }

  ensureDir(path.dirname(destPath));

  let content = fs.readFileSync(srcPath, "utf8");

  // Update imports in the file
  content = updateImports(content);

  fs.writeFileSync(destPath, content);
  console.log(`✅ Copied: ${src} -> ${dest}`);
  return true;
}

function copyDirectory(src, dest) {
  const srcPath = path.join(SRC_DIR, src);
  const destPath = path.join(SRC_DIR, dest);

  if (!fs.existsSync(srcPath)) {
    console.log(`⚠️  Source directory not found: ${src}`);
    return false;
  }

  ensureDir(destPath);

  const entries = fs.readdirSync(srcPath, { withFileTypes: true });

  for (const entry of entries) {
    const srcEntry = path.join(src, entry.name);
    const destEntry = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcEntry, destEntry);
    } else if (
      entry.isFile() &&
      (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx"))
    ) {
      copyFile(srcEntry, destEntry);
    }
  }

  console.log(`✅ Copied directory: ${src} -> ${dest}`);
  return true;
}

function updateImports(content) {
  let updatedContent = content;

  for (const replacement of IMPORT_REPLACEMENTS) {
    updatedContent = updatedContent.replace(replacement.from, replacement.to);
  }

  return updatedContent;
}

function updateAllImportsInDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      updateAllImportsInDirectory(fullPath);
    } else if (
      entry.isFile() &&
      (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx"))
    ) {
      let content = fs.readFileSync(fullPath, "utf8");
      const updatedContent = updateImports(content);

      if (content !== updatedContent) {
        fs.writeFileSync(fullPath, updatedContent);
        console.log(`📝 Updated imports in: ${fullPath}`);
      }
    }
  }
}

function createIndexFile(dirPath, exports) {
  const indexPath = path.join(SRC_DIR, dirPath, "index.ts");
  ensureDir(path.join(SRC_DIR, dirPath));

  const content = `/**
 * ${path.basename(dirPath)} Module
 * Auto-generated by migration script
 */

${exports.join("\n")}
`;

  fs.writeFileSync(indexPath, content);
  console.log(`📄 Created index file: ${indexPath}`);
}

// ============================================
// MIGRATION PHASES
// ============================================

function phase1_CreateStructure() {
  console.log("\n🚀 PHASE 1: Creating new folder structure...\n");

  const directories = [
    // Core
    "core",
    "core/config",
    "core/providers",
    "core/store",
    "core/store/slices",
    "core/services",
    "core/services/api",
    "core/lib",

    // Shared
    "shared",
    "shared/components",
    "shared/components/ui",
    "shared/components/layout",
    "shared/components/layout/Header",
    "shared/components/layout/Footer",
    "shared/components/layout/Sidebar",
    "shared/components/layout/HeaderAuth",
    "shared/components/common",
    "shared/components/forms",
    "shared/hooks",
    "shared/utils",
    "shared/utils/validation",
    "shared/constants",
    "shared/types",

    // Domain
    "domain",
    "domain/entities",
    "domain/enums",
    "domain/interfaces",

    // Features
    "features",
    "features/auth",
    "features/auth/components",
    "features/auth/hooks",
    "features/auth/services",
    "features/auth/types",

    "features/study",
    "features/study/components",
    "features/study/hooks",
    "features/study/services",
    "features/study/types",

    "features/learn",
    "features/learn/components",

    "features/games",
    "features/games/components",

    "features/practice",
    "features/practice/components",

    "features/dictionary",
    "features/dictionary/components",

    "features/messages",
    "features/messages/components",

    "features/notifications",
    "features/notifications/components",

    "features/settings",
    "features/settings/components",

    "features/dashboard",
    "features/dashboard/components",

    "features/home",
    "features/home/components",

    "features/landing",
    "features/landing/components",

    "features/daily-signs",
    "features/daily-signs/components",

    "features/class-registration",
    "features/class-registration/components",

    "features/take-exam",
    "features/take-exam/components",

    "features/module",
    "features/module/components",

    // Management features
    "features/management",
    "features/management/users",
    "features/management/users/components",
    "features/management/users/services",

    "features/management/classes",
    "features/management/classes/components",

    "features/management/organizations",
    "features/management/organizations/components",
    "features/management/organizations/services",

    "features/management/exams",
    "features/management/exams/components",
    "features/management/exams/services",

    "features/management/games",
    "features/management/games/components",

    "features/management/dictionary",
    "features/management/dictionary/components",

    "features/management/learning",
    "features/management/learning/components",

    "features/management/questions",
    "features/management/questions/components",

    "features/management/grading",
    "features/management/grading/components",

    "features/management/permissions",
    "features/management/permissions/components",
    "features/management/permissions/services",

    "features/management/statistics",
    "features/management/statistics/components",

    "features/management/tools",
    "features/management/tools/components",
  ];

  for (const dir of directories) {
    ensureDir(path.join(SRC_DIR, dir));
  }

  console.log("✅ Phase 1 completed!\n");
}

function phase2_MigrateCoreAndShared() {
  console.log("\n🚀 PHASE 2: Migrating Core & Shared...\n");

  // Migrate core files
  console.log("📦 Migrating core files...");
  for (const [src, dest] of Object.entries(CORE_MIGRATIONS)) {
    copyFile(src, dest);
  }

  // Migrate shared files
  console.log("\n📦 Migrating shared files...");
  for (const [src, dest] of Object.entries(SHARED_MIGRATIONS)) {
    copyFile(src, dest);
  }

  // Create index files for core
  createIndexFile("core/config", [
    "export * from './api';",
    "export * from './firebase';",
    "export * from './mockdata';",
  ]);

  createIndexFile("core/providers", [
    "export { ThemeProvider, useTheme } from './ThemeProvider';",
    "export { default as QueryProvider } from './QueryProvider';",
  ]);

  createIndexFile("core/store/slices", [
    "export { default as adminReducer, login, logout, restoreAuth } from './adminSlice';",
  ]);

  createIndexFile("core/store", [
    "export { store } from './store';",
    "export type { RootState, AppDispatch } from './store';",
    "export { default as StoreProvider } from './StoreProvider';",
    "export * from './slices';",
  ]);

  createIndexFile("core/services/api", [
    "export { default as http, defaultHttp, injectStore } from './http';",
  ]);

  createIndexFile("core/services", ["export * from './api';"]);

  createIndexFile("core", [
    "export * from './config';",
    "export * from './providers';",
    "export * from './store';",
    "export * from './services';",
  ]);

  // Create index files for shared
  createIndexFile("shared/components/common", [
    "export { VideoPlayer } from './VideoPlayer';",
    "export { Modal } from './Modal';",
    "export { Pagination, usePagination } from './Pagination';",
    "export { ConfirmModal } from './ConfirmModal';",
  ]);

  createIndexFile("shared/components/layout", [
    "export { Header } from './Header';",
    "export { Footer } from './Footer';",
    "export { Sidebar } from './Sidebar';",
    "export { default as AuthLayout } from './AuthLayout';",
    "export { default as DefaultLayout } from './DefaultLayout';",
    "export { default as SmartLayout } from './SmartLayout';",
    "export { LearnLayout } from './LearnLayout';",
  ]);

  createIndexFile("shared/components/ui", [
    "export { default as Loader } from './Loader';",
  ]);

  createIndexFile("shared/components", [
    "export * from './ui';",
    "export * from './layout';",
    "export * from './common';",
  ]);

  createIndexFile("shared/hooks", [
    "export { useAuth } from './useAuth';",
    "export * from './useUsers';",
    "export * from './useOrganizations';",
  ]);

  createIndexFile("shared/utils", [
    "export * from './text';",
    "export { cn } from './cn';",
    "export * from './gemini';",
  ]);

  createIndexFile("shared", [
    "export * from './components';",
    "export * from './hooks';",
    "export * from './utils';",
  ]);

  console.log("✅ Phase 2 completed!\n");
}

function phase3_MigrateDomain() {
  console.log("\n🚀 PHASE 3: Migrating Domain (Models)...\n");

  for (const [src, dest] of Object.entries(DOMAIN_MIGRATIONS)) {
    copyFile(src, dest);
  }

  // Create index file
  createIndexFile("domain/entities", [
    "export * from './Class';",
    "export * from './Dictionary';",
    "export * from './Exam';",
    "export * from './Game';",
    "export * from './Learn';",
    "export * from './Lesson';",
    "export * from './SelfLearn';",
    "export * from './User';",
    "export * from './Organization';",
    "export * from './Message';",
    "export * from './Question';",
    "export * from './Step';",
  ]);

  createIndexFile("domain/enums", [
    "// Enums will be extracted from entities",
    "export {};",
  ]);

  createIndexFile("domain/interfaces", [
    "// Interfaces will be extracted from entities",
    "export {};",
  ]);

  createIndexFile("domain", [
    "export * from './entities';",
    "export * from './enums';",
    "export * from './interfaces';",
  ]);

  console.log("✅ Phase 3 completed!\n");
}

function phase4_MigrateFeatures() {
  console.log("\n🚀 PHASE 4: Migrating Features...\n");

  // Copy feature directories
  for (const [src, dest] of Object.entries(FEATURE_MIGRATIONS)) {
    copyDirectory(src, dest);
  }

  // Copy services
  console.log("\n📦 Migrating services...");
  for (const [src, dest] of Object.entries(SERVICES_MIGRATIONS)) {
    copyFile(src, dest);
  }

  // Create feature index files
  const features = [
    "auth",
    "study",
    "learn",
    "games",
    "practice",
    "dictionary",
    "messages",
    "notifications",
    "settings",
    "dashboard",
    "home",
    "landing",
    "daily-signs",
    "class-registration",
    "take-exam",
    "module",
  ];

  for (const feature of features) {
    createIndexFile(`features/${feature}`, [`export * from './components';`]);
  }

  console.log("✅ Phase 4 completed!\n");
}

function phase5_UpdateTsConfig() {
  console.log("\n🚀 PHASE 5: Updating tsconfig.json...\n");

  const tsconfigPath = path.join(__dirname, "..", "tsconfig.json");
  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf8"));

  tsconfig.compilerOptions.paths = {
    "@/*": ["./src/*"],
    "@/features/*": ["./src/features/*"],
    "@/shared/*": ["./src/shared/*"],
    "@/core/*": ["./src/core/*"],
    "@/domain/*": ["./src/domain/*"],
    "@/data/*": ["./src/data/*"],
    "@/services/*": ["./src/services/*"],
  };

  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
  console.log("✅ Updated tsconfig.json with new path aliases\n");
}

function phase6_UpdateImportsInApp() {
  console.log("\n🚀 PHASE 6: Updating imports in app/ directory...\n");

  updateAllImportsInDirectory(path.join(SRC_DIR, "app"));

  console.log("✅ Phase 6 completed!\n");
}

function phase7_UpdateImportsInNewStructure() {
  console.log("\n🚀 PHASE 7: Updating imports in new structure...\n");

  updateAllImportsInDirectory(path.join(SRC_DIR, "core"));
  updateAllImportsInDirectory(path.join(SRC_DIR, "shared"));
  updateAllImportsInDirectory(path.join(SRC_DIR, "domain"));
  updateAllImportsInDirectory(path.join(SRC_DIR, "features"));

  console.log("✅ Phase 7 completed!\n");
}

// ============================================
// MAIN EXECUTION
// ============================================

function main() {
  console.log("═".repeat(60));
  console.log("   VietSign Architecture Migration Script");
  console.log("═".repeat(60));
  console.log("\n⚠️  IMPORTANT: Make sure you have backed up your code!\n");

  try {
    phase1_CreateStructure();
    phase2_MigrateCoreAndShared();
    phase3_MigrateDomain();
    phase4_MigrateFeatures();
    phase5_UpdateTsConfig();
    phase6_UpdateImportsInApp();
    phase7_UpdateImportsInNewStructure();

    console.log("═".repeat(60));
    console.log("   ✅ MIGRATION COMPLETED SUCCESSFULLY!");
    console.log("═".repeat(60));
    console.log("\n📋 Next steps:");
    console.log('   1. Run "npm run dev" to check for errors');
    console.log("   2. Fix any remaining import issues manually");
    console.log("   3. Delete old directories after verification:");
    console.log("      - src/config");
    console.log("      - src/providers");
    console.log("      - src/store");
    console.log("      - src/lib");
    console.log("      - src/model");
    console.log("      - src/components (after verifying features work)");
    console.log("      - src/hooks");
    console.log("      - src/utils");
    console.log("   4. Run tests to ensure everything works\n");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  }
}

// Run the migration
main();
