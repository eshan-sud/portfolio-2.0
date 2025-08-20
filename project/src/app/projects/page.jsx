// src/app/projects/page.jsx

"use client";

import { useState } from "react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Github,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { useData } from "@/lib/DataContext";
import Image from "next/image";
import { cardVariants } from "@/utility/animation";

const ProjectCard = ({ project, onClick, isPriority = false }) => {
  const fallbackImage =
    "https://placehold.co/600x400/16224c/ffffff?text=Project";
  const imageUrl = project.image || fallbackImage;

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      onClick={onClick}
      variants={cardVariants}
      className="bg-[#16224c] rounded-lg overflow-hidden group relative border border-gray-700/50 cursor-pointer"
    >
      <div className="absolute inset-0 bg-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
      <div className="relative z-10">
        <div className="relative w-full h-40 [mask-image:linear-gradient(to_top,transparent,black_25%,black)]">
          {project.image ? (
            <CldImage
              src={imageUrl}
              alt={project.title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={isPriority}
            />
          ) : (
            <Image
              src={fallbackImage}
              alt={project.title}
              fill
              className="object-cover object-top"
              unoptimized
              priority={isPriority}
            />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-base md:text-lg font-bold text-white mb-2 truncate">
            {project.title}
          </h3>
          <p className="text-gray-400 text-xs mb-3 line-clamp-1">
            {project.description}
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-xs text-yellow-400">
              <ExternalLink size={14} /> Learn More
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  const fallbackImage =
    "https://placehold.co/600x400/16224c/ffffff?text=Project";
  const imageUrl = project.image || fallbackImage;

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
        className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-[#16224c] rounded-lg overflow-hidden border border-gray-700/50 flex flex-col"
      >
        <div className="relative w-full h-64 md:h-80 flex-shrink-0 [mask-image:linear-gradient(to_top,transparent,black_35%,black)]">
          {project.image ? (
            <CldImage
              src={imageUrl}
              alt={project.title}
              fill
              className="object-cover object-top"
            />
          ) : (
            <Image
              src={fallbackImage}
              alt={project.title}
              fill
              className="object-cover object-top"
              unoptimized
            />
          )}
          <span className="absolute top-4 left-4 bg-gray-800 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full capitalize">
            {project.category}
          </span>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {project.title}
          </h2>
          <p className="text-gray-300 mb-6 text-sm md:text-base">
            {project.description}
          </p>
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
          <div className="flex items-center gap-6">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold text-sm md:text-base"
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

function ProjectsPage() {
  const { projects } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter((project) => {
    const searchContent =
      project.title + project.description + (project.techStack || []).join(" ");
    return searchContent.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const projectsToShow = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 3);

  return (
    <div className="pt-24 pb-16 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto transform xl:scale-110 2xl:scale-125 transition-transform duration-500 ease-in-out">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
        >
          <span className="text-gray-500">My Creative</span> Projects.
        </motion.h1>
        <p className="text-base md:text-lg text-gray-400 mb-12">
          A collection of my work, from web apps to AI experiments.
        </p>
        <div className="relative mb-12">
          <input
            type="text"
            placeholder="Search by technology (e.g., React, Python, AI)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800/50 text-white placeholder-gray-500 rounded-full py-3 pl-12 pr-4 border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
        </div>
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
                className="group w-14 h-14 flex items-center justify-center bg-gray-800/50 text-yellow-400 rounded-full border border-gray-700/50 hover:bg-yellow-400 hover:text-black transition-all duration-300"
              >
                {showAll ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </motion.button>
            </AnimatePresence>
          </div>
        )}
        {filteredProjects.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No projects found matching your search.
          </p>
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
  );
}

export default ProjectsPage;
