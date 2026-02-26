// src/app/projects/layout.js

import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { CLOUDINARY_CLOUD_NAME } from "@/lib/constants";

const OG_IMAGE = `${CLOUDINARY_CLOUD_NAME}/v1755773898/portfolio2.0_myyptt.png`;

export const metadata = {
  title: "Projects",
  description:
    "Browse Eshan Sud's software projects — AI/ML systems, computer vision applications, full-stack web apps, and open-source contributions built with React, Next.js, Python, and more.",
  keywords: [
    "Eshan Sud Projects",
    "AI Projects",
    "ML Projects",
    "AI Projects GitHub",
    "ML Projects Portfolio",
    "Computer Vision Projects",
    "ORB-SLAM3 Project",
    "Next.js Projects",
    "React Projects",
    "Computer Vision",
    "ORB-SLAM3",
    "Open Source",
    "Portfolio Projects",
    "GitHub",
    "Python AI Projects",
    "Open Source Projects India",
    "Full Stack Web App",
    "Software Engineering Portfolio",
    "GitHub Projects",
  ],
  alternates: {
    canonical: "https://eshan-sud.vercel.app/projects",
  },
  openGraph: {
    type: "website",
    title: "Projects | Eshan Sud",
    description:
      "AI/ML systems, computer vision apps, full-stack web applications, and open-source projects by Eshan Sud.",
    url: "https://eshan-sud.vercel.app/projects",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Eshan Sud Projects",
      },
    ],
  },
  // twitter: {
  //   title: "Projects | Eshan Sud",
  //   description:
  //     "AI/ML systems, computer vision apps, full-stack web applications, and open-source projects by Eshan Sud.",
  //   images: [OG_IMAGE],
  // },
};

export default function ProjectsLayout({ children }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://eshan-sud.vercel.app" },
          { name: "Projects", url: "https://eshan-sud.vercel.app/projects" },
        ]}
      />
      {children}
    </>
  );
}
