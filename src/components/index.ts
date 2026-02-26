// src/components/index.ts
// Barrel exports for all components, grouped by role.
// Usage: import { Navbar, Footer, ErrorBoundary } from "@/components"

// ── Layout ────────────────────────────────────────────
export { default as ClientLayout } from "./ClientLayout";
export { default as Navbar } from "./Navbar";
export { default as Footer } from "./Footer";

// ── Visual Effects / Backgrounds ─────────────────────
export { default as AuroraBackground } from "./AuroraBackground";
export { default as StarryBackground } from "./StarryBackground";

// ── UI Primitives ─────────────────────────────────────
export { FloatingRoundButton, ThemeSwitcher } from "./Buttons";
export { default as CustomCursor } from "./CustomCursor";
export { default as ErrorBoundary } from "./ErrorBoundary";
export { default as Loader } from "./Loader";
export { LoaderSVGs, SVGLetter } from "./LoaderSVGs";

// ── Skeleton Loaders ──────────────────────────────────
export {
  CardSkeleton,
  ProjectCardSkeleton,
  ResearchCardSkeleton,
  ExperienceCardSkeleton,
  EducationCardSkeleton,
  ProfileSkeleton,
  SkeletonGrid,
  PageSkeleton,
  LoadingSpinner,
  ShimmerSkeleton,
} from "./Skeletons";

// ── Modals ────────────────────────────────────────────
export { default as CitationModal } from "./CitationModal";

// ── Icons ─────────────────────────────────────────────
export { default as OrcidIcon } from "./OrcidIcon";

// ── Full Pages ────────────────────────────────────────
export { default as MaintenancePage } from "./MaintenancePage";

// ── SEO / Structured Data ────────────────────────────
export { default as StructuredData } from "./StructuredData";
export { default as BreadcrumbJsonLd } from "./BreadcrumbJsonLd";

// ── Internationalisation ──────────────────────────────
export { default as FloatingLanguageSelector } from "./FloatingLanguageSelector";

// ── Navigation & Transitions ──────────────────────────
export { default as PageTransition } from "./PageTransition";
export { default as BackToTopButton } from "./BackToTopButton";

// ── Data Visualisation ───────────────────────────────
export { default as GitHubActivityGraph } from "./GitHubActivityGraph";

// ── Developer Tools (dev-only) ───────────────────────
export { default as DevTools } from "./DevTools";
