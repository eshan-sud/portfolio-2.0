// src/types/index.d.ts
// Central TypeScript type definitions for all portfolio data shapes.

// ─── Social link ────────────────────────────────────────────────────────────
export interface Social {
  name: string;
  url: string;
  displayOrder: number;
}

// ─── User / profile ─────────────────────────────────────────────────────────
export interface UserData {
  username: string;
  profile_pic_url: string;
  profile_pic_description: string;
  resume_url: string;
  socials: Social[];
  createdAt: string;
}

// ─── Education ───────────────────────────────────────────────────────────────
export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  gpa?: number | null;
  maxGpa?: number | null;
  startDate: string;
  endDate?: string | null;
  current: boolean;
  location?: string | null;
  displayOrder: number;
  createdAt: string;
}

// ─── Experience ──────────────────────────────────────────────────────────────
export interface Experience {
  id: number;
  title: string;
  company: string;
  location?: string | null;
  remote: boolean;
  startDate: string;
  endDate?: string | null;
  current: boolean;
  description?: string | null;
  skills: string[];
  achievements: string[];
  certificateUrl?: string | null;
  offerLetterUrl?: string | null;
  recommendationUrl?: string | null;
  logoUrl?: string | null;
  websiteUrl?: string | null;
  displayOrder: number;
  createdAt: string;
}

// ─── Project ─────────────────────────────────────────────────────────────────
export interface Project {
  id: number;
  title: string;
  description?: string | null;
  longDescription?: string | null;
  image?: string | null;
  tags: string[];
  techStack: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  status: "active" | "completed" | "archived" | "in-progress";
  displayOrder: number;
  createdAt: string;
}

// ─── Publication ─────────────────────────────────────────────────────────────
export interface Publication {
  id: number;
  title: string;
  authors: string[];
  journal?: string | null;
  conference?: string | null;
  year: number;
  month?: number | null;
  doi?: string | null;
  link?: string | null;
  abstract?: string | null;
  tags: string[];
  status: "published" | "under review" | "preprint";
  createdAt: string;
}

// ─── Patent ──────────────────────────────────────────────────────────────────
export interface Patent {
  id: number;
  title: string;
  authors: string[];
  applicationNumber?: string | null;
  filingDate?: string | null;
  jurisdiction?: string | null;
  abstract?: string | null;
  status: "filed" | "pending" | "granted" | "rejected";
  link?: string | null;
  createdAt: string;
}

// ─── Award ───────────────────────────────────────────────────────────────────
export interface Award {
  id: number;
  title: string;
  issuer?: string | null;
  date?: string | null;
  description?: string | null;
  link?: string | null;
  displayOrder: number;
  createdAt: string;
}

// ─── Tech stack entry ────────────────────────────────────────────────────────
export interface TechStack {
  id: number;
  name: string;
  category: string;
  iconUrl?: string | null;
  proficiency?: number | null;
  displayOrder: number;
  createdAt: string;
}

// ─── DataContext value ───────────────────────────────────────────────────────
export interface PortfolioData {
  isLoading: boolean;
  username: string;
  profilePicUrl: string;
  resumeUrl: string;
  orcidUrl: string | null;
  description: string;
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  patents: Patent[];
  publications: Publication[];
  awards: Award[];
  techStack: TechStack[];
  socials: Social[];
  error?: unknown;
}
