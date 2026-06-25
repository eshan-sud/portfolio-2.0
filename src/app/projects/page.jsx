// src/app/projects/page.jsx

"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Github,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  Layers,
} from "lucide-react";
import { useData } from "@/lib/DataContext";
import { cardVariants } from "@/utility/animation";
import { FALLBACK_IMAGE, getCloudinaryUrl } from "@/lib/constants";
import { SkeletonGrid, ProjectCardSkeleton, ErrorBoundary } from "@/components";
import { accent } from "@/lib/accent";

const ProjectCard = ({ project, onClick, isPriority = false }) => {
  const imageUrl = getCloudinaryUrl(project.image) || FALLBACK_IMAGE;
  return (
    <motion.div
      layoutId={`card-${project.id}`}
      onClick={onClick}
      variants={cardVariants}
      className="bg-[#16224c] rounded-lg overflow-hidden group relative border border-gray-700/50 cursor-pointer"
    >
      <div
        className={`absolute inset-0 ${accent.bgMuted} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm`}
      ></div>
      <div className="relative z-10">
        {/* Project Picture */}
        <div className="relative w-full h-40 overflow-hidden bg-gray-900">
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
            priority={isPriority}
          />
        </div>
        <div className="p-4">
          {/* Project Title */}
          <h3 className="text-base md:text-lg font-bold text-white mb-2 truncate">
            {project.title}
          </h3>
          {/* Project Description */}
          <p className="text-gray-400 text-xs mb-3 line-clamp-1">
            {project.description}
          </p>
          {/* Learn More Button */}
          <div className="flex items-center gap-4">
            <span
              className={`inline-flex items-center gap-1 text-xs ${accent.text}`}
            >
              <ExternalLink size={14} /> Learn More
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  const imageUrl = getCloudinaryUrl(project.image) || FALLBACK_IMAGE;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 backdrop-blur-sm"
      ></motion.div>
      <motion.div
        layoutId={`card-${project.id}`}
        initial={{ opacity: 0.5, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0.5, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-[#16224c] rounded-lg overflow-hidden border border-gray-700/50 flex flex-col"
      >
        <div className="relative w-full h-64 md:h-80 flex-shrink-0 overflow-hidden bg-gray-900">
          {/* Project Picture */}
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            className="object-contain"
            unoptimized
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {/* Project Category */}
            <span className="bg-gray-800 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full capitalize">
              {project.category}
            </span>
            {/* Project Status */}
            {project.status && project.status !== "completed" && (
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  project.status === "in-progress"
                    ? `${accent.bgActive} ${accent.text}`
                    : project.status === "maintained"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-gray-700 text-gray-300"
                }`}
              >
                {project.status === "in-progress"
                  ? "In Progress"
                  : project.status === "maintained"
                    ? "Maintained"
                    : project.status}
              </span>
            )}
          </div>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {/* Project Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {project.title}
          </h2>
          {/* Project Description */}
          <p className="text-gray-300 mb-6 text-sm md:text-base text-justify">
            {project.description}
          </p>
          {/* Extended content/case study */}
          {project.content && (
            <div className="prose prose-invert max-w-none mb-6">
              <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line text-justify">
                {project.content}
              </p>
            </div>
          )}
          {/* Project highlights/metrics */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="mb-6 bg-gray-800/50 rounded-lg p-4">
              <h3 className={`text-sm font-semibold ${accent.text} mb-2`}>
                Key Highlights
              </h3>
              <ul className="space-y-1 text-sm text-gray-400">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className={`${accent.text} mt-1`}>•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack?.map((tag) => (
              <span
                key={tag}
                className="bg-gray-700 text-gray-300 text-xs md:text-sm font-medium px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          {/* Project Links */}
          <div className="flex items-center gap-6">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${accent.text} ${accent.textHover} font-semibold text-sm md:text-base`}
              >
                <ExternalLink size={16} /> Live Demo
              </Link>
            )}
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-semibold text-sm md:text-base"
              >
                <Github size={16} /> Source Code
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProjectsPage = () => {
  const { isLoading, projects, error } = useData();
  if (error) throw new Error(error);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);
  const searchRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  // Filter out archived projects and apply search
  const filteredProjects = projects.filter((project) => {
    // Hide archived projects
    if (project.archived) return false;
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return [
      project.title,
      project.description,
      project.category,
      project.status,
      ...(project.techStack || []),
      ...(project.highlights || []),
    ]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(term));
  });
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.displayOrder && b.displayOrder)
      return b.displayOrder - a.displayOrder;
    return 0;
  });
  const projectsToShow = showAll ? sortedProjects : sortedProjects.slice(0, 6);
  return (
    <ErrorBoundary fallbackMessage="Unable to load projects. Please refresh the page.">
      <div className="pt-24 pb-16 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto origin-top transform xl:scale-110 2xl:scale-125 transition-transform duration-500 ease-in-out">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-3"
          >
            <Layers size={36} className="text-white" />
            <span>
              <span className="text-gray-500">My Creative</span> Projects.
            </span>
          </motion.h1>
          <p className="text-base md:text-lg text-gray-400 mb-12 text-justify">
            A collection of my work, from web apps to AI experiments.
          </p>
          <div className="relative mb-12">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search by title, tech stack, category, status..."
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
          {isLoading && (
            <SkeletonGrid count={6} SkeletonComponent={ProjectCardSkeleton} />
          )}
          {!isLoading && (
            <>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                initial="hidden"
                animate="visible"
              >
                {projectsToShow.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => setSelectedProject(project)}
                    isPriority={index < 3}
                  />
                ))}
              </motion.div>
              {filteredProjects.length > 3 && (
                <div className="w-full flex justify-center mt-12">
                  <AnimatePresence mode="wait">
                    <motion.button
                      key={showAll ? "close" : "show"}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setShowAll(!showAll)}
                      className={`group w-14 h-14 flex items-center justify-center bg-gray-800/50 ${accent.text} rounded-full border border-gray-700/50 ${accent.hoverBg} hover:text-black transition-all duration-300`}
                    >
                      {showAll ? (
                        <ChevronUp size={24} />
                      ) : (
                        <ChevronDown size={24} />
                      )}
                    </motion.button>
                  </AnimatePresence>
                </div>
              )}
              {filteredProjects.length === 0 && (
                <p className="text-center text-gray-500 mt-8">
                  No projects found matching your search.
                </p>
              )}
            </>
          )}
        </div>
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
};

export default ProjectsPage;
