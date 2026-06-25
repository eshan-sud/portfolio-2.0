// src/app/about/layout.js

import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { CLOUDINARY_BASE_URL } from "@/lib/constants";

const OG_IMAGE = `${CLOUDINARY_BASE_URL}v1755773898/portfolio2.0_myyptt.png`;

export const metadata = {
  title: "About",
  description:
    "Meet Eshan Sud — software engineer from Manipal University Jaipur. ฺ B.Tech Computer Science graduate with expertise in AI/ML, computer vision, React, Python, and full-stack engineering.",
  keywords: [
    "About Eshan Sud",
    "Eshan Sud Bio",
    "Eshan Sud Education",
    "Manipal University Jaipur Computer Science",
    "B.Tech CSE India",
    "AI ML Engineer Bio",
    "Tech Stack",
    "Awards",
    "GPA",
    "Skills",
    "AI ML Engineer",
    "Programming Skills",
    "Awards and Achievements",
    "Software Engineer Profile",
    "Full Stack Developer India",
    "Jaipur Developer",
  ],
  alternates: {
    canonical: "https://eshan-sud.vercel.app/about",
  },
  openGraph: {
    type: "profile",
    title: "About | Eshan Sud",
    description:
      "Eshan Sud's background, education at Manipal University Jaipur, tech stack, and academic achievements — software engineer specialising in AI/ML and full-stack development.",
    url: "https://eshan-sud.vercel.app/about",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "About Eshan Sud",
      },
    ],
  },
  // twitter: {
  //   title: "About | Eshan Sud",
  //   description:
  //     "Eshan Sud's background, education at Manipal University Jaipur, tech stack, and academic achievements.",
  //   images: [OG_IMAGE],
  // },
};

export default function AboutLayout({ children }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://eshan-sud.vercel.app" },
          { name: "About", url: "https://eshan-sud.vercel.app/about" },
        ]}
      />
      {children}
    </>
  );
}
