// project/src/app/experience/page.jsx

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FileText,
  Search,
  Send,
  X,
  Briefcase,
  Building2,
  GraduationCap,
} from "lucide-react";
import { useData } from "@/lib/DataContext";
import { formatDate } from "@/utility/helper";
import { containerVariants, itemVariants } from "@/utility/animation";
import { ExperienceCardSkeleton, ErrorBoundary } from "@/components";
import { accent } from "@/lib/accent";

const ExperienceCard = ({
  title,
  company,
  startDate,
  endDate,
  current,
  description,
  skills,
  certificateUrl,
  offerLetterUrl,
  recommendationUrl,
  logoUrl,
  websiteUrl,
  location,
  remote,
  achievements,
}) => {
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
        <div
          className={`relative w-12 h-12 bg-gray-800 rounded-full border-4 border-[#0D1A3C] flex items-center justify-center transition-colors duration-300 ${accent.groupHoverBorder}`}
        >
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
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg md:text-xl font-bold text-white">{title}</h3>
            {/* Remote Badge */}
            {remote && (
              <span className="bg-blue-500/20 text-blue-400 text-xs font-medium px-2 py-0.5 rounded">
                Remote
              </span>
            )}
            {/* Current Badge */}
            {current && (
              <span className="bg-green-500/20 text-green-400 text-xs font-medium px-2 py-0.5 rounded">
                Current
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-0 whitespace-nowrap">
            {dateRange}
          </p>
        </div>
        {/* Website URL */}
        <div className="text-base md:text-md text-gray-300 mb-1">
          {websiteUrl ? (
            <Link
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block relative hover:text-white transition-colors group/link"
            >
              <span>{company}</span>
              <span
                className={`absolute left-0 -bottom-0.5 w-full h-[1px] ${accent.bg} transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300`}
              ></span>
            </Link>
          ) : (
            <p>{company}</p>
          )}
        </div>
        {/* Location */}
        {location && location != "Remote" && (
          <p className="text-sm text-gray-400 mb-3">{location}</p>
        )}
        {/* Description */}
        <p className="text-sm md:text-base text-gray-400 mb-4 leading-relaxed text-justify">
          {description}
        </p>
        {/* Key Achievements */}
        {achievements && achievements.length > 0 && (
          <div className="mb-4 bg-gray-800/30 rounded-lg p-3">
            <h4 className={`text-sm font-semibold ${accent.text} mb-2`}>
              Key Achievements
            </h4>
            <ul className="space-y-1">
              {achievements.map((achievement, idx) => (
                <li
                  key={idx}
                  className="text-sm text-gray-400 flex items-start gap-2"
                >
                  <span className={`${accent.text} mt-0.5`}>•</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Skills */}
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
        {/* Certificates & Offer Letter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          {certificateUrl && (
            <Link
              href={certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-sm ${accent.text} ${accent.textHover} transition-colors`}
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
              className={`inline-flex items-center gap-2 text-sm ${accent.text} ${accent.textHover} transition-colors`}
            >
              <FileText size={16} />
              <span>View Offer Letter</span>
            </Link>
          )}
          {recommendationUrl && (
            <Link
              href={recommendationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <span>👍 Recommendation</span>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ExperiencePage = () => {
  const { isLoading, experiences, error } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef(null);
  const [internships, setInternships] = useState([]);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    if (!isLoading) {
      setInternships(experiences.filter((exp) => exp.type === "internship"));
      setJobs(experiences.filter((exp) => exp.type === "full-time"));
    }
  }, [isLoading, experiences]);
  const isCurrentlyEmployed =
    jobs.some((job) => job.current) ||
    internships.some((internship) => internship.current);

  const filterExperiences = (list) =>
    list.filter((exp) => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return [
        exp.title,
        exp.company,
        exp.description,
        exp.location,
        ...(exp.skills || []),
        ...(exp.achievements || []),
      ]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(term));
    });

  const filteredJobs = filterExperiences(jobs);
  const filteredInternships = filterExperiences(internships);
  const noResults =
    searchTerm && filteredJobs.length === 0 && filteredInternships.length === 0;

  if (error) throw new Error(error);
  return (
    <ErrorBoundary fallbackMessage="Unable to load experience data. Please refresh the page.">
      <div className="pt-24 pb-16 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto origin-top transform xl:scale-110 2xl:scale-125 transition-transform duration-500 ease-in-out">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-3">
              <Briefcase size={36} className="text-white" />
              <span>
                <span className="text-gray-500">My Journey</span> So Far.
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mb-16">
              A timeline of my professional growth, internships, and full-time
              roles where I've had the opportunity to learn and contribute.
            </p>
          </motion.div>
          <div className="relative mb-12">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search by title, company, skills, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full bg-gray-800/50 text-white placeholder-gray-500 rounded-full py-3 pl-12 pr-10 border border-gray-700/50 focus:outline-none focus:ring-2 ${accent.ring}`}
            />
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  searchRef.current?.blur();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
          {isLoading ? (
            <div>
              {Array.from({ length: 4 }).map((_, i) => (
                <ExperienceCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              {/* Open to Work Button */}
              {!isCurrentlyEmployed && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-16"
                >
                  <Link
                    href="mailto:eshansud22@gmail.com"
                    className={`group inline-flex items-center gap-3 px-8 py-4 ${accent.bg} text-black rounded-full font-bold text-lg transition-all duration-300 ${accent.bgHover} hover:scale-105`}
                  >
                    <span>Open to New Opportunities</span>
                    <Send className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              )}
              {/* Jobs Section */}
              {filteredJobs.length > 0 && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative"
                >
                  <h3 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-8 flex items-center gap-3">
                    <Building2 size={28} /> Full-Time Roles
                  </h3>
                  {filteredJobs.map((exp) => (
                    <ExperienceCard key={exp.id} {...exp} />
                  ))}
                </motion.div>
              )}
              {/* Internships Section */}
              {filteredInternships.length > 0 && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative mt-16"
                >
                  <h3 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-8 flex items-center gap-3">
                    <GraduationCap size={28} /> Internships
                  </h3>
                  {filteredInternships.map((exp) => (
                    <ExperienceCard key={exp.id} {...exp} />
                  ))}
                </motion.div>
              )}
              {/* No results */}
              {noResults && (
                <p className="text-center text-gray-500 mt-8">
                  No experience found matching your search.
                </p>
              )}
              {/* Error Fallback */}
              {!searchTerm && internships.length === 0 && jobs.length === 0 && (
                <p className="text-gray-500 pl-2">
                  Experience history is currently unavailable.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ExperiencePage;
