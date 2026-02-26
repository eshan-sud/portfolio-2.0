/**
 * ============================================================
 * ACCENT COLOR CENTRALIZATION
 * ============================================================
 * All accent color Tailwind classes are defined here as static
 * strings so Tailwind v4 can scan and include them in the build.
 *
 * To change the portfolio accent color:
 *   1. Comment out the ACTIVE block below
 *   2. Uncomment one of the ALTERNATE ACCENTS blocks
 *   3. Update --color-accent / --color-accent-hover hex values in globals.css
 *   4. Save — all accent colours update site-wide instantly
 *
 * Also update globals.css:
 *   --color-accent and --color-accent-hover to match.
 * ============================================================
 */

// ACTIVE ACCENT - ROSE
// ROSE
export const accent = {
  text: "text-rose-400",
  textHover: "hover:text-rose-300",
  hoverText: "hover:text-rose-400",
  groupHoverText: "group-hover:text-rose-400",
  bg: "bg-rose-400",
  bgHover: "hover:bg-rose-300",
  hoverBg: "hover:bg-rose-400",
  bgHoverDark: "hover:bg-rose-500",
  groupHoverBg: "group-hover:bg-rose-400",
  bgSubtle: "bg-rose-400/20",
  bgMuted: "bg-rose-400/10",
  bgGlow: "bg-rose-400/5",
  bgActive: "bg-rose-500/20",
  groupHoverBgSubtle: "group-hover:bg-rose-400/20",
  border: "border-rose-400",
  borderHover: "hover:border-rose-400",
  borderTop: "border-t-rose-400",
  groupHoverBorder: "group-hover:border-rose-400",
  ring: "focus:ring-rose-400",
  focusBg: "focus:bg-rose-400",
  gradientVia: "via-rose-400/5",
  level0: "bg-gray-800",
  level1: "bg-rose-900/70",
  level2: "bg-rose-700/80",
  level3: "bg-rose-500/90",
  level4: "bg-rose-400",
};

// ============================================================
// ── ALTERNATE ACCENTS (uncomment one block to switch) ────────
// ============================================================

// ── CYAN ─────────────────────────────────────────────────────
// export const accent = {
//   text: "text-cyan-400",
//   textHover: "hover:text-cyan-300",
//   hoverText: "hover:text-cyan-400",
//   groupHoverText: "group-hover:text-cyan-400",
//   bg: "bg-cyan-400",
//   bgHover: "hover:bg-cyan-300",
//   hoverBg: "hover:bg-cyan-400",
//   bgHoverDark: "hover:bg-cyan-500",
//   groupHoverBg: "group-hover:bg-cyan-400",
//   bgSubtle: "bg-cyan-400/20",
//   bgMuted: "bg-cyan-400/10",
//   bgGlow: "bg-cyan-400/5",
//   bgActive: "bg-cyan-500/20",
//   groupHoverBgSubtle: "group-hover:bg-cyan-400/20",
//   border: "border-cyan-400",
//   borderHover: "hover:border-cyan-400",
//   borderTop: "border-t-cyan-400",
//   groupHoverBorder: "group-hover:border-cyan-400",
//   ring: "focus:ring-cyan-400",
//   focusBg: "focus:bg-cyan-400",
//   gradientVia: "via-cyan-400/5",
//   level0: "bg-gray-800",
//   level1: "bg-cyan-900/70",
//   level2: "bg-cyan-700/80",
//   level3: "bg-cyan-500/90",
//   level4: "bg-cyan-400",
// };

// ── EMERALD ──────────────────────────────────────────────────
// export const accent = {
//   text: "text-emerald-400",
//   textHover: "hover:text-emerald-300",
//   hoverText: "hover:text-emerald-400",
//   groupHoverText: "group-hover:text-emerald-400",
//   bg: "bg-emerald-400",
//   bgHover: "hover:bg-emerald-300",
//   hoverBg: "hover:bg-emerald-400",
//   bgHoverDark: "hover:bg-emerald-500",
//   groupHoverBg: "group-hover:bg-emerald-400",
//   bgSubtle: "bg-emerald-400/20",
//   bgMuted: "bg-emerald-400/10",
//   bgGlow: "bg-emerald-400/5",
//   bgActive: "bg-emerald-500/20",
//   groupHoverBgSubtle: "group-hover:bg-emerald-400/20",
//   border: "border-emerald-400",
//   borderHover: "hover:border-emerald-400",
//   borderTop: "border-t-emerald-400",
//   groupHoverBorder: "group-hover:border-emerald-400",
//   ring: "focus:ring-emerald-400",
//   focusBg: "focus:bg-emerald-400",
//   gradientVia: "via-emerald-400/5",
//   level0: "bg-gray-800",
//   level1: "bg-emerald-900/70",
//   level2: "bg-emerald-700/80",
//   level3: "bg-emerald-500/90",
//   level4: "bg-emerald-400",
// };

