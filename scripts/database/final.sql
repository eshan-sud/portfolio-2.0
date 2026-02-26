-- =====================================================
-- PORTFOLIO DATABASE - FINAL DEFINITIVE SCRIPT
-- Eshan Sud | eshan-sud.vercel.app
-- Generated: 2026-02-26
-- 
-- Covers: functions, tables, triggers, RLS, indexes,
--         constraints, RPC function, and all seed data.
-- 
-- Run ORDER:
--   1. Paste entire file into Supabase SQL Editor
--   2. Click Run
-- =====================================================


-- =====================================================
-- PART 1: FUNCTIONS
-- =====================================================

-- Auto-update the "updatedAt" column on any row change
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  new."updatedAt" = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- =====================================================
-- PART 2: TABLE CREATION
-- (drop-safe: uses CREATE TABLE IF NOT EXISTS)
-- =====================================================

-- -----------------------------------------
-- projects
-- Fields actively used in /projects page:
--   id, title, description, content, image,
--   techStack, liveUrl, githubUrl, 
--   archived, category, displayOrder,
--   highlights, status
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title          text        NOT NULL,
  description    text        NOT NULL,
  content        text,
  image          text,                                        -- Cloudinary suffix: "v{ver}/{id}.{ext}" (e.g. "v1755339237/picture_lg9w4f.jpg")
  images         text[],                                      -- Additional image IDs
  "techStack"    text[],
  "liveUrl"      text,
  "githubUrl"    text,
  archived       boolean     DEFAULT false,
  category       text        DEFAULT 'web',
  "displayOrder" integer,
  status         text        DEFAULT 'completed',             -- completed | in-progress | maintained
  highlights     text[],                                      -- Key achievements shown in modal
  collaborators  text[],
  "createdAt"    timestamptz DEFAULT now(),
  "updatedAt"    timestamptz DEFAULT now()
);

CREATE TRIGGER on_projects_updated
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- -----------------------------------------
-- publications
-- Fields actively used in /research page:
--   id, title, journal, year, month, authors,
--   doi, pdfUrl, publicationUrl, abstract,
--   tags, status
-- NOTE: month is TEXT (stores "August", etc.)
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS public.publications (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title            text        NOT NULL,
  journal          text        NOT NULL,
  year             integer     NOT NULL,
  month            text,                                      -- "January"…"December" (text, not integer)
  authors          text[],
  doi              text,
  "pdfUrl"         text,
  "publicationUrl" text,                                      -- Journal page URL
  abstract         text,
  tags             text[],
  status           text        DEFAULT 'published',           -- published | accepted | submitted | preprint
  citations        integer     DEFAULT 0,
  "impactFactor"   numeric(5,2),
  "createdAt"      timestamptz DEFAULT now(),
  "updatedAt"      timestamptz DEFAULT now()
);

CREATE TRIGGER on_publications_updated
  BEFORE UPDATE ON public.publications
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- -----------------------------------------
-- patents
-- Fields actively used in /research page:
--   id, title, patentNumber, status,
--   filingDate, grantDate, inventors,
--   description, jurisdiction, documentUrl
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS public.patents (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title           text        NOT NULL,
  "patentNumber"  text        NOT NULL UNIQUE,
  status          text,                                       -- pending | published | granted | expired
  "filingDate"    timestamptz,
  "grantDate"     timestamptz,
  inventors       text[],
  assignee        text,
  description     text,
  claims          text[],
  "documentUrl"   text,                                       -- Used in /research link fallback
  "officialUrl"   text,
  jurisdiction    text,                                       -- Shown as badge in /research
  "createdAt"     timestamptz DEFAULT now(),
  "updatedAt"     timestamptz DEFAULT now()
);

CREATE TRIGGER on_patents_updated
  BEFORE UPDATE ON public.patents
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- -----------------------------------------
-- experiences
-- Fields actively used in /experience page:
--   id, title, company, location, type,
--   startDate, endDate, current, description,
--   skills, achievements, logoUrl, websiteUrl,
--   certificateUrl, offerLetterUrl,
--   recommendationUrl, remote
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS public.experiences (
  id                  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title               text        NOT NULL,
  company             text        NOT NULL,
  location            text,
  type                text,                                   -- internship | full-time | contract | part-time
  "startDate"         timestamptz,
  "endDate"           timestamptz,
  current             boolean     DEFAULT false,
  description         text        NOT NULL,
  skills              text[],
  achievements        text[],
  "logoUrl"           text,                                   -- Company logo (absolute URL)
  "websiteUrl"        text,
  "certificateUrl"    text,
  "offerLetterUrl"    text,
  "recommendationUrl" text,
  remote              boolean     DEFAULT false,
  "createdAt"         timestamptz DEFAULT now(),
  "updatedAt"         timestamptz DEFAULT now()
);

