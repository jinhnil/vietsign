const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "..", "src");
const filePath = (p) => path.join(SRC_DIR, p);

const fixes = [
  {
    file: "app/layout.tsx",
    replacements: [
      {
        from: '"../providers/query-provider"',
        to: '"@/core/providers/QueryProvider"',
      },
      {
        from: '"../providers/ThemeProvider"',
        to: '"@/core/providers/ThemeProvider"',
      },
    ],
  },
  {
    file: "app/page.tsx",
    replacements: [
      { from: '"../components/landing/index"', to: '"@/features/landing"' },
      {
        from: '"../components/layout/smartlayout"',
        to: '"@/shared/components/layout"',
      },
      { from: '"../components/home"', to: '"@/features/home"' },
    ],
  },
  {
    file: "features/landing/components/index.tsx",
    replacements: [
      { from: '"../module/hero"', to: '"@/features/module/components/hero"' },
      {
        from: '"../module/features"',
        to: '"@/features/module/components/features"',
      },
      { from: '"../../types"', to: '"@/shared/types"' },
    ],
  },
  {
    file: "features/module/components/features.tsx",
    replacements: [{ from: '"../../types"', to: '"@/shared/types"' }],
  },
  {
    file: "features/module/components/hero.tsx",
    replacements: [{ from: '"../../types"', to: '"@/shared/types"' }],
  },
  {
    file: "shared/components/layout/Sidebar/index.tsx", // Try PascalCase first
    replacements: [
      {
        from: '"@/store/slices/adminSlice"',
        to: '"@/core/store/slices/adminSlice"',
      },
    ],
  },
  {
    file: "shared/components/layout/sidebar/index.tsx", // Try lowercase if PascalCase fails
    replacements: [
      {
        from: '"@/store/slices/adminSlice"',
        to: '"@/core/store/slices/adminSlice"',
      },
    ],
  },
];

console.log("Starting specific import fixes...");

fixes.forEach(({ file, replacements }) => {
  const fullPath = filePath(file);
  // Check if file exists (case-insensitive try)
  if (!fs.existsSync(fullPath)) {
    // Try to find the file case-insensitively
    const dir = path.dirname(fullPath);
    const base = path.basename(fullPath).toLowerCase();
    if (fs.existsSync(dir)) {
      const content = fs.readdirSync(dir);
      const match = content.find((f) => f.toLowerCase() === base);
      if (match) {
        file = path.join(path.dirname(file), match);
      } else {
        console.log(`Skipping ${file} - not found`);
        return;
      }
    } else {
      console.log(`Skipping ${file} - dir not found`);
      return;
    }
  }

  const targetPath = filePath(file);
  let content = fs.readFileSync(targetPath, "utf8");
  let original = content;

  replacements.forEach(({ from, to }) => {
    // Remove quotes for regex to be flexible with ' or "
    const rawFrom = from.replace(/["']/g, "");
    const rawTo = to.replace(/["']/g, "");

    const regex = new RegExp(`(["'])${rawFrom}(["'])`, "g");
    content = content.replace(regex, `$1${rawTo}$2`);
  });

  if (content !== original) {
    fs.writeFileSync(targetPath, content);
    console.log(`✅ Fixed imports in ${file}`);
  } else {
    console.log(`ℹ️  No changes needed for ${file}`);
  }
});
