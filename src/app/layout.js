// project/src/app/layout.js

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/lib/ThemeProvider";
import { DataProvider } from "@/lib/DataContext";
import ClientLayout from "@/components/ClientLayout";
// import StarryBackground from "@/components/StarryBackground";
import AuroraBackground from "@/components/AuroraBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Eshan Sud's Portfolio",
  description: "Portfolio Website of Eshan Sud",
  keywords:
    "portfolio, website, portfolio website developer, eshan, sud, eshan sud, manipal, university, jaipur, manipal university jaipur, software, engineer, software engineer, hire, research, publications, patents, open, source, open source, projects, internships, full time, job, work experience, academics, awards",
  author: "Eshan Sud",
  language: "english",
  robots: "nofollow",
  verification: {
    google: "85BaJwZ9KQ-787R4jgzXFVXRcNd0KzuzNJpjb5cHqOE",
  },
  appleWebApp: {
    title: "Eshan Sud's Portfolio",
  },
  // Open Graph (og) tags for social media sharing
  openGraph: {
    title: {
      default: "Eshan Sud's Portfolio",
      template: "%s - Eshan Sud's Portfolio",
    },
    description:
      "Portfolio website showcasing Eshan Sud's projects, research, and professional experience.",
    url: "https://eshan-sud.vercel.app/",
    siteName: "Eshan Sud",
    images: [
      {
        url: "https://res.cloudinary.com/dpjhwcj4q/image/upload/v1755773898/portfolio2.0_myyptt.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // Linkedin card tags
  linkedInOpenGraph: {
    title: "Eshan Sud | Software Engineer",
    description:
      "Explore Eshan Sud's LinkedIn profile showcasing skills, experience, and accomplishments in software engineering.",
    url: "https://www.linkedin.com/in/eshan-sud/",
    images: [
      {
        url: "https://res.cloudinary.com/dpjhwcj4q/image/upload/v1755773898/portfolio2.0_myyptt.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  // GitHub card tags
  gitHubOpenGraph: {
    title: "Eshan Sud | GitHub",
    description:
      "Visit Eshan Sud's GitHub profile for a collection of open-source projects and contributions.",
    url: "https://github.com/eshan-sud",
    images: [
      {
        url: "https://res.cloudinary.com/dpjhwcj4q/image/upload/v1755773898/portfolio2.0_myyptt.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  // Twitter card tags
  twitter: {
    card: "summary_large_image",
    title: "Eshan Sud's Portfolio",
    description:
      "A showcase of my projects, research, and professional experience.",
    images: [
      "https://res.cloudinary.com/dpjhwcj4q/image/upload/v1755773898/portfolio2.0_myyptt.png",
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuroraBackground />
        {/* <StarryBackground /> */}
        <ThemeProvider attribute="class" defaultTheme="dark">
          <DataProvider>
            <ClientLayout>{children}</ClientLayout>
          </DataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
