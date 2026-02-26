#!/usr/bin/env node

/**
 * Setup script for local data development
 * Checks if local JSON files exist and guides user through setup
 */

const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(
  __dirname,
  "..",
  "scripts",
  "database",
  "data",
  "json",
);
const ENV_FILE = path.join(__dirname, "..", ".env");

const REQUIRED_FILES = [
  "projects.json",
  "experiences.json",
  "education.json",
  "patents.json",
  "publications.json",
  "awards.json",
  "tech_stack.json",
  "user_data.json",
];

console.log("🔍 Checking local data setup...\n");

// Check if data directory exists
if (!fs.existsSync(DATA_DIR)) {
  console.log("❌ Data directory not found.");
  console.log("\n📋 To use local data mode:");
  console.log("   1. Run: npm run db:export");
  console.log("   2. Set NEXT_PUBLIC_DATA_SOURCE=local in .env");
  console.log("   3. Run: npm run dev\n");
  process.exit(1);
}

// Check each required file
let missingFiles = [];
let foundFiles = [];

REQUIRED_FILES.forEach((file) => {
  const filePath = path.join(DATA_DIR, file);
  if (fs.existsSync(filePath)) {
    foundFiles.push(file);
  } else {
    missingFiles.push(file);
  }
});

console.log(
  `✅ Found ${foundFiles.length}/${REQUIRED_FILES.length} data files\n`,
);

if (missingFiles.length > 0) {
  console.log("⚠️  Missing files:");
  missingFiles.forEach((file) => console.log(`   - ${file}`));
  console.log("\n💡 Run: npm run db:export");
  console.log("\n");
}

// Check .env
if (!fs.existsSync(ENV_FILE)) {
  console.log("⚠️  .env not found");
  console.log("\n💡 Create .env with:");
  console.log("   NEXT_PUBLIC_DATA_SOURCE=local\n");
} else {
  const envContent = fs.readFileSync(ENV_FILE, "utf8");
  if (envContent.includes("NEXT_PUBLIC_DATA_SOURCE=local")) {
    console.log("✅ .env configured for local data mode");
  } else if (envContent.includes("NEXT_PUBLIC_DATA_SOURCE=supabase")) {
    console.log("ℹ️  .env configured for Supabase mode");
    console.log(
      "💡 To switch to local mode, change to: NEXT_PUBLIC_DATA_SOURCE=local",
    );
  } else {
    console.log("⚠️  NEXT_PUBLIC_DATA_SOURCE not set in .env");
    console.log("💡 Add: NEXT_PUBLIC_DATA_SOURCE=local");
  }
}

if (missingFiles.length === 0 && foundFiles.length === REQUIRED_FILES.length) {
  console.log("\n🎉 All set! Local data mode is ready.");
  console.log("💡 Make sure NEXT_PUBLIC_DATA_SOURCE=local in .env");
  console.log("🚀 Run: npm run dev\n");
}
