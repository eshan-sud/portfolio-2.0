// src/components/FloatingLanguageSelector.jsx

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, X } from "lucide-react";
import { accent } from "@/lib/accent";
// import { useLanguage } from "@/lib/LanguageContext";
// import { locales } from "@/lib/i18n";

const languageNames = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  zh: "中文",
  ja: "日本語",
  hi: "हिन्दी",
};

const FloatingLanguageSelector = () => {
  //   const { locale, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group w-14 h-14 bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center ${accent.hoverBg} ${accent.borderHover} transition-all duration-300 hover:scale-110`}
          aria-label="Select language"
        >
          <Globe
            size={24}
            className="text-gray-700 dark:text-gray-300 group-hover:text-black transition-colors"
          />
        </button>
      </motion.div>

      {/* Language Selection Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-3rem)] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 ${accent.bgSubtle} rounded-full flex items-center justify-center`}
                  >
                    <Globe size={20} className={accent.text} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Select Language
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Choose your preferred language
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Close"
                >
                  <X size={18} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Language List */}
              <div className="max-h-96 overflow-y-auto">
                {locales.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      changeLanguage(lang);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-4 transition-all duration-200 flex items-center justify-between group ${
                      locale === lang
                        ? `${accent.bgSubtle} border-l-4 ${accent.border}`
                        : "hover:bg-gray-100 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                          locale === lang
                            ? `${accent.bg} text-black`
                            : `bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 ${accent.groupHoverBgSubtle} ${accent.groupHoverText}`
                        }`}
                      >
                        {lang.toUpperCase()}
                      </span>
                      <div>
                        <div
                          className={`font-semibold ${
                            locale === lang
                              ? "text-gray-900 dark:text-white"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {languageNames[lang]}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          {lang === "en" && "Native/Natural"}
                          {lang === "es" && "Español"}
                          {lang === "fr" && "Français"}
                          {lang === "de" && "Deutsch"}
                          {lang === "zh" && "简体中文"}
                          {lang === "ja" && "にほんご"}
                          {lang === "hi" && "हिंदी"}
                        </div>
                      </div>
                    </div>
                    {locale === lang && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`w-6 h-6 ${accent.bg} rounded-full flex items-center justify-center`}
                      >
                        <svg
                          width="14"
                          height="10"
                          viewBox="0 0 14 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 5L5 9L13 1"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingLanguageSelector;
