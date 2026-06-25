// src/components/CitationModal.jsx

"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check } from "lucide-react";
import { accent } from "@/lib/accent";

const generateCitation = (publication, format) => {
  const { title, authors, year, journal, doi, volume, issue, pages, keywords } =
    publication;
  const authorList = Array.isArray(authors) ? authors : [authors];

  switch (format) {
    case "Plaintext":
      // IEEE Plaintext format: A. Author and B. Author, "Title," in Journal, vol. X, pp. pages, Year, doi: xxx.
      const plainAuthors = authorList
        .map((author) => {
          const names = author.split(" ");
          const lastName = names[names.length - 1];
          const initials = names
            .slice(0, -1)
            .map((n) => n[0] + ".")
            .join(" ");
          return `${initials} ${lastName}`;
        })
        .join(" and ");

      const plainVol = volume ? `, vol. ${volume}` : "";
      const plainPages = pages ? `, pp. ${pages}` : "";
      const plainDOI = doi ? `, doi: ${doi}` : "";
      const plainKeywords =
        keywords && keywords.length > 0
          ? `\nkeywords: {${keywords.join(";")};}`
          : "";

      return `${plainAuthors}, "${title}," in ${journal}${plainVol}${plainPages}, ${year}${plainDOI}.${plainKeywords}`;
    case "APA":
      // APA 7th Edition: Author, A. A., & Author, B. B. (Year). Title. Journal, Volume(Issue), pages. https://doi.org/xxx
      const apaAuthors = authorList
        .map((author, idx) => {
          const names = author.split(" ");
          const lastName = names[names.length - 1];
          const initials = names
            .slice(0, -1)
            .map((n) => n[0] + ".")
            .join(" ");
          return `${lastName}, ${initials}`;
        })
        .join(", & ");

      const apaJournal =
        volume && issue ? `${journal}, ${volume}(${issue})` : journal;
      const apaPages = pages ? `, ${pages}` : "";
      const apaDOI = doi ? ` https://doi.org/${doi}` : "";

      return `${apaAuthors} (${year}). ${title}. ${apaJournal}${apaPages}.${apaDOI}`;

    case "MLA":
      // MLA 9th Edition: Author. "Title." Journal, vol. X, no. Y, Year, pp. pages. DOI.
      const mlaAuthors = authorList.join(", and ");
      const mlaVol = volume ? `, vol. ${volume}` : "";
      const mlaIssue = issue ? `, no. ${issue}` : "";
      const mlaPages = pages ? `, pp. ${pages}` : "";
      const mlaDOI = doi ? ` doi:${doi}.` : ".";

      return `${mlaAuthors}. "${title}." ${journal}${mlaVol}${mlaIssue}, ${year}${mlaPages}${mlaDOI}`;

    case "Chicago":
      // Chicago: Author. "Title." Journal Volume, no. Issue (Year): pages. https://doi.org/xxx.
      const chicagoAuthors = authorList.join(", ");
      const chicagoVol = volume ? ` ${volume}` : "";
      const chicagoIssue = issue ? `, no. ${issue}` : "";
      const chicagoPages = pages ? `: ${pages}` : "";
      const chicagoDOI = doi ? ` https://doi.org/${doi}.` : ".";

      return `${chicagoAuthors}. "${title}." ${journal}${chicagoVol}${chicagoIssue} (${year})${chicagoPages}${chicagoDOI}`;

    case "Harvard":
      // Harvard: Author, A., Author, B. (Year) 'Title', Journal. doi: xxx
      const harvardAuthors = authorList
        .map((author) => {
          const names = author.split(" ");
          const lastName = names[names.length - 1];
          const initial = names[0][0];
          return `${lastName}, ${initial}.`;
        })
        .join(", ");

      const harvardDOI = doi ? ` doi: ${doi}` : "";

      return `${harvardAuthors} (${year}) '${title}', ${journal}.${harvardDOI}`;

    case "IEEE":
      // IEEE: [#] A. Author, "Title," Journal, vol. X, no. Y, pp. pages, Year. doi: xxx
      const ieeeAuthors = authorList
        .map((author) => {
          const names = author.split(" ");
          const lastName = names[names.length - 1];
          const initials = names
            .slice(0, -1)
            .map((n) => n[0] + ".")
            .join(" ");
          return `${initials} ${lastName}`;
        })
        .join(", ");

      const ieeeVol = volume ? `, vol. ${volume}` : "";
      const ieeeIssue = issue ? `, no. ${issue}` : "";
      const ieeePages = pages ? `, pp. ${pages}` : "";
      const ieeeDOI = doi ? ` doi: ${doi}` : "";

      return `${ieeeAuthors}, "${title}," ${journal}${ieeeVol}${ieeeIssue}${ieeePages}, ${year}.${ieeeDOI}`;

    case "BibTeX":
      // BibTeX format (IEEE style with full metadata)
      const bibKey = `${authorList[0].split(" ")[authorList[0].split(" ").length - 1]}${year}`;
      const bibAuthors = authorList
        .map((author) => {
          const names = author.split(" ");
          const lastName = names[names.length - 1];
          const firstNames = names.slice(0, -1).join(" ");
          return `${lastName}, ${firstNames}`;
        })
        .join(" and ");
      const bibVolume = volume ? `  volume={${volume}},\n` : "";
      const bibIssue = issue ? `  number={${issue}},\n` : "";
      const bibPages = pages ? `  pages={${pages}},\n` : "";
      const bibKeywords =
        keywords && keywords.length > 0
          ? `  keywords={${keywords.join(";")}},\n`
          : "";
      const bibDOI = doi ? `  doi={${doi}}` : "";

      return `@ARTICLE{${bibKey},
  author={${bibAuthors}},
  journal={${journal}}, 
  title={${title}}, 
  year={${year}},
${bibVolume}${bibIssue}${bibPages}${bibKeywords}${bibDOI}}`;

    default:
      return "";
  }
};

const CitationModal = ({ publication, onClose }) => {
  const [selectedFormat, setSelectedFormat] = useState("APA");
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const formats = [
    "Plaintext",
    "APA",
    "MLA",
    "Chicago",
    "Harvard",
    "IEEE",
    "BibTeX",
  ];
  const citation = generateCitation(publication, selectedFormat);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 w-full max-w-2xl bg-[#16224c] rounded-lg border border-gray-700/50 overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <h3 className="text-xl font-bold text-white">
            Cite This Publication
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700/50 transition-colors text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Citation Format:
            </label>
            <div className="flex flex-wrap gap-2">
              {formats.map((format) => (
                <button
                  key={format}
                  onClick={() => setSelectedFormat(format)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedFormat === format
                      ? `${accent.bg} text-black`
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 relative">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                {citation}
              </pre>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 ${accent.bg} text-black rounded-lg font-semibold ${accent.bgHover} transition-colors`}
          >
            {copied ? (
              <>
                <Check size={20} />
                Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy size={20} />
                Copy Citation
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
};

export default CitationModal;
