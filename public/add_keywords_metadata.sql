-- Add keywords, volume, issue, and pages columns to publications table if they don't exist
ALTER TABLE public.publications 
ADD COLUMN IF NOT EXISTS keywords text[],
ADD COLUMN IF NOT EXISTS volume integer,
ADD COLUMN IF NOT EXISTS issue integer,
ADD COLUMN IF NOT EXISTS pages text;

-- Update ORB-SLAM3 publication with complete metadata
UPDATE public.publications
SET 
  keywords = ARRAY[
    'Simultaneous localization and mapping',
    'Hardware',
    'Benchmark testing',
    'Robots',
    'Sensors',
    'Thermal stability',
    'Real-time systems',
    'Visualization',
    'Three-dimensional displays',
    'Pipelines',
    'ORB-SLAM3',
    'simultaneous localization and mapping (SLAM)',
    'benchmarking',
    'TUM RGB-D dataset',
    'EuRoC MAV dataset',
    'KITTI visual odometry dataset',
    'embedded systems',
    'Raspberry Pi 5',
    '3-D trajectory evaluation',
    'SLAM accuracy'
  ],
  volume = 14,
  pages = '20287-20308'
WHERE 
  title = 'An In-depth Evaluation of ORB-SLAM3 on the Raspberry Pi 5: Performance, Stability, and Design Guidelines for Embedded SLAM'
  AND year = 2026;

-- Verify the update
SELECT 
  title,
  journal,
  year,
  volume,
  pages,
  doi,
  keywords
FROM public.publications
WHERE 
  title LIKE '%ORB-SLAM3%';
