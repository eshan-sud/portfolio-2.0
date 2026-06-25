// src/app/research/page.jsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  BookOpen,
  Lightbulb,
  Quote,
  FlaskConical,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useData } from "@/lib/DataContext";
import { formatDate, titleCase } from "@/utility/helper";
import { containerVariants, itemVariants } from "@/utility/animation";
import {
  OrcidIcon,
  ResearchCardSkeleton,
  ErrorBoundary,
  CitationModal,
} from "@/components";
import { accent } from "@/lib/accent";

const ResearchCard = ({
  title,
  subtitle,
  date,
  authors,
  link,
  doi,
  abstract,
  tags,
  status,
  jurisdiction,
  fullData,
}) => {
  const [showAbstract, setShowAbstract] = useState(false);
  const [showCitation, setShowCitation] = useState(false);
  const handleMouseMove = (e) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };
  return (
    <motion.div
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      className="relative bg-[#16224c] rounded-lg p-8 border border-gray-700/50 group overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(234, 179, 8, 0.1), transparent 80%)`,
        }}
      ></div>
      <div className="relative z-10">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 className="text-xl font-bold text-white text-justify">{title}</h3>
          <div className="flex-shrink-0 flex gap-2">
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                status == "published" || status === "granted"
                  ? "bg-green-500/20 text-green-400"
                  : status === "accepted"
                    ? "bg-blue-500/20 text-blue-400"
                    : status === "pending" || status === "submitted"
                      ? `${accent.bgActive} ${accent.text}`
                      : "bg-gray-700 text-gray-300"
              }`}
            >
              {titleCase(status)}
            </span>
            {jurisdiction && (
              <span className="bg-gray-800 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
                {jurisdiction}
              </span>
            )}
          </div>
        </div>
        <p className="text-md font-semibold text-gray-300 mb-1">{subtitle}</p>
        <p className="text-sm text-gray-400 mb-4">{date}</p>
        <p className="text-gray-400 text-sm mb-4 text-justify">{authors}</p>
        {/* Tags/Keywords */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {/* Abstract */}
        {abstract && (
          <div className="mb-4">
            <button
              onClick={() => setShowAbstract(!showAbstract)}
              className={`text-sm ${accent.text} ${accent.textHover} transition-colors flex items-center gap-1`}
            >
              {showAbstract ? (
                <>
                  <ChevronDown size={16} /> Hide Abstract
                </>
              ) : (
                <>
                  <ChevronRight size={16} /> View Abstract
                </>
              )}
            </button>
            {showAbstract && (
              <p className="mt-2 text-sm text-gray-400 leading-relaxed text-justify">
                {abstract}
              </p>
            )}
          </div>
        )}
        {/* Links */}
        <div className="flex flex-wrap items-center gap-4">
          {link && (
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-sm ${accent.text} ${accent.textHover} transition-colors`}
            >
              <FileText size={16} />
              <span>Read Paper</span>
            </Link>
          )}
          {doi && (
            <>
              <Link
                href={`https://doi.org/${doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <span className="font-mono text-xs">DOI: {doi}</span>
              </Link>
              <button
                onClick={() => setShowCitation(true)}
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Quote size={16} />
                <span>Cite</span>
              </button>
            </>
          )}
        </div>
      </div>
      {/* Citation Modal */}
      <AnimatePresence>
        {showCitation && fullData && (
          <CitationModal
            publication={fullData}
            onClose={() => setShowCitation(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ResearchSection = ({ title, icon, items, orcidUrl, formatDate }) => (
  <div className="mb-16">
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center gap-3">
      {icon} {title}
    </h2>
    {orcidUrl && title === "Publications" && (
      <Link
        href={orcidUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center gap-2 text-gray-400 hover:text-white font-semibold text-sm md:text-base transition-colors mb-8"
      >
        <OrcidIcon size={16} />
        <span>View my ORCiD Profile</span>
        <span
          className={`absolute left-0 -bottom-1 w-full h-[1px] ${accent.bg} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
        ></span>
      </Link>
    )}
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {items.map((item) => (
        <ResearchCard
          key={item.id}
          title={item.title}
          subtitle={item.journal || item.patentNumber}
          date={item.year || `Filed on ${formatDate(item.filingDate)}`}
          authors={`${
            item.authors
              ? `Authors: ${item.authors.join(", ")}`
              : `Inventors: ${item.inventors.join(", ")}`
          }`}
          link={item.pdfUrl || item.documentUrl || item.publicationUrl}
          doi={item.doi}
          abstract={item.abstract || item.description}
          tags={item.tags}
          status={item.status}
          jurisdiction={item.jurisdiction}
          fullData={item}
        />
      ))}
    </motion.div>
  </div>
);

const ResearchPage = () => {
  const { isLoading, patents, publications, orcidUrl, error } = useData();
  if (error) throw new Error(error);
  return (
    <ErrorBoundary fallbackMessage="Unable to load research data. Please refresh the page.">
      <div className="pt-24 pb-16 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto origin-top transform xl:scale-110 2xl:scale-125 transition-transform duration-500 ease-in-out">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-3"
          >
            <FlaskConical size={36} className="text-white" />
            <span>
              <span className="text-gray-500">From Theory</span> to Practice.
            </span>
          </motion.h1>
          <p className="text-base md:text-lg text-gray-400 mb-12 text-justify">
            A collection of my academic publications & intellectual property
            contributions, exploring the frontiers of technology.
          </p>
          <div>
            {isLoading ? (
              <div>
                <div className="mb-16">
                  <div className="h-10 bg-gray-700/50 rounded w-64 mb-8 animate-pulse"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <ResearchCardSkeleton key={i} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {publications.length > 0 && (
                  <ResearchSection
                    title="Publications"
                    icon={<BookOpen />}
                    items={publications}
                    orcidUrl={orcidUrl}
                    formatDate={formatDate}
                  />
                )}
                {patents.length > 0 && (
                  <ResearchSection
                    title="Intellectual Property"
                    icon={<Lightbulb />}
                    items={patents}
                    formatDate={formatDate}
                  />
                )}
                {publications.length === 0 && patents.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <p>No research publications or patents found.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ResearchPage;
