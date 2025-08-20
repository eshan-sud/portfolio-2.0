// project/src/app/page.js

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import MaintenancePage from "@/components/MaintenancePage";

const HomePage = () => {
  const [resumeUrl, setResumeUrl] = useState(null);
  const primaryText = "Eshan Sud.";
  const subtitleText = "Software Engineer";

  useEffect(() => {
    const fetchResume = async () => {
      const { data, error } = await supabase
        .from("resume")
        .select("url")
        .order("createdAt", { ascending: false })
        .limit(1)
        .single();

      if (error || !data) {
        setResumeUrl("/documents/resume_eshan_sud.pdf");
      } else {
        setResumeUrl(data.url);
      }
    };

    fetchResume();
  }, []);

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
            className="mt-4"
          >
            <Link
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-800/50 text-yellow-400 rounded-full font-semibold border border-gray-700/50 hover:bg-yellow-400 hover:text-black transition-all duration-300"
            >
              <span>View My Resume</span>
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
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
  return <HomePage />;
}
