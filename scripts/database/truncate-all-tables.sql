-- =====================================================
-- TRUNCATE ALL PORTFOLIO TABLES
-- Clears all data while keeping the schema intact
-- Run this in Supabase SQL Editor before re-importing
-- =====================================================

-- Disable triggers to avoid foreign key constraint issues
SET session_replication_role = 'replica';

-- Truncate all tables and reset sequences
TRUNCATE TABLE public.projects RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.publications RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.patents RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.experiences RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.education RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.awards RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.tech_stack RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.socials RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.resume RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.profile_picture RESTART IDENTITY CASCADE;

-- Re-enable triggers
SET session_replication_role = 'origin';

-- Verify all tables are empty
SELECT 
  'projects' as table_name, COUNT(*) as row_count FROM projects
UNION ALL
SELECT 'publications', COUNT(*) FROM publications
UNION ALL
SELECT 'patents', COUNT(*) FROM patents
UNION ALL
SELECT 'experiences', COUNT(*) FROM experiences
UNION ALL
SELECT 'education', COUNT(*) FROM education
UNION ALL
SELECT 'awards', COUNT(*) FROM awards
UNION ALL
SELECT 'tech_stack', COUNT(*) FROM tech_stack
UNION ALL
SELECT 'socials', COUNT(*) FROM socials
UNION ALL
SELECT 'resume', COUNT(*) FROM resume
UNION ALL
SELECT 'profile_picture', COUNT(*) FROM profile_picture;

-- 
-- Delete all tables from the database
-- DO $$ DECLARE
--     r RECORD;
-- BEGIN
--     FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
--         EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
--     END LOOP;
-- END $$;