// src/components/PullToRefresh.jsx

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { clearDataCache } from "@/lib/DataContext";

const THRESHOLD = 72; // px to pull before triggering refresh
const MAX_PULL = 120; // px — max indicator travel
const RESISTANCE = 0.45; // dampening factor (lower = harder to pull)
const GH_CACHE_KEY = "github_activity_cache";

/**
 * Clears all data caches, then reloads the page.
 * Exported so DevTools can call it too.
 */
export function triggerRefresh() {
  clearDataCache(); // Supabase sessionStorage cache
  try {
    localStorage.removeItem(GH_CACHE_KEY);
  } catch {} // GitHub activity cache
  window.location.reload();
}

/**
 * Global pull-to-refresh. Mount once in ClientLayout.
 * Only activates on touch devices when already scrolled to the top.
 * Ignores pulls on horizontally scrollable containers (e.g. the GitHub heatmap).
 */
const PullToRefresh = () => {
  const [pullY, setPullY] = useState(0); // current indicator offset (px)
  const [phase, setPhase] = useState("idle"); // idle | pulling | ready | refreshing
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const pulling = useRef(false);
  const isLocked = useRef(false); // locked to horizontal scroll — ignore this gesture
  const phaseRef = useRef("idle"); // mirror of phase for use inside event handlers

  // Keep phaseRef in sync with state
  const updatePhase = useCallback((next) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const progress = Math.min(pullY / THRESHOLD, 1); // 0 → 1

  const onTouchStart = useCallback((e) => {
    if (window.scrollY > 0) return; // not at top — bail
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
    pulling.current = false;
    isLocked.current = false;
  }, []);

  const onTouchMove = useCallback(
    (e) => {
      if (isLocked.current) return;
      const dy = e.touches[0].clientY - touchStartY.current;
      const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
      // If horizontal movement dominates first → lock out this gesture
      if (!pulling.current && dx > Math.abs(dy) && dx > 8) {
        isLocked.current = true;
        return;
      }
      if (dy <= 0 || window.scrollY > 0) return; // upward swipe or not at top
      pulling.current = true;
      // Prevent the browser's native pull-to-refresh
      if (e.cancelable) e.preventDefault();
      // Apply rubber-band resistance so it feels physical
      const damped = Math.min(dy * RESISTANCE, MAX_PULL);
      setPullY(damped);
      updatePhase(damped >= THRESHOLD ? "ready" : "pulling");
    },
    [updatePhase],
  );

  const onTouchEnd = useCallback(() => {
    if (!pulling.current || isLocked.current) {
      pulling.current = false;
      return;
    }
    pulling.current = false;

    if (phaseRef.current === "ready") {
      updatePhase("refreshing");
      setPullY(THRESHOLD); // hold indicator at threshold while refreshing
      // Small delay so the user sees the spinner before reload
      setTimeout(triggerRefresh, 400);
    } else {
      // Snap back
      setPullY(0);
      updatePhase("idle");
    }
  }, [updatePhase]); // no dependency on `phase` — reads from phaseRef instead

  useEffect(() => {
    const opts = { passive: false };
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, opts);
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [onTouchStart, onTouchMove, onTouchEnd]);

  const isVisible = phase !== "idle";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="ptr"
          initial={{ opacity: 0, y: -48 }}
          animate={{ opacity: 1, y: pullY - 48 }}
          exit={{ opacity: 0, y: -48 }}
          transition={
            phase === "refreshing" || phase === "idle"
              ? { type: "spring", stiffness: 300, damping: 28 }
              : { duration: 0 } // real-time tracking — no spring lag while pulling
          }
          style={{ translateY: 0 }} // let animate.y handle all movement
          className="fixed top-0 inset-x-0 z-[9998] flex justify-center pointer-events-none"
        >
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-rose-400/40 bg-gray-900/80 backdrop-blur-md shadow-xl"
            style={{
              opacity: Math.max(progress, phase === "refreshing" ? 1 : 0),
            }}
          >
            {/* Spinner / icon */}
            <motion.div
              animate={
                phase === "refreshing"
                  ? { rotate: 360 }
                  : { rotate: progress * 180 }
              }
              transition={
                phase === "refreshing"
                  ? { repeat: Infinity, duration: 0.7, ease: "linear" }
                  : { duration: 0 }
              }
            >
              <RefreshCw
                size={16}
                className={
                  phase === "ready" || phase === "refreshing"
                    ? "text-rose-400"
                    : "text-gray-400"
                }
              />
            </motion.div>

            {/* Label */}
            <span
              className={`text-xs font-semibold tracking-wide transition-colors duration-150 ${
                phase === "ready" || phase === "refreshing"
                  ? "text-rose-400"
                  : "text-gray-400"
              }`}
            >
              {phase === "refreshing"
                ? "Refreshing…"
                : phase === "ready"
                  ? "Release to refresh"
                  : "Pull to refresh"}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PullToRefresh;
