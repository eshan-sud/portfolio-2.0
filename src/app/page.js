// src/app/page.js

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  // Download
} from "lucide-react";
import { useData } from "@/lib/DataContext";
import { MaintenancePage, ErrorBoundary } from "@/components";
import { accent } from "@/lib/accent";

const HomePage = () => {
  const { resumeUrl } = useData();
  const primaryText = "Eshan Sud.";
  const subtitleText = "Software Engineer";

  const sentenceVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // const handleDownload = () => {
  //   const link = document.createElement("a");
  //   link.href = resumeUrl;
  //   link.download = "resume_eshan_sud.pdf";
  //   link.click();
  // };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="w-full max-w-4xl flex flex-col items-start">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-bold text-white tracking-tighter"
        >
          {primaryText}
        </motion.h1>
        <motion.h2
          variants={sentenceVariants}
          initial="hidden"
          animate="visible"
          className="text-2xl md:text-4xl text-gray-400 mt-4"
        >
          {subtitleText.split("").map((char, index) => (
            <motion.span key={`${char}-${index}`} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.h2>
        {resumeUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            // className="mt-4"
            className="mt-12 flex items-center gap-4"
          >
            <Link
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center gap-2 px-4 py-3 bg-gray-800/50 ${accent.text} rounded-full font-semibold border border-gray-700/50 ${accent.hoverBg} hover:text-black transition-all duration-300`}
            >
              <span>{"View My Resume"}</span>
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            {/* <button
              onClick={handleDownload}
              className={`group inline-flex items-center justify-center p-3 w-12 h-12 bg-gray-800/50 ${accent.text} rounded-full font-semibold border border-gray-700/50 ${accent.hoverBg} hover:text-black transition-all duration-300`}
            >
              <Download className="h-8 w-8 group-hover:scale-110 transition-all duration-300" />
            </button> */}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default function App() {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";
  if (isMaintenanceMode) {
    return <MaintenancePage />;
  }
  return (
    <ErrorBoundary fallbackMessage="Unable to load page data. Please refresh.">
      <HomePage />
    </ErrorBoundary>
  );
}