CREATE TRIGGER on_experiences_updated
  BEFORE UPDATE ON public.experiences
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- -----------------------------------------
-- education
-- Fields actively used in /about page:
--   id, institution, degree, fieldOfStudy,
--   startDate, endDate, grade, logoUrl,
--   websiteUrl
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS public.education (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  institution    text        NOT NULL,
  degree         text        NOT NULL,
  "fieldOfStudy" text,
  "startDate"    timestamptz,
  "endDate"      timestamptz,
  grade          text,
  description    text,
  "logoUrl"      text,                                        -- Institution logo (absolute URL)
  "websiteUrl"   text,
  honors         text[],
  coursework     text[],
  activities     text[],
  "transcriptUrl" text,
  "createdAt"    timestamptz DEFAULT now()
);

-- -----------------------------------------
-- tech_stack
-- Fields actively used in /about page:
--   id, name, iconUrl, websiteUrl
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS public.tech_stack (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name           text        NOT NULL,
  "iconUrl"      text,                                        -- CDN path suffix (e.g. "python/python-original.svg")
  "websiteUrl"   text,
  category       text        DEFAULT 'other',
  proficiency    text        DEFAULT 'intermediate',
  "displayOrder" integer,
  "createdAt"    timestamptz DEFAULT now()
);

-- -----------------------------------------
-- awards
-- Fields actively used in /about page:
--   id, title, issuer, date,
--   description, certificateUrl
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS public.awards (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title            text        NOT NULL,
  issuer           text,
  date             timestamptz,
  description      text,
  "certificateUrl" text,
  "logoUrl"        text,
  category         text,
  "displayOrder"   integer,
  "createdAt"      timestamptz DEFAULT now()
);

-- -----------------------------------------
-- user_data  (single row — portfolio owner)
-- Consolidates resume + profile_picture + socials.
-- Fields used in DataContext:
--   username, profile_pic_url,
--   profile_pic_description, resume_url,
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS public.user_data (
  id                      uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  username                text        NOT NULL DEFAULT 'Eshan Sud',
  profile_pic_url         text,                               -- Cloudinary suffix: "v{ver}/{id}.{ext}" (e.g. "v1755339237/picture_lg9w4f.jpg")
  profile_pic_description text,
  resume_url              text,
  socials                 jsonb       DEFAULT '[]'::jsonb,    -- [{name, url, displayOrder}]
  "createdAt"             timestamptz DEFAULT now(),
  "updatedAt"             timestamptz DEFAULT now()
);

CREATE TRIGGER on_user_data_updated
  BEFORE UPDATE ON public.user_data
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();


-- =====================================================
-- PART 3: ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE public.projects      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publications  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patents       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tech_stack    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.awards        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_data     ENABLE ROW LEVEL SECURITY;

-- Public read-only access (portfolio is public)
DO $$ BEGIN
  CREATE POLICY "public_read_projects"
    ON public.projects FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "public_read_publications"
    ON public.publications FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "public_read_patents"
    ON public.patents FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "public_read_experiences"
    ON public.experiences FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "public_read_education"
    ON public.education FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "public_read_tech_stack"
    ON public.tech_stack FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "public_read_awards"
    ON public.awards FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "public_read_user_data"
    ON public.user_data FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- =====================================================
-- PART 4: INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_projects_archived      ON public.projects(archived)      WHERE archived = false;
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON public.projects("displayOrder");
CREATE INDEX IF NOT EXISTS idx_projects_category      ON public.projects(category);

CREATE INDEX IF NOT EXISTS idx_publications_year      ON public.publications(year DESC);
CREATE INDEX IF NOT EXISTS idx_publications_status    ON public.publications(status);

CREATE INDEX IF NOT EXISTS idx_experiences_start_date ON public.experiences("startDate" DESC);
CREATE INDEX IF NOT EXISTS idx_experiences_current    ON public.experiences(current) WHERE current = true;
CREATE INDEX IF NOT EXISTS idx_experiences_type       ON public.experiences(type);

CREATE INDEX IF NOT EXISTS idx_education_start_date   ON public.education("startDate" DESC);

CREATE INDEX IF NOT EXISTS idx_tech_stack_display     ON public.tech_stack("displayOrder");

CREATE INDEX IF NOT EXISTS idx_awards_date            ON public.awards(date DESC);

