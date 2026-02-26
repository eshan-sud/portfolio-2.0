# Database Backup & Restore

Integrated database backup and restore utilities for your Portfolio's Supabase database.

## 🎉 NEW: Schema Enhancements Available!

Your database schema has been analyzed and enhanced with 40+ new fields! See:

- **[QUICK-REFERENCE.md](QUICK-REFERENCE.md)** - Quick start guide
- **[IMPROVEMENTS.md](IMPROVEMENTS.md)** - Detailed analysis and recommendations
- **[IMPLEMENTATION-SUMMARY.md](IMPLEMENTATION-SUMMARY.md)** - What's been implemented

**To apply improvements:** Run `migration-add-fields.sql` in Supabase SQL Editor

## 📁 Contents

```
scripts/database/
├── schema.sql         # Complete database schema (DDL)
├── export.js          # Data export script
├── import.js          # Data import script
├── README.md          # This file
└── data/              # Generated exports (gitignored)
    ├── json/          # JSON format exports
    ├── sql/           # SQL INSERT statements
    ├── complete_dump.sql
    └── export_summary.json
```

## 🚀 Quick Start

### Export Database (Backup)

Export all data from your Supabase database:

```bash
npm run db:export
```

This creates:

- JSON files for each table in `data/json/`
- SQL INSERT files in `data/sql/`
- Complete SQL dump in `data/complete_dump.sql`
- Export summary in `data/export_summary.json`

### Import Database (Restore)

Restore data to your Supabase database:

```bash
npm run db:import
```

**⚠️ WARNING:** This inserts data into your database. Ensure you're targeting the correct database!

## 📊 Database Schema

The `schema.sql` file contains the complete database structure:

### ✅ Included in Schema

- All 10 table definitions (projects, experiences, education, etc.)
- Column types, constraints, defaults
- Primary keys and unique constraints
- Triggers (auto-updating timestamps)
- Functions (`handle_updated_at()`)
- Complete DDL for database recreation

### Tables

1. **projects** - Portfolio projects
2. **experiences** - Work experience
3. **education** - Educational background
4. **patents** - Patent information
5. **publications** - Research publications
6. **awards** - Awards and certifications
7. **tech_stack** - Technologies and tools
8. **resume** - Resume file URLs
9. **profile_picture** - Profile picture URL
10. **socials** - Social media links

## 🔧 Configuration

The scripts use environment variables from your project's `.env` file:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anon key (for export)
- `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY` - Service role key (for import)

## 📝 Manual Restoration

### Option 1: Using Supabase Dashboard

1. Open SQL Editor in Supabase Dashboard
2. Execute `schema.sql` to create tables
3. Execute `data/complete_dump.sql` to insert data

### Option 2: Using psql

```bash
psql postgresql://postgres:[PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres

\i scripts/database/schema.sql
\i scripts/database/data/complete_dump.sql
```

## ⚠️ Important Notes

1. **Data Directory is Gitignored**: The `data/` directory contains sensitive information and is excluded from git
2. **Schema Updates**: If you modify your database structure, update `schema.sql` manually or regenerate it
3. **Service Role Key**: Import operations require the service role key for proper permissions
4. **Batch Processing**: Import processes data in batches of 100 rows to avoid timeouts

## 🔄 Updating Schema

If you modify your database structure in Supabase:

```bash
# Using Supabase CLI
npx supabase db dump --db-url "your-connection-string" > scripts/database/schema.sql

# Or manually copy from Supabase Dashboard > SQL Editor
```

## 🎯 Use Cases

- **Regular Backups**: Schedule exports for data backup
- **Database Migration**: Move data between environments (dev/staging/prod)
- **Disaster Recovery**: Restore from backup if data is lost
- **Testing**: Import test data for development
- **Schema Version Control**: Track database structure changes via git
