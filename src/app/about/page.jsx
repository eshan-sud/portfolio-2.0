// src/app/about/page.jsx

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
  useAnimationFrame,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FileText,
  GraduationCap,
  Award,
  ChevronDown,
  Search,
  User,
  Code2,
  Mail,
  Check,
} from "lucide-react";
import { useData } from "@/lib/DataContext";
import { iconMap, formatDate } from "@/utility/helper";
import { containerVariants, itemVariants } from "@/utility/animation";
import { accent } from "@/lib/accent";
import {
  EducationCardSkeleton,
  ProfileSkeleton,
  ErrorBoundary,
  GitHubActivityGraph,
} from "@/components";
import { getCdnIconUrl } from "@/lib/constants";

const SocialLink = ({ href, icon: Icon }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white"
  >
    <Icon
      size={24}
      className="text-gray-400 transition-all duration-300 group-hover:text-gray-900"
    />
  </Link>
);

const CopyEmailButton = ({ email }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Email copied!" : "Copy email address"}
      className="group relative w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white"
    >
      {copied ? (
        <Check
          size={24}
          className="text-green-400 transition-all duration-300"
        />
      ) : (
        <Mail
          size={24}
          className="text-gray-400 transition-all duration-300 group-hover:text-gray-900"
        />
      )}
      {/* Tooltip */}
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-gray-700">
        {copied ? "Copied!" : "Copy email"}
      </span>
    </button>
  );
};

