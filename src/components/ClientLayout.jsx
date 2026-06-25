// src/components/ClientLayout.jsx

"use client";

// import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
// import CustomCursor from "@/components/CustomCursor";
import DevTools from "@/components/DevTools";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import BackToTopButton from "@/components/BackToTopButton";
// import FloatingLanguageSelector from "@/components/FloatingLanguageSelector";
import PageTransition from "@/components/PageTransition";
import PullToRefresh from "@/components/PullToRefresh";
import { useData } from "@/lib/DataContext";

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
        <PullToRefresh />
        <BackToTopButton />
        <DevTools />
        {/* <FloatingLanguageSelector /> */}
      </motion.div>
    </div>
  );
}