CREATE INDEX IF NOT EXISTS idx_user_data_created      ON public.user_data("createdAt" DESC);


-- =====================================================
-- PART 5: RPC FUNCTION
-- Single-request fetch for the entire website's data.
-- Called first in DataContext; falls back to 8 queries.
-- =====================================================

CREATE OR REPLACE FUNCTION get_all_portfolio_data()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(

    'projects', (
      SELECT COALESCE(json_agg(p ORDER BY p."displayOrder" DESC NULLS LAST), '[]'::json)
      FROM public.projects p
      WHERE p.archived = false OR p.archived IS NULL
    ),

    'experiences', (
      SELECT COALESCE(json_agg(e ORDER BY e."startDate" DESC NULLS LAST), '[]'::json)
      FROM public.experiences e
    ),

    'education', (
      SELECT COALESCE(json_agg(ed ORDER BY ed."startDate" DESC NULLS LAST), '[]'::json)
      FROM public.education ed
    ),

    'patents', (
      SELECT COALESCE(json_agg(pt ORDER BY pt."filingDate" DESC NULLS LAST), '[]'::json)
      FROM public.patents pt
    ),

    'publications', (
      SELECT COALESCE(json_agg(pub ORDER BY pub.year DESC, pub.month DESC NULLS LAST), '[]'::json)
      FROM public.publications pub
    ),

    'awards', (
      SELECT COALESCE(json_agg(a ORDER BY a."createdAt" DESC), '[]'::json)
      FROM public.awards a
    ),

    'tech_stack', (
      SELECT COALESCE(json_agg(ts ORDER BY ts."createdAt" ASC), '[]'::json)
      FROM public.tech_stack ts
    ),

    'user_data', (
      SELECT row_to_json(u)
      FROM public.user_data u
      ORDER BY u."createdAt" DESC
      LIMIT 1
    )

  ) INTO result;
  RETURN result;
END;
$$;

GRANT EXECUTE ON FUNCTION get_all_portfolio_data() TO anon, authenticated;


-- =====================================================
-- PART 6: SEED DATA
-- Run this section ONLY on a fresh/truncated database.
-- To reset first, run truncate-all-tables.sql.
-- =====================================================

-- -----------------------------------------
-- user_data (1 row)
-- -----------------------------------------
INSERT INTO public.user_data (
  username,
  profile_pic_url,
  profile_pic_description,
  resume_url,
  socials
) VALUES (
  'Eshan Sud',
  'picture_lg9w4f.jpg',
  'Software Engineer & Researcher specializing in AI/ML and Full-Stack Development',
  '/documents/resume_eshan_sud.pdf',
  'https://orcid.org/my-orcid?orcid=0009-0002-5030-0186',
  '[
    {"name": "GitHub",   "url": "https://github.com/eshan-sud",                             "displayOrder": 1},
    {"name": "LinkedIn", "url": "https://linkedin.com/in/eshan-sud",                        "displayOrder": 2},
    {"name": "LeetCode",  "url": "https://leetcode.com/eshan-sud",                            "displayOrder": 3},
    {"name": "HackerRank",  "url": "https://www.hackerrank.com/eshansud",                            "displayOrder": 4},
    {"name": "Instagram",  "url": "https://instagram.com/eshan_sud/",                            "displayOrder": 5},
    {"name": "Email",  "url": "mailto:eshansud22@gmail.com",                            "displayOrder": 6},
    {"name": "ORCID",    "url": "https://orcid.org/my-orcid?orcid=0009-0002-5030-0186",    "displayOrder": 7}
  ]'
  -- {"name": "",  "url": "https://instagram.com/eshan_sud/",                            "displayOrder": n},
::jsonb
);


