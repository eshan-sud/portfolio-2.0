// src/components/Navbar.jsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
// import { ThemeSwitcher } from "@/components/Buttons";
import { ChevronRight, Menu, X } from "lucide-react";

const NavLink = ({ href, children, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative text-gray-500 hover:text-black transition-colors group ${
        isActive ? "text-black font-semibold" : ""
      }`}
    >
      {children}
      <span
        className={`absolute left-0 -bottom-1 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
          isActive ? "scale-x-100" : ""
        }`}
      ></span>
    </Link>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <header className="flex justify-center p-4 md:p-6 w-full">
      <nav className="bg-white text-black w-full max-w-4xl flex items-center justify-between p-2 px-6 rounded-full shadow-sm transform scale-100 xl:scale-120 2xl:scale-170 2xl:m-50 2xl:text-xl transition-transform duration-500 ease-in-out">
        <div>
          <Link
            href="/"
            className="flex items-center text-xl font-bold tracking-tight"
            onClick={closeMenu}
          >
            <ChevronRight /> Eshan Sud.
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center space-x-6">
            <NavLink href="/about">About</NavLink>
            <span className="text-gray-300">/</span>
            <NavLink href="/experience">Experience</NavLink>
            <span className="text-gray-300">/</span>
            <NavLink href="/projects">Projects</NavLink>
            <span className="text-gray-300">/</span>
            <NavLink href="/research">Research</NavLink>
          </div>
          {/* <ThemeSwitcher theme={theme} onChange={handleThemeChange} /> */}
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-white/90 backdrop-blur-sm md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 text-2xl font-semibold">
              <NavLink href="/about" onClick={closeMenu}>
                About
              </NavLink>
              <NavLink href="/experience" onClick={closeMenu}>
                Experience
              </NavLink>
              <NavLink href="/projects" onClick={closeMenu}>
                Projects
              </NavLink>
              <NavLink href="/research" onClick={closeMenu}>
                Research
              </NavLink>
              {/* <div className="pt-8">
                <ThemeSwitcher theme={theme} onChange={handleThemeChange} />
              </div> */}
            </div>
            <button
              onClick={closeMenu}
              className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              <X size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
