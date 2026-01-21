/**
 * VietSign Layout Import Fix Script
 *
 * Script này sửa lỗi import từ @/shared/components/layout/...
 * quay về sử dụng file cũ @/components/layout/...
 *
 * Vì các file trong shared chưa được setup đúng,
 * tạm thời revert về dùng file cũ
 */

const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "..", "src");

// Revert shared layout imports back to old imports
const LAYOUT_FIXES = [
  // Revert layout imports back to old structure
  {
    from: /@\/shared\/components\/layout\/authlayout/gi,
    to: "@/components/layout/authlayout",
  },
  {
    from: /@\/shared\/components\/layout\/AuthLayout/g,
    to: "@/components/layout/authlayout",
  },
  {
    from: /@\/shared\/components\/layout\/defaultlayout/gi,
    to: "@/components/layout/defaultlayout",
  },
  {
    from: /@\/shared\/components\/layout\/DefaultLayout/g,
    to: "@/components/layout/defaultlayout",
  },
  {
    from: /@\/shared\/components\/layout\/smartlayout/gi,
    to: "@/components/layout/smartlayout",
  },
  {
    from: /@\/shared\/components\/layout\/SmartLayout/g,
    to: "@/components/layout/smartlayout",
  },
  {
    from: /@\/shared\/components\/layout\/learnlayout/gi,
    to: "@/components/layout/learnlayout",
  },
  {
    from: /@\/shared\/components\/layout\/LearnLayout/g,
    to: "@/components/layout/learnlayout",
  },

  // Revert common component imports
  {
    from: /@\/shared\/components\/common\/VideoPlayer/g,
    to: "@/components/common/VideoPlayer",
  },
  {
    from: /@\/shared\/components\/common\/Modal/g,
    to: "@/components/common/Modal",
  },
  {
    from: /@\/shared\/components\/common\/Pagination/g,
    to: "@/components/common/Pagination",
  },
  {
    from: /@\/shared\/components\/common\/ConfirmModal/g,
    to: "@/components/common/ConfirmModal",
  },

  // Revert UI component imports
  { from: /@\/shared\/components\/ui\/Loader/g, to: "@/components/UI/Loader" },

  // Revert hook imports
  { from: /@\/shared\/hooks\//g, to: "@/hooks/" },

  // Revert utils imports
  { from: /@\/shared\/utils\//g, to: "@/utils/" },

  // Revert core imports to old paths
  { from: /@\/core\/config\//g, to: "@/config/" },
  { from: /@\/core\/providers\//g, to: "@/providers/" },
  { from: /@\/core\/store\//g, to: "@/store/" },
  { from: /@\/core\/services\/api\//g, to: "@/utils/api/" },

  // Revert domain imports
  { from: /@\/domain\/entities\//g, to: "@/model/" },

  // Revert feature imports back to components
  { from: /@\/features\/auth\/components\//g, to: "@/components/auth/" },
  { from: /@\/features\/study\/components\//g, to: "@/components/study/" },
  { from: /@\/features\/learn\/components\//g, to: "@/components/learn/" },
  { from: /@\/features\/games\/components\//g, to: "@/components/games/" },
  {
    from: /@\/features\/practice\/components\//g,
    to: "@/components/practice/",
  },
  {
    from: /@\/features\/dictionary\/components\//g,
    to: "@/components/dictionary/",
  },
  {
    from: /@\/features\/messages\/components\//g,
    to: "@/components/messages/",
  },
  {
    from: /@\/features\/settings\/components\//g,
    to: "@/components/settings/",
  },
  {
    from: /@\/features\/dashboard\/components\//g,
    to: "@/components/dashboard/",
  },
  { from: /@\/features\/home\/components\//g, to: "@/components/home/" },
  {
    from: /@\/features\/notifications\/components\//g,
    to: "@/components/notifications/",
  },
  {
    from: /@\/features\/management\/users\/components\//g,
    to: "@/components/users/",
  },
  {
    from: /@\/features\/management\/classes\/components\//g,
    to: "@/components/classes-management/",
  },
  {
    from: /@\/features\/management\/organizations\/components\//g,
    to: "@/components/organizations-management/",
  },
  {
    from: /@\/features\/management\/exams\/components\//g,
    to: "@/components/exams-management/",
  },
  {
    from: /@\/features\/management\/games\/components\//g,
    to: "@/components/games-management/",
  },
  {
    from: /@\/features\/management\/dictionary\/components\//g,
    to: "@/components/dictionary-management/",
  },
  {
    from: /@\/features\/management\/learning\/components\//g,
    to: "@/components/learning-management/",
  },
  {
    from: /@\/features\/management\/questions\/components\//g,
    to: "@/components/questions-management/",
  },
  {
    from: /@\/features\/management\/grading\/components\//g,
    to: "@/components/grading/",
  },
  {
    from: /@\/features\/management\/permissions\/components\//g,
    to: "@/components/permissions/",
  },
  {
    from: /@\/features\/management\/statistics\/components\//g,
    to: "@/components/statistics/",
  },
  {
    from: /@\/features\/management\/tools\/components\//g,
    to: "@/components/tools/",
  },
];

function fixImportsInFile(filePath) {
  if (!filePath.endsWith(".ts") && !filePath.endsWith(".tsx")) return false;

  let content = fs.readFileSync(filePath, "utf8");
  let originalContent = content;

  for (const fix of LAYOUT_FIXES) {
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
  console.log("   VietSign Layout Import Fix Script");
  console.log("═".repeat(60));
  console.log(
    "\nReverting @/shared/... and @/core/... imports back to old paths...\n",
  );

  // Only fix app directory (where the pages are)
  const totalFixed = processDirectory(path.join(SRC_DIR, "app"));

  console.log(`\n✅ Fixed ${totalFixed} files.`);
  console.log('\nRun "npm run dev" to verify the fix worked.\n');
}

main();
