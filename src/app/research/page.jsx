// src/app/research/page.jsx

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, BookOpen, Lightbulb } from "lucide-react";
import { useData } from "@/lib/DataContext";
import { formatDate, titleCase } from "@/utility/helper";
import { containerVariants, itemVariants } from "@/utility/animation";
import OrcidIcon from "@/components/OrcidIcon";

const ResearchCard = ({ title, subtitle, date, authors, link, status }) => {
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
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <span className="flex-shrink-0 bg-gray-800 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
            {titleCase(status)}
          </span>
        </div>
        <p className="text-md font-semibold text-gray-300 mb-1">{subtitle}</p>
        <p className="text-sm text-gray-400 mb-4">{date}</p>
        <p className="text-gray-400 text-sm mb-6">{authors}</p>
        {link && (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <FileText size={16} />
            <span>Read Here</span>
          </Link>
        )}
      </div>
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
        <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
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
          link={item.pdfUrl || item.documentUrl}
          status={item.status}
        />
      ))}
    </motion.div>
  </div>
);

const ResearchPage = () => {
  const { isLoading, patents, publications, orcidUrl, error } = useData();

  return (
    <div className="pt-24 pb-16 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto transform xl:scale-110 2xl:scale-125 transition-transform duration-500 ease-in-out">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
        >
          <span className="text-gray-500">From Theory</span> to Practice.
        </motion.h1>
        <p className="text-base md:text-lg text-gray-400 mb-12">
          A collection of my academic publications & intellectual property
          contributions, exploring the frontiers of technology.
        </p>
        {error && (
          <div className="text-center py-4">
            <p className="text-red-500 text-lg font-semibold">
              Oops! Something went wrong.
            </p>
            <p className="text-gray-400">{error}</p>
          </div>
        )}
        {!error && (
          <div>
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">
                  Fetching the latest research...
                </p>
                <div className="animate-spin h-8 w-8 border-4 border-t-4 border-gray-400 rounded-full mx-auto" />
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
        )}
      </div>
    </div>
  );
};

export default ResearchPage;
