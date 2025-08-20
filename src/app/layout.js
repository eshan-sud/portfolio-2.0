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
    "portofilio, developer, eshan, sud, manipal, university, jaipur, software, software engineer, hire, patents, projects, internships, work experience, academics, awards, portfolio, website",
  author: "Eshan Sud",
  language: "english",
  // og:title, og:description, og:image, og:url, og:type
  // twitter:card, twitter:site, twitter:creator, twitter:title, twitter:description, twitter:image
  // robots: "nofollow",
  // themeColor: "",
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
