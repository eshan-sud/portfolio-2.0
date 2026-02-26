/**
 * Supabase Data Import Script
 *
 * This script imports data from JSON files back into your Supabase database.
 *
 * Usage: npm run db:import
 *
 * WARNING: This will insert data into your database. Make sure you're
 * importing to the correct database!
 */

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Load .env from project root
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

// Supabase configuration - using service role key for import operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "❌ Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY must be set in .env file",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Data directory
const JSON_DIR = path.join(__dirname, "data", "json");

// Import order (to handle any foreign key dependencies)
const IMPORT_ORDER = [
  "user_data",
  "tech_stack",
  "awards",
  "education",
  "experiences",
  "projects",
  "publications",
  "patents",
];

/**
 * Import data into a single table
 */
async function importTable(tableName) {
  const jsonPath = path.join(JSON_DIR, `${tableName}.json`);
  if (!fs.existsSync(jsonPath)) {
    console.log(`⚠️  No data file found for ${tableName}, skipping...`);
    return { tableName, success: true, count: 0, skipped: true };
  }
  try {
    const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    if (!data || data.length === 0) {
      console.log(`ℹ️  ${tableName}: No data to import`);
      return { tableName, success: true, count: 0 };
    }
    console.log(`📤 Importing ${data.length} rows into ${tableName}...`);
    // Import in batches to avoid timeouts
    const BATCH_SIZE = 100;
    let imported = 0;
    for (let i = 0; i < data.length; i += BATCH_SIZE) {
      const batch = data.slice(i, i + BATCH_SIZE);
      const { error } = await supabase.from(tableName).insert(batch);
      if (error) {
        console.error(
          `❌ Error importing batch to ${tableName}:`,
          error.message,
        );
        return {
          tableName,
          success: false,
          count: imported,
          error: error.message,
        };
      }
      imported += batch.length;
      console.log(`   Progress: ${imported}/${data.length} rows`);
    }
    console.log(`✅ ${tableName}: ${imported} rows imported successfully`);
    return { tableName, success: true, count: imported };
  } catch (err) {
    console.error(`❌ Error importing ${tableName}:`, err.message);
    return { tableName, success: false, count: 0, error: err.message };
  }
}

/**
 * Generate import summary
 */
function generateImportSummary(results) {
  console.log("\n" + "=".repeat(50));
  console.log("📊 IMPORT SUMMARY");
  console.log("=".repeat(50));
  console.log(`Total tables: ${results.length}`);
  console.log(`Successful: ${results.filter((r) => r.success).length}`);
  console.log(`Failed: ${results.filter((r) => !r.success).length}`);
  console.log(
    `Total rows imported: ${results.reduce((sum, r) => sum + r.count, 0)}`,
  );
  console.log("=".repeat(50));
  console.log("\nDetailed breakdown:");
  results.forEach((result) => {
    if (result.skipped) {
      console.log(
        `  ⏭️  ${result.tableName.padEnd(20)} (skipped - no data file)`,
      );
    } else {
      const status = result.success ? "✅" : "❌";
      console.log(
        `  ${status} ${result.tableName.padEnd(20)} ${result.count} rows`,
      );
      if (!result.success && result.error) {
        console.log(`      Error: ${result.error}`);
      }
    }
  });
}

/**
 * Main import function
 */
async function importAllData() {
  console.log("🚀 Starting Supabase data import...\n");
  console.log(`📍 Supabase URL: ${supabaseUrl}`);
  console.log(`📅 Import date: ${new Date().toISOString()}`);
  console.log(`📁 Source directory: ${JSON_DIR}\n`);
  // Confirm before proceeding
  console.log("⚠️  WARNING: This will insert data into your database!");
  console.log("   Press Ctrl+C to cancel, or wait 5 seconds to continue...\n");
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const results = [];
  // Import all tables in order
  for (const table of IMPORT_ORDER) {
    const result = await importTable(table);
    results.push(result);
  }
  // Generate summary
  generateImportSummary(results);
  // Save import log
  const logPath = path.join(__dirname, "data", "import_log.json");
  fs.writeFileSync(
    logPath,
    JSON.stringify(
      {
        importDate: new Date().toISOString(),
        results,
      },
      null,
      2,
    ),
  );
  console.log(`\n📝 Import log saved to: ${logPath}`);
  console.log("\n✨ Import completed!\n");
}

// Run the import
importAllData().catch((err) => {
  console.error("❌ Fatal error during import:", err);
  process.exit(1);
});