-- -----------------------------------------
-- projects (14 rows)
-- -----------------------------------------
-- NOTE: image values below use bare Cloudinary public IDs (no version/extension).
-- Update each to the full versioned suffix (e.g. 'v1234567890/talk2pdfs_xhtkj9.jpg')
-- after re-uploading via the Cloudinary dashboard or Media Library.
INSERT INTO public.projects (id, title, description, content, image, "techStack", "liveUrl", "githubUrl", archived, category, "displayOrder") VALUES
  ('417b9f23-0617-461f-ace0-d757eebbf372', 'Talk2PDFs',         'Built a RAG (Retrieval-Augmented Generation)-based chatbot for PDF and URL Q&A using Streamlit and ChromaDB, integrating Ollama (Llama 3.2) for efficient text extraction and real-time interactions.',  NULL,       'talk2pdfs_xhtkj9',         ARRAY['Python','Langchain','Streamlit','ChromaDB','Ollama','Llama 3.2'],                                                              NULL,                                                                    'https://github.com/eshan-sud/talk2pdfs',          true,  false, 'machine learning', 8),
  ('f19d8fe6-eb88-4f9e-8064-50c723254b94', 'SafeLedger',        'Created a GUI-based Bank Management System with secure user/admin logins, account management, and administrative features for customer data handling.',                                                         NULL,       'SafeLedger_wllihy',        ARRAY['Java','JavaFX','Java Swing','Java AWT'],                                                                                        NULL,                                                                    'https://github.com/eshan-sud/safeLedger',         true,  false, 'SaaS',             5),
  ('da84a463-0910-40c6-9bac-a94163d7720c', 'SecureIt',          'Implemented a decentralized storage application using Ethereum-blockchain and IPFS to provide secure and immutable data management, access control via MetaMask.',                                              NULL,       NULL,                       ARRAY['React.js','Express.js','Node.js','Blockchain','Ether.js','IFPS','MetaMask'],                                                    NULL,                                                                    'https://github.com/eshan-sud/secureIt',           true,  false, 'web',              12),
  ('450d377b-35d2-4ee8-84f2-7002999201ec', 'Portfolio Website', 'Created a dynamic & responsive portfolio website to showcase skills, projects, and resume to potential employers.',                                                                                              '(Old)',    'old-portfolio_nbqaae',     ARRAY['HTML5','CSS3','JavaScript'],                                                                                                     'https://eshan-sud.github.io/portfolio-website',                         'https://github.com/eshan-sud/portfolio-website',  true,  false, 'web',              1),
  ('cbb519cb-b931-4dea-b748-24ffe200dead', 'World Library',     'Built a CLI-based Library Management System with functionalities including book management, member registration, book issuance, and return processes.',                                                         NULL,       NULL,                       ARRAY['Python','MySQL'],                                                                                                                NULL,                                                                    'https://github.com/eshan-sud/worldLibrary',       true,  false, 'SaaS',             4),
  ('e84ef5e8-f08b-4904-91c3-c6ac5fe25928', 'ImageSense',        'Building an image processing web application with features such as de-blurring, image segmentation, etc.',                                                                                                     '(Ongoing)', NULL,                      ARRAY['Python','Streamlit','OpenCV'],                                                                                                   NULL,                                                                    'https://github.com/eshan-sud/ImageSense',         true,  false, 'web',              10),
  ('bd606f90-c8c5-4812-8e23-2cf48991b57b', 'Task Master',       'Building a full-stack task management platform with task handling, calendar integration, notifications, and collaboration features.',                                                                            '(Ongoing)', NULL,                      ARRAY['MongoDB','Express.js','React.js','Node.js'],                                                                                    NULL,                                                                    'https://github.com/eshan-sud/task-master',        true,  false, 'web',              11),
  ('b5030bc8-d77f-4d57-b05c-2ebf306ff77b', 'NestGen',           'VS Code extension to generate file structures in one-click for agentic IDEs or LLMs to understand the project.',                                                                                               NULL,       NULL,                       ARRAY['JavaScript'],                                                                                                                    'https://marketplace.visualstudio.com/items?itemName=eshansud.nestgen', 'https://github.com/eshan-sud/nestgen',            true,  false, 'extension',        3),
  ('aa6b06ec-14f8-4387-abfe-dd5bbf760bb7', 'Voltify',           'Developed a utility tool to monitor & conserve battery usage, providing battery level notifications, generating battery health reports, and toggling battery saver mode.',                                      NULL,       'voltify_ehwsnn',           ARRAY['Python','Operating Systems'],                                                                                                    NULL,                                                                    'https://github.com/eshan-sud/voltify',            true,  false, 'extensions',       9),
  ('07bdd75b-ffe5-4928-a377-b7068d182c50', 'SignIt',            'Developed a fully responsive website for creating a virtual signature with customisation options for stroke color, width, background, and downloads in PNG/JPG/PDF.',                                           NULL,       'sign-it_yn45pl',           ARRAY['HTML5','CSS3','JavaScript'],                                                                                                     'https://eshan-sud.github.io/signIt',                                    'https://github.com/eshan-sud/signit',             true,  false, 'web',              7),
  ('a05506e9-990c-4a1b-b08d-811213a2db08', 'Portfolio 2.0',     'My updated and enhanced portfolio website.',                                                                                                                                                                    NULL,       'portfolio2',               ARRAY['Next.js','PostgreSQL','Tailwind CSS','Framer Motion','Vercel','Supabase'],                                                       'https://eshan-sud.vercel.app/',                                         'https://github.com/eshan-sud/portfolio-2.0',      true,  false, 'web',              14),
  ('ea28a69c-654d-48f2-a7cd-b9a23ebbf680', 'Air Quality Prediction', 'Analysed pollutant trends & built predictive models (Random Forest: R² = 0.86) for air quality forecasting through EDA and feature engineering.',                                                      NULL,       NULL,                       ARRAY['Python','Pandas','Matplotlib','Seaborn'],                                                                                       NULL,                                                                    'https://github.com/eshan-sud/air-quality-prediction', true, false, 'machine learning', 6),
  ('b6b18e78-99bb-4f59-9802-3ee0dc5bb2a5', '3D Sparse Mapping using SLAM', 'Implemented a real-time 3D indoor sparse mapping system using ORB-SLAM3 on a Raspberry Pi 5 for autonomous navigation of robotic devices.',                                                    NULL,       '3d-sparse-mapping_nrzcz5', ARRAY['Raspberry Pi 5','ROS2','OpenCV4','RViz2','CMake'],                                                                               NULL,                                                                    'https://github.com/eshan-sud/3d-sparse-mapping',  true,  false, 'hardware',         13),
  ('601cdde7-a6bc-4175-82e0-162cd359b0f0', 'Speechify',         'Developing a speech synthesis platform using Coqui-TTS, enabling personalized speech cloning with scalable backend and AWS deployment.',                                                                        '(Ongoing)', NULL,                      ARRAY['React.js','Express.js','Node.js','TailwindCSS','Python','AWS'],                                                                 NULL,                                                                    'https://github.com/eshan-sud/speechify',          false, true,  'web',              0);


