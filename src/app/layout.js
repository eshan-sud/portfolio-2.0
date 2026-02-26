// project/src/app/layout.js

import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

import { CLOUDINARY_CLOUD_NAME } from "@/lib/constants";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { DataProvider } from "@/lib/DataContext";
import {
  ClientLayout,
  StructuredData,
  AuroraBackground,
  // StarryBackground,
} from "@/components";
import { accent } from "@/lib/accent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://eshan-sud.vercel.app"),
  applicationName: "Eshan Sud Portfolio",
  title: {
    default: "Eshan Sud | Software Engineer & Researcher",
    template: "%s | Eshan Sud",
  },
  description:
    "Portfolio of Eshan Sud — Software Engineer from New Delhi, India specialising in AI/ML, computer vision, full-stack development, and academic research. IEEE Access co-author and patent applicant.",
  keywords: [
    "Eshan Sud",
    "Eshan Sud Portfolio",
    "Eshan Sud Portfol Indiaio",
    "Software Engineer New DelhiEngineer India",
    "So Engineer India",
    "tware Engineer New Delhi",
    "AI Engineer India",
    "ML Engineer",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Research Publications",
    "IEEE Access",
    "Patents India",
    "Manipal University Jaipur",
    "Open Source",
    "Academic Research",
    "Python Developer",
    "Node.js Developer",
    "Web Development",
    "Open Source",
    "IEEE Access",
    "Academic Research",
    "Software Development",
    "India",
  ],
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Eshan Sud", url: "https://eshan-sud.vercel.app" }],
  creator: "Eshan Sud",
  publisher: "Eshan Sud",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "85BaJwZ9KQ-787R4jgzXFVXRcNd0KzuzNJpjb5cHqOE",
  },
  alternates: {
    canonical: "https://eshan-sud.vercel.app",
  },
  appleWebApp: {
    title: "Eshan Sud Portfolio",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  other: {
    "theme-color": "#FACC15",
    "color-scheme": "dark",
    "msapplication-TileColor": "#0D1A3C",
    "msapplication-config": "/browserconfig.xml",
  },
  // Open Graph (og) tags for social media sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eshan-sud.vercel.app/",
    siteName: "Eshan Sud - Portfolio",
    title: "Eshan Sud | Software Engineer & Researcher",
    description:
      "Explore Eshan Sud's portfolio featuring cutting-edge projects in AI/ML, full-stack development, research publications in IEEE Access, and professional experience.",
    images: [
      {
        url: `${CLOUDINARY_CLOUD_NAME}/v1755773898/portfolio2.0_myyptt.png`,
        width: 1200,
        height: 630,
        alt: "Eshan Sud Portfolio",
        type: "image/png",
      },
    ],
  },
  // Twitter card tags
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Eshan Sud | Software Engineer & Researcher",
  //   description:
  //     "Portfolio showcasing AI/ML projects, research publications, and software engineering experience.",
  //   site: "@eshan_sud",
  //   creator: "@eshan_sud",
  //   images: [
  //     `${CLOUDINARY_CLOUD_NAME}/v1755773898/portfolio2.0_myyptt.png`,
  //   ],
  // },
  // Additional metadata
  category: "technology",
  classification: "Portfolio Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Skip-to-content link for keyboard / screen-reader users */}
        <a
          href="#main-content"
          className={`sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded ${accent.focusBg} focus:text-black focus:font-semibold focus:shadow-lg`}
        >
          Skip to main content
        </a>
        <AuroraBackground />
        <SpeedInsights />
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