// ── VIOLET ───────────────────────────────────────────────────
// export const accent = {
//   text: "text-violet-400",
//   textHover: "hover:text-violet-300",
//   hoverText: "hover:text-violet-400",
//   groupHoverText: "group-hover:text-violet-400",
//   bg: "bg-violet-400",
//   bgHover: "hover:bg-violet-300",
//   hoverBg: "hover:bg-violet-400",
//   bgHoverDark: "hover:bg-violet-500",
//   groupHoverBg: "group-hover:bg-violet-400",
//   bgSubtle: "bg-violet-400/20",
//   bgMuted: "bg-violet-400/10",
//   bgGlow: "bg-violet-400/5",
//   bgActive: "bg-violet-500/20",
//   groupHoverBgSubtle: "group-hover:bg-violet-400/20",
//   border: "border-violet-400",
//   borderHover: "hover:border-violet-400",
//   borderTop: "border-t-violet-400",
//   groupHoverBorder: "group-hover:border-violet-400",
//   ring: "focus:ring-violet-400",
//   focusBg: "focus:bg-violet-400",
//   gradientVia: "via-violet-400/5",
//   level0: "bg-gray-800",
//   level1: "bg-violet-900/70",
//   level2: "bg-violet-700/80",
//   level3: "bg-violet-500/90",
//   level4: "bg-violet-400",
// };

// ── ORANGE ───────────────────────────────────────────────────
// export const accent = {
//   text: "text-orange-400",
//   textHover: "hover:text-orange-300",
//   hoverText: "hover:text-orange-400",
//   groupHoverText: "group-hover:text-orange-400",
//   bg: "bg-orange-400",
//   bgHover: "hover:bg-orange-300",
//   hoverBg: "hover:bg-orange-400",
//   bgHoverDark: "hover:bg-orange-500",
//   groupHoverBg: "group-hover:bg-orange-400",
//   bgSubtle: "bg-orange-400/20",
//   bgMuted: "bg-orange-400/10",
//   bgGlow: "bg-orange-400/5",
//   bgActive: "bg-orange-500/20",
//   groupHoverBgSubtle: "group-hover:bg-orange-400/20",
//   border: "border-orange-400",
//   borderHover: "hover:border-orange-400",
//   borderTop: "border-t-orange-400",
//   groupHoverBorder: "group-hover:border-orange-400",
//   ring: "focus:ring-orange-400",
//   focusBg: "focus:bg-orange-400",
//   gradientVia: "via-orange-400/5",
//   level0: "bg-gray-800",
//   level1: "bg-orange-900/70",
//   level2: "bg-orange-700/80",
//   level3: "bg-orange-500/90",
//   level4: "bg-orange-400",
// };

// ── SKY ──────────────────────────────────────────────────────
// export const accent = {
//   text: "text-sky-400",
//   textHover: "hover:text-sky-300",
//   hoverText: "hover:text-sky-400",
//   groupHoverText: "group-hover:text-sky-400",
//   bg: "bg-sky-400",
//   bgHover: "hover:bg-sky-300",
//   hoverBg: "hover:bg-sky-400",
//   bgHoverDark: "hover:bg-sky-500",
//   groupHoverBg: "group-hover:bg-sky-400",
//   bgSubtle: "bg-sky-400/20",
//   bgMuted: "bg-sky-400/10",
//   bgGlow: "bg-sky-400/5",
//   bgActive: "bg-sky-500/20",
//   groupHoverBgSubtle: "group-hover:bg-sky-400/20",
//   border: "border-sky-400",
//   borderHover: "hover:border-sky-400",
//   borderTop: "border-t-sky-400",
//   groupHoverBorder: "group-hover:border-sky-400",
//   ring: "focus:ring-sky-400",
//   focusBg: "focus:bg-sky-400",
//   gradientVia: "via-sky-400/5",
//   level0: "bg-gray-800",
//   level1: "bg-sky-900/70",
//   level2: "bg-sky-700/80",
//   level3: "bg-sky-500/90",
//   level4: "bg-sky-400",
// };

// YELLOW
// export const accent = {
//   text: "text-yellow-400",
//   textHover: "hover:text-yellow-300",
//   hoverText: "hover:text-yellow-400",
//   groupHoverText: "group-hover:text-yellow-400",
//   bg: "bg-yellow-400",
//   bgHover: "hover:bg-yellow-300",
//   hoverBg: "hover:bg-yellow-400",
//   bgHoverDark: "hover:bg-yellow-500",
//   groupHoverBg: "group-hover:bg-yellow-400",
//   bgSubtle: "bg-yellow-400/20",
//   bgMuted: "bg-yellow-400/10",
//   bgGlow: "bg-yellow-400/5",
//   bgActive: "bg-yellow-500/20",
//   groupHoverBgSubtle: "group-hover:bg-yellow-400/20",
//   border: "border-yellow-400",
//   borderHover: "hover:border-yellow-400",
//   borderTop: "border-t-yellow-400",
//   groupHoverBorder: "group-hover:border-yellow-400",
//   ring: "focus:ring-yellow-400",
//   focusBg: "focus:bg-yellow-400",
//   gradientVia: "via-yellow-400/5",
//   level0: "bg-gray-800",
//   level1: "bg-yellow-900/70",
//   level2: "bg-yellow-700/80",
//   level3: "bg-yellow-500/90",
//   level4: "bg-yellow-400",
// };
