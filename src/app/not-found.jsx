// src/app/not-found.jsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, Compass } from "lucide-react";
import { accent } from "@/lib/accent";

// Floating ghost digits that drift around the background
const GhostDigits = () => {
  const digits = ["4", "0", "4", "4", "0", "4", "0", "4", "0"];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {digits.map((d, i) => (
        <motion.span
          key={i}
          className="absolute text-6xl md:text-8xl font-extrabold text-gray-800/30"
          initial={{
            x: `${10 + ((i * 89) % 90)}vw`,
            y: `${5 + ((i * 73) % 85)}vh`,
            opacity: 0,
            rotate: (i % 3) * 30 - 30,
          }}
          animate={{
            y: [
              `${5 + ((i * 73) % 85)}vh`,
              `${10 + ((i * 61) % 80)}vh`,
              `${5 + ((i * 73) % 85)}vh`,
            ],
            opacity: [0, 0.6, 0],
            rotate: [(i % 3) * 30 - 30, (i % 3) * 30, (i % 3) * 30 - 30],
          }}
          transition={{
            duration: 6 + (i % 4) * 2,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut",
          }}
        >
          {d}
        </motion.span>
      ))}
    </div>
  );
};

// Glitch text clone layers
const GlitchText = ({ text }) => (
  <div className="relative inline-block">
    {/* Red layer */}
    <motion.span
      aria-hidden
      className="absolute inset-0 text-red-500/60 select-none"
      animate={{ x: [0, -4, 2, -2, 0], y: [0, 2, -1, 1, 0] }}
      transition={{
        duration: 0.15,
        repeat: Infinity,
        repeatDelay: 3.5,
        ease: "linear",
      }}
    >
      {text}
    </motion.span>
    {/* Cyan layer */}
    <motion.span
      aria-hidden
      className="absolute inset-0 text-cyan-400/60 select-none"
      animate={{ x: [0, 4, -2, 3, 0], y: [0, -2, 1, -1, 0] }}
      transition={{
        duration: 0.15,
        repeat: Infinity,
        repeatDelay: 3.5,
        delay: 0.05,
        ease: "linear",
      }}
    >
      {text}
    </motion.span>
    {/* Main layer */}
    <span className="relative text-white">{text}</span>
  </div>
);

// Scan-line overlay bar
const ScanLine = () => (
  <motion.div
    className={`absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent ${accent.gradientVia} to-transparent pointer-events-none`}
    initial={{ top: "-5%" }}
    animate={{ top: "105%" }}
    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
  />
);

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Compass },
  { href: "/projects", label: "Projects", icon: Search },
];

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Ghost digit background */}
      {mounted && <GhostDigits />}
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full ${accent.bgGlow} blur-[120px]`}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full"
      >
        {/* 404 headline with glitch */}
        <div className="relative mb-2">
          <ScanLine />
          <h1 className="text-[clamp(6rem,20vw,14rem)] font-extrabold leading-none tracking-tighter">
            <GlitchText text="404" />
          </h1>
        </div>
        {/* Yellow accent divider */}
        <motion.div
          className={`h-1 ${accent.bg} rounded-full mb-8`}
          initial={{ width: 0 }}
          animate={{ width: "6rem" }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        />
        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-white mb-3"
        >
          Page not found.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="text-gray-400 text-base md:text-lg mb-12 max-w-md"
        >
          The page you're looking for doesn't exist, was moved, or is still
          being built.
        </motion.p>
        {/* Navigation buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary — go back */}
          <Link
            href="/"
            className={`group inline-flex items-center gap-2 px-6 py-3 ${accent.bg} text-black font-bold rounded-full transition-all duration-300 ${accent.bgHover} hover:scale-105 text-sm md:text-base`}
          >
            <Home size={18} />
            Back to Home
          </Link>
          {/* Secondary links */}
          {NAV_LINKS.slice(1).map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-800/70 text-gray-300 font-semibold rounded-full border border-gray-700/50 transition-all duration-300 hover:bg-gray-700 hover:text-white hover:scale-105 text-sm md:text-base"
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </motion.div>
        {/* Subtle footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-16 text-xs text-gray-600"
        >
          Error 404 &mdash; This route doesn't exist on the server.
        </motion.p>
      </motion.div>
    </div>
  );
}