-- -----------------------------------------
-- publications (2 rows)
-- -----------------------------------------
INSERT INTO public.publications (id, title, journal, year, month, authors, doi, "pdfUrl", abstract, tags, status) VALUES
  (
    '48c9b306-9831-4e97-9c0f-9fc9f53460f9',
    'The Power I Know: Zero-Knowledge Proofs and their Transformative Role in the Future of Cryptography',
    'IEEE Access',
    2025,
    'August',
    ARRAY['Eshan Sud','Shirish Agarwal','Lav Upadhyay'],
    '10.1109/ACCESS.2025.3599555',
    'https://ieeexplore.ieee.org/document/11127078',
    'Zero-Knowledge Proofs (ZKPs) are public-key cryptosystem that enables to demonstrate that a statement which is known by them is correct without revealing the same to the verifier. ZKPs have moved in modern cryptographic systems, blockchain applications, Decentralized Finance (DeFi) and identity authentication systems. This paper explores the evolution of ZKPs and their significance as in secure and privacy-preserving. We classify ZKPs into two groups, namely interactive and non-interactive, discussing prominent protocols such as zk-SNARKs, zk-STARKs, Bulletproofs, PLONK, and Halo2. Each approach has advantages such as efficiency, proof size, and computational overhead. The study further examines the multitude of applications of ZKPs, such as privacy-enhanced blockchain transactions, zero-knowledge rollups for scalability, decentralized identity management, secure voting mechanisms, and regulatory-compliant financial systems. With advantages, possible limitations in scalability, lack of standardization, and vulnerabilities to emerging quantum computing threats. Due to restrictions, hardware acceleration through GPUs and others presents promising solutions, while new protocols such as PLONK and Halo2 seek to optimize performance to earlier developed solutions. Finally, we discuss the future trajectory of ZKPs.',
    ARRAY['Aggregated Proof Mechanisms','Authentication Systems','Blockchain Privacy','Credential Management','Cryptographic Security','Decentralized Finance (DeFi)','Decentralized Identity','Financial Privacy','Secure E-Auctions','Zero-Knowledge Proofs (ZKPs)'],
    true,
    'published'
  ),
  (
    'ebd6f986-af0d-4ed8-8832-8979386f0e4c',
    'An In-depth Evaluation of ORB-SLAM3 on the Raspberry Pi 5: Performance, Stability, and Design Guidelines for Embedded SLAM',
    'IEEE Access',
    2026,
    'February',
    ARRAY['Eshan Sud','Lav Upadhyay'],
    '10.1109/ACCESS.2026.3661646',
    'https://ieeexplore.ieee.org/document/11373149',
    'Simultaneous Localization and Mapping (SLAM) has become indispensable, allowing robotic systems to navigate a previously unknown environment to map and localize the device in the environment simultaneously. With the growing need for SLAM solutions that are both robust and computationally efficient, this study presents an in-depth evaluation of ORB-SLAM3 on the Raspberry Pi 5, a resource-constrained yet accessible embedded computing platform.',
    NULL,
    true,
    'published'
  );


