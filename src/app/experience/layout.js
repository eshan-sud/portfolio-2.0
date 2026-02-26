// src/app/experience/layout.js

import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { CLOUDINARY_CLOUD_NAME } from "@/lib/constants";

const OG_IMAGE = `${CLOUDINARY_CLOUD_NAME}/v1755773898/portfolio2.0_myyptt.png`;

export const metadata = {
  title: "Experience",
  description:
    "Eshan Sud's professional timeline — software engineering internships, work experience, and certifications spanning AI/ML, full-stack development, and computer vision.",
  keywords: [
    "Eshan Sud Experience",
    "Software Engineering Internship",
    "Work Experience",
    "Professional Experience",
    "AI ML Internship",
    "Eshan Sud Work History",
    "Software Engineering Internship India",
    "Full Stack Developer Experience",
    "Professional Experience Software Engineer",
    "Full Stack Developer",
    "Manipal University Jaipur",
  ],
  alternates: {
    canonical: "https://eshan-sud.vercel.app/experience",
  },
  openGraph: {
    type: "website",
    title: "Experience | Eshan Sud",
    description:
      "Eshan Sud's professional internships, work experience, and certifications in software engineering and AI/ML.",
    url: "https://eshan-sud.vercel.app/experience",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Eshan Sud Experience",
      },
    ],
  },
  // twitter: {
  //   title: "Experience | Eshan Sud",
  //   description:
  //     "Eshan Sud's professional internships, work experience, and certifications in software engineering and AI/ML.",
  //   images: [OG_IMAGE],
  // },
};

export default function ExperienceLayout({ children }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://eshan-sud.vercel.app" },
          {
            name: "Experience",
            url: "https://eshan-sud.vercel.app/experience",
          },
        ]}
      />
      {children}
    </>
  );
}
