// src/app/research/layout.js

import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { CLOUDINARY_CLOUD_NAME } from "@/lib/constants";

const OG_IMAGE = `${CLOUDINARY_CLOUD_NAME}/v1755773898/portfolio2.0_myyptt.png`;

export const metadata = {
  title: "Research",
  description:
    "Eshan Sud's academic research output — peer-reviewed publications in IEEE Access, filed patents, and contributions to computer vision, SLAM, and AI/ML research.",
  keywords: [
    "Eshan Sud Research",
    "IEEE Access Publication",
    "Patents",
    "Computer Vision Research",
    "ORB-SLAM3 Research",
    "AI Research",
    "Academic Publications",
    "ORCID",
    "DOI",
    "Research Papers",
    "Eshan Sud Publications",
    "IEEE Access Paper",
    "ORB-SLAM3 Research Paper",
    "Computer Vision Publication",
    "SLAM Research India",
    "AI ML Research Paper",
    "Patent Application India",
    "ORCID Eshan Sud",
    "Scholar Profile",
    "Academic Research Portfolio",
    "DOI Publication",
    "Peer Reviewed Journal",
  ],
  alternates: {
    canonical: "https://eshan-sud.vercel.app/research",
  },
  openGraph: {
    type: "website",
    title: "Research | Eshan Sud",
    description:
      "Peer-reviewed IEEE Access publications, patent filings, and academic contributions to computer vision and AI/ML by Eshan Sud.",
    url: "https://eshan-sud.vercel.app/research",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Eshan Sud Research",
      },
    ],
  },
  // twitter: {
  //   title: "Research | Eshan Sud",
  //   description:
  //     "Peer-reviewed IEEE Access publications, patent filings, and academic contributions to computer vision and AI/ML by Eshan Sud.",
  //   images: [OG_IMAGE],
  // },
};

export default function ResearchLayout({ children }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://eshan-sud.vercel.app" },
          { name: "Research", url: "https://eshan-sud.vercel.app/research" },
        ]}
      />
      {children}
    </>
  );
}