-- -----------------------------------------
-- patents (1 row)
-- -----------------------------------------
INSERT INTO public.patents (id, title, "patentNumber", status, "filingDate", inventors, assignee, description, jurisdiction) VALUES
  (
    'c8eda51a-870b-47eb-9bab-309ff99d8876',
    'A Method and a System of Real-Time Multi-Mode 3D Sparse SLAM System Using ORB-SLAM3 on an Embedded Platform',
    '202511064816',
    'published',
    '2025-07-24T18:30:00+00:00',
    ARRAY['Eshan Sud','Lav Upadhyay'],
    'Indian Patent Office',
    'The present invention provides a system and method for executing real-time, multi-mode Simultaneous Localization and Mapping (SLAM) using ORB-SLAM3 on a CPU-only embedded platform, specifically the Raspberry Pi 5. The system supports monocular, stereo, and RGB-D SLAM modes within a single, unified software stack and allows dynamic switching between modes at runtime without the need for recompilation or hardware changes. A custom-developed ROS2 wrapper manages the acquisition of live or dataset-based visual input, publishes synchronized camera pose and transform data using standard ROS2 messages, and ensures compatibility across operational modes. Visualization is offloaded to RViz2, enabling lightweight, remote-friendly rendering and reducing the graphical load on the device. To support stable execution during memory-intensive tasks, the Raspberry Pi 5 is configured with an expanded swap space of at least 4GB. The system includes a benchmarking pipeline to evaluate performance metrics such as trajectory accuracy, frame drop rates, and runtime stability. Validated on standard datasets like TUM RGB-D, KITTI, and EuRoC MAV, the invention demonstrates high pose accuracy, low frame loss, and consistent operation even under sustained CPU usage exceeding 80%, making it an ideal solution for embedded robotics, drones, and mobile IoT platforms.',
    'India'
  );


-- -----------------------------------------
-- experiences (3 rows)
-- -----------------------------------------
INSERT INTO public.experiences (id, title, company, location, type, "startDate", "endDate", current, description, skills, "certificateUrl", "offerLetterUrl", "logoUrl", "websiteUrl") VALUES
  (
    '5ba2b3c3-5f08-44f4-985e-fb0dc947840a',
    'Node.js Intern',
    'Celebal Technologies Pvt. Ltd.',
    'Remote',
    'internship',
    '2025-05-19T18:30:00+00:00',
    '2025-07-19T18:30:00+00:00',
    false,
    'Developed a full-stack natural language-based restaurant chatbot (DineBot) for automated restaurant, reservation, and orders management; with complete defined CICD pipeline and Microsoft Azure deployment.',
    ARRAY['Node.js','Express.js','React.js','Microsoft Azure','Model Training','Microsoft Bot Framework Emulator'],
    'v1755355603/Celebal_Technologies_Pvt_Ltd_-_Internship_Completion_Letter_u7bdd2.pdf',
    'v1755355612/Celebal_Technologies_Pvt_Ltd_-_offer_letter_hs3qcs.pdf',
    'https://media.licdn.com/dms/image/v2/D560BAQGAuML4AG8JZw/company-logo_200_200/company-logo_200_200/0/1735543221444/celebaltechnologies_logo?e=2147483647&v=beta&t=Um_748k3eyHExWtCFUmKBOB-zAuccOYPEuwjrqnHANA',
    'https://celebaltech.com/',
    null,
    true
  ),
  (
    '8949076c-7d5d-45c3-ac5e-126851c59065',
    'SDE Intern',
    'Exato Technologies Pvt. Ltd.',
    'Noida, Uttar Pradesh, India',
    'internship',
    '2024-06-03T18:30:00+00:00',
    '2024-08-09T18:30:00+00:00',
    false,
    'Developed an advanced Speech-to-Text pipeline performing audio transcription, speech detection, speech distinction, sentiment analysis & flagging high risk conversations for managerial review; alongside an OCR-based Invoice Scanning system integrated with the full-stack workflow project using MERN stack & Python scripts.',
    ARRAY['Python','Node.js','Express.js','React.js','Transformers','OpenAI-Whisper','Pyannote','OCR','Model Training','Regex'],
    'v1755355604/Exato_Technologies_Pvt_Ltd_-_Internship_Completion_Letter_iohsjm.pdf',
    'v1755356109/Exato_Internship_Offer_Letter_-_Eshan_Sud_yrtdar.pdf',
    'https://media.licdn.com/dms/image/v2/D4D0BAQHaRsfZfG5rUA/company-logo_200_200/company-logo_200_200/0/1725524007399/exatoai_logo?e=2147483647&v=beta&t=bl94XQDcBQ8YXfVMurEYU2QjBM-klNq8ppRNyYSiAv0',
    'https://exato.ai/'
  ),
  (
    '76eaab6a-719a-4486-996c-3d094f54c47c',
    'PDI & CMS Analyst Intern',
    'Deloitte India',
    'Delhi, India',
    'internship',
    '2026-01-21T11:10:15+00:00',
    NULL,
    true,
    'Undergoing structured onboarding and training in Technology and Transformation within Engineering, AI, and Data, with exposure to enterprise systems, compliance processes, and large-scale delivery environments.',
    NULL,
    NULL,
    NULL,
    'v1769600140/Deloitte_Logo_okliis.png',
    'https://www.deloitte.com/in/en.html'
  );


