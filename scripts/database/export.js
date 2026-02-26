/**
 * Supabase Data Export Script
 *
 * This script exports all data from your Supabase database to JSON files.
 * It also generates SQL INSERT statements for easy restoration.
 *
 * Usage: npm run db:export
 */

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Load .env from project root
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "❌ Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in .env file",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// List of all tables to export
const TABLES = [
  "user_data",
  "tech_stack",
  "awards",
  "education",
  "experiences",
  "projects",
  "publications",
  "patents",
];

// Create output directories
const DATA_DIR = path.join(__dirname, "data");
const JSON_DIR = path.join(DATA_DIR, "json");
const SQL_DIR = path.join(DATA_DIR, "sql");

[DATA_DIR, JSON_DIR, SQL_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

/**
 * Export data from a single table
 */
async function exportTable(tableName) {
  console.log(`📥 Exporting ${tableName}...`);
  try {
    const { data, error } = await supabase.from(tableName).select("*");
    if (error) {
      console.error(`❌ Error exporting ${tableName}:`, error.message);
      return { tableName, success: false, count: 0 };
    }
    // Save as JSON
    const jsonPath = path.join(JSON_DIR, `${tableName}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
    // Generate SQL INSERT statements
    const sqlInserts = generateSQLInserts(tableName, data);
    const sqlPath = path.join(SQL_DIR, `${tableName}.sql`);
    fs.writeFileSync(sqlPath, sqlInserts);
    console.log(`✅ ${tableName}: ${data.length} rows exported`);
    return { tableName, success: true, count: data.length, data };
  } catch (err) {
    console.error(`❌ Unexpected error exporting ${tableName}:`, err);
    return { tableName, success: false, count: 0 };
  }
}

/**
 * Generate SQL INSERT statements from data
 */
function generateSQLInserts(tableName, data) {
  if (!data || data.length === 0) {
    return `-- No data in ${tableName}\n`;
  }
  let sql = `-- Data for table: ${tableName}\n`;
  sql += `-- Rows: ${data.length}\n`;
  sql += `-- Generated: ${new Date().toISOString()}\n\n`;
  data.forEach((row, index) => {
    const columns = Object.keys(row)
      .map((col) => `"${col}"`)
      .join(", ");
    const values = Object.values(row)
      .map((val) => {
        if (val === null) return "NULL";
        if (typeof val === "boolean") return val.toString().toUpperCase();
        if (typeof val === "number") return val;
        if (Array.isArray(val))
          return `ARRAY[${val.map((v) => `'${escapeSQLString(v)}'`).join(", ")}]`;
        if (typeof val === "string") return `'${escapeSQLString(val)}'`;
        if (typeof val === "object")
          return `'${escapeSQLString(JSON.stringify(val))}'`;
        return `'${escapeSQLString(String(val))}'`;
      })
      .join(", ");
    sql += `INSERT INTO public.${tableName} (${columns}) VALUES (${values});\n`;
    // Add blank line every 10 rows for readability
    if ((index + 1) % 10 === 0) {
      sql += "\n";
    }
  });
  return sql + "\n";
}

/**
 * Escape single quotes in SQL strings
 */
function escapeSQLString(str) {
  return String(str).replace(/'/g, "''");
}

/**
 * Generate a complete database dump SQL file
 */
function generateCompleteDump(results) {
  let sql = `-- =====================================================\n`;
  sql += `-- COMPLETE DATABASE DUMP\n`;
  sql += `-- Generated: ${new Date().toISOString()}\n`;
  sql += `-- Total tables: ${results.length}\n`;
  sql += `-- =====================================================\n\n`;
  sql += `-- Disable triggers during import\n`;
  sql += `SET session_replication_role = replica;\n\n`;
  results.forEach((result) => {
    if (result.success && result.count > 0) {
      const sqlPath = path.join(SQL_DIR, `${result.tableName}.sql`);
      const tableSQL = fs.readFileSync(sqlPath, "utf8");
      sql += tableSQL + "\n";
    }
  });
  sql += `-- Re-enable triggers\n`;
  sql += `SET session_replication_role = DEFAULT;\n`;
  const dumpPath = path.join(DATA_DIR, "complete_dump.sql");
  fs.writeFileSync(dumpPath, sql);
  console.log(`\n📝 Complete SQL dump saved to: ${dumpPath}`);
}

/**
 * Generate a summary report
 */
function generateSummary(results) {
  const summary = {
    exportDate: new Date().toISOString(),
    totalTables: results.length,
    successfulExports: results.filter((r) => r.success).length,
    failedExports: results.filter((r) => !r.success).length,
    totalRows: results.reduce((sum, r) => sum + r.count, 0),
    tables: results.map((r) => ({
      name: r.tableName,
      success: r.success,
      rowCount: r.count,
    })),
  };
  const summaryPath = path.join(DATA_DIR, "export_summary.json");
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log("\n" + "=".repeat(50));
  console.log("📊 EXPORT SUMMARY");
  console.log("=".repeat(50));
  console.log(`Total tables: ${summary.totalTables}`);
  console.log(`Successful: ${summary.successfulExports}`);
  console.log(`Failed: ${summary.failedExports}`);
  console.log(`Total rows: ${summary.totalRows}`);
  console.log("=".repeat(50));
  console.log("\nDetailed breakdown:");
  results.forEach((result) => {
    const status = result.success ? "✅" : "❌";
    console.log(
      `  ${status} ${result.tableName.padEnd(20)} ${result.count} rows`,
    );
  });
  console.log("\n📁 Files saved to:");
  console.log(`  - JSON: ${JSON_DIR}`);
  console.log(`  - SQL: ${SQL_DIR}`);
  console.log(`  - Summary: ${summaryPath}`);
}

/**
 * Main export function
 */
async function exportAllData() {
  console.log("🚀 Starting Supabase data export...\n");
  console.log(`📍 Supabase URL: ${supabaseUrl}`);
  console.log(`📅 Export date: ${new Date().toISOString()}\n`);
  const results = [];
  // Export all tables sequentially
  for (const table of TABLES) {
    const result = await exportTable(table);
    results.push(result);
  }
  // Generate complete SQL dump
  generateCompleteDump(results);
  // Generate summary
  generateSummary(results);
  console.log("\n✨ Export completed successfully!\n");
}

// Run the export
exportAllData().catch((err) => {
  console.error("❌ Fatal error during export:", err);
  process.exit(1);
});
