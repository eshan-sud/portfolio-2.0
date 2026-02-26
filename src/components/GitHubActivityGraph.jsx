// src/components/GitHubActivityGraph.jsx

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { accent } from "@/lib/accent";

// Width per week column: w-3 (12px) + gap-[3px] (3px) = 15px
const CELL = 12; // px (w-3)
const GAP = 3; // px (gap-[3px])
const COL_W = CELL + GAP; // 15px per week column
const DAY_LABEL_W = 28; // px for the day label column

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Contribution graph levels — sourced from centralised accent config
const LEVEL_CLASSES = [
  accent.level0, // 0 — no contributions
  accent.level1, // 1–3
  accent.level2, // 4–6
  accent.level3, // 7–9
  accent.level4, // 10+
];

function getLevel(count) {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

function computeStreaks(weeks) {
  const allDays = weeks.flatMap((w) => w.contributionDays);
  const today = new Date().toISOString().split("T")[0];

  let longestStreak = 0;
  let run = 0;
  for (const d of allDays) {
    if (d.contributionCount > 0) {
      run++;
      if (run > longestStreak) longestStreak = run;
    } else {
      run = 0;
    }
  }

  let currentStreak = 0;
  let i = allDays.length - 1;
  // If today has no contributions yet, skip it
  if (allDays[i]?.date === today && allDays[i]?.contributionCount === 0) i--;
  while (i >= 0 && allDays[i].contributionCount > 0) {
    currentStreak++;
    i--;
  }

  return { longestStreak, currentStreak };
}

/** Build month label spans from weeks array */
function buildMonthSpans(weeks) {
  const spans = [];
  let lastMonth = -1;
  let currentSpan = null;

  weeks.forEach((week, wIdx) => {
    const firstDay = week.contributionDays[0];
    if (!firstDay) return;
    const month = new Date(firstDay.date + "T00:00:00").getMonth();
    if (month !== lastMonth) {
      if (currentSpan) spans.push(currentSpan);
      currentSpan = { month, startWeek: wIdx, count: 1 };
      lastMonth = month;
    } else {
      currentSpan.count++;
    }
  });
  if (currentSpan) spans.push(currentSpan);
  return spans;
}

const GitHubActivityGraph = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    fetch("/api/github-activity")
      .then((r) => r.json())
      .then((d) => {
        if (!d.error) setData(d);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="my-24 animate-pulse">
        <div className="h-8 bg-gray-700/50 rounded w-72 mb-8"></div>
        <div className="h-10 bg-gray-700/50 rounded w-96 mb-6"></div>
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6">
          <div className="h-32 bg-gray-700/30 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (!data) return null; // silently skip if API fails

  const { weeks, totalContributions } = data;
  const { longestStreak, currentStreak } = computeStreaks(weeks);
  const monthSpans = buildMonthSpans(weeks);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="my-24"
    >
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-8"
      >
        <Github size={28} className="text-white" />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          <span className="text-gray-500">GitHub</span> Activity.
        </h2>
      </motion.div>

      {/* Stat pills */}
      <div className="flex flex-wrap gap-4 mb-8">
        {[
          {
            value: totalContributions.toLocaleString(),
            label: "Contributions this year",
          },
          { value: currentStreak, label: "Current streak (days)" },
          { value: longestStreak, label: "Longest streak (days)" },
        ].map(({ value, label }) => (
          <div
            key={label}
            className="bg-gray-800/50 border border-gray-700/50 rounded-xl px-5 py-3 text-center min-w-[130px]"
          >
            <p className={`text-2xl font-bold ${accent.text}`}>{value}</p>
            <p className="text-xs text-gray-400 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Heatmap card */}
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 md:p-6 overflow-x-auto">
        {/* Total label */}
        <p className="text-sm text-gray-400 mb-4">
          <span className="text-white font-semibold">
            {totalContributions.toLocaleString()}
          </span>{" "}
          contributions in the last year
        </p>

        <div style={{ width: DAY_LABEL_W + weeks.length * COL_W }}>
          {/* Month labels row */}
          <div className="flex" style={{ paddingLeft: DAY_LABEL_W }}>
            {monthSpans.map(({ month, count }, i) => (
              <div
                key={i}
                className="text-[10px] text-gray-500 overflow-hidden whitespace-nowrap"
                style={{ width: count * COL_W }}
              >
                {MONTHS[month]}
              </div>
            ))}
          </div>

          {/* Grid: day labels + week columns */}
          <div className="flex" style={{ gap: GAP }}>
            {/* Day-of-week labels */}
            <div
              className="flex flex-col"
              style={{ gap: GAP, width: DAY_LABEL_W - GAP, paddingTop: 2 }}
            >
              {["", "Mon", "", "Wed", "", "Fri", ""].map((label, i) => (
                <div
                  key={i}
                  className="text-[10px] text-gray-500 text-right pr-1 leading-none flex items-center justify-end"
                  style={{ height: CELL }}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Week columns */}
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col" style={{ gap: GAP }}>
                {week.contributionDays.map((day) => {
                  const level = getLevel(day.contributionCount);
                  return (
                    <div
                      key={day.date}
                      className={`rounded-sm cursor-default transition-transform duration-100 hover:scale-125 ${LEVEL_CLASSES[level]}`}
                      style={{ width: CELL, height: CELL }}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltip({
                          date: day.date,
                          count: day.contributionCount,
                          x: rect.left + rect.width / 2,
                          y: rect.top,
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-[3px] mt-3 justify-end">
            <span className="text-[10px] text-gray-500 mr-1">Less</span>
            {LEVEL_CLASSES.map((cls, i) => (
              <div
                key={i}
                className={`rounded-sm ${cls}`}
                style={{ width: CELL, height: CELL }}
              />
            ))}
            <span className="text-[10px] text-gray-500 ml-1">More</span>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y - 8,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="bg-gray-900 border border-gray-700 text-white text-xs rounded-lg px-3 py-2 shadow-xl whitespace-nowrap">
            <span className={`font-semibold ${accent.text}`}>
              {tooltip.count} contribution{tooltip.count !== 1 ? "s" : ""}
            </span>
            <span className="text-gray-400">
              {" "}
              on{" "}
              {new Date(tooltip.date + "T00:00:00").toLocaleDateString(
                "en-US",
                {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                },
              )}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default GitHubActivityGraph;