-- -----------------------------------------
-- education (2 rows)
-- -----------------------------------------
INSERT INTO public.education (id, institution, degree, "fieldOfStudy", "startDate", "endDate", grade, "logoUrl", "websiteUrl") VALUES
  (
    'fc3f20c2-5df3-448f-b176-7abfa1092923',
    'Delhi Public School Mathura Road',
    'High School',
    NULL,
    '2022-03-31T18:30:00+00:00',
    '2022-03-31T18:30:00+00:00',
    '96.8/100',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIGaQGE_aZp4g3yYwd6zHsIMdfss3bLNwjog&s',
    'https://www.dpsmathuraroad.org/'
  ),
  (
    '87edf548-bf60-4d51-b88a-7222bd77809e',
    'Manipal University Jaipur',
    'Bachelor of Technology',
    'Computer Science and Engineering with a minor in Data Analytics',
    '2022-09-26T18:30:00+00:00',
    '2026-05-31T18:30:00+00:00',
    '9.51/10',
    'https://afilemanager.s3.dualstack.ap-southeast-1.amazonaws.com/prod/cid_359/d1f968b3-eb4a-42f1-aa45-a70e53f957d4.png',
    'https://jaipur.manipal.edu/'
  );


-- -----------------------------------------
-- awards (3 rows)
-- -----------------------------------------
INSERT INTO public.awards (id, title, issuer, date, description, "certificateUrl") VALUES
  (
    '16986c3d-2430-458e-81c7-185fdcba65ef',
    'Dr. TMA Pai Merit Scholarship',
    'Manipal University Jaipur',
    NULL,
    '100% Academic scholarship',
    NULL
  ),
  (
    '2b6ad29b-03cc-4034-a41e-d1afbe634927',
    'Dean''s List of Excellence in Academics (x 6)',
    'Manipal University Jaipur',
    NULL,
    'For 6 consecutive semesters',
    NULL
  ),
  (
    'b61c82db-e8ab-4f9e-a282-6ef2d05272e2',
    'Student Excellence Award (x 2)',
    'Manipal University Jaipur',
    NULL,
    'For patent on 3D Sparse SLAM and journal paper on Zero-Knowledge Proofs published in IEEE Access',
    NULL
  );


