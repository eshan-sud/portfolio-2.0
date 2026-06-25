// src/utility/helper.js

import {
  Github,
  Linkedin,
  Instagram,
  Code,
  BrainCircuit,
  Mail,
} from "lucide-react";

// --- Map social media names to icons ---
const iconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Instagram: Instagram,
  LeetCode: Code,
  HackerRank: BrainCircuit,
  Mail: Mail,
};

// --- Helper function to format dates ---
const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

// --- Helper function to format titles ---
function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export { iconMap, formatDate, titleCase };
