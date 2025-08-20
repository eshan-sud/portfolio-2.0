// project/src/app/experience/page.jsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FileText, Send } from "lucide-react";
import { useData } from "@/lib/DataContext";
import { supabase } from "@/lib/supabaseClient";
import { formatDate } from "@/utility/helper";
import { containerVariants, itemVariants } from "@/utility/animation";

const ExperienceCard = ({}) => {
  const { experiences } = useData();
  const internships = experiences.filter((exp) => exp.type === "internship");
  const jobs = experiences.filter((exp) => exp.type === "full-time");
  const dateRange = `${formatDate(startDate)} - ${
    current ? "Present" : formatDate(endDate)
  }`;

  return (
    <motion.div
      variants={itemVariants}
      className="relative flex gap-4 md:gap-6 group"
    >
      <div className="absolute left-[22px] top-12 bottom-0 w-0.5 bg-gray-700"></div>
      <div className="flex-shrink-0">
        <div className="relative w-12 h-12 bg-gray-800 rounded-full border-4 border-[#0D1A3C] flex items-center justify-center transition-colors duration-300 group-hover:border-yellow-400">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={`${company} logo`}
              width={32}
              height={32}
              className="object-contain rounded-full"
            />
          ) : (
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          )}
        </div>
      </div>
      <div className="mb-12 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
          <h3 className="text-lg md:text-xl font-bold text-white">{title}</h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-0 whitespace-nowrap">
            {dateRange}
          </p>
        </div>
        <div className="text-base md:text-md text-gray-300 mb-3">
          {websiteUrl ? (
            <Link
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block relative hover:text-white transition-colors group/link"
            >
              <span>{company}</span>
              <span className="absolute left-0 -bottom-0.5 w-full h-[1px] bg-yellow-400 transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300"></span>
            </Link>
          ) : (
            <p>{company}</p>
          )}
        </div>
        <p className="text-sm md:text-base text-gray-400 mb-4 leading-relaxed text-justify">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {skills
            ?.filter((skill) => skill)
            .map((skill) => (
              <span
                key={skill}
                className="bg-gray-800 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          {certificateUrl && (
            <Link
              href={certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <FileText size={16} />
              <span>View Certificate</span>
            </Link>
          )}
          {offerLetterUrl && (
            <Link
              href={offerLetterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <FileText size={16} />
              <span>View Offer Letter</span>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ExperiencePage = () => {
  const [internships, setInternships] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("startDate", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        setError("Failed to fetch experience data.");
      } else if (data) {
        setInternships(data.filter((exp) => exp.type === "internship"));
        setJobs(data.filter((exp) => exp.type === "full-time"));
      }
      setLoading(false);
    };

    fetchExperience();
  }, []);

  const isCurrentlyEmployed =
    jobs.some((job) => job.current) ||
    internships.some((internship) => internship.current);

  return (
    <div className="pt-24 pb-16 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto transform xl:scale-110 2xl:scale-125 transition-transform duration-500 ease-in-out">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-gray-500">My Journey</span> So Far.
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mb-16">
            A timeline of my professional growth, internships, and full-time
            roles where I've had the opportunity to learn and contribute.
          </p>
        </motion.div>
        {loading && <p className="text-gray-400">Loading experience...</p>}
        {error && <p className="text-red-400">{error}</p>}
        {!loading && !error && (
          <>
            {/* "Available for Hire" Button */}
            {!isCurrentlyEmployed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-16"
              >
                <Link
                  href="mailto:eshansud22@gmail.com"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-yellow-400 text-black rounded-full font-bold text-lg transition-all duration-300 hover:bg-yellow-300 hover:scale-105"
                >
                  <span>Open to New Opportunities</span>
                  <Send className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            )}

            {jobs.length > 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative"
              >
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-8">
                  Full-Time Roles
                </h3>
                {jobs.map((exp) => (
                  <ExperienceCard key={exp.id} {...exp} />
                ))}
              </motion.div>
            )}

            {internships.length > 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative mt-16"
              >
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-8">
                  Internships
                </h3>
                {internships.map((exp) => (
                  <ExperienceCard key={exp.id} {...exp} />
                ))}
              </motion.div>
            )}

            {internships.length === 0 && jobs.length === 0 && (
              <p className="text-gray-500">
                No experience found. This might be due to Row Level Security
                (RLS) in Supabase.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ExperiencePage;