-- -----------------------------------------
-- tech_stack (35 rows)
-- iconUrl stores Simple Icons slug (suffix only):
--   full URL = CDN_ICONS_BASE_URL + iconUrl
--   CDN_ICONS_BASE_URL = "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/"
-- -----------------------------------------
INSERT INTO public.tech_stack (id, name, "iconUrl", "websiteUrl") VALUES
  ('2f065462-56f5-4aa9-9ece-2de020382502', 'Python3',         'python.svg',          NULL),
  ('4f3c1216-1aa3-4b2d-a0f5-2b5aac18404e', 'C',               'c.svg',               NULL),
  ('5c6509db-7c92-479d-9830-3b3b41a876bb', 'C++',             'cplusplus.svg',       NULL),
  ('8d39569d-7761-48df-9a04-b408832cf80d', 'Java',            'java.svg',            NULL),
  ('c382cff1-99c8-4f96-8413-401cf5c21060', 'HTML5',           'html5.svg',           NULL),
  ('bad894b2-b163-41a0-90d2-bb3835129e7b', 'CSS3',            'css3.svg',            NULL),
  ('7bd5a448-8142-4d90-9118-ac1a85e090bd', 'JavaScript',      'javascript.svg',      NULL),
  ('1783d58d-8280-438a-baac-f874918f4593', 'Node.js',         'nodedotjs.svg',       NULL),
  ('da510f72-34e9-4aa0-8032-262beeb72e72', 'Express.js',      'express.svg',         NULL),
  ('57e8e82c-7ed4-435d-af8c-45b6e9c869d8', 'React.js',        'react.svg',           NULL),
  ('5e38b302-f533-4871-9467-f6ce3a051a58', 'Next.js',         'nextdotjs.svg',       NULL),
  ('8f49d04d-79f3-4bec-8637-51ca32acd726', 'MongoDB',         'mongodb.svg',         NULL),
  ('63cb85a7-f0bd-469d-8038-5bf19709ec33', 'PostgreSQL',      'postgresql.svg',      NULL),
  ('f2bc513f-55e1-4b30-a40e-106f1cf753e4', 'Tailwind CSS',    'tailwindcss.svg',     NULL),
  ('1d8577ee-f482-40e8-8c9d-83974264be7b', 'JWT',             'jsonwebtokens.svg',   NULL),
  ('f45c50a1-5e22-44ed-8f70-34d98c584d53', 'Nodemon',         'nodemon.svg',         NULL),
  ('9416b762-3771-4262-9730-ea3ed0d30b0c', 'ROS2',            'ros.svg',             NULL),
  ('dcad0440-c961-4810-b08e-4cc911529f7e', 'OpenCV',          'opencv.svg',          NULL),
  ('44b83786-2a0f-40dc-a6d6-dafadf894d61', 'CMake',           'cmake.svg',           NULL),
  ('1be1b264-b7ad-4f80-9035-f6e98b757c0a', 'Numpy',           'numpy.svg',           NULL),
  ('337b70c1-51f6-445e-b4a6-bf3b79a33be9', 'Flask',           'flask.svg',           NULL),
  ('291b47a3-b836-4d63-9bb1-4adf9da41bff', 'npm',             'npm.svg',             NULL),
  ('9239226f-fe29-41d6-a247-3eb9a74e1f8b', 'Shell',           'gnubash.svg',         NULL),
  ('a68655bd-fa07-46bb-87f6-32899210ed01', 'Raspberry Pi 5',  'raspberrypi.svg',     NULL),
  ('80874627-0094-47f9-95c9-060f4b415380', 'Docker',          'docker.svg',          NULL),
  ('2889f252-d4bb-4bee-98f1-8e9d66a8c90d', 'Linux',           'linux.svg',           NULL),
  ('71d18987-d1d4-4d11-820c-247cb3c1512d', 'Git',             'git.svg',             NULL),
  ('3fa43f04-0f85-4b6c-8899-b9ea40f89d54', 'GitHub',          'github.svg',          NULL),
  ('206cc345-6c08-4490-8f09-3c13040e6b43', 'GitHub Actions',  'githubactions.svg',   NULL),
  ('c8c19256-3388-4e8d-918a-2543e2462173', 'Postman',         'postman.svg',         NULL),
  ('6b658dc6-3608-4cee-b3ca-c1fe629e650a', 'Hugging Face',    'huggingface.svg',     NULL),
  ('75a556b7-2878-43c9-99d2-c57056cb9b32', 'Vercel',          'vercel.svg',          NULL),
  ('17e823a7-f6f9-4c52-9a69-58bf95958530', 'Supabase',        'supabase.svg',        NULL),
  ('1686f135-9aed-4248-ab0e-c73e3c149f3c', 'Overleaf',        'overleaf.svg',        NULL),
  ('d1930050-3f34-48aa-98e1-4823400c3c65', 'OpenAI-Whisper',  'openai.svg',          NULL);


-- =====================================================
-- PART 7: VERIFY
-- =====================================================

SELECT
  table_name,
  COUNT(column_name) AS column_count
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name IN (
    'projects','publications','patents','experiences',
    'education','tech_stack','awards','user_data'
  )
GROUP BY table_name
ORDER BY table_name;

SELECT table_name, row_count FROM (
  SELECT 'projects'     AS table_name, COUNT(*) AS row_count FROM public.projects     UNION ALL
  SELECT 'publications',                COUNT(*)              FROM public.publications  UNION ALL
  SELECT 'patents',                     COUNT(*)              FROM public.patents       UNION ALL
  SELECT 'experiences',                 COUNT(*)              FROM public.experiences   UNION ALL
  SELECT 'education',                   COUNT(*)              FROM public.education     UNION ALL
  SELECT 'tech_stack',                  COUNT(*)              FROM public.tech_stack    UNION ALL
  SELECT 'awards',                      COUNT(*)              FROM public.awards        UNION ALL
  SELECT 'user_data',                   COUNT(*)              FROM public.user_data
) counts
ORDER BY table_name;