const AnimatedCounter = ({ value }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      animate(count, value, { duration: 2, ease: "easeOut" });
    }
  }, [inView, count, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const StatsStrip = ({ projectCount, experienceCount, researchCount }) => {
  const stats = [
    { value: projectCount, label: "Projects Completed" },
    { value: experienceCount, label: "Work Experiences" },
    { value: researchCount, label: "Publications & Patents" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.5 }}
      className="my-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-4xl md:text-5xl font-bold text-white">
              <AnimatedCounter value={stat.value} />+
            </p>
            <p className="text-sm md:text-base text-gray-400 mt-2">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const EducationCard = ({
  institution,
  degree,
  fieldOfStudy,
  startDate,
  endDate,
  grade,
  logoUrl,
  websiteUrl,
}) => (
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
            alt={`${institution} logo`}
            width={32}
            height={32}
            className="w-8 h-8 object-contain rounded-full"
          />
        ) : (
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        )}
      </div>
    </div>
    <div className="mb-12 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
        <h3 className="text-lg md:text-xl font-bold text-white">
          {websiteUrl ? (
            <Link
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative ${accent.hoverText} transition-colors group/link`}
            >
              <span>{institution}</span>
              <span
                className={`absolute left-0 -bottom-0.5 w-full h-[1px] ${accent.bg} transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300`}
              ></span>
            </Link>
          ) : (
            <span>{institution}</span>
          )}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-0 whitespace-nowrap">
          {formatDate(startDate)} - {formatDate(endDate)}
        </p>
      </div>
      <p className="text-base md:text-md text-gray-300 mb-2 italic">
        {degree}
        {fieldOfStudy && ` in ${fieldOfStudy}`}
      </p>
      {grade && <p className="text-sm md:text-base text-gray-400">{grade}</p>}
    </div>
  </motion.div>
);

const AwardCard = ({ title, issuer, date, certificateUrl }) => (
  <motion.div variants={itemVariants} className="pl-10 relative group">
    <div
      className={`absolute left-0 top-1 w-4 h-4 bg-gray-700 rounded-full border-4 border-[#0D1A3C] transition-colors duration-300 ${accent.groupHoverBg}`}
    ></div>
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
        <h3 className="text-lg md:text-xl font-bold text-white">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-0">
          {formatDate(date)}
        </p>
      </div>
      <p className="text-base md:text-md text-gray-300 mb-3 italic">{issuer}</p>
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
    </div>
  </motion.div>
);

const TechStackSection = ({ techStack }) => {
  const [showGrid, setShowGrid] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const position = useRef(0);

  useAnimationFrame((_, delta) => {
    if (!isPaused && containerRef.current) {
      position.current -= delta * 0.05;
      x.set(position.current);
    }
  });

  const filteredTechStack = techStack.filter((tech) =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full">
      <div className="w-full overflow-hidden relative">
        <motion.div
          ref={containerRef}
          className="flex gap-8 md:gap-12"
          style={{ x }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {[...techStack, ...techStack].map((tech, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center gap-3 text-white font-medium text-lg md:text-xl whitespace-nowrap"
            >
              {tech.iconUrl && (
                <Image
                  // src={tech.iconUrl}
                  src={getCdnIconUrl(tech.iconUrl) || tech.iconUrl}
                  alt={`${tech.name} icon`}
                  width={28}
                  height={28}
                  className="h-7 w-7 filter invert brightness-200"
                  unoptimized
                />
              )}
              <span>{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
      {!showGrid && (
        <div className="w-full flex justify-center mt-8">
          <motion.button
            onClick={() => setShowGrid(true)}
            className={`group w-14 h-14 flex items-center justify-center bg-gray-800/50 ${accent.text} rounded-full border border-gray-700/50 ${accent.hoverBg} hover:text-black transition-all duration-300`}
          >
            <ChevronDown size={24} />
          </motion.button>
        </div>
      )}
      <AnimatePresence>
        {showGrid && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="relative my-8 max-w-sm mx-auto">
              <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full bg-gray-800/50 text-white placeholder-gray-500 rounded-full py-3 pl-12 pr-4 border border-gray-700/50 focus:outline-none focus:ring-2 ${accent.ring}`}
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                size={20}
              />
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4"
            >
              {filteredTechStack.map((tech, index) =>
                tech.websiteUrl ? (
                  <Link
                    key={tech.name}
                    href={tech.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.div
                      key={tech.name}
                      className="bg-gray-800 p-3 rounded-lg flex flex-col items-center justify-center gap-2 aspect-square transition-all duration-300 hover:bg-gray-700/50 hover:-translate-y-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech.iconUrl && (
                        <Image
                          src={getCdnIconUrl(tech.iconUrl) || tech.iconUrl}
                          alt={`${tech.name} icon`}
                          width={32}
                          height={32}
                          className="h-8 w-8 filter invert brightness-200"
                          unoptimized
                        />
                      )}
                      <p className="text-xs text-center text-gray-300 font-medium">
                        {tech.name}
                      </p>
                    </motion.div>
                  </Link>
                ) : (
                  <motion.div
                    key={tech.name}
                    className="bg-gray-800 p-3 rounded-lg flex flex-col items-center justify-center gap-2 aspect-square transition-all duration-300 hover:bg-gray-700/50 hover:-translate-y-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech.iconUrl && (
                      <Image
                        src={getCdnIconUrl(tech.iconUrl) || tech.iconUrl}
                        alt={`${tech.name} icon`}
                        width={32}
                        height={32}
                        className="h-8 w-8 filter invert brightness-200"
                        unoptimized
                      />
                    )}
                    <p className="text-xs text-center text-gray-300 font-medium">
                      {tech.name}
                    </p>
                  </motion.div>
                ),
              )}
            </motion.div>
            <div className="w-full flex justify-center mt-8">
              <motion.button
                onClick={() => setShowGrid(false)}
                className={`group w-14 h-14 flex items-center justify-center bg-gray-800/50 ${accent.text} rounded-full border border-gray-700/50 ${accent.hoverBg} hover:text-black transition-all duration-300`}
                animate={{ rotate: 180 }}
              >
                <ChevronDown size={24} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AboutPage = () => {
  const {
    isLoading,
    profilePicUrl,
    description,
    socials,
    education,
    awards,
    techStack,
    projects,
    experiences,
    patents,
    publications,
    openToWork,
    error,
  } = useData();
  if (error) throw new Error(error);
  const projectCount = projects.length || 0;
  const experienceCount = experiences.length || 0;
  const researchCount = patents.length + publications.length || 0;
  return (
    <ErrorBoundary fallbackMessage="Unable to load profile data. Please refresh the page.">
      <div className="pt-24 pb-16 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto origin-top transform xl:scale-110 2xl:scale-125 transition-transform duration-500 ease-in-out">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-3"
          >
            <User size={36} className="text-white" />
            <span>
              <span className="text-gray-500">A Little Bit</span> About Me.
            </span>
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 mx-12 mt-16 md:mx-0 gap-12 items-center mb-24">
            {/* Profile Picture*/}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 relative">
                <Image
                  src={profilePicUrl}
                  alt="A picture of Eshan Sud"
                  fill
                  className="object-cover rounded-full shadow-lg"
                  unoptimized
                  priority
                />
                {/* Open to work green dot badge */}
                {openToWork && (
                  <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3">
                    <span className="relative flex h-5 w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 border-2 border-[#0D1A3C]"></span>
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center md:text-left"
            >
              {/* Description */}
              <p className="text-base sm:text-lg md:text-xl mb-10 leading-relaxed text-justify italic">
                {description}
              </p>
              {/* Socials */}
              <div className="flex items-center justify-center md:justify-start gap-4 md:gap-6 flex-wrap">
                {socials.map((social) => {
                  const Icon = iconMap[social.name];
                  return Icon ? (
                    <SocialLink
                      key={social.name}
                      href={social.url}
                      icon={Icon}
                    />
                  ) : null;
                })}
                <CopyEmailButton email="eshansud22@gmail.com" />
              </div>
            </motion.div>
          </div>
          {/* Stats Strip */}
          {!isLoading && (
            <StatsStrip
              projectCount={projectCount}
              experienceCount={experienceCount}
              researchCount={researchCount}
            />
          )}
          {/* GitHub Activity Graph */}
          <GitHubActivityGraph />
          {/* Tech Stacks Used */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-16 flex items-center gap-3"
          >
            <Code2 size={36} className="text-white" />
            <span>
              <span className="text-gray-500">Technologies</span> I Use.
            </span>
          </motion.h1>
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-gray-700/50 rounded w-full"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-20 bg-gray-700/50 rounded"></div>
                ))}
              </div>
            </div>
          ) : (
            <TechStackSection techStack={techStack} />
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mt-24 pb-8">
            {/* Education Section */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-12 flex items-center gap-3">
                <GraduationCap /> Education
              </h2>
              {isLoading ? (
                <div>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <EducationCardSkeleton key={i} />
                  ))}
                </div>
              ) : education && education.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative"
                >
                  {education.map((edu) => (
                    <EducationCard key={edu.id} {...edu} />
                  ))}
                </motion.div>
              ) : (
                <p className="text-gray-500 pl-2">
                  Education history is currently unavailable. Please try again
                  later.
                </p>
              )}
            </div>
            {/* Awards Section */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-12 flex items-center gap-3">
                <Award /> Awards
              </h2>
              {isLoading ? (
                <div>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="pl-10 relative mb-12 animate-pulse">
                      <div className="absolute left-0 top-1 w-4 h-4 bg-gray-700 rounded-full border-4 border-[#0D1A3C]"></div>
                      <div className="h-6 bg-gray-700/50 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-700/50 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-700/50 rounded w-1/3"></div>
                    </div>
                  ))}
                </div>
              ) : awards && awards.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative border-l-2 border-gray-700 pl-6"
                >
                  {awards.map((award) => (
                    <AwardCard key={award.id} {...award} />
                  ))}
                </motion.div>
              ) : (
                <p className="text-gray-500 pl-2">
                  Awards information is currently unavailable. Please try again
                  later.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AboutPage;
