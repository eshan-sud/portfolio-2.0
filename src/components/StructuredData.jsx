// src/components/StructuredData.jsx
// Server component — renders JSON-LD in the initial HTML response for best SEO.

import { CLOUDINARY_CLOUD_NAME } from "@/lib/constants";

const BASE_URL = "https://eshan-sud.vercel.app";
const OG_IMAGE = `${CLOUDINARY_CLOUD_NAME}/v1755773898/portfolio2.0_myyptt.png`;
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BASE_URL}/#person`,
  name: "Eshan Sud",
  givenName: "Eshan",
  familyName: "Sud",
  url: BASE_URL,
  image: {
    "@type": "ImageObject",
    url: OG_IMAGE,
    width: 400,
    height: 400,
  },
  jobTitle: "Software Engineer",
  description:
    "Software Engineer specialising in AI/ML, computer vision, and full-stack web development. IEEE Access co-author and patent applicant based in Jaipur, India.",
  nationality: {
    "@type": "Country",
    name: "India",
  },
  knowsLanguage: [
    { "@type": "Language", name: "English" },
    { "@type": "Language", name: "Hindi" },
  ],
  knowsAbout: [
    "Software Engineering",
    "Artificial Intelligence",
    "Machine Learning",
    "Full-Stack Development",
    "React",
    "Next.js",
    "Python",
    "Computer Vision",
    "ORB-SLAM3",
    "Deep Learning",
    "Node.js",
    "PostgreSQL",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Software Engineer",
    occupationLocation: {
      "@type": "City",
      name: "Delhi, India",
    },
    skills:
      "AI/ML, Full-Stack Development, Computer Vision, React, Next.js, Python",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Manipal University Jaipur",
    url: "https://jaipur.manipal.edu",
  },
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Manipal University Jaipur",
    url: "https://jaipur.manipal.edu",
  },
  sameAs: [
    "https://github.com/eshan-sud",
    "https://www.linkedin.com/in/eshan-sud/",
    "https://orcid.org/0009-0007-4981-8985",
    "https://leetcode.com/eshan-sud",
    "https://www.hackerrank.com/eshansud",
    "https://instagram.com/eshan_sud/",
    "mailto:eshansud22@gmail.com",
    // "https://<>/eshan_sud", // Socials placeholder for future platforms
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Eshan Sud — Portfolio",
  url: BASE_URL,
  description:
    "Portfolio of Eshan Sud: AI/ML projects, IEEE publications, patents, and full-stack engineering work.",
  author: { "@id": `${BASE_URL}/#person` },
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/projects?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${BASE_URL}/#profilepage`,
  url: BASE_URL,
  name: "Eshan Sud — Software Engineer & Researcher",
  description:
    "Personal portfolio and professional profile of Eshan Sud, software engineer specialising in AI/ML and full-stack development.",
  image: OG_IMAGE,
  mainEntity: { "@id": `${BASE_URL}/#person` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
    ],
  },
};

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}
