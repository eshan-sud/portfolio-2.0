// src/components/ClientLayout.jsx

"use client";

// import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

import { useData } from "@/lib/DataContext";
// import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import DevTools from "@/components/DevTools";
import PageTransition from "@/components/PageTransition";
import BackToTopButton from "@/components/BackToTopButton";
// import FloatingLanguageSelector from "@/components/FloatingLanguageSelector";

export default function ClientLayout({ children }) {
  // const { theme, setTheme } = useTheme();
  const { isLoading } = useData();

  // const handleThemeChange = () => {
  //   setTheme(theme === "dark" ? "light" : "dark");
  // };

  return (
    <div className="relative">
      <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col min-h-screen"
      >
        {/* <CustomCursor /> */}
        <Navbar />
        <main id="main-content" className="flex-grow">
          <AnimatePresence mode="wait">
            <PageTransition>{children}</PageTransition>
          </AnimatePresence>
        </main>
        <Footer />
        <BackToTopButton />
        <DevTools />
        {/* <FloatingLanguageSelector /> */}
      </motion.div>
    </div>
  );
}
